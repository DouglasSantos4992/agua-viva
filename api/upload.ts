import { put } from "@vercel/blob";
import type { VercelRequest, VercelResponse } from "@vercel/node";
import formidable from "formidable";
import fs from "fs";

export const config = {
  api: {
    bodyParser: false,
  },
};

const MAX_FILE_SIZE = 25 * 1024 * 1024;
const ALLOWED_EXTENSIONS = new Set(["doc", "docx", "pdf", "mp3", "m4a"]);

function getExtension(fileName: string) {
  return fileName.split(".").pop()?.toLowerCase() || "";
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  const form = formidable();

  form.parse(req, async (err, _fields, files) => {
    if (err) {
      return res.status(500).json({ error: "Erro no upload" });
    }

    const file = Array.isArray(files.file) ? files.file[0] : files.file;

    if (!file) {
      return res.status(400).json({ error: "Arquivo não enviado" });
    }

    const fileBuffer = fs.readFileSync(file.filepath);

    const originalName = file.originalFilename || `arquivo-${Date.now()}.docx`;
    const ext = getExtension(originalName);

    if (!ALLOWED_EXTENSIONS.has(ext)) {
      return res.status(400).json({
        error: "Formato inválido. Envie PDF, DOC, DOCX, MP3 ou M4A.",
      });
    }

    if (fileBuffer.byteLength > MAX_FILE_SIZE) {
      return res.status(400).json({
        error: "Arquivo muito grande. O limite é 25 MB.",
      });
    }

    const encodedName = Buffer.from(originalName, "utf8").toString("base64url");

    const safeBlobName = `${encodedName}.${ext}`;

    const blob = await put(safeBlobName, fileBuffer, {
      access: "public",
      addRandomSuffix: true,
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });

    return res.status(200).json({
      nome: originalName,
      url: blob.url,
      downloadUrl: blob.downloadUrl,
      uploadedAt: new Date().toISOString(),
    });
  });
}

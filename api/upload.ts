import { put } from "@vercel/blob";
import formidable from "formidable";
import fs from "fs";
import path from "path";

export const config = {
  api: {
    bodyParser: false,
  },
};

const FILE_DB = path.join(process.cwd(), "data", "files.json");

export default async function handler(req: any, res: any) {
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

    const originalName = Buffer.from(
      file.originalFilename || `arquivo-${Date.now()}.docx`,
      "latin1"
    ).toString("utf8");

    const safeBlobName = `arquivo-${Date.now()}${path.extname(originalName)}`;

    const blob = await put(safeBlobName, fileBuffer, {
      access: "public",
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });

    let registros = [];

    if (fs.existsSync(FILE_DB)) {
      registros = JSON.parse(fs.readFileSync(FILE_DB, "utf-8"));
    }

    registros.push({
      nome: originalName,
      url: blob.url,
      downloadUrl: blob.downloadUrl,
    });

    registros = registros.slice(-5);

    fs.writeFileSync(FILE_DB, JSON.stringify(registros, null, 2));

    return res.status(200).json({
      nome: originalName,
      url: blob.url,
      downloadUrl: blob.downloadUrl,
    });
  });
}
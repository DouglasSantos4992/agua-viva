import { put } from "@vercel/blob";
import formidable from "formidable";
import fs from "fs";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: any, res: any) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Método não permitido" });
    }

    const form = formidable();

    form.parse(req, async (err, _fields, files) => {
      if (err) {
        return res.status(500).json({ error: "Erro ao processar upload" });
      }

      const file = Array.isArray(files.file) ? files.file[0] : files.file;

      if (!file) {
        return res.status(400).json({ error: "Arquivo não enviado" });
      }

      const fileBuffer = fs.readFileSync(file.filepath);

      const blob = await put(file.originalFilename || `arquivo-${Date.now()}`, fileBuffer, {
        access: "public",
        addRandomSuffix: true,
        token: process.env.BLOB_READ_WRITE_TOKEN,
      });

      return res.status(200).json({
        nome: file.originalFilename,
        url: blob.url,
        downloadUrl: blob.downloadUrl,
      });
    });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
}
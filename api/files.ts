import { list } from "@vercel/blob";

export default async function handler(req: any, res: any) {
  try {
    const { url } = req.query;

    const { blobs } = await list({
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });

    const file = blobs.find((b) => b.url === url);

    if (!file) {
      return res.status(404).json({ error: "Arquivo não encontrado" });
    }

    return res.redirect(file.downloadUrl);
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
}
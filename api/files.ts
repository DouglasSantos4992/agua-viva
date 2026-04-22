import { list } from "@vercel/blob";

export default async function handler(_: any, res: any) {
  try {
    const { blobs } = await list({
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });

    return res.status(200).json(
      blobs.map((file) => ({
        nome: decodeURIComponent(file.url.split("/").pop() || ""),
        url: file.url,
      }))
    );
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao listar arquivos" });
  }
}
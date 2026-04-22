import { list } from "@vercel/blob";

export default async function handler(_: any, res: any) {
  try {
    const { blobs } = await list({
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });

    const arquivos = blobs
      .slice(-5)
      .reverse()
      .map((file) => ({
        nome: file.pathname
          .replace(/-[A-Za-z0-9]+\./, ".")
          .replace(/-/g, " "),
        url: file.url,
        downloadUrl: file.downloadUrl,
      }));

    return res.status(200).json(arquivos);
  } catch (error) {
    return res.status(500).json({ error: "Erro ao listar arquivos" });
  }
}
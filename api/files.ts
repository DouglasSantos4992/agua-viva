import { list } from "@vercel/blob";

export default async function handler(_: any, res: any) {
  try {
    const { blobs } = await list({
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });

    const arquivos = blobs
      .slice(-5)
      .reverse()
      .map((file) => {
        const encodedName = file.pathname.replace(/-[A-Za-z0-9]+\.[^.]+$/, "");

        let nome = file.pathname;

        try {
          nome = Buffer.from(encodedName, "base64").toString("utf8");
        } catch {}

        return {
          nome,
          url: file.url,
          downloadUrl: file.downloadUrl,
        };
      });

    return res.status(200).json(arquivos);
  } catch (error) {
    return res.status(500).json({ error: "Erro ao listar arquivos" });
  }
}
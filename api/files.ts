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
        let nome = file.pathname;

        try {
          const lastDot = file.pathname.lastIndexOf(".");
          const beforeExt = file.pathname.substring(0, lastDot);

          const lastDash = beforeExt.lastIndexOf("-");
          const encodedName = beforeExt.substring(0, lastDash);

          nome = Buffer.from(encodedName, "base64url").toString("utf8");
        } catch {}

        return {
          nome,
          url: file.url,
          downloadUrl: file.downloadUrl,
        };
      });

    return res.status(200).json(arquivos);
  } catch {
    return res.status(500).json({ error: "Erro ao listar arquivos" });
  }
}
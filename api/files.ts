import { list } from "@vercel/blob";
import type { VercelRequest, VercelResponse } from "@vercel/node";

function getOriginalName(pathname: string) {
  try {
    const lastDot = pathname.lastIndexOf(".");
    const beforeExt = pathname.substring(0, lastDot);
    const lastDash = beforeExt.lastIndexOf("-");
    const encodedName = beforeExt.substring(0, lastDash);

    return Buffer.from(encodedName, "base64url").toString("utf8");
  } catch {
    return pathname;
  }
}

export default async function handler(_: VercelRequest, res: VercelResponse) {
  try {
    const { blobs } = await list({
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });

    const arquivos = blobs
      .sort(
        (a, b) =>
          new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime(),
      )
      .slice(0, 5)
      .map((file) => ({
        nome: getOriginalName(file.pathname),
        url: file.url,
        downloadUrl: file.downloadUrl,
        uploadedAt: file.uploadedAt,
      }));

    return res.status(200).json(arquivos);
  } catch {
    return res.status(500).json({ error: "Erro ao listar arquivos" });
  }
}

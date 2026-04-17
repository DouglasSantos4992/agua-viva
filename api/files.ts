import { list } from "@vercel/blob";

export default async function handler(_: any, res: any) {
  const { blobs } = await list();

  const arquivos = blobs.map((file) => ({
    nome: file.pathname,
    url: file.url,
    downloadUrl: file.downloadUrl,
  }));

  return res.status(200).json(arquivos);
}
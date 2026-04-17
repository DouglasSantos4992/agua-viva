import { list } from "@vercel/blob";

export default async function handler(_: any, res: any) {
  try {
    const { blobs } = await list();

    const arquivos = blobs.map((file) => ({
      nome: file.pathname,
      url: file.url, // URL privada
    }));

    return res.status(200).json(arquivos);
  } catch (error: any) {
    return res.status(500).json({
      error: error.message,
    });
  }
}
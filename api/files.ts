import { list } from "@vercel/blob";

export default async function handler(_: any, res: any) {
  try {
    const { blobs } = await list({
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });

    const arquivos = blobs.map((file) => ({
      nome: file.pathname,
      url: file.url,
    }));

    return res.status(200).json(arquivos);
  } catch (error: any) {
    return res.status(500).json({
      error: error.message,
    });
  }
}
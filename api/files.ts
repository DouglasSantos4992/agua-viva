import { list } from "@vercel/blob";

export default async function handler(_: any, res: any) {
  const { blobs } = await list({
    token: process.env.BLOB_READ_WRITE_TOKEN,
  });

  return res.status(200).json(
    blobs.map((file) => ({
      nome: file.pathname,
      downloadUrl: file.downloadUrl,
    }))
  );
}
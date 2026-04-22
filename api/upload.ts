import { put } from "@vercel/blob";

export default async function handler(req: any, res: any) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Método não permitido" });
    }

    const chunks: Buffer[] = [];

    for await (const chunk of req) {
      chunks.push(chunk);
    }

    const body = Buffer.concat(chunks);

    const filename = req.headers["x-filename"]
      ? decodeURIComponent(req.headers["x-filename"] as string)
      : `arquivo-${Date.now()}`;

    const blob = await put(filename, body, {
      access: "public",
      addRandomSuffix: false,
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });

    return res.status(200).json(blob);
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
}
import { put } from "@vercel/blob";

export default async function handler(req: any, res: any) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Método não permitido" });
    }

    const body = req.body;

    const blob = await put(`arquivo-${Date.now()}.txt`, body, {
      access: "public",
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });

    return res.status(200).json(blob);
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({
      error: error?.message || "Erro no upload",
    });
  }
}
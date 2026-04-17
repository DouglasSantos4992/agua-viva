import { put } from "@vercel/blob";

export default async function handler(req: any, res: any) {
  try {
    const blob = await put("teste.txt", "teste funcionando", {
      access: "public",
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });

    return res.status(200).json(blob);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro no upload" });
  }
}
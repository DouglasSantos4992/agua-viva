import { getDownloadUrl } from "@vercel/blob";

export default async function handler(req: any, res: any) {
  try {
    const { url } = req.query;

    if (!url) {
      return res.status(400).json({ error: "URL não informada" });
    }

    const signedUrl = await getDownloadUrl(url);

    return res.status(200).json({ url: signedUrl });
  } catch (error: any) {
    return res.status(500).json({
      error: error.message,
    });
  }
}
import { put } from "@vercel/blob";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: any, res: any) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Método não permitido" });
    }

    const chunks: Buffer[] = [];

    for await (const chunk of req) {
      chunks.push(chunk);
    }

    const bodyBuffer = Buffer.concat(chunks);

    const boundary = req.headers["content-type"].split("boundary=")[1];

    const parts = bodyBuffer.toString("latin1").split(`--${boundary}`);

    const filePart = parts.find((part: string) =>
      part.includes('name="file"')
    );

    const filenamePart = parts.find((part: string) =>
      part.includes('name="filename"')
    );

    const filenameMatch = filenamePart?.match(/\r\n\r\n([\s\S]*)\r\n/);

    const filename =
      filenameMatch?.[1]?.trim() || `arquivo-${Date.now()}`;

    if (!filePart) {
      return res.status(400).json({ error: "Arquivo não enviado" });
    }

    const fileStart = filePart.indexOf("\r\n\r\n") + 4;
    const fileEnd = filePart.lastIndexOf("\r\n");

    const fileBuffer = Buffer.from(
      filePart.substring(fileStart, fileEnd),
      "latin1"
    );

    const blob = await put(filename, fileBuffer, {
      access: "public",
      addRandomSuffix: true,
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });

    return res.status(200).json({
      ...blob,
      originalName: filename,
    });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
}
import { del } from "@vercel/blob";
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { isAdminRequest } from "./auth";

function parseBody(body: unknown) {
  if (typeof body === "string") {
    return JSON.parse(body) as { url?: string };
  }

  return body as { url?: string };
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  if (!isAdminRequest(req)) {
    return res.status(401).json({ error: "Sessão inválida" });
  }

  try {
    const { url } = parseBody(req.body);

    if (!url) {
      return res.status(400).json({ error: "Arquivo não informado" });
    }

    await del(url, {
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });

    return res.status(200).json({ ok: true });
  } catch {
    return res.status(500).json({ error: "Erro ao excluir arquivo" });
  }
}

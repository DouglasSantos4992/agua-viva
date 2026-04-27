import type { VercelRequest, VercelResponse } from "@vercel/node";
import {
  createAdminToken,
  getAdminCredentials,
} from "./auth";

function parseBody(body: unknown) {
  if (typeof body === "string") {
    return JSON.parse(body) as { user?: string; password?: string };
  }

  return body as { user?: string; password?: string };
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  const credentials = getAdminCredentials();

  if (!credentials) {
    return res.status(500).json({
      error: "Credenciais administrativas não configuradas",
    });
  }

  try {
    const body = parseBody(req.body);

    if (
      body.user !== credentials.user ||
      body.password !== credentials.password
    ) {
      return res.status(401).json({ error: "Login inválido" });
    }

    return res.status(200).json({
      token: createAdminToken(credentials.user),
    });
  } catch {
    return res.status(400).json({ error: "Dados de login inválidos" });
  }
}

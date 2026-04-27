/// <reference types="node" />

import crypto from "node:crypto";
import type { IncomingHttpHeaders } from "node:http";

const TOKEN_TTL_MS = 12 * 60 * 60 * 1000;

type TokenPayload = {
  user: string;
  exp: number;
};

function base64Url(value: string) {
  return Buffer.from(value).toString("base64url");
}

function getTokenSecret() {
  return (
    process.env.ADMIN_SESSION_SECRET ||
    process.env.BLOB_READ_WRITE_TOKEN ||
    "agua-viva-local-session"
  );
}

export function getAdminCredentials() {
  const isProduction = process.env.NODE_ENV === "production";
  const user = process.env.ADMIN_USER || (isProduction ? "" : "admin");
  const password =
    process.env.ADMIN_PASSWORD || (isProduction ? "" : "aguaviva@2026");

  if (!user || !password) {
    return null;
  }

  return { user, password };
}

export function createAdminToken(user: string) {
  const payload = base64Url(
    JSON.stringify({
      user,
      exp: Date.now() + TOKEN_TTL_MS,
    } satisfies TokenPayload),
  );
  const signature = crypto
    .createHmac("sha256", getTokenSecret())
    .update(payload)
    .digest("base64url");

  return `${payload}.${signature}`;
}

export function verifyAdminToken(token?: string) {
  if (!token) return false;

  const [payload, signature] = token.split(".");
  if (!payload || !signature) return false;

  const expectedSignature = crypto
    .createHmac("sha256", getTokenSecret())
    .update(payload)
    .digest("base64url");

  const signatureBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expectedSignature);

  if (
    signatureBuffer.length !== expectedBuffer.length ||
    !crypto.timingSafeEqual(signatureBuffer, expectedBuffer)
  ) {
    return false;
  }

  try {
    const data = JSON.parse(
      Buffer.from(payload, "base64url").toString("utf8"),
    ) as TokenPayload;

    return data.exp > Date.now();
  } catch {
    return false;
  }
}

export function getBearerToken(req: { headers: IncomingHttpHeaders }) {
  const authorizationHeader = req.headers.authorization || "";
  const authorization = Array.isArray(authorizationHeader)
    ? authorizationHeader[0]
    : authorizationHeader;
  const [type, token] = authorization.split(" ");

  return type.toLowerCase() === "bearer" ? token : undefined;
}

export function isAdminRequest(req: { headers: IncomingHttpHeaders }) {
  return verifyAdminToken(getBearerToken(req));
}

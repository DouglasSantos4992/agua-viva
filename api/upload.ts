export default function handler(req: any, res: any) {
  try {
    return res.status(200).json({ ok: true });
  } catch (error: any) {
    console.error("ERRO INTERNO:", error);
    return res.status(500).json({
      error: error?.message || "erro interno",
    });
  }
}
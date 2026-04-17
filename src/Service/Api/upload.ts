import { put } from "@vercel/blob";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return Response.json({ error: "Arquivo não enviado" }, { status: 400 });
    }

    const blob = await put(file.name, file, {
      access: "public",
    });

    return Response.json(blob);
  } catch (error) {
    return Response.json({ error: "Erro no upload" }, { status: 500 });
  }
}
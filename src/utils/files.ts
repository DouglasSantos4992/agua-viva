const MAX_FILE_SIZE = 25 * 1024 * 1024;
const ALLOWED_EXTENSIONS = new Set(["doc", "docx", "pdf", "mp3", "m4a"]);

export function validateUploadFile(file: File) {
  const extension = file.name.split(".").pop()?.toLowerCase() || "";

  if (!ALLOWED_EXTENSIONS.has(extension)) {
    return "Formato inválido. Envie PDF, DOC, DOCX, MP3 ou M4A.";
  }

  if (file.size > MAX_FILE_SIZE) {
    return "Arquivo muito grande. O limite é 25 MB.";
  }

  return "";
}

export function formatUploadDate(uploadedAt: string) {
  const date = new Date(uploadedAt);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
}

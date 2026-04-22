import fs from "fs";
import path from "path";

const FILE_DB = path.join(process.cwd(), "data", "files.json");

export default async function handler(_: any, res: any) {
  try {
    if (!fs.existsSync(FILE_DB)) {
      return res.status(200).json([]);
    }

    const registros = JSON.parse(fs.readFileSync(FILE_DB, "utf-8"));

    return res.status(200).json(registros.reverse());
  } catch (error) {
    return res.status(500).json({ error: "Erro ao listar arquivos" });
  }
}
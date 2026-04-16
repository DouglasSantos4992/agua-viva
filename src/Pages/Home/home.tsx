import { useState } from "react";
import "./home.css";

type Arquivo = {
  nome: string;
  file: File;
};

function Home() {
  const [arquivos, setArquivos] = useState<Arquivo[]>([]);

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const novoArquivo: Arquivo = {
      nome: file.name,
      file: file,
    };

    setArquivos((prev) => [...prev, novoArquivo]);

    // limpa o input pra permitir subir o mesmo arquivo de novo se quiser
    event.target.value = "";
  };

  const handleDownload = (file: File) => {
    const url = URL.createObjectURL(file);
    const link = document.createElement("a");

    link.href = url;
    link.download = file.name;
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="container">
      <header className="header">
        <h2>ÁGUA VIVA</h2>
      </header>

      <div className="content">
        {/* INPUT ESCONDIDO */}
        <input
          type="file"
          id="fileInput"
          style={{ display: "none" }}
          onChange={handleUpload}
        />

        {/* BOTÃO DE UPLOAD */}
        <button
          className="upload-btn"
          onClick={() => document.getElementById("fileInput")?.click()}
        >
          ⬆️ Upload da Palavra
        </button>

        <h4 className="section-title">PALAVRAS:</h4>
        <p className="subtitle">Arquivos enviados da palavra da semana</p>

        {arquivos.length === 0 && (
          <p style={{ fontSize: "12px", color: "#999" }}>
            Nenhum arquivo enviado ainda.
          </p>
        )}

        {arquivos.map((item, index) => (
          <div key={index} className="file-item">
            <div>
              <strong>PALAVRAS</strong>
              <p>{item.nome}</p>
            </div>

            <button
              className="download"
              onClick={() => handleDownload(item.file)}
            >
              ⬇️
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
import { useEffect, useState } from "react";
import "./home.css";

type Arquivo = {
  nome: string;
  url: string;
};

function Home() {
  const [arquivos, setArquivos] = useState<Arquivo[]>([]);

  useEffect(() => {
    async function carregarArquivos() {
      const response = await fetch("/api/files");

      if (!response.ok) {
        console.error("Erro ao carregar arquivos");
        return;
      }

      const data = await response.json();
      setArquivos(data);
    }

    carregarArquivos();
  }, []);

  const handleUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const arrayBuffer = await file.arrayBuffer();

    const response = await fetch("/api/upload", {
      method: "POST",
      headers: {
        "Content-Type": file.type || "application/octet-stream",
        "x-filename": file.name,
      },
      body: arrayBuffer,
    });

    if (!response.ok) {
      alert("Erro ao enviar arquivo");
      return;
    }

    const data = await response.json();

    const novoArquivo: Arquivo = {
      nome: file.name,
      url: data.url,
    };

    setArquivos((prev) => [...prev, novoArquivo]);

    event.target.value = "";
  };

  return (
    <div className="container">
      <header className="header">
        <h2>ÁGUA VIVA</h2>
      </header>

      <div className="content">
        <input
          type="file"
          id="fileInput"
          style={{ display: "none" }}
          onChange={handleUpload}
        />

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
              onClick={() => window.open(item.url, "_blank")}
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
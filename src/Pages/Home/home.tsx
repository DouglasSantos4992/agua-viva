import { useEffect, useState } from "react";
import "./home.css";

type Arquivo = {
  nome: string;
  url: string;
  downloadUrl?: string;
};

function HomePublic() {
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

  // 📱 download (iPhone safe)
  const handleDownload = (item: Arquivo) => {
    const url = item.downloadUrl || item.url;
    window.location.href = url;
  };

  return (
    <div className="container">
      <header className="header">
        <h2 style={{color:'#fff'}}>ÁGUA VIVA</h2>
      </header>

      <div className="content">
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
              onClick={() => handleDownload(item)}
            >
              ⬇️
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePublic;
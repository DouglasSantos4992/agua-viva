import { useEffect, useState } from "react";
import "./home.css";

type Arquivo = {
  nome: string;
  url: string;
  downloadUrl?: string;
};

const USER = "admin";
const PASS = "1234";

function Home() {
  const [arquivos, setArquivos] = useState<Arquivo[]>([]);
  const [logged, setLogged] = useState(false);

  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");

  // 📥 LISTAR ARQUIVOS
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

  // 🔐 LOGIN
  const handleLogin = () => {
    if (user === USER && pass === PASS) {
      setLogged(true);
    } else {
      alert("Login inválido");
    }
  };

  // 📤 UPLOAD
  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
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
        const error = await response.json().catch(() => null);
        console.error("Erro upload:", error);
        alert("Erro ao enviar arquivo");
        return;
      }

      const data = await response.json();

      const novoArquivo: Arquivo = {
        nome: file.name,
        url: data.url,
        downloadUrl: data.downloadUrl,
      };

      setArquivos((prev) => [...prev, novoArquivo]);

      event.target.value = "";
    } catch (err) {
      console.error("Erro inesperado no upload:", err);
      alert("Erro inesperado no upload");
    }
  };

  // 📱 DOWNLOAD (iPhone safe)
  const handleDownload = (item: Arquivo) => {
    const url = item.downloadUrl || item.url;
    window.location.href = url;
  };

  // 🔐 TELA DE LOGIN
  if (!logged) {
    return (
      <div className="login">
        <h2>Login</h2>

        <input
          placeholder="Usuário"
          onChange={(e) => setUser(e.target.value)}
        />

        <input
          placeholder="Senha"
          type="password"
          onChange={(e) => setPass(e.target.value)}
        />

        <button onClick={handleLogin}>Entrar</button>
      </div>
    );
  }

  // 📱 APP PRINCIPAL
  return (
    <div className="container">
      <header className="header">
        <h2>ÁGUA VIVA</h2>
      </header>

      <div className="content">
        {/* UPLOAD SÓ PRA ADMIN */}
        {logged && (
          <>
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
          </>
        )}

        <h4 className="section-title">PALAVRAS:</h4>
        <p className="subtitle">
          Arquivos enviados da palavra da semana
        </p>

        {/* LISTA VAZIA */}
        {arquivos.length === 0 && (
          <p style={{ fontSize: "12px", color: "#999" }}>
            Nenhum arquivo enviado ainda.
          </p>
        )}

        {/* LISTA */}
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

export default Home;
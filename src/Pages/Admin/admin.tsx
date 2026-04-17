import { useEffect, useState } from "react";
import "./home.css";

type Arquivo = {
  nome: string;
  url: string;
  downloadUrl?: string;
};

const USER = "admin";
const PASS = "1234";

function Admin() {
  const [arquivos, setArquivos] = useState<Arquivo[]>([]);
  const [logged, setLogged] = useState(false);

  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");

  useEffect(() => {
    async function carregarArquivos() {
      const response = await fetch("/api/files");

      if (!response.ok) return;

      const data = await response.json();
      setArquivos(data);
    }

    carregarArquivos();
  }, []);

  // 🔐 login
  const handleLogin = () => {
    if (user === USER && pass === PASS) {
      setLogged(true);
    } else {
      alert("Login inválido");
    }
  };

  // 📤 upload
  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
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

    setArquivos((prev) => [
      ...prev,
      {
        nome: file.name,
        url: data.url,
        downloadUrl: data.downloadUrl,
      },
    ]);
  };

  // 🔐 tela login
  if (!logged) {
    return (
      <div className="login">
        <h2>Admin Login</h2>

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

  // 🔴 painel admin
  return (
    <div className="container">
      <header className="header">
        <h2>ADMIN - ÁGUA VIVA</h2>
      </header>

      <div className="content">
        {/* upload */}
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

        {arquivos.map((item, index) => (
          <div key={index} className="file-item">
            <div>
              <strong>PALAVRAS</strong>
              <p>{item.nome}</p>
            </div>

            <button
              className="download"
              onClick={() => {
                const url = item.downloadUrl || item.url;
                window.location.href = url;
              }}
            >
              ⬇️
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Admin;
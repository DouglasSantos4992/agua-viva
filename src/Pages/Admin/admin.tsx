import { useEffect, useState } from "react";
import "./admin.css";

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
      try {
        const response = await fetch("/api/files");

        if (!response.ok) return;

        const data = await response.json();
        setArquivos(data);
      } catch (error) {
        console.error("Erro ao carregar arquivos:", error);
      }
    }

    carregarArquivos();
  }, []);

  // LOGIN
  const handleLogin = () => {
    if (user === USER && pass === PASS) {
      setLogged(true);
    } else {
      alert("Login inválido");
    }
  };

  // UPLOAD
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
    } catch (error) {
      console.error("Erro no upload:", error);
      alert("Erro ao enviar arquivo");
    }
  };

  // LOGOUT
  const handleLogout = () => {
    setLogged(false);
    setUser("");
    setPass("");
  };

  // TELA LOGIN
  if (!logged) {
    return (
      <div className="login">
        <div className="login-box">
          <h2>Admin Login</h2>

          <input
            placeholder="Usuário"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />

          <input
            placeholder="Senha"
            type="password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />

          <button onClick={handleLogin}>Entrar</button>
        </div>
      </div>
    );
  }

  // PAINEL ADMIN
  return (
    <div className="container">
      <header className="header">
        <h2>ADMIN - ÁGUA VIVA</h2>
        <button className="logout-btn" onClick={handleLogout}>
          Sair
        </button>
      </header>

      <div className="content">
        <div className="panel">
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

          <h4 className="section-title">
            Arquivos enviados ({arquivos.length})
          </h4>

          {arquivos.length === 0 ? (
            <p className="empty-message">Nenhum arquivo enviado ainda.</p>
          ) : (
            arquivos.map((item, index) => (
              <div key={index} className="file-item">
                <div className="file-info">
                  <strong>PALAVRA</strong>
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
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Admin;
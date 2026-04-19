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

  const handleLogin = () => {
    if (user === USER && pass === PASS) {
      setLogged(true);
    } else {
      alert("Login inválido");
    }
  };

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

  const handleLogout = () => {
    setLogged(false);
    setUser("");
    setPass("");
  };

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
          <div className="toolbar">
            <h3>Gerenciar Arquivos</h3>

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
              + Upload
            </button>
          </div>

          <table className="file-table">
            <thead>
              <tr>
                <th>Arquivo</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>

            <tbody>
              {arquivos.map((item, index) => (
                <tr key={index}>
                  <td>{item.nome}</td>
                  <td>
                    <span className="status">Disponível</span>
                  </td>
                  <td>
                    <button
                      className="download-btn"
                      onClick={() => {
                        const url = item.downloadUrl || item.url;
                        window.location.href = url;
                      }}
                    >
                      Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {arquivos.length === 0 && (
            <p className="empty-message">Nenhum arquivo enviado ainda.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Admin;
import { useEffect, useState } from "react";
import {
  LoginWrapper,
  LoginBox,
  LoginTitle,
  Input,
  LoginButton,
  Container,
  Header,
  HeaderTitle,
  LogoutButton,
  Content,
  Panel,
  HiddenInput,
  UploadButton,
  SectionTitle,
  EmptyMessage,
  FileList,
  FileItem,
  FileInfo,
  FileLabel,
  FileName,
  DownloadButton,
} from "./admin.styled";
import type { Arquivo } from "./type";

const USER = "admin";
const PASS = "aguaviva@2026";

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
        setArquivos(data.slice(-5).reverse());
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
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        alert("Erro ao enviar arquivo");
        return;
      }

      const data = await response.json();

      setArquivos((prev) =>
        [
          {
            nome: file.name,
            url: data.url,
            downloadUrl: data.downloadUrl,
          },
          ...prev,
        ].slice(0, 5),
      );
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
      <LoginWrapper>
        <LoginBox>
          <LoginTitle>Admin Login</LoginTitle>

          <Input
            placeholder="Usuário"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />

          <Input
            placeholder="Senha"
            type="password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />

          <LoginButton onClick={handleLogin}>Entrar</LoginButton>
        </LoginBox>
      </LoginWrapper>
    );
  }

  return (
    <Container>
      <Header>
        <HeaderTitle>ADMIN - ÁGUA VIVA</HeaderTitle>
        <LogoutButton onClick={handleLogout}>Sair</LogoutButton>
      </Header>

      <Content>
        <Panel>
          <HiddenInput type="file" id="fileInput" onChange={handleUpload} />

          <UploadButton
            onClick={() => document.getElementById("fileInput")?.click()}
          >
            ⬆️ Upload da Palavra
          </UploadButton>

          <SectionTitle>Arquivos enviados ({arquivos.length})</SectionTitle>

          {arquivos.length === 0 ? (
            <EmptyMessage>Nenhum arquivo enviado ainda.</EmptyMessage>
          ) : (
            <FileList>
              {arquivos.map((item, index) => (
                <FileItem key={index}>
                  <FileInfo>
                    <FileLabel>Arquivo</FileLabel>
                    <FileName>{item.nome}</FileName>
                  </FileInfo>

                  <DownloadButton
                    onClick={() => {
                      const url = item.downloadUrl || item.url;

                      const link = document.createElement("a");
                      link.href = url;
                      link.download = item.nome;
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                    }}
                  >
                    ⬇
                  </DownloadButton>
                </FileItem>
              ))}
            </FileList>
          )}
        </Panel>
      </Content>
    </Container>
  );
}

export default Admin;

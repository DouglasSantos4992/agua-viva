import { useEffect, useState } from "react";
import {
  LoginWrapper,
  LoginBox,
  LoginLogo,
  LoginTitle,
  Input,
  LoginButton,
  Container,
  Header,
  HeaderContent,
  HeaderLogo,
  HeaderTitle,
  LogoutButton,
  Content,
  Panel,
  HiddenInput,
  UploadButton,
  UploadStatus,
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
import aguaVivaLogo from "../../assets/agua-viva-logo-branco.png";

const USER = "admin";
const PASS = "aguaviva@2026";

function Admin() {
  const [arquivos, setArquivos] = useState<Arquivo[]>([]);
  const [logged, setLogged] = useState(false);
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState("");

  useEffect(() => {
    async function carregarArquivos() {
      try {
        const response = await fetch("/api/files");
        if (!response.ok) return;

        const data = await response.json();
        setArquivos(data.slice(-5).reverse());
      } catch (error) {
        console.error("Erro ao carregar arquivos:", error);
      } finally {
        setIsLoading(false);
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
      setIsUploading(true);
      setUploadMessage("");

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

      setUploadMessage("Palavra enviada com sucesso.");
      event.target.value = "";
    } catch (error) {
      console.error("Erro no upload:", error);
      alert("Erro ao enviar arquivo");
    } finally {
      setIsUploading(false);
    }
  };

  const handleLogout = () => {
    setLogged(false);
    setUser("");
    setPass("");
    setUploadMessage("");
  };

  const handleDownload = async (item: Arquivo) => {
    const url = item.downloadUrl || item.url;

    const response = await fetch(url);
    const blob = await response.blob();

    const blobUrl = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = item.nome;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    window.URL.revokeObjectURL(blobUrl);
  };

  const renderFileContent = () => {
    if (isLoading) {
      return <EmptyMessage>Carregando arquivos...</EmptyMessage>;
    }

    if (arquivos.length === 0) {
      return <EmptyMessage>Nenhum arquivo enviado ainda.</EmptyMessage>;
    }

    return (
      <FileList>
        {arquivos.map((item, index) => (
          <FileItem key={index}>
            <FileInfo>
              <FileLabel>Arquivo</FileLabel>
              <FileName>{item.nome}</FileName>
            </FileInfo>

            <DownloadButton
              aria-label={`Baixar ${item.nome}`}
              title="Baixar arquivo"
              onClick={() => handleDownload(item)}
            />
          </FileItem>
        ))}
      </FileList>
    );
  };

  if (!logged) {
    return (
      <LoginWrapper>
        <LoginBox>
          <LoginLogo src={aguaVivaLogo} alt="Logo da Igreja Batista Água Viva" />
          <LoginTitle>Acesso administrativo</LoginTitle>

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

          <LoginButton type="button" onClick={handleLogin}>
            Entrar
          </LoginButton>
        </LoginBox>
      </LoginWrapper>
    );
  }

  return (
    <Container>
      <Header>
        <HeaderContent>
          <HeaderLogo src={aguaVivaLogo} alt="Logo da Igreja Batista Água Viva" />
          <HeaderTitle>Admin Água Viva</HeaderTitle>
          <LogoutButton type="button" onClick={handleLogout}>
            Sair
          </LogoutButton>
        </HeaderContent>
      </Header>

      <Content>
        <Panel>
          <HiddenInput type="file" id="fileInput" onChange={handleUpload} />

          <UploadButton
            type="button"
            disabled={isUploading}
            onClick={() => document.getElementById("fileInput")?.click()}
          >
            {isUploading ? "Enviando..." : "Enviar palavra"}
          </UploadButton>
          {uploadMessage && <UploadStatus>{uploadMessage}</UploadStatus>}

          <SectionTitle>Arquivos enviados ({arquivos.length})</SectionTitle>

          {renderFileContent()}
        </Panel>
      </Content>
    </Container>
  );
}

export default Admin;

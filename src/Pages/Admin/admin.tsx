import { useEffect, useState } from "react";
import {
  LoginWrapper,
  LoginBox,
  LoginLogo,
  LoginTitle,
  Input,
  PasswordField,
  PasswordToggle,
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
  FileMeta,
  FileName,
  FileActions,
  DownloadButton,
  DeleteButton,
} from "./admin.styled";
import type { Arquivo } from "../../types/arquivo";
import { DownloadIcon, TrashIcon, UploadIcon } from "../../components/FileIcons";
import { formatUploadDate, validateUploadFile } from "../../utils/files";
import aguaVivaLogo from "../../assets/agua-viva-logo-branco.png";

const TOKEN_STORAGE_KEY = "agua-viva-admin-token";

function Admin() {
  const [arquivos, setArquivos] = useState<Arquivo[]>([]);
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_STORAGE_KEY) || "");
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState("");
  const [loginMessage, setLoginMessage] = useState("");
  const [downloadingUrl, setDownloadingUrl] = useState("");
  const [deletingUrl, setDeletingUrl] = useState("");
  const logged = Boolean(token);

  useEffect(() => {
    async function carregarArquivos() {
      try {
        const response = await fetch("/api/files");
        if (!response.ok) return;

        const data = await response.json();
        setArquivos(data);
      } catch (error) {
        console.error("Erro ao carregar arquivos:", error);
      } finally {
        setIsLoading(false);
      }
    }

    carregarArquivos();
  }, []);

  const handleLogin = async () => {
    try {
      setIsLoggingIn(true);
      setLoginMessage("");

      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user,
          password: pass,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setLoginMessage(data.error || "Login inválido");
        return;
      }

      localStorage.setItem(TOKEN_STORAGE_KEY, data.token);
      setToken(data.token);
      setPass("");
      setShowPassword(false);
    } catch {
      setLoginMessage("Não foi possível entrar agora.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const validationMessage = validateUploadFile(file);

    if (validationMessage) {
      setUploadMessage(validationMessage);
      event.target.value = "";
      return;
    }

    try {
      setIsUploading(true);
      setUploadMessage("");

      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      const data = await response.json();

      if (!response.ok) {
        setUploadMessage(data.error || "Erro ao enviar arquivo");
        return;
      }

      setArquivos((prev) =>
        [
          {
            nome: data.nome,
            url: data.url,
            downloadUrl: data.downloadUrl,
            uploadedAt: data.uploadedAt,
          },
          ...prev,
        ].slice(0, 5),
      );

      setUploadMessage("Palavra enviada com sucesso.");
      event.target.value = "";
    } catch (error) {
      console.error("Erro no upload:", error);
      setUploadMessage("Erro ao enviar arquivo");
    } finally {
      setIsUploading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    setToken("");
    setUser("");
    setPass("");
    setShowPassword(false);
    setUploadMessage("");
    setLoginMessage("");
  };

  const handleDownload = async (item: Arquivo) => {
    try {
      const url = item.downloadUrl || item.url;
      setDownloadingUrl(url);

      const response = await fetch(url);

      if (!response.ok) {
        setUploadMessage("Não foi possível baixar o arquivo.");
        return;
      }

      const blob = await response.blob();

      const blobUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = item.nome;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      window.URL.revokeObjectURL(blobUrl);
    } catch {
      setUploadMessage("Não foi possível baixar o arquivo.");
    } finally {
      setDownloadingUrl("");
    }
  };

  const handleDelete = async (item: Arquivo) => {
    if (!confirm(`Excluir "${item.nome}"?`)) return;

    try {
      setDeletingUrl(item.url);
      setUploadMessage("");

      const response = await fetch("/api/delete", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: item.url }),
      });
      const data = await response.json();

      if (!response.ok) {
        setUploadMessage(data.error || "Erro ao excluir arquivo");
        return;
      }

      setArquivos((prev) => prev.filter((arquivo) => arquivo.url !== item.url));
      setUploadMessage("Arquivo excluído com sucesso.");
    } catch {
      setUploadMessage("Erro ao excluir arquivo");
    } finally {
      setDeletingUrl("");
    }
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
                {item.uploadedAt && (
                  <FileMeta>Enviado em {formatUploadDate(item.uploadedAt)}</FileMeta>
                )}
              </FileInfo>

              <FileActions>
                <DownloadButton
                  aria-label={`Baixar ${item.nome}`}
                  title="Baixar arquivo"
                  disabled={downloadingUrl === (item.downloadUrl || item.url)}
                  onClick={() => handleDownload(item)}
                >
                  <DownloadIcon />
                </DownloadButton>
                <DeleteButton
                  aria-label={`Excluir ${item.nome}`}
                  title="Excluir arquivo"
                  disabled={deletingUrl === item.url}
                  onClick={() => handleDelete(item)}
                >
                  <TrashIcon />
                </DeleteButton>
              </FileActions>
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

          <PasswordField>
            <Input
              placeholder="Senha"
              type={showPassword ? "text" : "password"}
              value={pass}
              onChange={(e) => setPass(e.target.value)}
            />
            <PasswordToggle
              type="button"
              $visible={showPassword}
              aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
              title={showPassword ? "Ocultar senha" : "Mostrar senha"}
              onClick={() => setShowPassword((prev) => !prev)}
            >
              <span aria-hidden="true" />
            </PasswordToggle>
          </PasswordField>
          {loginMessage && <UploadStatus $tone="error">{loginMessage}</UploadStatus>}

          <LoginButton type="button" disabled={isLoggingIn} onClick={handleLogin}>
            {isLoggingIn ? "Entrando..." : "Entrar"}
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
          <HiddenInput
            type="file"
            id="fileInput"
            accept=".pdf,.doc,.docx,.mp3,.m4a"
            onChange={handleUpload}
          />

          <UploadButton
            type="button"
            disabled={isUploading}
            onClick={() => document.getElementById("fileInput")?.click()}
          >
            <UploadIcon />
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

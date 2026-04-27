import { useEffect, useState } from "react";
import {
  Container,
  Header,
  HeaderContent,
  LogoImage,
  HeaderText,
  Title,
  HeaderSubtitle,
  Content,
  SectionHeader,
  SectionTitle,
  Subtitle,
  EmptyMessage,
  FileList,
  FileItem,
  FileInfo,
  FileLabel,
  FileName,
  FileMeta,
  DownloadButton,
} from "./home.styled";
import type { Arquivo } from "../../types/arquivo";
import { DownloadIcon } from "../../components/FileIcons";
import { formatUploadDate } from "../../utils/files";
import aguaVivaLogo from "../../assets/agua-viva-logo-branco.png";

function HomePublic() {
  const [arquivos, setArquivos] = useState<Arquivo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [downloadingUrl, setDownloadingUrl] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function carregarArquivos() {
      try {
        const response = await fetch("/api/files");

        if (!response.ok) {
          console.error("Erro ao carregar arquivos");
          return;
        }

        const data = await response.json();
        setArquivos(data);
      } catch {
        setMessage("Não foi possível carregar as palavras agora.");
      } finally {
        setIsLoading(false);
      }
    }

    carregarArquivos();
  }, []);

  const handleDownload = async (item: Arquivo) => {
    try {
      const url = item.downloadUrl || item.url;
      setDownloadingUrl(url);
      setMessage("");

      const response = await fetch(url);

      if (!response.ok) {
        setMessage("Não foi possível baixar o arquivo.");
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
      setMessage("Não foi possível baixar o arquivo.");
    } finally {
      setDownloadingUrl("");
    }
  };

  const renderContent = () => {
    if (isLoading) {
      return <EmptyMessage>Carregando palavras...</EmptyMessage>;
    }

    if (arquivos.length === 0) {
      return <EmptyMessage>Nenhuma palavra enviada ainda.</EmptyMessage>;
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

            <DownloadButton
              aria-label={`Baixar ${item.nome}`}
              title="Baixar arquivo"
              disabled={downloadingUrl === (item.downloadUrl || item.url)}
              onClick={() => handleDownload(item)}
            >
              <DownloadIcon />
            </DownloadButton>
          </FileItem>
        ))}
      </FileList>
    );
  };

  return (
    <Container>
      <Header>
        <HeaderContent>
          <LogoImage src={aguaVivaLogo} alt="Logo da Igreja Batista Água Viva" />

          <HeaderText>
            <Title>ÁGUA VIVA</Title>
            <HeaderSubtitle>Palavras, mensagens e estudos da semana</HeaderSubtitle>
          </HeaderText>
        </HeaderContent>
      </Header>

      <Content>
        <SectionHeader>
          <SectionTitle>Palavras recentes</SectionTitle>
          <Subtitle>Arquivos enviados da palavra da semana</Subtitle>
        </SectionHeader>

        {message && <EmptyMessage>{message}</EmptyMessage>}
        {renderContent()}
      </Content>
    </Container>
  );
}

export default HomePublic;

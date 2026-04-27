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
  DownloadButton,
} from "./home.styled";
import type { Arquivo } from "./type";
import aguaVivaLogo from "../../assets/agua-viva-logo-branco.png";

function HomePublic() {
  const [arquivos, setArquivos] = useState<Arquivo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function carregarArquivos() {
      try {
        const response = await fetch("/api/files");

        if (!response.ok) {
          console.error("Erro ao carregar arquivos");
          return;
        }

        const data = await response.json();
        setArquivos(data.slice(-5).reverse());
      } finally {
        setIsLoading(false);
      }
    }

    carregarArquivos();
  }, []);

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

        {renderContent()}
      </Content>
    </Container>
  );
}

export default HomePublic;

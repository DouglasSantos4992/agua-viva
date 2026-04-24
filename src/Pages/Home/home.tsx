import { useEffect, useState } from "react";
import {
  Container,
  Header,
  Title,
  Content,
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
      setArquivos(data.slice(-5).reverse());
    }

    carregarArquivos();
  }, []);

  const handleDownload = (item: Arquivo) => {
  const url = item.downloadUrl || item.url;

  const link = document.createElement("a");
  link.href = url;
  link.download = item.nome;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};;

  return (
    <Container>
      <Header>
        <Title>ÁGUA VIVA</Title>
      </Header>

      <Content>
        <SectionTitle>PALAVRAS:</SectionTitle>
        <Subtitle>Arquivos enviados da palavra da semana</Subtitle>

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

                <DownloadButton onClick={() => handleDownload(item)}>
                  ⬇
                </DownloadButton>
              </FileItem>
            ))}
          </FileList>
        )}
      </Content>
    </Container>
  );
}

export default HomePublic;
import styled from "styled-components";

export const Container = styled.div`
  background: #fff;
  min-height: 100vh;
  margin: 0;
  font-family: Arial, sans-serif;
`;

export const Header = styled.header`
  background: #0b1a33;
  padding: 15px;
  text-align: center;
`;

export const Title = styled.h2`
  color: #fff;
  margin: 0;
`;

export const Content = styled.div`
  padding: 20px;
`;

export const SectionTitle = styled.h4`
  margin-top: 25px;
`;

export const Subtitle = styled.p`
  font-size: 12px;
  color: #666;
`;

export const EmptyMessage = styled.p`
  color: #666;
  font-size: 14px;
`;

export const FileList = styled.div`
  margin-top: 10px;
`;

export const FileItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #ddd;
  padding: 20px 0;
`;

export const FileInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const FileLabel = styled.span`
  font-size: 14px;
  font-weight: bold;
`;

export const FileName = styled.span`
  font-size: 12px;
  color: #333;
  margin-top: 2px;
`;

export const DownloadButton = styled.button`
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
`;
import styled from "styled-components";

export const LoginWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #081426, #102542);
`;

export const LoginBox = styled.div`
  width: 350px;
  background: white;
  padding: 35px;
  border-radius: 18px;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.25);
`;

export const LoginTitle = styled.h2`
  text-align: center;
  color: #102542;
  margin-bottom: 25px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 14px;
  margin-bottom: 15px;
  border: 1px solid #d6dce5;
  border-radius: 10px;
  font-size: 14px;
  box-sizing: border-box;
`;

export const LoginButton = styled.button`
  width: 100%;
  padding: 14px;
  border: none;
  background: #d32f2f;
  color: white;
  font-weight: bold;
  border-radius: 10px;
  cursor: pointer;
`;

export const Container = styled.div`
  min-height: 100vh;
  background: #eef2f7;
`;

export const Header = styled.header`
  background: linear-gradient(90deg, #081426, #102542);
  color: white;
  padding: 25px;
  text-align: center;
`;

export const HeaderTitle = styled.h2`
  margin: 0;
`;

export const LogoutButton = styled.button`
  margin-top: 10px;
  padding: 10px 18px;
  border: none;
  background: white;
  color: #102542;
  font-weight: bold;
  border-radius: 8px;
  cursor: pointer;
`;

export const Content = styled.div`
  max-width: 900px;
  margin: 35px auto;
  padding: 30px;
`;

export const Panel = styled.div`
  background: white;
  padding: 30px;
  border-radius: 18px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
`;

export const HiddenInput = styled.input`
  display: none;
`;

export const UploadButton = styled.button`
  width: 100%;
  padding: 15px;
  background: linear-gradient(90deg, #d32f2f, #b71c1c);
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 12px;
  cursor: pointer;
`;

export const SectionTitle = styled.h4`
  margin: 30px 0 20px;
  color: #102542;
  font-size: 20px;
  text-align: center;
`;

export const EmptyMessage = styled.p`
  text-align: center;
  color: #777;
`;

export const FileList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

export const FileItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 20px;
  border-radius: 12px;
  background: #f9fbfd;
  border: 1px solid #dce3ec;
`;

export const FileInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const FileLabel = styled.span`
  font-size: 12px;
  font-weight: bold;
  color: #7a8797;
  margin-bottom: 4px;
  text-transform: uppercase;
`;

export const FileName = styled.span`
  font-size: 14px;
  color: #102542;
  font-weight: 600;
`;

export const DownloadButton = styled.button`
  min-width: 46px;
  height: 46px;
  border: none;
  border-radius: 10px;
  background: linear-gradient(135deg, #102542, #081426);
  color: white;
  cursor: pointer;
  font-size: 18px;
`;
import styled from "styled-components";

export const LoginWrapper = styled.div`
  min-height: 100dvh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 24px;
  box-sizing: border-box;
  background:
    radial-gradient(circle at top left, rgba(16, 179, 213, 0.24), transparent 34rem),
    linear-gradient(135deg, #06111f, #0b2140 58%, #0a355d);

  @media (max-width: 640px) {
    align-items: center;
    padding: 18px;
    background:
      radial-gradient(circle at top center, rgba(16, 179, 213, 0.22), transparent 18rem),
      linear-gradient(180deg, #06111f, #0b2140 62%, #0a355d);
  }
`;

export const LoginBox = styled.div`
  width: min(390px, 100%);
  background: rgba(255, 255, 255, 0.96);
  padding: 36px;
  border: 1px solid rgba(103, 200, 231, 0.22);
  border-radius: 8px;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.3);

  @media (max-width: 480px) {
    padding: 24px;
  }
`;

export const LoginLogo = styled.img`
  display: block;
  width: 82px;
  aspect-ratio: 1;
  object-fit: contain;
  margin: 0 auto 16px;
  padding: 12px;
  box-sizing: border-box;
  border-radius: 999px;
  background: linear-gradient(135deg, #06111f, #0b2140);
  box-shadow: 0 12px 24px rgba(6, 17, 31, 0.24);

  @media (max-width: 480px) {
    width: 72px;
    padding: 10px;
    margin-bottom: 14px;
  }
`;

export const LoginTitle = styled.h2`
  text-align: center;
  color: #071b30;
  margin: 0 0 26px;
  font-size: 26px;
  font-weight: 800;
  letter-spacing: 0;

  @media (max-width: 480px) {
    margin-bottom: 22px;
    font-size: 24px;
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 14px;
  margin-bottom: 15px;
  border: 1px solid #c9e3ee;
  border-radius: 8px;
  background: #f6fbfd;
  color: #0a1f33;
  font-size: 14px;
  box-sizing: border-box;
  outline: none;
  transition:
    border-color 180ms ease,
    box-shadow 180ms ease,
    background 180ms ease;

  &::placeholder {
    color: #6c879c;
  }

  &:focus {
    border-color: #13c3e6;
    background: #fff;
    box-shadow: 0 0 0 4px rgba(19, 195, 230, 0.14);
  }
`;

export const LoginButton = styled.button`
  width: 100%;
  min-height: 52px;
  padding: 14px;
  border: none;
  background: linear-gradient(135deg, #0369a1 0%, #0284c7 48%, #0891b2 100%);
  color: white;
  font-size: 15px;
  font-weight: bold;
  border-radius: 8px;
  cursor: pointer;
  box-shadow:
    0 14px 26px rgba(3, 105, 161, 0.28),
    inset 0 1px 0 rgba(255, 255, 255, 0.24);
  transition:
    transform 180ms ease,
    box-shadow 180ms ease,
    background 180ms ease;

  &:hover {
    transform: translateY(-1px);
    background: linear-gradient(135deg, #075985 0%, #0369a1 48%, #0284c7 100%);
    box-shadow:
      0 18px 34px rgba(3, 105, 161, 0.38),
      inset 0 1px 0 rgba(255, 255, 255, 0.22);
  }

  &:active {
    transform: translateY(0);
    box-shadow:
      0 10px 20px rgba(3, 105, 161, 0.28),
      inset 0 2px 6px rgba(1, 38, 69, 0.18);
  }
`;

export const Container = styled.div`
  min-height: 100dvh;
  background:
    radial-gradient(circle at top left, rgba(16, 179, 213, 0.2), transparent 30rem),
    linear-gradient(180deg, #06111f 0%, #0b2140 30%, #eef7fb 30%, #f8fbfd 100%);
  color: #0a1f33;

  @media (max-width: 640px) {
    background:
      radial-gradient(circle at top center, rgba(16, 179, 213, 0.22), transparent 18rem),
      linear-gradient(180deg, #06111f 0%, #0b2140 34%, #eef7fb 34%, #f8fbfd 100%);
  }
`;

export const Header = styled.header`
  color: white;
  padding: 30px 24px 72px;
  text-align: center;

  @media (max-width: 640px) {
    padding: 28px 18px 54px;
  }
`;

export const HeaderContent = styled.div`
  width: min(920px, 100%);
  margin: 0 auto;
  display: grid;
  justify-items: center;
  gap: 10px;
`;

export const HeaderLogo = styled.img`
  width: 78px;
  aspect-ratio: 1;
  object-fit: contain;
  padding: 10px;
  box-sizing: border-box;
  border-radius: 999px;
  border: 1px solid rgba(201, 239, 251, 0.2);
  background:
    radial-gradient(circle at center, rgba(19, 195, 230, 0.18), transparent 64%),
    rgba(255, 255, 255, 0.04);
  filter: drop-shadow(0 14px 24px rgba(0, 0, 0, 0.24));

  @media (max-width: 640px) {
    width: 68px;
    padding: 9px;
  }
`;

export const HeaderTitle = styled.h2`
  margin: 0;
  color: #fff;
  font-size: clamp(26px, 4vw, 40px);
  font-weight: 800;
  letter-spacing: 0;

  @media (max-width: 640px) {
    font-size: 28px;
  }
`;

const headerActionStyles = `
  min-height: 44px;
  padding: 10px 18px;
  border: 1px solid rgba(201, 239, 251, 0.42);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  color: #e8f9fd;
  font-weight: bold;
  cursor: pointer;
  box-sizing: border-box;
  transition:
    background 180ms ease,
    border-color 180ms ease;

  &:hover {
    border-color: rgba(201, 239, 251, 0.74);
    background: rgba(255, 255, 255, 0.16);
  }
`;

export const LogoutButton = styled.button`
  ${headerActionStyles}
  margin-top: 8px;

  @media (max-width: 640px) {
    margin-top: 2px;
  }
`;

export const Content = styled.div`
  width: min(920px, calc(100% - 32px));
  margin: -42px auto 0;
  padding-bottom: 44px;

  @media (max-width: 640px) {
    width: calc(100% - 28px);
    margin-top: -28px;
    padding-bottom: 28px;
  }
`;

export const Panel = styled.div`
  background: #fff;
  padding: 42px 40px 34px;
  border: 1px solid rgba(42, 118, 171, 0.14);
  border-radius: 8px;

  @media (max-width: 640px) {
    padding: 20px;
  }
`;

export const HiddenInput = styled.input`
  display: none;
`;

export const UploadButton = styled.button`
  width: 100%;
  min-height: 54px;
  padding: 14px 18px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  background: linear-gradient(135deg, #0369a1 0%, #0284c7 48%, #0891b2 100%);
  color: white;
  font-size: 15px;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  box-shadow:
    0 14px 26px rgba(3, 105, 161, 0.24),
    inset 0 1px 0 rgba(255, 255, 255, 0.24);
  margin-bottom: 2px;
  transition:
    transform 180ms ease,
    box-shadow 180ms ease,
    background 180ms ease;

  &:hover {
    transform: translateY(-1px);
    background: linear-gradient(135deg, #075985 0%, #0369a1 48%, #0284c7 100%);
    box-shadow:
      0 18px 34px rgba(3, 105, 161, 0.34),
      inset 0 1px 0 rgba(255, 255, 255, 0.22);
  }

  &:active {
    transform: translateY(0);
    box-shadow:
      0 10px 20px rgba(3, 105, 161, 0.24),
      inset 0 2px 6px rgba(1, 38, 69, 0.18);
  }

  &:disabled {
    cursor: wait;
    opacity: 0.82;
    transform: none;
  }

  &::before {
    content: "↑";
    width: 24px;
    height: 24px;
    display: inline-grid;
    place-items: center;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.18);
    color: #fff;
    font-size: 17px;
    line-height: 1;
    font-weight: 900;
  }

  @media (max-width: 640px) {
    min-height: 50px;
    font-size: 14px;
  }
`;

export const UploadStatus = styled.p`
  margin-top: 12px;
  padding: 12px 14px;
  border: 1px solid #b8e4f0;
  border-radius: 8px;
  background: #effafe;
  color: #075985;
  font-size: 14px;
  font-weight: 700;
  text-align: center;
`;

export const SectionTitle = styled.h4`
  margin: 30px 0 20px;
  color: #071b30;
  font-size: 22px;
  font-weight: 800;
  text-align: left;
  letter-spacing: 0;

  @media (max-width: 640px) {
    margin: 26px 0 16px;
    font-size: 21px;
  }
`;

export const EmptyMessage = styled.p`
  padding: 24px;
  border: 1px dashed #9ccbe0;
  border-radius: 8px;
  background: #f1f9fc;
  text-align: center;
  color: #52708b;

  @media (max-width: 640px) {
    padding: 24px 18px;
    font-size: 14px;
  }
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
  gap: 18px;
  padding: 18px;
  border-radius: 8px;
  background: #fbfdfe;
  border: 1px solid #d8ebf3;
  transition:
    border-color 180ms ease,
    background 180ms ease;

  &:hover {
    border-color: #67c8e7;
    background: #f6fbfd;
  }

  @media (max-width: 640px) {
    align-items: flex-start;
    padding: 16px;
  }
`;

export const FileInfo = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
`;

export const FileLabel = styled.span`
  width: fit-content;
  padding: 4px 9px;
  border-radius: 999px;
  background: #dff6fd;
  color: #0a6d94;
  font-size: 11px;
  font-weight: bold;
  margin-bottom: 4px;
  text-transform: uppercase;
`;

export const FileName = styled.span`
  margin-top: 5px;
  font-size: 16px;
  color: #0a1f33;
  font-weight: 700;
  line-height: 1.35;
  overflow-wrap: anywhere;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
`;

export const DownloadButton = styled.button`
  width: 46px;
  height: 46px;
  flex: 0 0 46px;
  display: inline-grid;
  place-items: center;
  border: none;
  border-radius: 999px;
  background: linear-gradient(135deg, #0369a1 0%, #0284c7 48%, #0891b2 100%);
  color: white;
  cursor: pointer;
  box-shadow:
    0 12px 22px rgba(3, 105, 161, 0.22),
    inset 0 1px 0 rgba(255, 255, 255, 0.24);
  transition:
    transform 180ms ease,
    box-shadow 180ms ease,
    background 180ms ease;

  &:hover {
    transform: translateY(-1px);
    background: linear-gradient(135deg, #075985 0%, #0369a1 48%, #0284c7 100%);
    box-shadow:
      0 16px 28px rgba(3, 105, 161, 0.3),
      inset 0 1px 0 rgba(255, 255, 255, 0.22);
  }

  &:active {
    transform: translateY(0);
    box-shadow:
      0 8px 16px rgba(3, 105, 161, 0.22),
      inset 0 2px 6px rgba(1, 38, 69, 0.18);
  }

  &::before {
    content: "↓";
    color: #fff;
    font-size: 22px;
    font-weight: 900;
    line-height: 1;
  }

  @media (max-width: 640px) {
    width: 44px;
    height: 44px;
    flex-basis: 44px;
  }
`;

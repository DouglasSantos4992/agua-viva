import styled from "styled-components";

export const Container = styled.div`
  min-height: 100dvh;
  margin: 0;
  overflow: hidden;
  background:
    radial-gradient(circle at top left, rgba(16, 179, 213, 0.24), transparent 34rem),
    linear-gradient(180deg, #06111f 0%, #0b2140 42%, #eef7fb 42%, #f8fbfd 100%);
  color: #0a1f33;
  font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  text-align: left;

  @media (max-width: 640px) {
    background:
      radial-gradient(circle at top center, rgba(16, 179, 213, 0.26), transparent 18rem),
      linear-gradient(180deg, #06111f 0%, #0b2140 38%, #eef7fb 38%, #f8fbfd 100%);
  }
`;

export const Header = styled.header`
  padding: 48px 22px 74px;
  color: #fff;

  @media (max-width: 640px) {
    padding: 34px 18px 58px;
  }
`;

export const HeaderContent = styled.div`
  width: min(920px, 100%);
  margin: 0 auto;
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  gap: 28px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    justify-items: center;
    gap: 16px;
    text-align: center;
  }
`;

export const LogoImage = styled.img`
  width: clamp(120px, 22vw, 178px);
  aspect-ratio: 1;
  object-fit: contain;
  padding: 18px;
  box-sizing: border-box;
  border-radius: 999px;
  border: 1px solid rgba(201, 239, 251, 0.22);
  background:
    radial-gradient(circle at center, rgba(19, 195, 230, 0.18), transparent 64%),
    rgba(255, 255, 255, 0.04);
  filter: drop-shadow(0 18px 32px rgba(0, 0, 0, 0.28));
  box-shadow: 0 0 0 8px rgba(21, 108, 180, 0.2);

  @media (max-width: 640px) {
    width: 112px;
    padding: 16px;
    box-shadow: 0 0 0 7px rgba(21, 108, 180, 0.22);
  }
`;

export const HeaderText = styled.div`
  max-width: 560px;
`;

export const Title = styled.h2`
  color: #fff;
  margin: 0;
  font-size: clamp(36px, 7vw, 70px);
  line-height: 0.95;
  font-weight: 800;
  letter-spacing: 0;

  @media (max-width: 640px) {
    font-size: 34px;
  }
`;

export const HeaderSubtitle = styled.p`
  max-width: 430px;
  margin-top: 14px;
  color: #c9effb;
  font-size: clamp(16px, 2.5vw, 20px);
  line-height: 1.45;

  @media (max-width: 640px) {
    margin-inline: auto;
    max-width: 320px;
    font-size: 15px;
  }
`;

export const Content = styled.div`
  width: min(920px, calc(100% - 32px));
  margin: -40px auto 0;
  padding: 32px;
  box-sizing: border-box;
  border: 1px solid rgba(42, 118, 171, 0.14);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.94);
  box-shadow: 0 16px 44px rgba(6, 17, 31, 0.1);

  @media (max-width: 640px) {
    width: calc(100% - 28px);
    margin-top: -28px;
    padding: 20px;
    background: #fff;
    box-shadow: none;
  }
`;

export const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 18px;
  margin-bottom: 22px;

  @media (max-width: 640px) {
    display: block;
  }
`;

export const SectionTitle = styled.h4`
  margin: 0;
  color: #071b30;
  font-size: clamp(24px, 4vw, 34px);
  line-height: 1.05;
  font-weight: 800;
  letter-spacing: 0;

  @media (max-width: 640px) {
    font-size: 24px;
  }
`;

export const Subtitle = styled.p`
  max-width: 310px;
  color: #52708b;
  font-size: 14px;
  line-height: 1.45;

  @media (max-width: 640px) {
    margin-top: 8px;
    font-size: 13px;
  }
`;

export const EmptyMessage = styled.p`
  padding: 26px;
  border: 1px dashed #9ccbe0;
  border-radius: 8px;
  background: #f1f9fc;
  color: #52708b;
  font-size: 15px;
  text-align: center;

  @media (max-width: 640px) {
    padding: 24px 18px;
    font-size: 14px;
  }
`;

export const FileList = styled.div`
  display: grid;
  gap: 14px;
`;

export const FileItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 18px;
  padding: 18px;
  border: 1px solid #d8ebf3;
  border-radius: 8px;
  background: #fbfdfe;
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
  font-weight: 800;
  line-height: 1;
  text-transform: uppercase;
`;

export const FileName = styled.span`
  margin-top: 9px;
  color: #0a1f33;
  font-size: 16px;
  font-weight: 700;
  line-height: 1.35;
  overflow-wrap: anywhere;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
`;

export const FileMeta = styled.span`
  margin-top: 7px;
  color: #66839a;
  font-size: 13px;
  font-weight: 600;
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
  color: #fff;
  cursor: pointer;
  box-shadow:
    0 12px 22px rgba(3, 105, 161, 0.24),
    inset 0 1px 0 rgba(255, 255, 255, 0.24);
  transition:
    transform 180ms ease,
    box-shadow 180ms ease,
    background 180ms ease;

  &:hover {
    transform: translateY(-1px);
    background: linear-gradient(135deg, #075985 0%, #0369a1 48%, #0284c7 100%);
    box-shadow:
      0 16px 28px rgba(3, 105, 161, 0.32),
      inset 0 1px 0 rgba(255, 255, 255, 0.22);
  }

  &:active {
    transform: translateY(0);
    box-shadow:
      0 8px 16px rgba(3, 105, 161, 0.24),
      inset 0 2px 6px rgba(1, 38, 69, 0.18);
  }

  &:disabled {
    cursor: wait;
    opacity: 0.72;
    transform: none;
  }

  svg {
    width: 23px;
    height: 23px;
    color: #fff;
  }

  @media (max-width: 640px) {
    width: 44px;
    height: 44px;
    flex-basis: 44px;
  }
`;

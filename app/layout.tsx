import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "진정한 | UI/UX Designer",
  description: "UI/UX 디자이너 진정한의 제품 디자인 포트폴리오",
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}

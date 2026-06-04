import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://jeonghan.design"),
  title: {
    default: "진정한 | UI/UX Designer",
    template: "%s | 진정한",
  },
  description:
    "복잡한 문제를 또렷한 인터페이스로 설계하는 UI/UX 디자이너 진정한의 제품 디자인 포트폴리오. 금융·헬스케어·커머스 제품의 리서치부터 디자인 시스템까지.",
  keywords: [
    "UI 디자이너",
    "UX 디자이너",
    "프로덕트 디자이너",
    "제품 디자인",
    "디자인 시스템",
    "포트폴리오",
    "진정한",
    "Jeong Han",
  ],
  authors: [{ name: "진정한 (Jeong Han)" }],
  creator: "진정한 (Jeong Han)",
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: "진정한 — UI/UX Designer",
    title: "진정한 | UI/UX Designer",
    description:
      "복잡한 문제를 또렷한 인터페이스로 설계합니다. 리서치부터 디자인 시스템까지 연결하는 제품 디자인 포트폴리오.",
  },
  twitter: {
    card: "summary_large_image",
    title: "진정한 | UI/UX Designer",
    description: "복잡한 문제를 또렷한 인터페이스로 설계합니다.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

type RootLayoutProps = {
  children: React.ReactNode;
};

// Set the theme before first paint to avoid a flash of the wrong colors.
const themeScript = `(function(){var d=document.documentElement;try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}d.setAttribute('data-theme',t);}catch(e){d.setAttribute('data-theme','light');}try{if('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches){d.classList.add('reveal-ready');}}catch(e){}})();`;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&display=swap"
        />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}

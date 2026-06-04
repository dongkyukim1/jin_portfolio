import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "진정한 | UI/UX Designer",
  description: "복잡한 문제를 또렷한 인터페이스로 설계하는 UI/UX 디자이너 진정한의 제품 디자인 포트폴리오",
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

"use client";

import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Copy,
  Mail,
  Menu,
  Moon,
  Sun,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

const EMAIL = "hello@jeonghan.design";

const cases = {
  finance: {
    category: "research",
    kicker: "Fintech Onboarding",
    title: "신규 사용자의 첫 송금 여정 리디자인",
    year: "2025",
    role_short: "Lead Product Designer",
    summary:
      "복잡한 인증과 계좌 연결 단계를 사용자 의도 중심으로 재배치해 첫 송금까지의 심리적 부담을 줄인 프로젝트입니다.",
    metrics: ["가입 완료율 +28%", "문의 전환 -17%", "8주"],
    problem:
      "약관 동의, 본인 인증, 계좌 연결이 서로 다른 맥락으로 분리되어 신규 사용자가 현재 단계의 이유를 이해하기 어려웠습니다.",
    role:
      "사용자 인터뷰 12건과 퍼널 로그를 바탕으로 핵심 이탈 지점을 정의하고, IA 재정리, 프로토타입 테스트, 최종 UI를 리드했습니다.",
    result:
      "4단계 온보딩 구조와 단계별 안심 문구를 적용해 가입 완료율을 높이고 고객센터 문의를 줄였습니다.",
    visual: "visual-finance",
  },
  health: {
    category: "product",
    kicker: "Healthcare Dashboard",
    title: "진료 운영팀을 위한 업무 대시보드",
    year: "2024",
    role_short: "Product Designer",
    summary:
      "운영자가 예약 상태, 문진 누락, 후속 안내 대상을 빠르게 판단할 수 있도록 업무 화면을 재구성했습니다.",
    metrics: ["처리시간 -34%", "오류 리포트 -22%", "10주"],
    problem:
      "진료 전후 업무가 여러 탭과 스프레드시트에 흩어져 있어 담당자가 같은 환자 상태를 반복 확인해야 했습니다.",
    role:
      "현장 관찰과 이해관계자 워크숍을 진행하고, 상태 모델, 대시보드 우선순위, 예외 케이스 UI를 설계했습니다.",
    result:
      "당일 처리 대상과 위험 상태가 한 화면에서 드러나도록 바꾸어 반복 확인 시간을 줄이고 인수인계를 단순화했습니다.",
    visual: "visual-health",
  },
  commerce: {
    category: "system",
    kicker: "Commerce Search",
    title: "검색 결과와 필터 컴포넌트 시스템",
    year: "2024",
    role_short: "Design System Lead",
    summary:
      "모바일 검색 경험의 핵심 패턴을 디자인 토큰과 컴포넌트 상태로 정리해 여러 카테고리 화면에 재사용했습니다.",
    metrics: ["검색 전환율 +19%", "UI 제작시간 -31%", "6주"],
    problem:
      "카테고리마다 필터, 정렬, 품절 상태가 다르게 구현되어 사용자는 일관성을 잃고 팀은 매번 화면을 새로 만들었습니다.",
    role:
      "검색 여정 맵을 기준으로 필터 구조를 통합하고, 토큰, 컴포넌트 상태, QA 체크리스트를 디자인 시스템에 반영했습니다.",
    result:
      "탐색 패턴이 일관되어 전환율이 상승했고, 신규 카테고리 화면 제작 속도가 빨라졌습니다.",
    visual: "visual-commerce",
  },
} as const;

type CaseId = keyof typeof cases;
type Filter = "all" | (typeof cases)[CaseId]["category"];

const filters: { label: string; value: Filter }[] = [
  { label: "전체", value: "all" },
  { label: "UX 리서치", value: "research" },
  { label: "제품 전략", value: "product" },
  { label: "UI 시스템", value: "system" },
];

const navItems: { label: string; id: string }[] = [
  { label: "Work", id: "work" },
  { label: "Process", id: "process" },
  { label: "About", id: "about" },
  { label: "Skills", id: "capabilities" },
  { label: "Contact", id: "contact" },
];

const disciplines = [
  "Product Strategy",
  "User Research",
  "Interaction Design",
  "Design System",
  "Prototyping",
  "Usability Testing",
];

const stats: { value: number; suffix: string; label: string }[] = [
  { value: 6, suffix: "년", label: "제품 디자인 경험" },
  { value: 14, suffix: "개", label: "출시 프로젝트" },
  { value: 3, suffix: "단계", label: "리서치 · 설계 · 검증" },
];

const processSteps: [string, string, string][] = [
  ["01", "맥락 수집", "로그, 인터뷰, VOC를 함께 보고 실제 의사결정 순간을 찾습니다."],
  ["02", "흐름 설계", "사용자의 목표와 제품 제약을 맞춰 정보 구조와 주요 상태를 만듭니다."],
  ["03", "인터랙션 정교화", "프로토타입과 디자인 시스템을 오가며 반복 가능한 패턴으로 다듬습니다."],
  ["04", "출시 검증", "실험 지표와 사용성 피드백을 연결해 다음 개선 항목을 정합니다."],
];

const aboutFacts: [string, string][] = [
  ["경력", "6년 · 제품 디자인"],
  ["기반", "Seoul, KR · 원격 협업"],
  ["협업", "PM · 개발 · 데이터 분석"],
  ["도메인", "금융 · 헬스케어 · 커머스"],
];

const capabilities: { label: string; count: string; items: string[] }[] = [
  {
    label: "Design",
    count: "05",
    items: ["UI 디자인", "인터랙션 디자인", "디자인 시스템", "프로토타이핑", "정보 구조 설계"],
  },
  {
    label: "Research",
    count: "05",
    items: ["사용자 인터뷰", "사용성 테스트", "저니 매핑", "퍼널 · 로그 분석", "A/B 테스트"],
  },
  {
    label: "Tools",
    count: "05",
    items: ["Figma", "ProtoPie", "Framer", "Amplitude", "Notion"],
  },
];

const testimonials: { quote: string; name: string; role: string }[] = [
  {
    quote:
      "복잡한 요구사항을 빠르게 구조로 정리해줘서, 팀 전체의 의사결정 속도가 달라졌습니다.",
    name: "김지훈",
    role: "Product Manager",
  },
  {
    quote:
      "리서치 결과를 화면과 문장으로 번역하는 능력이 탁월합니다. 결과를 지표가 증명했어요.",
    name: "이서연",
    role: "Growth Lead",
  },
  {
    quote:
      "디자인 시스템 덕분에 신규 화면 제작이 몇 배 빨라졌습니다. 협업하기 편한 디자이너예요.",
    name: "박도현",
    role: "Frontend Engineer",
  },
];

const projects = Object.entries(cases) as [CaseId, (typeof cases)[CaseId]][];

type Theme = "light" | "dark";

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(value);
      return;
    }
    let raf = 0;
    let started = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started) return;
        started = true;
        observer.disconnect();
        const duration = 1100;
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - p, 3);
          setDisplay(Math.round(value * eased));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

export default function Home() {
  const [activeFilter, setActiveFilter] = useState<Filter>("all");
  const [selectedCase, setSelectedCase] = useState<CaseId | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [theme, setTheme] = useState<Theme>("light");
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [copied, setCopied] = useState(false);

  const selected = selectedCase ? cases[selectedCase] : null;
  const visibleProjects = projects.filter(([, project]) => {
    return activeFilter === "all" || project.category === activeFilter;
  });

  useEffect(() => {
    const current = document.documentElement.getAttribute("data-theme");
    if (current === "light" || current === "dark") setTheme(current);
  }, []);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        setIsScrolled(y > 8);
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setScrollProgress(max > 0 ? Math.min(1, y / max) : 0);
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (sections.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const lock = Boolean(selectedCase) || menuOpen;
    document.body.classList.toggle("has-modal", lock);
    return () => document.body.classList.remove("has-modal");
  }, [selectedCase, menuOpen]);

  useEffect(() => {
    if (!selectedCase && !menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedCase(null);
        setMenuOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selectedCase, menuOpen]);

  useEffect(() => {
    if (!document.documentElement.classList.contains("reveal-ready")) return;
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    );
    if (elements.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [activeFilter]);

  const toggleTheme = () => {
    setTheme((prev) => {
      const next: Theme = prev === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      try {
        localStorage.setItem("theme", next);
      } catch {
        /* storage may be unavailable */
      }
      return next;
    });
  };

  const copyEmail = async () => {
    const markCopied = () => {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    };
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(EMAIL);
        markCopied();
        return;
      }
    } catch {
      /* fall back to legacy copy below */
    }
    try {
      const area = document.createElement("textarea");
      area.value = EMAIL;
      area.style.position = "fixed";
      area.style.opacity = "0";
      document.body.appendChild(area);
      area.select();
      document.execCommand("copy");
      document.body.removeChild(area);
      markCopied();
    } catch {
      /* copy unavailable; no-op */
    }
  };

  return (
    <>
      <div
        className="scroll-progress"
        style={{ transform: `scaleX(${scrollProgress})` }}
        aria-hidden="true"
      />

      <a className="skip-link" href="#work">
        작업물로 이동
      </a>

      <header className={`site-header ${isScrolled ? "is-scrolled" : ""}`}>
        <a className="brand" href="#top" aria-label="진정한 포트폴리오 홈">
          <span className="brand-mark" aria-hidden="true">
            ✦
          </span>
          <span className="brand-name">진정한</span>
          <span className="brand-latin">Jeong Han</span>
        </a>
        <div className="header-right">
          <nav className="site-nav" aria-label="주요 메뉴">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={activeSection === item.id ? "is-current" : ""}
                aria-current={activeSection === item.id ? "true" : undefined}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <button
            className="theme-toggle"
            type="button"
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "라이트 모드로 전환" : "다크 모드로 전환"}
            title={theme === "dark" ? "라이트 모드" : "다크 모드"}
          >
            {theme === "dark" ? (
              <Sun size={18} strokeWidth={2.2} aria-hidden="true" />
            ) : (
              <Moon size={18} strokeWidth={2.2} aria-hidden="true" />
            )}
          </button>
          <button
            className="nav-toggle"
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="메뉴 열기"
            aria-expanded={menuOpen}
          >
            <Menu size={20} strokeWidth={2.2} aria-hidden="true" />
          </button>
        </div>
      </header>

      {menuOpen ? (
        <div className="mobile-menu" role="dialog" aria-modal="true" aria-label="메뉴">
          <button
            className="mobile-menu-close"
            type="button"
            onClick={() => setMenuOpen(false)}
            aria-label="메뉴 닫기"
          >
            <X size={22} strokeWidth={2.2} aria-hidden="true" />
          </button>
          <nav className="mobile-nav" aria-label="모바일 메뉴">
            {navItems.map((item, index) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setMenuOpen(false)}
              >
                <span className="mobile-nav-num">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {item.label}
              </a>
            ))}
          </nav>
          <a className="mobile-menu-mail" href={`mailto:${EMAIL}`}>
            {EMAIL}
          </a>
        </div>
      ) : null}

      <main id="top">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-top">
            <span className="mono">Portfolio — 2026</span>
            <span className="mono available">
              <span className="dot" aria-hidden="true" />
              새 프로젝트 협업 가능
            </span>
          </div>

          <p className="hero-role mono" data-reveal>
            <b>UI / UX Designer</b> · Product Design · Seoul
          </p>
          <h1 className="hero-title" id="hero-title" data-reveal>
            복잡한 문제를
            <br />
            <span className="accent">또렷한</span> 인터페이스로.
          </h1>
          <p
            className="hero-copy"
            data-reveal
            style={{ "--reveal-delay": "80ms" } as React.CSSProperties}
          >
            사용자의 흐름을 정리하고, 제품이 말해야 할 순간을 선명한 화면으로
            설계합니다. 리서치에서 찾은 불편을 구조와 문장, 디자인 시스템으로
            연결합니다.
          </p>
          <div
            className="hero-actions"
            data-reveal
            style={{ "--reveal-delay": "140ms" } as React.CSSProperties}
          >
            <a className="button button-primary" href="#work">
              작업 보기
              <ArrowRight size={18} strokeWidth={2.4} aria-hidden="true" />
            </a>
            <a className="button button-ghost" href={`mailto:${EMAIL}`}>
              <Mail size={18} strokeWidth={2.4} aria-hidden="true" />
              메일 보내기
            </a>
          </div>

          <dl
            className="hero-stats"
            aria-label="포트폴리오 요약"
            data-reveal
            style={{ "--reveal-delay": "200ms" } as React.CSSProperties}
          >
            {stats.map((stat) => (
              <div key={stat.label}>
                <dt>
                  <Counter value={stat.value} suffix={stat.suffix} />
                </dt>
                <dd>{stat.label}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="marquee" aria-label="전문 영역">
          <div className="marquee-track">
            {[...disciplines, ...disciplines].map((item, index) => (
              <span key={`${item}-${index}`}>{item}</span>
            ))}
          </div>
        </section>

        <section className="section work-section" id="work" aria-labelledby="work-title">
          <div className="section-head" data-reveal>
            <span className="mono">01 / Selected Work</span>
            <h2 id="work-title">문제 발견부터 출시 지표까지 연결한 작업</h2>
          </div>

          <div className="filter-bar" role="group" aria-label="작업 유형">
            {filters.map((filter) => (
              <button
                className={`filter-button ${
                  activeFilter === filter.value ? "is-active" : ""
                }`}
                key={filter.value}
                type="button"
                aria-pressed={activeFilter === filter.value}
                onClick={() => setActiveFilter(filter.value)}
              >
                {filter.label}
              </button>
            ))}
          </div>

          <ul className="work-index">
            {visibleProjects.map(([id, project], index) => (
              <li
                key={id}
                data-reveal
                style={{ "--reveal-delay": `${index * 80}ms` } as React.CSSProperties}
              >
                <button
                  className="work-row"
                  type="button"
                  onClick={() => setSelectedCase(id)}
                  aria-label={`${project.title} 사례 보기`}
                >
                  <span className="work-num" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="work-main">
                    <span className="work-kicker mono">{project.kicker}</span>
                    <div className="work-title">
                      <h3>{project.title}</h3>
                    </div>
                    <p className="work-summary">{project.summary}</p>
                  </div>
                  <div className="work-aside">
                    <span className="work-metric">{project.metrics[0]}</span>
                    <div
                      className={`work-thumb visual ${project.visual}`}
                      aria-hidden="true"
                    >
                      <span />
                      <span />
                      <span />
                      <span />
                    </div>
                    <span className="work-arrow" aria-hidden="true">
                      <ArrowUpRight size={18} strokeWidth={2.4} />
                    </span>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </section>

        <section
          className="section process-section"
          id="process"
          aria-labelledby="process-title"
        >
          <div className="section-head" data-reveal>
            <span className="mono">02 / Process</span>
            <h2 id="process-title">작게 검증하고, 빠르게 선명해지는 방식</h2>
          </div>

          <div className="process-grid">
            {processSteps.map(([step, title, copy], index) => (
              <article
                key={step}
                data-reveal
                style={{ "--reveal-delay": `${index * 80}ms` } as React.CSSProperties}
              >
                <span className="process-num">{step}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section about-section" id="about" aria-labelledby="about-title">
          <div className="about-copy" data-reveal>
            <span className="mono">03 / About</span>
            <h2 id="about-title">
              사용자가 망설이는 장면을 제품이 대신 설명하게 만듭니다.
            </h2>
            <p>
              진정한은 B2C 금융, 헬스케어 운영툴, 커머스 탐색 경험을 설계해 온
              UI/UX 디자이너입니다. 리서치에서 찾은 불편을 화면 구조, 문장, 상태
              설계, 디자인 시스템으로 연결하는 일을 좋아합니다.
            </p>
          </div>
          <dl
            className="about-meta"
            data-reveal
            style={{ "--reveal-delay": "120ms" } as React.CSSProperties}
            aria-label="기본 정보"
          >
            {aboutFacts.map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section
          className="section cap-section"
          id="capabilities"
          aria-labelledby="cap-title"
        >
          <div className="section-head" data-reveal>
            <span className="mono">04 / Capabilities</span>
            <h2 id="cap-title">리서치부터 디자인 시스템까지, 제품을 만드는 도구</h2>
          </div>
          <div className="cap-grid">
            {capabilities.map((group, index) => (
              <div
                className="cap-col"
                key={group.label}
                data-reveal
                style={{ "--reveal-delay": `${index * 90}ms` } as React.CSSProperties}
              >
                <h3>
                  {group.label}
                  <span>{group.count}</span>
                </h3>
                <ul>
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section
          className="section testimonial-section"
          id="recommendations"
          aria-labelledby="rec-title"
        >
          <div className="section-head" data-reveal>
            <span className="mono">05 / Recommendations</span>
            <h2 id="rec-title">함께 일한 사람들의 이야기</h2>
          </div>
          <div className="testimonial-grid">
            {testimonials.map((item, index) => (
              <figure
                className="testimonial"
                key={item.name}
                data-reveal
                style={{ "--reveal-delay": `${index * 90}ms` } as React.CSSProperties}
              >
                <span className="quote-mark" aria-hidden="true">
                  &ldquo;
                </span>
                <blockquote>{item.quote}</blockquote>
                <figcaption>
                  <span className="testimonial-name">{item.name}</span>
                  <span className="testimonial-role mono">{item.role}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className="contact-section" id="contact" aria-labelledby="contact-title" data-reveal>
          <span className="mono">06 / Contact</span>
          <h2 className="contact-head" id="contact-title">
            좋은 제품의 다음 장면을 함께 만들까요?
          </h2>
          <div className="contact-mail-row">
            <a className="contact-mail" href={`mailto:${EMAIL}`}>
              {EMAIL}
              <ArrowUpRight size={36} strokeWidth={2.2} aria-hidden="true" />
            </a>
            <button
              className="copy-btn"
              type="button"
              onClick={copyEmail}
              aria-label="이메일 주소 복사"
            >
              {copied ? (
                <>
                  <Check size={15} strokeWidth={2.4} aria-hidden="true" />
                  복사됨
                </>
              ) : (
                <>
                  <Copy size={15} strokeWidth={2.2} aria-hidden="true" />
                  복사
                </>
              )}
            </button>
          </div>
          <div className="contact-links">
            <a href={`mailto:${EMAIL}`}>
              <Mail size={15} strokeWidth={2.2} aria-hidden="true" />
              Email
            </a>
            <a href="https://www.linkedin.com" target="_blank" rel="noreferrer">
              LinkedIn
              <ArrowUpRight size={14} strokeWidth={2.2} aria-hidden="true" />
            </a>
            <a href="https://www.behance.net" target="_blank" rel="noreferrer">
              Behance
              <ArrowUpRight size={14} strokeWidth={2.2} aria-hidden="true" />
            </a>
            <a href="#work">Resume / CV</a>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <p>© 2026 진정한 (Jeong Han)</p>
        <span className="mono">Designed for clear product decisions</span>
        <a className="to-top" href="#top">
          맨 위로
          <ArrowUpRight size={14} strokeWidth={2.4} aria-hidden="true" />
        </a>
      </footer>

      <div
        className={`toast ${copied ? "is-visible" : ""}`}
        role="status"
        aria-live="polite"
      >
        <Check size={15} strokeWidth={2.6} aria-hidden="true" />
        이메일 주소를 복사했어요
      </div>

      {selected ? (
        <div
          className="modal-backdrop"
          role="presentation"
          onMouseDown={() => setSelectedCase(null)}
        >
          <section
            className="case-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="dialog-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button
              className="dialog-close"
              type="button"
              onClick={() => setSelectedCase(null)}
              aria-label="닫기"
            >
              <X size={20} strokeWidth={2.4} aria-hidden="true" />
            </button>
            <div
              className={`dialog-visual visual ${selected.visual}`}
              aria-hidden="true"
            >
              <span />
              <span />
              <span />
              <span />
            </div>
            <p className="dialog-kicker mono">
              {selected.kicker} · {selected.year} · {selected.role_short}
            </p>
            <h2 id="dialog-title">{selected.title}</h2>
            <p className="dialog-summary">{selected.summary}</p>
            <div className="dialog-metrics">
              {selected.metrics.map((metric) => (
                <span key={metric}>{metric}</span>
              ))}
            </div>
            <div className="dialog-content">
              <div>
                <h3>Problem</h3>
                <p>{selected.problem}</p>
              </div>
              <div>
                <h3>Role</h3>
                <p>{selected.role}</p>
              </div>
              <div>
                <h3>Result</h3>
                <p>{selected.result}</p>
              </div>
            </div>
          </section>
        </div>
      ) : null}
    </>
  );
}

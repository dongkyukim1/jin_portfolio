"use client";

import { ArrowRight, Mail, X } from "lucide-react";
import { useEffect, useState } from "react";

const cases = {
  finance: {
    category: "research",
    kicker: "Fintech Onboarding",
    title: "신규 사용자의 첫 송금 여정 리디자인",
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

const projects = Object.entries(cases) as [CaseId, (typeof cases)[CaseId]][];

export default function Home() {
  const [activeFilter, setActiveFilter] = useState<Filter>("all");
  const [selectedCase, setSelectedCase] = useState<CaseId | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  const selected = selectedCase ? cases[selectedCase] : null;
  const visibleProjects = projects.filter(([, project]) => {
    return activeFilter === "all" || project.category === activeFilter;
  });

  useEffect(() => {
    const updateHeader = () => setIsScrolled(window.scrollY > 8);
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    return () => window.removeEventListener("scroll", updateHeader);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("has-modal", Boolean(selectedCase));
    return () => document.body.classList.remove("has-modal");
  }, [selectedCase]);

  return (
    <>
      <a className="skip-link" href="#work">
        작업물로 이동
      </a>

      <header className={`site-header ${isScrolled ? "is-scrolled" : ""}`}>
        <a className="brand" href="#top" aria-label="진정한 포트폴리오 홈">
          <span className="brand-mark" aria-hidden="true">
            ㅈ
          </span>
          <span>진정한</span>
        </a>
        <nav className="site-nav" aria-label="주요 메뉴">
          <a href="#work">Work</a>
          <a href="#process">Process</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main id="top">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-content">
            <p className="eyebrow">UI/UX Designer</p>
            <h1 id="hero-title">진정한</h1>
            <p className="hero-copy">
              복잡한 문제를 사용자의 흐름으로 정리하고, 제품이 말해야 할 순간을
              또렷한 인터페이스로 설계합니다.
            </p>
            <div className="hero-actions" aria-label="빠른 이동">
              <a className="button button-primary" href="#work">
                작업 보기
                <ArrowRight size={18} strokeWidth={2.4} aria-hidden="true" />
              </a>
              <a
                className="button button-secondary"
                href="mailto:hello@jeonghan.design"
              >
                <Mail size={18} strokeWidth={2.4} aria-hidden="true" />
                메일 보내기
              </a>
            </div>
            <dl className="hero-stats" aria-label="포트폴리오 요약">
              <div>
                <dt>6년</dt>
                <dd>제품 디자인 경험</dd>
              </div>
              <div>
                <dt>14개</dt>
                <dd>출시 프로젝트</dd>
              </div>
              <div>
                <dt>3단계</dt>
                <dd>리서치, 설계, 검증</dd>
              </div>
            </dl>
          </div>
        </section>

        <section className="intro-band" aria-label="전문 영역">
          <p>Product Strategy</p>
          <p>User Research</p>
          <p>Interaction Design</p>
          <p>Design System</p>
        </section>

        <section className="section work-section" id="work" aria-labelledby="work-title">
          <div className="section-heading">
            <p className="eyebrow">Selected Work</p>
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

          <div className="project-grid">
            {visibleProjects.map(([id, project]) => (
              <article className="project-card" key={id}>
                <div
                  className={`project-visual ${project.visual}`}
                  aria-hidden="true"
                >
                  <span />
                  <span />
                  <span />
                  <span />
                </div>
                <div className="project-body">
                  <p className="project-type">{project.kicker}</p>
                  <h3>{project.title}</h3>
                  <p>{project.summary}</p>
                  <div className="project-meta">
                    <span>{project.metrics[0]}</span>
                    <span>{project.metrics[2]}</span>
                  </div>
                  <button
                    className="text-action"
                    type="button"
                    onClick={() => setSelectedCase(id)}
                  >
                    사례 보기
                    <ArrowRight size={16} strokeWidth={2.6} aria-hidden="true" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section
          className="section process-section"
          id="process"
          aria-labelledby="process-title"
        >
          <div className="section-heading">
            <p className="eyebrow">Process</p>
            <h2 id="process-title">작게 검증하고, 빠르게 선명해지는 방식</h2>
          </div>

          <div className="process-grid">
            {[
              ["01", "맥락 수집", "로그, 인터뷰, VOC를 함께 보고 실제 의사결정 순간을 찾습니다."],
              ["02", "흐름 설계", "사용자의 목표와 제품 제약을 맞춰 정보 구조와 주요 상태를 만듭니다."],
              ["03", "인터랙션 정교화", "프로토타입과 디자인 시스템을 오가며 반복 가능한 패턴으로 다듬습니다."],
              ["04", "출시 검증", "실험 지표와 사용성 피드백을 연결해 다음 개선 항목을 정합니다."],
            ].map(([step, title, copy]) => (
              <article key={step}>
                <span>{step}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section about-section" id="about" aria-labelledby="about-title">
          <div className="about-copy">
            <p className="eyebrow">About</p>
            <h2 id="about-title">
              사용자가 망설이는 장면을 제품이 대신 설명하게 만듭니다.
            </h2>
            <p>
              진정한은 B2C 금융, 헬스케어 운영툴, 커머스 탐색 경험을 설계해 온
              UI/UX 디자이너입니다. 리서치에서 찾은 불편을 화면 구조, 문장,
              상태 설계, 디자인 시스템으로 연결하는 일을 좋아합니다.
            </p>
          </div>
          <div className="skill-list" aria-label="핵심 역량">
            {[
              "Journey Mapping",
              "Wireframing",
              "Prototype Testing",
              "Design Tokens",
              "Product Metrics",
              "Stakeholder Workshop",
            ].map((skill) => (
              <span key={skill}>{skill}</span>
            ))}
          </div>
        </section>

        <section className="contact-section" id="contact" aria-labelledby="contact-title">
          <div>
            <p className="eyebrow">Contact</p>
            <h2 id="contact-title">좋은 제품의 다음 장면을 함께 만들까요?</h2>
          </div>
          <a className="button button-primary" href="mailto:hello@jeonghan.design">
            <Mail size={18} strokeWidth={2.4} aria-hidden="true" />
            hello@jeonghan.design
          </a>
        </section>
      </main>

      <footer className="site-footer">
        <p>© 2026 진정한. Designed for clear product decisions.</p>
        <a href="#top">맨 위로</a>
      </footer>

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
            <p className="dialog-kicker">{selected.kicker}</p>
            <h2 id="dialog-title">{selected.title}</h2>
            <p className="dialog-summary">{selected.summary}</p>
            <div className="dialog-metrics">
              {selected.metrics.map((metric) => (
                <span key={metric}>{metric}</span>
              ))}
            </div>
            <div className="dialog-content">
              <div>
                <h3>문제</h3>
                <p>{selected.problem}</p>
              </div>
              <div>
                <h3>역할</h3>
                <p>{selected.role}</p>
              </div>
              <div>
                <h3>결과</h3>
                <p>{selected.result}</p>
              </div>
            </div>
          </section>
        </div>
      ) : null}
    </>
  );
}

import { useState, useEffect, useRef } from "react";

/* ============================================================
   DOHA KIM — PORTFOLIO v11
   v10 대비 변경점
   1. 스냅 v4 (최종) — 끊김 원인 제거:
      · 원인: 컨테이너 scroll-behavior:smooth + 매 프레임 scrollTop 대입
        → 프레임별 대입이 각각 스무스 처리되어 이중 이징으로 끊김
      · 해결: CSS snap · smooth 전부 제거, 인트로를 휠 게이트로 전환
        휠/스와이프 1회 = rAF 글라이드 한 화면, 관성은 글라이드 중 흡수
      · 모든 프로그램 스크롤(네비·큐·TOP)이 공용 글라이드 하나만 사용
      · 스크롤바 드래그·키보드는 정지 후 방향 보정으로 커버
   ============================================================

   ▼ 새 작업 추가하는 법
   projects 배열에 아래 형태로 객체 하나만 추가하세요.
   {
     type: "sub",              // "main"(대표작·큰 카드) | "sub"(그리드 카드)
     category: "personal",     // "team" | "personal"  → 필터 탭에 자동 반영
     name: "작업 이름",
     accent: "violet",         // violet | lavender | pink | green | sky
     txt: "한 줄 설명",
     stack: ["React"],
     url: "https://...",
   }
   main 타입은 label · period · team · desc · role · links · imgLabel 까지 채우면 됩니다.

   ▼ 이미지 넣는 법
   main 프로젝트의 img: null 을 이미지 경로/URL로 바꾸면
   placeholder가 실제 스크린샷으로 자동 전환됩니다. (호버 인터랙션 동일 작동)
   프로필은 About 섹션의 <PrMedia img={null} /> 에 경로를 넣으세요.
   ============================================================ */

const theme = {
  fonts: {
    disp: "'Syncopate', sans-serif",
    num: "'Bebas Neue', sans-serif",
    mono: "'IBM Plex Mono', monospace",
    body: "'Pretendard', -apple-system, sans-serif",
  },
  colors: {
    dark: {
      bg: "#06060e",
      bgCard: "#0d0d1a",
      line: "rgba(236,233,255,0.08)",
      main: "#ece9ff",
      sub: "#b9b3d9",
      muted: "#6f6a8f",
      violet: "#8b7cf7",
      lavender: "#c4b5fd",
      pink: "#f776c4",
      deepPink: "#922D6A",
      green: "#7ef7b2",
      sky: "#7cd4f7",
    },
    light: {
      bg: "#ece9ff",
      bgCard: "#f9f8ff",
      line: "rgba(22,18,46,0.1)",
      main: "#16122e",
      sub: "#443e66",
      muted: "#7d78a3",
      violet: "#5a48d6",
      lavender: "#8468e8",
      pink: "#d43e96",
      deepPink: "#922D6A",
      green: "#0f9a5c",
      sky: "#0e87c0",
    },
  },
};

/* ---------------- 데이터 ---------------- */

const nav = [
  { no: "01", txt: "ABOUT", id: "about" },
  { no: "02", txt: "JOURNEY", id: "journey" },
  { no: "03", txt: "SKILLS", id: "skills" },
  { no: "04", txt: "PROJECTS", id: "projects" },
  { no: "05", txt: "CONTACT", id: "contact" },
];

const journey = [
  {
    date: "2025.12",
    ttl: "Design to Code, 시작점",
    tag: "About Me Page",
    accent: "lavender",
    txt: "Figma 시안을 코드로 100% 옮기며, 화면의 균형과 시선 흐름을 구조로 설계하는 법을 익혔습니다.",
  },
  {
    date: "2026.02",
    ttl: "첫 팀 협업, 디자인 총괄",
    tag: "flowdash · 2인 팀",
    accent: "green",
    txt: "순수 JS로 칸반 대시보드를 완성하며 브랜치 전략 · PR 협업과 필터 파이프라인 설계를 경험했습니다.",
  },
  {
    date: "2026.03 – 04",
    ttl: "React, 그리고 테마 시스템",
    tag: "PULSE · 5인 팀",
    accent: "pink",
    txt: "이커머스 전체 흐름을 API 기반으로 구현하고, 메인 페이지와 다크 · 라이트 반전 테마 시스템을 총괄했습니다.",
  },
  {
    date: "2026.05",
    ttl: "반복을 시스템으로",
    tag: "React Base Template",
    accent: "sky",
    txt: "매 프로젝트 반복되던 세팅을 색 · 폰트 · 간격을 한 곳에서 관리하는 theme.js 스타터킷으로 시스템화했습니다.",
  },
  {
    date: "2026.06 – 진행중",
    ttl: "기획부터 구현까지, 혼자 힘으로",
    tag: "화성야화",
    accent: "violet",
    txt: "야간 미디어아트 축제 웹을 세계관 카피부터 디자인, React 구현까지 단독으로 진행하고 있습니다.",
  },
];

const skillTabs = {
  Language: [
    { name: "HTML5", txt: "시맨틱 태그 기반으로 정보 위계가 명확한 마크업을 작성할 수 있습니다." },
    { name: "CSS3", txt: "순수 CSS 반응형과 컨테이너 쿼리 기반 컴포넌트 단위 설계, 글래스모피즘 스타일을 적용할 수 있습니다." },
    { name: "JavaScript (ES6+)", txt: "DOM 조작과 LocalStorage CRUD, 검색 · 필터 · 정렬이 순차 작동하는 필터 파이프라인을 설계할 수 있습니다." },
  ],
  Frontend: [
    { name: "React", txt: "Router 기반 SPA 라우팅과 페이지 · 공통 컴포넌트 설계를 할 수 있습니다." },
    { name: "Emotion", txt: "theme 토큰과 연동되는 CSS-in-JS 테마 시스템을 직접 설계할 수 있습니다." },
    { name: "Zustand", txt: "장바구니·위시리스트 등 전역 상태 관리에 적용한 경험이 있습니다." },
    { name: "Vite", txt: "프로젝트 초기 세팅과 빌드 환경 구성에 사용하고 있으며, 이를 템플릿화한 스타터킷을 운영합니다." },
    { name: "jQuery", txt: "DOM 조작과 간단한 인터랙션 구현에 사용할 수 있습니다." },
  ],
  Design: [
    { name: "Figma", txt: "개발 전 UI/UX를 선행 설계하고, 시안과 1px 오차 없는 구현을 목표로 작업합니다." },
    { name: "Photoshop", txt: "웹에 필요한 이미지 보정·합성·에셋 제작을 할 수 있습니다." },
    { name: "Illustrator", txt: "로고·아이콘 등 벡터 그래픽을 직접 제작할 수 있습니다." },
    { name: "After Effects", txt: "모션 감각을 익힌 툴로, 웹 인터랙션과 애니메이션 타이밍 설계에 그 감각을 활용합니다." },
  ],
  ETC: [
    { name: "Git / GitHub", txt: "main · dev · feature 브랜치 전략과 기능 단위 PR, PR 전 rebase 규칙으로 협업할 수 있습니다." },
    { name: "GitHub Pages", txt: "정적 프로젝트를 배포하고 운영할 수 있습니다." },
    { name: "Vercel", txt: "React 프로젝트를 배포한 경험이 있습니다." },
    { name: "LocalStorage", txt: "데이터 구조와 Key 설계를 정의하고 앱 상태와 동기화하는 구조를 만들 수 있습니다." },
  ],
};

/* type: "main" = 대표작 큰 카드 / "sub" = 그리드 카드
   category: "team" | "personal" — 필터 탭 자동 반영 */
const projects = [
  {
    type: "main",
    category: "personal",
    num: "01",
    label: "MEMORIES OF THE NIGHT",
    name: "화성야화",
    period: "2026.06 – 진행중",
    team: "개인 프로젝트 · 기획 / 디자인 / 개발",
    accent: "violet",
    desc: "조선의 성곽 위로 피어난 빛과 예술, 그 밤의 장면을 웹으로 옮긴 작업. 야간 미디어아트 축제 '화성야화'의 행사 소개 및 관공서 웹 페이지입니다.",
    role: [
      "행사 세계관을 담은 브랜드 카피와 비주얼 톤 설계",
      "메인 · 프로그램 소개 페이지 구조 기획 및 React 구현",
      "관공서 웹 특성에 맞춘 정보 위계와 접근성 정리",
    ],
    stack: ["React", "Vite", "JavaScript", "Figma"],
    links: [{ txt: "GITHUB", url: "https://github.com/dohaim918/hwaseong-yahwa-web" }],
    img: null, // 스크린샷 경로/URL 입력 시 자동 적용
    imgLabel: "MAIN VISUAL · 1280×800",
  },
  {
    type: "main",
    category: "team",
    num: "02",
    label: "GAMING GEAR E-COMMERCE",
    name: "PULSE",
    period: "2026.03.13 – 2026.04.06",
    team: "5인 팀 프로젝트 · 메인 페이지 / 테마 디자인 시스템 총괄",
    accent: "pink",
    desc: "게이밍 기어 이커머스의 핵심 흐름 전체를 담은 팀 프로젝트. 회원가입·로그인부터 상품 탐색, 장바구니, 구매까지 API 기반으로 구현했습니다.",
    role: [
      "다크 · 라이트 완전 반전 토글 테마 시스템 설계 및 구현",
      "메인 페이지 반응형 UI · 인터랙션 · API 데이터 처리",
      "검색 기능 · 공통 컴포넌트 · 프로필 아이콘 개발",
    ],
    stack: ["React", "Zustand", "Emotion", "Router", "REST API", "Vercel"],
    links: [
      { txt: "LIVE DEMO", url: "https://pulse-rho-rose.vercel.app/" },
      { txt: "GITHUB", url: "https://github.com/dohaim918/PULSE" },
    ],
    img: null, // 스크린샷 경로/URL 입력 시 자동 적용
    imgLabel: "MAIN PAGE SCREENSHOT",
  },
  {
    type: "main",
    category: "team",
    num: "03",
    label: "KANBAN TASK DASHBOARD",
    name: "flowdash",
    period: "2026.02",
    team: "2인 팀 프로젝트 (TODO_404) · 디자인 총괄 / UI · Logic",
    accent: "green",
    desc: "프레임워크 없이 순수 자바스크립트로 완성한 칸반형 태스크 관리 대시보드. 글래스모피즘 디자인과 데이터 구조 설계를 함께 맡았습니다.",
    role: [
      "카드 생성 · 관리 핵심 로직과 LocalStorage CRUD 구현",
      "기간 · 우선순위 · 검색 필터 파이프라인 설계",
      "컨테이너 쿼리 중심 반응형 CSS와 디자인 최종 검수",
    ],
    stack: ["Vanilla JS", "LocalStorage", "Container Query", "CSS3"],
    links: [
      { txt: "LIVE DEMO", url: "https://dohaim918.github.io/flowdash/" },
      { txt: "GITHUB", url: "https://github.com/dohaim918/flowdash" },
    ],
    img: null, // 스크린샷 경로/URL 입력 시 자동 적용
    imgLabel: "DASHBOARD SCREENSHOT",
  },
  {
    type: "sub",
    category: "personal",
    name: "React Base Template",
    accent: "sky",
    txt: "Vite + React + Emotion 스타터킷. T.spacing · T.fontSize 등 디자인 토큰과 alpha() · textGrad() 유틸을 theme.js 한 곳에서 관리합니다.",
    stack: ["Vite", "React", "Emotion"],
    url: "https://github.com/dohaim918/react-base-template",
  },
  {
    type: "sub",
    category: "personal",
    name: "About Me Page",
    accent: "lavender",
    txt: "Figma 디자인의 100% 구현을 목표로 한 첫 반응형 웹. Soft Gradient 톤과 자연스러운 시선 흐름을 설계했습니다.",
    stack: ["HTML5", "CSS3", "Figma"],
    url: "https://dohaim918.github.io/About-Me-page/",
  },
  {
    type: "sub",
    category: "personal",
    name: "Homework Repo",
    accent: "pink",
    txt: "JavaScript · DOM 학습 과제를 기록한 저장소. 작은 연습들이 쌓여 프로젝트의 기반이 되었습니다.",
    stack: ["JavaScript", "HTML", "CSS"],
    url: "https://github.com/dohaim918/homework-repo",
  },
  /* ▼ 다음 개인 작업은 여기에 추가 */
];

const accentKeys = ["violet", "pink", "green", "sky", "lavender"];
const subFilters = [
  { key: "all", txt: "ALL" },
  { key: "team", txt: "TEAM" },
  { key: "personal", txt: "PERSONAL" },
];

/* ---------------- 서브 컴포넌트 ---------------- */

function MoonIco() {
  return (
    <svg viewBox="0 0 24 24">
      <path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z" />
    </svg>
  );
}

function SunIco() {
  return (
    <svg viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="4.2" />
      <path d="M12 2v2.5M12 19.5V22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M2 12h2.5M19.5 12H22M4.9 19.1l1.8-1.8M17.3 6.7l1.8-1.8" />
    </svg>
  );
}

function Media({ img, label, accent, url, ratio = "16 / 10" }) {
  /* 프로젝트 미디어 — img가 null이면 placeholder, 경로를 넣으면 실제 스크린샷.
     호버: 이미지 줌 + 액센트 오버레이 + VIEW PROJECT CTA. 전체가 라이브 링크. */
  const body = (
    <>
      <div className="md-bar">
        <i style={{ background: accent }} /><i /><i />
        <em>{label}</em>
      </div>
      <div className="md-bd" style={{ aspectRatio: ratio }}>
        {img ? (
          <img src={img} alt={label} loading="lazy" />
        ) : (
          <div className="md-ph">
            <span style={{ color: accent }}>▨</span>
            <em>{label}</em>
            <small>이미지 교체 예정 · img 필드에 경로 입력</small>
          </div>
        )}
        {/* 액센트 오버레이 — 특수 그라디언트값은 인라인 유지 */}
        <div className="md-ov" style={{ background: `linear-gradient(180deg, transparent 42%, ${accent}d9 100%)` }}>
          <span className="md-cta">VIEW PROJECT ↗</span>
        </div>
      </div>
    </>
  );
  return url ? (
    <a className="md-frm" href={url} target="_blank" rel="noreferrer" aria-label={`${label} 프로젝트 보기`}>
      {body}
    </a>
  ) : (
    <div className="md-frm">{body}</div>
  );
}

function PrMedia({ img }) {
  /* 프로필 — 액센트 오프셋 프레임. 호버 시 사진과 프레임이 정렬됨. */
  return (
    <div className="pr-frm">
      <div className="pr-bd">
        {img ? (
          <img src={img} alt="김도하 프로필" loading="lazy" />
        ) : (
          <div className="md-ph">
            <span>▨</span>
            <em>PROFILE IMAGE · 4:5</em>
            <small>이미지 교체 예정</small>
          </div>
        )}
      </div>
    </div>
  );
}

export default function DohaPortfolioV11() {
  const [mode, setMode] = useState("dark");
  const [accentKey, setAccentKey] = useState("pink");
  const [tab, setTab] = useState("Language");
  const [filter, setFilter] = useState("all");
  const [menu, setMenu] = useState(false);
  const [activeSec, setActiveSec] = useState("");
  const [topBtn, setTopBtn] = useState(false);
  const [playKey, setPlayKey] = useState(0); // 인트로 리플레이 트리거 (0 = 첫 로드 풀 시퀀스)
  const revealRefs = useRef([]);
  const wrapRef = useRef(null);   // 페이지 스크롤 컨테이너
  const pgRef = useRef(null);     // 헤더 프로그레스 바
  const glideRef = useRef(null);  // 공용 글라이드 (모든 프로그램 스크롤이 이 하나만 사용)
  const introRef = useRef(null);
  const glowRef = useRef(null);
  const typoRef = useRef(null);
  const decoRef = useRef(null);

  /* 인트로 — 마우스 추적 글로우 + 타이포·장식 패럴럭스 (리렌더 없이 ref 직접 제어) */
  const onIntroMove = (e) => {
    const box = introRef.current?.getBoundingClientRect();
    if (!box || !glowRef.current || !typoRef.current) return;
    const x = e.clientX - box.left;
    const y = e.clientY - box.top;
    glowRef.current.style.transform = `translate(${x - 280}px, ${y - 280}px)`;
    const dx = x / box.width - 0.5;
    const dy = y / box.height - 0.5;
    typoRef.current.style.transform = `translate(${dx * -20}px, ${dy * -14}px)`;
    if (decoRef.current)
      decoRef.current.style.transform = `translateY(-50%) translate(${dx * 16}px, ${dy * 12}px)`;
  };
  const onIntroLeave = () => {
    if (typoRef.current) typoRef.current.style.transform = "";
    if (decoRef.current) decoRef.current.style.transform = "translateY(-50%)";
  };

  const cv = theme.colors[mode];
  const accent = cv[accentKey];

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("on")),
      { threshold: 0.1 }
    );
    revealRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  /* 인트로 휠 게이트 + 프로그레스 바.
     인트로 구간에서는 네이티브 스크롤을 완전히 차단하고
     휠/스와이프 제스처 1회 = 커스텀 rAF 글라이드 한 화면 이동.
     네이티브 관성과 충돌할 여지가 없어 끊김이 발생하지 않음.
     스크롤바 드래그·키보드 등 비휠 입력은 정지 후 보정으로 커버. */
  useEffect(() => {
    const sc = wrapRef.current;
    if (!sc) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let gliding = false;
    let cool = 0;              // 글라이드 직후 관성 흡수 쿨다운
    let lastY = sc.scrollTop;
    let dir = 0;
    let t;
    let anim = null;
    let raf = null;
    let tStartY = null;
    let tFired = false;

    const ih = () => introRef.current?.offsetHeight || sc.clientHeight;

    const glide = (to) => {
      if (anim) cancelAnimationFrame(anim);
      if (reduce) { sc.scrollTop = to; gliding = false; return; }
      const from = sc.scrollTop;
      const dist = to - from;
      if (Math.abs(dist) < 2) return;
      const dur = 600;
      const st = performance.now();
      const ease = (x) => 1 - Math.pow(1 - x, 3);
      gliding = true;
      const step = (now) => {
        const p = Math.min((now - st) / dur, 1);
        sc.scrollTop = from + dist * ease(p);
        if (p < 1) anim = requestAnimationFrame(step);
        else {
          anim = null;
          gliding = false;
          cool = performance.now() + 280; // 잔여 관성 흡수
        }
      };
      anim = requestAnimationFrame(step);
    };
    glideRef.current = glide;

    /* 휠 게이트 — 인트로 구간 한정 */
    const onWheel = (e) => {
      const y = sc.scrollTop;
      const H = ih();
      const inZone = y < H - 4;
      if (gliding || performance.now() < cool) {
        if (inZone || y <= H + 4) e.preventDefault(); // 글라이드 중 관성 흡수
        return;
      }
      const d = e.deltaMode === 1 ? e.deltaY * 33 : e.deltaY;
      if (d > 12 && inZone) {
        e.preventDefault();
        glide(H);               // 아래로 — 히어로 완결
      } else if (d < -12 && y > 0 && y <= H + 4) {
        e.preventDefault();
        glide(0);               // 위로 — 인트로 복귀
      }
    };

    /* 터치 게이트 */
    const onTouchStart = (e) => {
      tStartY = e.touches[0].clientY;
      tFired = false;
    };
    const onTouchMove = (e) => {
      if (tStartY == null) return;
      const y = sc.scrollTop;
      const H = ih();
      if (y >= H - 4) return;   // 인트로 밖 — 네이티브
      if (gliding || tFired) { e.preventDefault(); return; }
      const d = tStartY - e.touches[0].clientY; // +아래로
      e.preventDefault();
      if (d > 26) { tFired = true; glide(H); }
      else if (d < -26 && y > 0) { tFired = true; glide(0); }
    };

    /* 스크롤 — 프로그레스 바 + 비휠 입력용 정지 보정 */
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(() => {
        raf = null;
        if (pgRef.current) {
          const max = sc.scrollHeight - sc.clientHeight;
          pgRef.current.style.transform = `scaleX(${max > 0 ? sc.scrollTop / max : 0})`;
        }
      });
      const y = sc.scrollTop;
      if (!gliding) dir = y > lastY ? 1 : y < lastY ? -1 : dir;
      lastY = y;
      if (gliding) return;
      clearTimeout(t);
      t = setTimeout(() => {
        const H = ih();
        const y2 = sc.scrollTop;
        if (gliding || y2 <= 8 || y2 >= H - 8) return;
        if (dir >= 0) glide(H);
        else glide(0);
      }, 160);
    };

    sc.addEventListener("wheel", onWheel, { passive: false });
    sc.addEventListener("touchstart", onTouchStart, { passive: true });
    sc.addEventListener("touchmove", onTouchMove, { passive: false });
    sc.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      sc.removeEventListener("wheel", onWheel);
      sc.removeEventListener("touchstart", onTouchStart);
      sc.removeEventListener("touchmove", onTouchMove);
      sc.removeEventListener("scroll", onScroll);
      clearTimeout(t);
      if (anim) cancelAnimationFrame(anim);
      if (raf) cancelAnimationFrame(raf);
      glideRef.current = null;
    };
  }, []);

  /* 인트로 가시성 — 벗어나면 TOP 버튼, 재진입하면 축약 리플레이 */
  useEffect(() => {
    const el = introRef.current;
    if (!el) return;
    let away = false;
    const ob = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) {
          away = true;
          setTopBtn(true);
        } else {
          setTopBtn(false);
          if (away) {
            away = false;
            setPlayKey((k) => k + 1); // 리마운트로 CSS 애니메이션 재트리거
          }
        }
      },
      { threshold: 0.35 }
    );
    ob.observe(el);
    return () => ob.disconnect();
  }, []);

  /* 스크롤 스파이 — 현재 섹션을 네비에 하이라이트 */
  useEffect(() => {
    const spy = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActiveSec(e.target.id)),
      { rootMargin: "-40% 0px -55% 0px" }
    );
    nav.forEach((n) => {
      const el = document.getElementById(n.id);
      if (el) spy.observe(el);
    });
    return () => spy.disconnect();
  }, []);

  /* 모바일 메뉴 열림 시 배경 스크롤 잠금 (컨테이너 기준) */
  useEffect(() => {
    if (wrapRef.current) wrapRef.current.style.overflowY = menu ? "hidden" : "auto";
  }, [menu]);

  const addReveal = (el) => {
    if (el && !revealRefs.current.includes(el)) revealRefs.current.push(el);
  };
  const scrollTo = (id) => {
    setMenu(false);
    const sc = wrapRef.current;
    const el = document.getElementById(id);
    if (!sc || !el) return;
    const top = sc.scrollTop + el.getBoundingClientRect().top - sc.getBoundingClientRect().top;
    if (glideRef.current) glideRef.current(top);
    else sc.scrollTop = top;
  };

  const mains = projects.filter((p) => p.type === "main");
  const subs = projects.filter((p) => p.type === "sub" && (filter === "all" || p.category === filter));

  return (
    <div className="wrap" ref={wrapRef}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syncopate:wght@400;700&family=Bebas+Neue&family=IBM+Plex+Mono:wght@400;500&display=swap');
        @import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css');

        :root{
          --bg:${cv.bg};
          --bg-card:${cv.bgCard};
          --line:${cv.line};
          --main:${cv.main};
          --sub:${cv.sub};
          --muted:${cv.muted};
          --accent:${accent};
        }
        *{margin:0;padding:0;box-sizing:border-box;}
        html,body{height:100%;overflow:hidden;}
        .wrap{background:var(--bg);color:var(--main);font-family:${theme.fonts.body};height:100dvh;overflow-y:auto;overflow-x:hidden;line-height:1.65;transition:background .45s ease,color .45s ease;}
        .inner{max-width:1180px;margin:0 auto;padding:0 40px;}
        a{color:inherit;text-decoration:none;}
        button{font-family:inherit;}
        ::selection{background:var(--accent);color:var(--bg);}

        .rv{opacity:0;transform:translateY(26px);transition:opacity .7s ease,transform .7s ease;}
        .rv.on{opacity:1;transform:none;}
        @media (prefers-reduced-motion: reduce){
          .rv{opacity:1;transform:none;transition:none;}
          html{scroll-behavior:auto;}
          .wrap,.wrap *{transition:none !important;animation:none !important;}
          .it *{opacity:1 !important;transform:none !important;clip-path:none !important;width:auto !important;filter:none !important;}
          .dec-in,.dec-in *{opacity:.55 !important;}
        }

        /* ---------- intro keyframes ---------- */
        @keyframes itRise{from{transform:translateY(110%);}to{transform:translateY(0);}}
        @keyframes itBlur{from{filter:blur(14px);opacity:.35;}to{filter:blur(0);opacity:1;}}
        @keyframes itFade{from{opacity:0;transform:translateY(16px);}to{opacity:1;transform:none;}}
        @keyframes itBg{from{opacity:0;}to{opacity:1;}}
        @keyframes itSettle{from{transform:scale(1.06);}to{transform:scale(1);}}
        @keyframes itType{from{width:0;}to{width:36ch;}}
        @keyframes itCaret{0%,100%{opacity:1;}50%{opacity:0;}}
        @keyframes itFloat{0%{transform:translateY(0);}100%{transform:translateY(-26px);}}
        @keyframes itLine{to{transform:scaleY(1);}}
        @keyframes itSpin{to{transform:rotate(360deg);}}

        /* ---------- intro ---------- */
        .it{position:relative;height:100dvh;min-height:620px;display:flex;flex-direction:column;justify-content:center;overflow:hidden;border-bottom:1px solid var(--line);}
        .it-grid{position:absolute;inset:0;pointer-events:none;opacity:0;animation:itBg 1.4s ease .1s forwards,itSettle 2s ease .1s forwards;
          background-image:linear-gradient(var(--line) 1px,transparent 1px),linear-gradient(90deg,var(--line) 1px,transparent 1px);
          background-size:72px 72px;
          mask-image:radial-gradient(ellipse 80% 70% at 50% 45%,#000 30%,transparent 100%);
          -webkit-mask-image:radial-gradient(ellipse 80% 70% at 50% 45%,#000 30%,transparent 100%);}
        .it-amb{position:absolute;inset:0;pointer-events:none;opacity:0;animation:itBg 1.6s ease forwards;
          background:radial-gradient(720px 480px at 72% 20%, ${accent}${mode === "dark" ? "1e" : "2a"}, transparent 68%),
                     radial-gradient(560px 420px at 14% 88%, ${cv.deepPink}${mode === "dark" ? "2e" : "24"}, transparent 70%);
          transition:background .6s ease;}
        .it-glow{position:absolute;top:0;left:0;width:560px;height:560px;border-radius:50%;pointer-events:none;
          background:radial-gradient(circle, ${accent}${mode === "dark" ? "17" : "20"} 0%, transparent 62%);
          transition:transform .18s ease-out,background .5s;will-change:transform;}
        .it-dot{position:absolute;width:7px;height:7px;border-radius:50%;opacity:0;animation:itBg 1s ease 1.6s forwards,itFloat 6s ease-in-out 1.6s infinite alternate;pointer-events:none;}

        /* 우측 SVG 장식 — 리플 아크 필드 (화면 밖으로 블리드) */
        .it-deco{position:absolute;top:50%;right:-26%;transform:translateY(-50%);width:min(62vw,780px);pointer-events:none;transition:transform .3s ease-out;will-change:transform;}
        .it-deco svg{width:100%;height:auto;display:block;}
        .dec-in{opacity:0;animation:itDeco 2.6s ease .9s forwards,itDrift 16s ease-in-out 3.5s infinite alternate;}
        @keyframes itDeco{from{opacity:0;transform:scale(.97);}to{opacity:.55;transform:scale(1);}}
        @keyframes itDrift{from{transform:translateY(0);}to{transform:translateY(12px);}}
        .d-dash{animation:itSpin 80s linear infinite;transform-origin:50% 50%;}
        .d-arcA{animation:itSpin 44s linear infinite;transform-origin:50% 50%;}
        .d-arcB{animation:itSpin 30s linear infinite reverse;transform-origin:50% 50%;}
        .d-orb{animation:itSpin 22s linear infinite;transform-origin:50% 50%;}
        .d-orb2{animation:itSpin 38s linear infinite reverse;transform-origin:50% 50%;}

        .it .inner{position:relative;width:100%;}
        .it-type{font-family:${theme.fonts.mono};font-size:14px;color:var(--accent);letter-spacing:.04em;margin-bottom:34px;display:flex;align-items:center;transition:color .3s;}
        .it-type i{font-style:normal;display:block;overflow:hidden;white-space:nowrap;width:0;animation:itType 1.5s steps(36) .35s forwards;}
        .it-type b{font-weight:400;margin-left:2px;animation:itCaret 1s step-end infinite;}
        .it-typo{will-change:transform;transition:transform .25s ease-out;}
        .it-ln{display:block;overflow:hidden;line-height:.94;padding-bottom:.04em;}
        .it-ln span{display:block;font-family:${theme.fonts.num};font-size:clamp(72px,14vw,190px);letter-spacing:.02em;transform:translateY(110%);animation:itRise .9s cubic-bezier(.2,.9,.25,1) forwards,itBlur 1s ease forwards;}
        .it-ln.l1 span{animation-delay:.55s,.55s;color:transparent;-webkit-text-stroke:1.5px var(--main);}
        .it-ln.l2 span{animation-delay:.78s,.78s;}
        .it-ln.l2 .arw{display:inline-block;color:var(--accent);transition:color .3s;}
        .it-ln.l2 .cd{background:linear-gradient(94deg,var(--accent),${cv.lavender});-webkit-background-clip:text;background-clip:text;color:transparent;}
        .it-kr{position:relative;padding-left:18px;opacity:0;animation:itFade .8s ease 1.4s forwards;font-size:clamp(17px,2.2vw,24px);font-weight:700;color:var(--sub);margin-top:38px;word-break:keep-all;}
        .it-kr::before{content:"";position:absolute;left:0;top:5px;bottom:5px;width:2.5px;background:var(--accent);transform:scaleY(0);transform-origin:top;animation:itLine .5s ease 1.55s forwards;transition:background .3s;}
        .it-kr strong{color:var(--main);}
        .it-sub{opacity:0;animation:itFade .8s ease 1.6s forwards;font-family:${theme.fonts.mono};font-size:12px;letter-spacing:.14em;color:var(--muted);margin-top:14px;padding-left:18px;}
        .it-cue{position:absolute;bottom:32px;left:50%;transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;gap:11px;opacity:0;animation:itFade .8s ease 1.95s forwards;background:none;border:none;cursor:pointer;}
        .it-cue em{font-family:${theme.fonts.mono};font-style:normal;font-size:10px;letter-spacing:.3em;color:var(--muted);transition:color .25s;}
        .it-cue:hover em{color:var(--accent);}
        .cue-ms{width:24px;height:38px;border:1.5px solid var(--muted);border-radius:999px;display:flex;justify-content:center;transition:border-color .25s;}
        .it-cue:hover .cue-ms{border-color:var(--accent);}
        .cue-ms i{display:block;width:4px;height:8px;border-radius:4px;background:var(--accent);margin-top:7px;animation:cueDrop 1.7s ease-in-out 2.1s infinite;transition:background .3s;}
        @keyframes cueDrop{0%{transform:translateY(0);opacity:1;}65%{transform:translateY(13px);opacity:0;}100%{transform:translateY(0);opacity:0;}}
        .it-cue:focus-visible{outline:2px solid var(--accent);outline-offset:4px;}

        /* 재진입 축약 리플레이 — 타이핑 생략, 딜레이 단축 */
        .it.fast .it-amb,.it.fast .it-grid{animation-delay:0s;}
        .it.fast .dec-in{animation-delay:.15s,2s;}
        .it.fast .it-type i{animation:none;width:36ch;}
        .it.fast .it-ln.l1 span{animation-delay:.08s,.08s;}
        .it.fast .it-ln.l2 span{animation-delay:.26s,.26s;}
        .it.fast .it-kr{animation-delay:.6s;}
        .it.fast .it-kr::before{animation-delay:.75s;}
        .it.fast .it-sub{animation-delay:.75s;}
        .it.fast .it-cue{animation-delay:.9s;}
        .it.fast .it-dot{animation-delay:.5s,.5s;}

        /* 공통 프레스 상태 — 라인 버튼 체계 */
        .pf-links a:active,.ft-links a:active,.hero-sns a:active,.sk-tab:active,.sub-filters button:active,.top-btn:active,.th-tg:active{transform:scale(.97);}

        /* ---------- top button ---------- */
        .top-btn{position:fixed;right:26px;bottom:26px;z-index:90;width:50px;height:50px;border-radius:50%;background:var(--bg-card);border:1px solid var(--line);cursor:pointer;display:flex;align-items:center;justify-content:center;opacity:0;transform:translateY(16px);pointer-events:none;transition:opacity .35s ease,transform .35s ease,border-color .25s,background .45s;box-shadow:0 10px 30px -12px ${accent}55;}
        .top-btn.show{opacity:1;transform:none;pointer-events:auto;}
        .top-btn:hover{border-color:var(--accent);}
        .top-btn:hover svg{transform:translateY(-2px);}
        .top-btn:focus-visible{outline:2px solid var(--accent);outline-offset:3px;}
        .top-btn svg{width:16px;height:16px;stroke:var(--main);fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;transition:transform .25s;}

        /* ---------- header ---------- */
        .hd{position:fixed;top:0;left:0;right:0;z-index:100;background:${mode === "dark" ? "rgba(6,6,14,0.75)" : "rgba(236,233,255,0.8)"};backdrop-filter:blur(14px);border-bottom:1px solid var(--line);transition:background .45s;}
        .hd .inner{display:flex;align-items:center;justify-content:space-between;height:66px;gap:16px;}
        .pg{position:absolute;left:0;right:0;bottom:-1px;height:2px;pointer-events:none;}
        .pg i{display:block;height:100%;background:linear-gradient(90deg,var(--accent),${cv.lavender});transform-origin:left;transform:scaleX(0);}
        .logo{font-family:${theme.fonts.disp};font-weight:700;font-size:13px;letter-spacing:.28em;cursor:pointer;background:none;border:none;color:var(--main);white-space:nowrap;}
        .logo em{font-style:normal;color:var(--accent);transition:color .3s;}
        .hd-r{display:flex;align-items:center;gap:26px;}
        .gnb{display:flex;gap:26px;list-style:none;}
        .gnb button{background:none;border:none;cursor:pointer;font-family:${theme.fonts.mono};font-size:12px;letter-spacing:.1em;color:var(--muted);transition:color .25s;padding:6px 0;}
        .gnb button i{font-style:normal;color:var(--accent);margin-right:6px;transition:color .3s;}
        .gnb button:hover,.gnb button:focus-visible{color:var(--main);}
        .gnb button:focus-visible{outline:1px solid var(--accent);outline-offset:4px;}
        .gnb button.act{color:var(--main);}
        .gnb button{position:relative;}
        .gnb button::after{content:"";position:absolute;left:0;right:100%;bottom:0;height:1.5px;background:var(--accent);transition:right .3s ease;}
        .gnb button.act::after{right:0;}

        /* theme toggle — SVG 세그먼트 슬라이드 스위치 */
        .th-tg{position:relative;display:flex;align-items:center;width:74px;height:36px;background:var(--bg-card);border:1px solid var(--line);border-radius:999px;cursor:pointer;padding:0;transition:border-color .25s;flex-shrink:0;}
        .th-tg:hover{border-color:var(--accent);}
        .th-tg:focus-visible{outline:2px solid var(--accent);outline-offset:3px;}
        .th-thumb{position:absolute;top:3px;left:${mode === "dark" ? "3px" : "39px"};width:30px;height:30px;border-radius:50%;background:var(--accent);display:flex;align-items:center;justify-content:center;transition:left .3s cubic-bezier(.5,1.4,.5,1),background .3s;box-shadow:0 4px 14px -4px ${accent}aa;}
        .th-thumb svg{width:15px;height:15px;stroke:var(--bg);fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;}
        .th-ico{position:absolute;top:0;width:36px;height:36px;display:flex;align-items:center;justify-content:center;pointer-events:none;}
        .th-ico svg{width:14px;height:14px;stroke:var(--muted);fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;opacity:.55;transition:opacity .25s;}
        .th-ico.l{left:1px;}
        .th-ico.r{right:1px;}
        .th-ico.hide svg{opacity:0;}

        /* hamburger */
        .hbg{display:none;background:none;border:none;cursor:pointer;width:40px;height:40px;position:relative;z-index:210;}
        .hbg span{display:block;width:22px;height:2px;background:var(--main);margin:5px auto;border-radius:2px;transition:transform .3s ease,opacity .3s ease;}
        .hbg.open span:nth-child(1){transform:translateY(7px) rotate(45deg);}
        .hbg.open span:nth-child(2){opacity:0;}
        .hbg.open span:nth-child(3){transform:translateY(-7px) rotate(-45deg);}
        .hbg:focus-visible{outline:2px solid var(--accent);outline-offset:2px;}

        /* mobile overlay menu */
        .mnav{position:fixed;inset:0;z-index:200;background:${mode === "dark" ? "rgba(6,6,14,0.97)" : "rgba(236,233,255,0.98)"};backdrop-filter:blur(18px);display:flex;flex-direction:column;justify-content:center;padding:0 36px;opacity:0;pointer-events:none;transition:opacity .3s ease;}
        .mnav.open{opacity:1;pointer-events:auto;}
        .mnav ul{list-style:none;display:flex;flex-direction:column;gap:8px;}
        .mnav button{background:none;border:none;cursor:pointer;text-align:left;width:100%;padding:16px 0;font-size:26px;font-weight:800;color:var(--main);font-family:${theme.fonts.body};border-bottom:1px solid var(--line);display:flex;align-items:baseline;gap:14px;}
        .mnav button i{font-style:normal;font-family:${theme.fonts.num};font-size:16px;color:var(--accent);}
        .mnav .mnav-ft{margin-top:44px;display:flex;gap:18px;font-family:${theme.fonts.mono};font-size:12px;color:var(--muted);}

        /* ---------- hero ---------- */
        .hero{position:relative;padding:130px 0;border-bottom:1px solid var(--line);}
        .hero-bg{position:absolute;inset:0;pointer-events:none;
          background:radial-gradient(680px 420px at 78% 16%, ${accent}${mode === "dark" ? "22" : "2e"}, transparent 68%),
                     radial-gradient(520px 380px at 10% 85%, ${cv.deepPink}${mode === "dark" ? "30" : "26"}, transparent 70%);
          transition:background .6s ease;}
        .hero .inner{position:relative;display:grid;grid-template-columns:1.15fr .85fr;gap:60px;align-items:center;}
        .hero-hello{font-family:${theme.fonts.mono};font-size:14px;color:var(--accent);margin-bottom:22px;letter-spacing:.06em;transition:color .3s;}
        .hero-ttl{font-weight:800;font-size:clamp(28px,3.6vw,44px);line-height:1.24;letter-spacing:-0.02em;margin-bottom:20px;word-break:keep-all;}
        .hero-ttl .grad{background:linear-gradient(92deg,var(--accent),${cv.lavender});-webkit-background-clip:text;background-clip:text;color:transparent;}
        .hero-desc{color:var(--sub);font-size:16.5px;max-width:520px;word-break:keep-all;margin-bottom:34px;}
        .hero-desc strong{color:var(--main);font-weight:600;}
        .hero-sns{display:flex;gap:12px;flex-wrap:wrap;}
        .hero-sns a{font-family:${theme.fonts.mono};font-size:12px;letter-spacing:.08em;padding:10px 18px;border:1px solid var(--line);border-radius:8px;color:var(--sub);transition:all .25s;}
        .hero-sns a:hover{border-color:var(--accent);color:var(--accent);transform:translateY(-1px);}

        /* signature — theme.js token card */
        .tk-card{background:var(--bg-card);border:1px solid var(--line);border-radius:14px;padding:26px 28px;font-family:${theme.fonts.mono};font-size:13.5px;line-height:2.05;box-shadow:0 30px 80px -30px ${accent}${mode === "dark" ? "33" : "40"};transition:box-shadow .5s,background .45s;}
        .tk-bar{display:flex;gap:7px;margin-bottom:18px;}
        .tk-bar i{width:10px;height:10px;border-radius:50%;background:var(--line);}
        .tk-bar i:first-child{background:var(--accent);transition:background .3s;}
        .tk-key{color:var(--muted);}
        .tk-str{color:${cv.green};}
        .tk-fn{color:${cv.sky};}
        .tk-swatches{display:flex;gap:10px;margin:6px 0 2px;padding-left:2ch;flex-wrap:wrap;}
        .tk-sw{width:26px;height:26px;border-radius:7px;border:1px solid var(--line);cursor:pointer;transition:transform .2s;}
        .tk-sw:hover{transform:translateY(-3px);}
        .tk-sw:focus-visible{outline:2px solid var(--main);outline-offset:2px;}
        .tk-sw.act{box-shadow:0 0 0 2px var(--bg),0 0 0 4px var(--accent);}
        .tk-hint{font-size:11px;color:var(--muted);letter-spacing:.06em;margin-top:14px;padding-top:14px;border-top:1px dashed var(--line);}

        /* ---------- section common ---------- */
        .sec{padding:130px 0;border-bottom:1px solid var(--line);}
        .sec-ttl{display:flex;align-items:baseline;gap:18px;margin-bottom:64px;flex-wrap:wrap;}
        .sec-ttl .no{font-family:${theme.fonts.num};font-size:52px;line-height:1;color:transparent;-webkit-text-stroke:1px var(--accent);}
        .sec-ttl h2{font-size:clamp(22px,2.8vw,34px);font-weight:800;letter-spacing:-0.01em;word-break:keep-all;}
        .sec-ttl .lb{font-family:${theme.fonts.disp};font-size:10px;font-weight:700;letter-spacing:.32em;color:var(--muted);width:100%;}

        /* ---------- project media (browser frame + hover) ---------- */
        .md-frm{display:block;position:relative;border:1px solid var(--line);border-radius:14px;background:var(--bg-card);overflow:hidden;transition:transform .35s ease,border-color .3s,background .45s;}
        a.md-frm{cursor:pointer;}
        .md-frm:hover{transform:translateY(-6px);}
        .md-frm:focus-visible{outline:2px solid var(--accent);outline-offset:3px;}
        .md-bar{display:flex;align-items:center;gap:6px;padding:12px 16px;border-bottom:1px solid var(--line);}
        .md-bar i{width:9px;height:9px;border-radius:50%;background:var(--line);flex-shrink:0;}
        .md-bar em{font-family:${theme.fonts.mono};font-style:normal;font-size:10px;letter-spacing:.14em;color:var(--muted);margin-left:8px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
        .md-bd{position:relative;overflow:hidden;}
        .md-bd img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .55s ease;}
        .md-frm:hover .md-bd img{transform:scale(1.05);}
        .md-ph{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;transition:transform .55s ease;}
        .md-frm:hover .md-ph{transform:scale(1.04);}
        .md-ph span{font-size:30px;}
        .md-ph em{font-family:${theme.fonts.mono};font-style:normal;font-size:11px;letter-spacing:.14em;color:var(--muted);text-align:center;padding:0 12px;}
        .md-ph small{font-family:${theme.fonts.mono};font-size:9.5px;letter-spacing:.08em;color:var(--muted);opacity:.55;}
        .md-ov{position:absolute;inset:0;opacity:0;display:flex;align-items:flex-end;justify-content:flex-start;padding:22px;transition:opacity .35s ease;}
        .md-cta{font-family:${theme.fonts.mono};font-size:12px;letter-spacing:.14em;color:#fff;transform:translateY(8px);transition:transform .35s ease;}
        @media (hover:hover){
          .md-frm:hover .md-ov{opacity:1;}
          .md-frm:hover .md-cta{transform:none;}
        }
        @media (hover:none){
          .md-ov{opacity:.85;}
          .md-cta{transform:none;}
        }

        /* ---------- profile media (accent offset frame) ---------- */
        .pr-frm{position:relative;max-width:400px;}
        .pr-frm::after{content:"";position:absolute;inset:0;border:1.5px solid var(--accent);border-radius:14px;transform:translate(14px,14px);transition:transform .35s ease,border-color .3s;pointer-events:none;}
        .pr-frm:hover::after{transform:translate(6px,6px);}
        .pr-bd{position:relative;aspect-ratio:4/5;border:1px solid var(--line);border-radius:14px;background:var(--bg-card);overflow:hidden;transition:background .45s;}
        .pr-bd img{width:100%;height:100%;object-fit:cover;display:block;filter:saturate(.92);transition:filter .35s;}
        .pr-frm:hover .pr-bd img{filter:none;}

        /* ---------- about ---------- */
        .ab-grid{display:grid;grid-template-columns:1.1fr .9fr;gap:70px;align-items:start;}
        .ab-txt p{color:var(--sub);font-size:16px;margin-bottom:20px;word-break:keep-all;}
        .ab-txt strong{color:var(--main);}
        .ab-quote{font-family:${theme.fonts.mono};font-size:13px;color:var(--accent);border-left:2px solid var(--accent);padding-left:16px;margin-top:28px;transition:color .3s,border-color .3s;}

        /* ---------- journey ---------- */
        .jn-list{position:relative;padding-left:34px;display:flex;flex-direction:column;gap:44px;}
        .jn-list::before{content:"";position:absolute;left:8px;top:6px;bottom:6px;width:1px;background:var(--line);}
        .jn-item{position:relative;}
        .jn-dot{position:absolute;left:-31px;top:7px;width:11px;height:11px;border-radius:50%;background:var(--bg);border:2px solid var(--muted);transition:background .45s;}
        .jn-date{font-family:${theme.fonts.mono};font-size:12px;letter-spacing:.1em;color:var(--muted);margin-bottom:6px;}
        .jn-ttl{font-size:19px;font-weight:800;display:flex;align-items:center;gap:12px;flex-wrap:wrap;margin-bottom:8px;}
        .jn-tag{font-family:${theme.fonts.mono};font-size:11px;letter-spacing:.06em;padding:4px 10px;border-radius:999px;border:1px solid var(--line);}
        .jn-item p{color:var(--sub);font-size:14.5px;max-width:640px;word-break:keep-all;}

        /* ---------- skills ---------- */
        .sk-tabs{display:flex;gap:10px;flex-wrap:wrap;margin-bottom:42px;}
        .sk-tab{background:var(--bg-card);border:1px solid var(--line);border-radius:999px;padding:10px 22px;font-family:${theme.fonts.mono};font-size:12.5px;letter-spacing:.08em;color:var(--muted);cursor:pointer;transition:all .25s;}
        .sk-tab:hover{color:var(--main);}
        .sk-tab.act{background:var(--accent);border-color:var(--accent);color:var(--bg);font-weight:500;}
        .sk-tab:focus-visible{outline:2px solid var(--main);outline-offset:2px;}
        .sk-list{display:grid;grid-template-columns:1fr 1fr;gap:18px;}
        .sk-item{background:var(--bg-card);border:1px solid var(--line);border-radius:14px;padding:26px 28px;transition:border-color .3s,background .45s;}
        .sk-item:hover{border-color:var(--accent);}
        .sk-item h3{font-size:16.5px;font-weight:800;margin-bottom:10px;display:flex;align-items:center;gap:10px;}
        .sk-item h3::before{content:"";width:8px;height:8px;border-radius:2px;background:var(--accent);flex-shrink:0;transition:background .3s;}
        .sk-item p{font-size:14px;color:var(--sub);word-break:keep-all;}

        /* ---------- main projects ---------- */
        .pf-list{display:flex;flex-direction:column;gap:110px;}
        .pf-item{display:grid;grid-template-columns:1fr 1fr;gap:64px;align-items:center;}
        .pf-item:nth-child(even) .pf-txt{order:2;}
        .pf-item:nth-child(even) .pf-media{order:1;}
        .pf-lb{font-family:${theme.fonts.disp};font-size:10.5px;font-weight:700;letter-spacing:.3em;display:block;margin-bottom:14px;}
        .pf-name{font-size:clamp(24px,3vw,38px);font-weight:800;letter-spacing:-0.01em;display:flex;align-items:baseline;gap:16px;flex-wrap:wrap;}
        .pf-num{font-family:${theme.fonts.num};font-size:.8em;color:transparent;-webkit-text-stroke:1px ${cv.muted};}
        .pf-meta{font-family:${theme.fonts.mono};font-size:12px;color:var(--muted);letter-spacing:.05em;margin:10px 0 22px;line-height:1.9;}
        .pf-desc{color:var(--sub);font-size:15.5px;word-break:keep-all;margin-bottom:22px;}
        .pf-role{list-style:none;display:flex;flex-direction:column;gap:10px;margin-bottom:26px;}
        .pf-role li{font-size:14px;color:var(--sub);padding-left:18px;position:relative;word-break:keep-all;}
        .pf-stack{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:26px;}
        .pf-stack span{font-family:${theme.fonts.mono};font-size:11.5px;padding:5px 11px;border-radius:6px;border:1px solid var(--line);color:var(--muted);}
        .pf-links{display:flex;gap:12px;flex-wrap:wrap;}
        .pf-links a{font-family:${theme.fonts.mono};font-size:12.5px;letter-spacing:.08em;padding:11px 22px;border-radius:8px;border:1px solid var(--line);transition:all .25s;}
        .pf-links a:hover{transform:translateY(-1px);}
        .pf-links a:focus-visible{outline:2px solid var(--main);outline-offset:2px;}

        /* ---------- sub projects ---------- */
        .sub-hd{display:flex;align-items:center;justify-content:space-between;gap:20px;flex-wrap:wrap;margin:130px 0 40px;}
        .sub-ttl{font-family:${theme.fonts.disp};font-size:12px;font-weight:700;letter-spacing:.3em;color:var(--muted);}
        .sub-filters{display:flex;gap:8px;}
        .sub-filters button{background:var(--bg-card);border:1px solid var(--line);border-radius:999px;padding:8px 18px;font-family:${theme.fonts.mono};font-size:11.5px;letter-spacing:.1em;color:var(--muted);cursor:pointer;transition:all .25s;}
        .sub-filters button.act{background:var(--accent);border-color:var(--accent);color:var(--bg);}
        .sub-filters button:focus-visible{outline:2px solid var(--main);outline-offset:2px;}
        .sub-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:22px;}
        .sub-card{background:var(--bg-card);border:1px solid var(--line);border-radius:14px;padding:26px 28px;display:flex;flex-direction:column;transition:border-color .3s,transform .3s,background .45s;}
        .sub-card:hover{transform:translateY(-5px);}
        .sub-card h3{font-size:17px;font-weight:800;margin-bottom:6px;display:flex;justify-content:space-between;align-items:center;gap:10px;}
        .sub-card h3 i{font-style:normal;font-size:14px;color:var(--muted);}
        .sub-cat{font-family:${theme.fonts.mono};font-size:10.5px;letter-spacing:.14em;color:var(--muted);margin-bottom:14px;}
        .sub-card p{font-size:13.5px;color:var(--sub);word-break:keep-all;flex:1;margin-bottom:20px;}
        .sub-stack{display:flex;flex-wrap:wrap;gap:7px;}
        .sub-stack span{font-family:${theme.fonts.mono};font-size:11px;color:var(--muted);}
        .sub-stack span::before{content:"#";}
        .sub-next{border-style:dashed;align-items:center;justify-content:center;text-align:center;gap:10px;min-height:200px;cursor:default;}
        .sub-next b{font-family:${theme.fonts.num};font-size:26px;letter-spacing:.06em;color:var(--muted);font-weight:400;}
        .sub-next p{flex:0;margin:0;font-size:12.5px;}

        /* ---------- contact ---------- */
        .ft{padding:150px 0 80px;text-align:center;position:relative;}
        .ft-bg{position:absolute;inset:0;pointer-events:none;background:radial-gradient(620px 340px at 50% 100%, ${cv.deepPink}${mode === "dark" ? "33" : "26"}, transparent 70%);}
        .ft .inner{position:relative;}
        .ft-ttl{font-family:${theme.fonts.num};font-size:clamp(48px,8vw,110px);line-height:.95;letter-spacing:.02em;margin-bottom:26px;}
        .ft-ttl b{color:var(--accent);font-weight:400;transition:color .3s;}
        .ft p{color:var(--sub);margin-bottom:46px;word-break:keep-all;}
        .ft-links{display:flex;justify-content:center;gap:24px;flex-wrap:wrap;}
        .ft-links a{font-family:${theme.fonts.mono};font-size:13px;letter-spacing:.06em;padding:14px 28px;border-radius:8px;border:1px solid var(--line);transition:all .25s;}
        .ft-links a:hover{border-color:var(--accent);color:var(--accent);transform:translateY(-1px);}
        .ft-links a.pri{color:var(--accent);border-color:var(--accent);font-weight:500;}
        .ft-links a.pri:hover{box-shadow:0 12px 28px -14px ${accent}aa;}
        .ft-copy{margin-top:76px;font-family:${theme.fonts.mono};font-size:11px;letter-spacing:.14em;color:var(--muted);}

        /* ---------- responsive ---------- */
        @media (max-width:960px){
          .hero .inner{grid-template-columns:1fr;gap:48px;}
          .ab-grid{grid-template-columns:1fr;gap:44px;}
          .sk-list{grid-template-columns:1fr;}
          .pf-item{grid-template-columns:1fr;gap:34px;}
          .pf-item:nth-child(even) .pf-txt{order:1;}
          .pf-item:nth-child(even) .pf-media{order:2;}
          .sub-grid{grid-template-columns:1fr 1fr;}
          .sec{padding:104px 0;}
        }
        @media (max-width:768px){
          .it-deco{right:-52%;width:120vw;}
          .dec-in{animation:itDeco 2.6s ease .9s forwards,itDrift 16s ease-in-out 3.5s infinite alternate;}
          @keyframes itDeco{from{opacity:0;transform:scale(.97);}to{opacity:.32;transform:scale(1);}}
          .top-btn{right:18px;bottom:18px;width:46px;height:46px;}
          .gnb{display:none;}
          .hbg{display:block;}
          .hd-r{gap:12px;}
          .inner{padding:0 26px;}
          .hero{padding:104px 0;}
          .pf-list{gap:80px;}
        }
        @media (max-width:480px){
          .inner{padding:0 20px;}
          .sec{padding:84px 0;}
          .sec-ttl{gap:12px;margin-bottom:48px;}
          .sec-ttl .no{font-size:38px;}
          .hero{padding:88px 0;}
          .hero-desc{font-size:15px;}
          .tk-card{padding:20px 18px;font-size:12px;}
          .tk-sw{width:30px;height:30px;}
          .jn-list{padding-left:26px;gap:36px;}
          .jn-dot{left:-23px;}
          .sub-grid{grid-template-columns:1fr;}
          .sub-hd{margin-top:96px;}
          .pf-links a{width:100%;text-align:center;}
          .ft-links a{width:100%;}
          .ft{padding:110px 0 60px;}
        }
      `}</style>

      {/* ============ HEADER ============ */}
      <header className="hd">
        <span className="pg" aria-hidden="true"><i ref={pgRef} /></span>
        <div className="inner">
          <button className="logo" onClick={() => scrollTo("intro")}>DOHA<em>.</em>DEV</button>
          <div className="hd-r">
            <ul className="gnb">
              {nav.map((n) => (
                <li key={n.id}>
                  <button className={activeSec === n.id ? "act" : ""} onClick={() => scrollTo(n.id)}>
                    <i>{n.no}.</i>{n.txt}
                  </button>
                </li>
              ))}
            </ul>
            <button
              className="th-tg"
              onClick={() => setMode(mode === "dark" ? "light" : "dark")}
              role="switch"
              aria-checked={mode === "light"}
              aria-label={`${mode === "dark" ? "라이트" : "다크"} 테마로 전환`}
            >
              {/* 트랙 위 고정 아이콘 — 썸에 가려진 쪽은 숨김 */}
              <span className={`th-ico l${mode === "dark" ? " hide" : ""}`} aria-hidden="true">
                <MoonIco />
              </span>
              <span className={`th-ico r${mode === "light" ? " hide" : ""}`} aria-hidden="true">
                <SunIco />
              </span>
              {/* 슬라이딩 썸 — 현재 모드 아이콘 */}
              <span className="th-thumb" aria-hidden="true">
                {mode === "dark" ? <MoonIco /> : <SunIco />}
              </span>
            </button>
            <button
              className={`hbg${menu ? " open" : ""}`}
              onClick={() => setMenu(!menu)}
              aria-label={menu ? "메뉴 닫기" : "메뉴 열기"}
              aria-expanded={menu}
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </header>

      {/* ============ MOBILE NAV ============ */}
      <nav className={`mnav${menu ? " open" : ""}`} aria-hidden={!menu}>
        <ul>
          {nav.map((n) => (
            <li key={n.id}>
              <button onClick={() => scrollTo(n.id)} tabIndex={menu ? 0 : -1}>
                <i>{n.no}</i>{n.txt}
              </button>
            </li>
          ))}
        </ul>
        <div className="mnav-ft">
          <a href="https://github.com/dohaim918" target="_blank" rel="noreferrer">GITHUB</a>
          <a href="mailto:nzspave1121@gmail.com">MAIL</a>
        </div>
      </nav>

      {/* ============ INTRO (fullscreen) ============ */}
      <section
        className={`it${playKey > 0 ? " fast" : ""}`}
        id="intro"
        ref={introRef}
        onMouseMove={onIntroMove}
        onMouseLeave={onIntroLeave}
      >
        {/* key 리마운트로 재진입 시 애니메이션 재생 */}
        <div key={playKey} style={{ display: "contents" }}>
        <div className="it-amb" />
        <div className="it-grid" />
        <div className="it-glow" ref={glowRef} />

        {/* 우측 SVG 장식 — 화면 밖에서 번져 나오는 리플 아크 필드 */}
        <div className="it-deco" ref={decoRef} aria-hidden="true">
          <div className="dec-in">
            <svg viewBox="0 0 1100 1100" fill="none">
              <defs>
                {/* 아크 그라디언트 — 특수값이라 변수화하지 않고 현재 팔레트에서 직접 주입 */}
                <linearGradient id="dgA" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor={accent} />
                  <stop offset="100%" stopColor={cv.lavender} stopOpacity="0.08" />
                </linearGradient>
                <linearGradient id="dgB" x1="1" y1="1" x2="0" y2="0">
                  <stop offset="0%" stopColor={cv.sky} stopOpacity="0.75" />
                  <stop offset="100%" stopColor={accent} stopOpacity="0.05" />
                </linearGradient>
              </defs>

              {/* 동심 리플 링 — 바깥으로 갈수록 옅어짐 */}
              <circle cx="550" cy="550" r="150" stroke="var(--muted)" strokeWidth="1" opacity=".3" />
              <circle cx="550" cy="550" r="230" stroke="var(--muted)" strokeWidth="1" opacity=".24" />
              <circle cx="550" cy="550" r="320" stroke="var(--muted)" strokeWidth="1" opacity=".18" />
              <circle cx="550" cy="550" r="430" stroke="var(--muted)" strokeWidth="1" opacity=".13" />
              <circle cx="550" cy="550" r="540" stroke="var(--muted)" strokeWidth="1" opacity=".08" />

              {/* 파인 대시 링 — 아주 느린 회전 */}
              <g className="d-dash">
                <circle cx="550" cy="550" r="380" stroke="var(--muted)" strokeWidth="1" strokeDasharray="2 16" opacity=".22" />
              </g>

              {/* 액센트 그라디언트 아크 — 혜성 꼬리 */}
              <g className="d-arcA">
                <circle cx="550" cy="550" r="460" stroke="url(#dgA)" strokeWidth="2"
                  strokeLinecap="round" strokeDasharray="750 2140" transform="rotate(-70 550 550)" />
              </g>
              <g className="d-arcB">
                <circle cx="550" cy="550" r="250" stroke="url(#dgB)" strokeWidth="1.5"
                  strokeLinecap="round" strokeDasharray="220 1351" transform="rotate(140 550 550)" />
              </g>

              {/* 궤도 도트 — 헤일로 + 딥 오빗 */}
              <g className="d-orb">
                <circle cx="550" cy="230" r="4" fill={accent} />
                <circle cx="550" cy="230" r="9" stroke={accent} strokeWidth="1" opacity=".3" />
              </g>
              <g className="d-orb2">
                <circle cx="550" cy="12" r="2.5" fill="var(--muted)" opacity=".5" />
              </g>

              {/* 코어 */}
              <circle cx="550" cy="550" r="3.5" fill={accent} opacity=".85" />
            </svg>
          </div>
        </div>

        {/* 부유 네온 도트 — 특수 위치·색값은 인라인 유지 */}
        <span className="it-dot" style={{ top: "22%", left: "12%", background: cv.violet, animationDuration: "1s,7s" }} />
        <span className="it-dot" style={{ top: "68%", left: "8%", background: cv.green, animationDuration: "1s,5.5s" }} />
        <span className="it-dot" style={{ top: "18%", right: "18%", background: cv.sky, animationDuration: "1s,6.5s" }} />
        <span className="it-dot" style={{ top: "74%", right: "10%", background: cv.pink, animationDuration: "1s,8s" }} />
        <span className="it-dot" style={{ top: "44%", right: "30%", background: cv.lavender, animationDuration: "1s,7.5s" }} />

        <div className="inner">
          <p className="it-type" aria-label="hello, i'm doha : design to code">
            <i>{"// hello, i'm doha : design to code"}</i><b>_</b>
          </p>
          <h1 className="it-typo" ref={typoRef}>
            <span className="it-ln l1"><span>DESIGN</span></span>
            <span className="it-ln l2">
              <span><i className="arw">→</i> <i className="cd">CODE</i></span>
            </span>
          </h1>
          <p className="it-kr">
            디자인을 코드로 옮기는 프론트엔드 개발자, <strong>김도하</strong>입니다.
          </p>
          <p className="it-sub">FRONTEND · DESIGN SYSTEM · 2026</p>
        </div>

        <button className="it-cue" onClick={() => scrollTo("hero")} aria-label="아래로 스크롤">
          <em>SCROLL</em>
          <span className="cue-ms"><i /></span>
        </button>
        </div>
      </section>

      {/* ============ HERO — 테마 시스템 시연 ============ */}
      <section className="hero" id="hero">
        <div className="hero-bg" />
        <div className="inner">
          <div>
            <p className="hero-hello">// this page itself is a theme system</p>
            <h2 className="hero-ttl">
              지금 보고 계신 이 페이지도<br />
              <span className="grad">하나의 테마 시스템</span>으로 움직입니다.
            </h2>
            <p className="hero-desc">
              색·폰트·간격이 <strong>theme.js 토큰 하나</strong>로 관리됩니다.
              오른쪽 스와치와 상단 토글을 눌러보세요 — 다크·라이트 반전과
              액센트 교체가 즉시 일어납니다.
            </p>
            <div className="hero-sns">
              <a href="https://github.com/dohaim918" target="_blank" rel="noreferrer">GITHUB ↗</a>
              <a href="https://www.instagram.com/speiq_kskw" target="_blank" rel="noreferrer">INSTAGRAM ↗</a>
              <a href="mailto:nzspave1121@gmail.com">MAIL ↗</a>
            </div>
          </div>

          {/* Signature — 살아있는 theme.js 토큰 카드 */}
          <div className="tk-card" aria-label="테마 토큰 카드 — 스와치를 누르면 페이지 액센트가 바뀝니다">
            <div className="tk-bar"><i /><i /><i /></div>
            <div><span className="tk-key">const </span>doha <span className="tk-key">= {"{"}</span></div>
            <div style={{ paddingLeft: "2ch" }}>
              <span className="tk-key">role:</span> <span className="tk-str">'Design-to-Code'</span>,
            </div>
            <div style={{ paddingLeft: "2ch" }}>
              <span className="tk-key">mode:</span> <span className="tk-str">'{mode}'</span>,
            </div>
            <div style={{ paddingLeft: "2ch" }}>
              <span className="tk-key">accent:</span>{" "}
              <span className="tk-str" style={{ color: accent, transition: "color .3s" }}>'{accent}'</span>,
            </div>
            <div className="tk-swatches">
              {accentKeys.map((k) => (
                <button
                  key={k}
                  className={`tk-sw${accentKey === k ? " act" : ""}`}
                  style={{ background: cv[k] }}
                  onClick={() => setAccentKey(k)}
                  aria-label={`액센트 컬러 ${k}로 변경`}
                  title={k}
                />
              ))}
            </div>
            <div><span className="tk-key">{"}"}</span></div>
            <p className="tk-hint">// 스와치와 상단 토글을 눌러보세요 — 테마 시스템이 실시간으로 반전됩니다</p>
          </div>
        </div>
      </section>

      {/* ============ 01. ABOUT ============ */}
      <section className="sec" id="about">
        <div className="inner">
          <div className="sec-ttl rv" ref={addReveal}>
            <span className="lb">ABOUT ME</span>
            <span className="no">01</span>
            <h2>단순히 예쁜 화면이 아닌, 개발 가능한 구조를 설계합니다</h2>
          </div>
          <div className="ab-grid">
            <div className="ab-txt rv" ref={addReveal}>
              <p>
                디자인 툴에서 개발로 넘어온 만큼, <strong>화면의 균형감과 정보의 흐름</strong>을
                코드 구조만큼 중요하게 다룹니다. Photoshop · Illustrator · After Effects의
                감각은 그대로 인터랙션과 비주얼 디테일로 이어집니다.
              </p>
              <p>
                PULSE에서 <strong>전체 테마 디자인 시스템</strong>을, flowdash에서
                <strong> 디자인 총괄과 핵심 로직</strong>을 맡았고, 반복되는 스타일 작업은
                직접 만든 theme.js 스타터킷으로 시스템화했습니다. 지금은 화성야화 웹을
                기획부터 구현까지 단독으로 진행하고 있습니다.
              </p>
              <p className="ab-quote">"Step by step, I'm learning and improving."</p>
            </div>
            <div className="rv" ref={addReveal}>
              <PrMedia img={null} />
            </div>
          </div>
        </div>
      </section>

      {/* ============ 02. JOURNEY ============ */}
      <section className="sec" id="journey">
        <div className="inner">
          <div className="sec-ttl rv" ref={addReveal}>
            <span className="lb">JOURNEY</span>
            <span className="no">02</span>
            <h2>여섯 달의 기록, 다섯 번의 성장</h2>
          </div>
          <div className="jn-list">
            {journey.map((j) => (
              <div className="jn-item rv" key={j.date} ref={addReveal}>
                <span className="jn-dot" style={{ borderColor: cv[j.accent] }} />
                <p className="jn-date">{j.date}</p>
                <h3 className="jn-ttl">
                  {j.ttl}
                  <span className="jn-tag" style={{ color: cv[j.accent], borderColor: `${cv[j.accent]}55` }}>{j.tag}</span>
                </h3>
                <p>{j.txt}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 03. SKILLS ============ */}
      <section className="sec" id="skills">
        <div className="inner">
          <div className="sec-ttl rv" ref={addReveal}>
            <span className="lb">SKILLS</span>
            <span className="no">03</span>
            <h2>쓸 수 있는 것보다, 해본 것을 씁니다</h2>
          </div>
          <div className="sk-tabs rv" ref={addReveal} role="tablist" aria-label="스킬 카테고리">
            {Object.keys(skillTabs).map((k) => (
              <button key={k} className={`sk-tab${tab === k ? " act" : ""}`} onClick={() => setTab(k)} role="tab" aria-selected={tab === k}>
                {k}
              </button>
            ))}
          </div>
          <div className="sk-list" role="tabpanel">
            {skillTabs[tab].map((s) => (
              <div className="sk-item" key={s.name}>
                <h3>{s.name}</h3>
                <p>{s.txt}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 04. PROJECTS ============ */}
      <section className="sec" id="projects">
        <div className="inner">
          <div className="sec-ttl rv" ref={addReveal}>
            <span className="lb">MAIN PROJECTS</span>
            <span className="no">04</span>
            <h2>세 개의 대표작, 세 가지 색</h2>
          </div>

          <div className="pf-list">
            {mains.map((p) => (
              <article className="pf-item rv" key={p.num} ref={addReveal}>
                <div className="pf-txt">
                  <span className="pf-lb" style={{ color: cv[p.accent] }}>{p.label}</span>
                  <h3 className="pf-name"><span className="pf-num">{p.num}</span>{p.name}</h3>
                  <p className="pf-meta">{p.period}<br />{p.team}</p>
                  <p className="pf-desc">{p.desc}</p>
                  <ul className="pf-role">
                    {p.role.map((r, i) => (
                      <li key={i}>
                        <i style={{ position: "absolute", left: 0, top: 10, width: 7, height: 2, background: cv[p.accent] }} />
                        {r}
                      </li>
                    ))}
                  </ul>
                  <div className="pf-stack">{p.stack.map((s) => <span key={s}>{s}</span>)}</div>
                  <div className="pf-links">
                    {p.links.map((l) => (
                      <a
                        key={l.txt}
                        href={l.url}
                        target="_blank"
                        rel="noreferrer"
                        onMouseEnter={(e) => { e.currentTarget.style.color = cv[p.accent]; e.currentTarget.style.borderColor = cv[p.accent]; }}
                        onMouseLeave={(e) => { e.currentTarget.style.color = ""; e.currentTarget.style.borderColor = ""; }}
                      >
                        {l.txt} ↗
                      </a>
                    ))}
                  </div>
                </div>
                <div className="pf-media" style={{ boxShadow: `0 30px 80px -40px ${cv[p.accent]}55`, borderRadius: 14 }}>
                  <Media
                    img={p.img}
                    label={p.imgLabel}
                    accent={cv[p.accent]}
                    url={p.links[0]?.url}
                  />
                </div>
              </article>
            ))}
          </div>

          {/* Sub Projects — 필터 + 확장 슬롯 */}
          <div className="sub-hd rv" ref={addReveal}>
            <h3 className="sub-ttl">SUB PROJECTS</h3>
            <div className="sub-filters" role="tablist" aria-label="프로젝트 필터">
              {subFilters.map((f) => (
                <button key={f.key} className={filter === f.key ? "act" : ""} onClick={() => setFilter(f.key)} role="tab" aria-selected={filter === f.key}>
                  {f.txt}
                </button>
              ))}
            </div>
          </div>
          <div className="sub-grid">
            {subs.map((s) => (
              <a
                className="sub-card"
                key={s.name}
                href={s.url}
                target="_blank"
                rel="noreferrer"
                style={{ boxShadow: `0 20px 60px -40px ${cv[s.accent]}55` }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = `${cv[s.accent]}66`)}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "")}
              >
                <h3>{s.name}<i>↗</i></h3>
                <p className="sub-cat">{s.category.toUpperCase()}</p>
                <p>{s.txt}</p>
                <div className="sub-stack">{s.stack.map((t) => <span key={t}>{t}</span>)}</div>
              </a>
            ))}
            <div className="sub-card sub-next" aria-hidden="true">
              <b>+ NEXT WORK</b>
              <p>다음 작업이 이 자리에 추가됩니다</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 05. CONTACT ============ */}
      <footer className="ft" id="contact">
        <div className="ft-bg" />
        <div className="inner">
          <h2 className="ft-ttl">LET'S BUILD<br /><b>SOMETHING BRIGHT</b></h2>
          <p>함께 작업하고 싶거나 더 많은 정보가 필요하다면, 언제든 연락 주세요. 새로운 기회를 기다리고 있습니다.</p>
          <div className="ft-links">
            <a className="pri" href="mailto:nzspave1121@gmail.com">MAIL — nzspave1121@gmail.com</a>
            <a href="https://github.com/dohaim918" target="_blank" rel="noreferrer">GITHUB ↗</a>
            <a href="https://www.instagram.com/speiq_kskw" target="_blank" rel="noreferrer">INSTAGRAM ↗</a>
          </div>
          <p className="ft-copy">© 2026 DOHA KIM · DESIGN TO CODE · PORTFOLIO v11</p>
        </div>
      </footer>

      {/* ============ TOP BUTTON — 인트로 벗어나면 등장 ============ */}
      <button
        className={`top-btn${topBtn ? " show" : ""}`}
        onClick={() => scrollTo("intro")}
        aria-label="맨 위로 이동"
        tabIndex={topBtn ? 0 : -1}
      >
        <svg viewBox="0 0 24 24"><path d="M12 19V5M5 12l7-7 7 7" /></svg>
      </button>
    </div>
  );
}

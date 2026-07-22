/* type: "main" = 대표작 큰 카드 / "sub" = 그리드 카드
   category: "team" | "personal" — 필터 탭 자동 반영 */
/* main은 과거 → 최신 순서로 나열합니다 (배열 순서 = 화면 렌더 순서) */
export const projects = [
  {
    type: "main",
    category: "team",
    num: "01",
    label: "KANBAN TASK DASHBOARD",
    name: "flowdash",
    period: "2026.02",
    team: "2인 팀 프로젝트 (TODO_404) · 디자인 총괄 / UI · Logic",
    accent: "pink",
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
    img: "/flowdash.jpg",
    imgLabel: "DASHBOARD SCREENSHOT",
  },
  {
    type: "main",
    category: "team",
    num: "02",
    label: "GAMING GEAR E-COMMERCE",
    name: "PULSE",
    period: "2026.03.13 – 2026.04.06",
    team: "5인 팀 프로젝트 · 메인 페이지 / 테마 디자인 시스템 총괄",
    accent: "violet",
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
    img: "/pulse.jpg",
    imgLabel: "MAIN PAGE SCREENSHOT",
  },
  {
    type: "main",
    category: "personal",
    num: "03",
    label: "MEMORIES OF THE NIGHT",
    name: "화성야화",
    period: "2026.06 – 진행중",
    team: "개인 프로젝트 · 기획 / 디자인 / 개발",
    accent: "lavender",
    desc: "조선의 성곽 위로 피어난 빛과 예술, 그 밤의 장면을 웹으로 옮긴 작업. 야간 미디어아트 축제 '화성야화'의 행사 소개 및 관공서 웹 페이지입니다.",
    role: [
      "행사 세계관을 담은 브랜드 카피와 비주얼 톤 설계",
      "메인 · 프로그램 소개 페이지 구조 기획 및 React 구현",
      "관공서 웹 특성에 맞춘 정보 위계와 접근성 정리",
    ],
    stack: ["React", "Vite", "JavaScript", "Figma"],
    links: [{ txt: "GITHUB", url: "https://github.com/dohaim918/hwaseong-yahwa-web" }],
    img: "/hwaseong.jpg",
    imgLabel: "MAIN VISUAL",
  },
  /* 보관 — 서브 프로젝트에서 잠시 내렸습니다. 되살리려면 주석만 해제하세요.
     (Journey의 "반복을 시스템으로" 항목은 성장 기록이라 그대로 둡니다)
  {
    type: "sub",
    category: "personal",
    name: "React Base Template",
    accent: "sky",
    txt: "Vite + React + Emotion 스타터킷. T.spacing · T.fontSize 등 디자인 토큰과 alpha() · textGrad() 유틸을 theme.js 한 곳에서 관리합니다.",
    stack: ["Vite", "React", "Emotion"],
    url: "https://github.com/dohaim918/react-base-template",
  },
  */
  {
    type: "sub",
    category: "personal",
    name: "About Me Page",
    accent: "green",
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

export const subFilters = [
  { key: "all", txt: "ALL" },
  { key: "team", txt: "TEAM" },
  { key: "personal", txt: "PERSONAL" },
];

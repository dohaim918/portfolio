export const theme = {
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

export const accentKeys = ["violet", "pink", "green", "sky", "lavender"];

/* 토큰 색에 16진 알파를 붙입니다 — alpha(cv.pink, "55") → "#f776c455" */
export const alpha = (color, aa) => `${color}${aa}`;

/* 프로젝트별 액센트 호버 — 전역 --accent가 아닌 개별 색이라 CSS가 아닌 JS로 걸립니다.
   반환값을 요소에 그대로 펼쳐 넣으면 마우스 진입 시 색이 붙고 이탈 시 원래대로 돌아갑니다. */
export const accentHover = (color, props = ["borderColor"]) => ({
  onMouseEnter: (e) => props.forEach((p) => (e.currentTarget.style[p] = color)),
  onMouseLeave: (e) => props.forEach((p) => (e.currentTarget.style[p] = "")),
});

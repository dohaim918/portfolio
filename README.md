# DOHA KIM — Design to Code

디자인 툴에서 프론트엔드로 넘어온 개발자 김도하의 포트폴리오입니다.

**[사이트 보기 →](https://portfolio-seven-pink-g0wq2hzcp5.vercel.app)**

---

## 이 페이지가 곧 포트폴리오입니다

제 강점은 **테마·디자인 토큰 시스템 설계**입니다.
그래서 그 역량을 글로 설명하는 대신, 페이지 자체를 증거로 만들었습니다.

헤더의 색 스와치를 눌러보세요. 액센트 하나를 바꾸면 버튼·글자·카드 글로우·섹션 배경까지
페이지 전체가 함께 움직입니다. `theme.js` 토큰 한 곳에서 관리되기 때문입니다.
다크·라이트 토글도 밝기만 뒤집는 게 아니라, 팔레트를 통째로 반전시킵니다.

```js
// src/theme.js
dark:  { violet: "#8b7cf7", pink: "#f776c4", deepPink: "#922D6A", ... }
light: { violet: "#5a48d6", pink: "#d43e96", deepPink: "#922D6A", ... }
```

라이트 모드에서 네온 컬러를 그대로 쓰면 대비가 무너집니다.
그래서 같은 이름의 토큰이 모드별로 다른 값을 갖도록 설계했습니다.

---

## 기술 스택

| 구분 | 사용 기술 |
|---|---|
| 코어 | React 19, Vite |
| 스타일 | 커스텀 CSS (런타임 토큰 보간) |
| 폰트 | Syncopate, Bebas Neue, IBM Plex Mono, Pretendard |
| 배포 | Vercel |

**Tailwind를 쓰지 않았습니다.** 스타일 대부분이 `${accent}22` 같은 런타임 값이거나
휠 게이트·인트로 시퀀스 같은 페이지 전용 키프레임이라, 유틸리티 클래스로 옮겨도 이득이 적었습니다.

---

## 구조

```
src/
├── theme.js              # 컬러·폰트 토큰, alpha() · accentHover() 유틸
├── styles/globalCss.js   # buildCss({ cv, accent, mode }) — 토큰을 주입해 전역 스타일 생성
├── data/                 # 콘텐츠 분리 — 새 작업은 객체 하나 추가로 반영됩니다
│   ├── projects.js       #   ★ 확장 지점
│   ├── journey.js  skills.js  sections.js  social.js  nav.js
├── hooks/
│   ├── useWheelGate.js   # 인트로 스크롤 제어 (아래 참조)
│   ├── useIntroGate.js   # 재진입 시 등장 시퀀스 재생 타이밍
│   ├── useScrollSpy.js   # 현재 섹션 → 네비 하이라이트
│   └── useReveal.js      # IntersectionObserver 기반 등장 애니메이션
└── components/           # Section · ActionLink · Media · MainProjectCard 등
```

새 프로젝트를 추가할 때 컴포넌트를 고칠 일이 없도록 만들었습니다.
`data/projects.js`에 객체 하나만 넣으면 카드·필터·이미지 분기까지 자동으로 붙습니다.

---

## 직접 풀어낸 문제들

만들면서 실제로 막혔던 지점들입니다. 원인을 추측으로 넘기지 않고 확인해서 고쳤습니다.
_(제목을 눌러 펼쳐보세요)_

<details>
<summary><b>인트로 스크롤이 끊기던 문제</b> — 스크롤을 조종하는 주체는 하나여야 한다</summary>

<br>

인트로 구간은 휠 한 번에 정확히 한 화면씩 넘어갑니다.
처음엔 CSS `scroll-snap`과 `scroll-behavior: smooth`, JS 애니메이션을 함께 썼는데
**매 프레임의 `scrollTop` 대입이 각각 스무스 처리되면서 이중 이징으로 끊겼습니다.**

스크롤을 조종하는 주체를 하나로 모아 해결했습니다.
CSS 스냅과 스무스를 모두 걷어내고, 제스처 1회를 rAF 글라이드 한 번으로 바꿨습니다.
글라이드 중과 직후 280ms 동안 들어오는 관성 이벤트는 전부 흡수합니다.

</details>

<details>
<summary><b>재진입할 때 화면이 깜빡이던 문제</b> — 완성된 화면을 남겨두면 안 된다</summary>

<br>

스크롤을 내렸다 올리면 인트로가 다시 재생되는데, 완성된 화면이 남아 있다가
리마운트되면서 **보이던 게 사라졌다 다시 나타나** 깜빡였습니다.

화면에서 완전히 벗어났을 때 미리 초기 상태로 되돌려 두고,
스크롤이 멎으면 그때 재생하도록 바꿨습니다.
다만 완전 정지까지 기다리니 이번엔 등장이 늦게 느껴져서,
프레임당 이동량이 3px 아래로 떨어지는 순간 바로 시작하게 했습니다.

</details>

<details>
<summary><b>배경 그라디언트가 각지게 잘리던 문제</b> — 눈이 아니라 픽셀로 찾았다</summary>

<br>

섹션 구분선을 없애자 경계에 칼로 자른 듯한 가로 자국이 드러났습니다.
그라디언트가 색이 남아 있는 채로 섹션 상자 끝에 닿아 끊긴 것이었고,
**원래부터 잘려 있었는데 구분선이 그 위를 덮고 있어** 안 보였을 뿐이었습니다.

어두운 배경에서는 눈으로 찾기 어려워, 전체 페이지 스크린샷의 세로 밝기를 훑어
값이 한 픽셀 만에 튀는 지점을 특정했습니다. 이후 규칙을 세웠습니다.

```
중심Y ± (세로반지름 × 페이드끝)  →  0~100% 안에 들어와야 잘리지 않음
```

</details>

<details>
<summary><b>글리치 효과가 스크린리더에 세 번 읽히던 문제</b> — 화면은 멀쩡해도 접근성 트리는 다르다</summary>

<br>

`DESIGN → CODE`의 CODE에 색수차 글리치를 넣으려고 `::before`/`::after`로 글자를 두 겹 복제했는데,
**의사요소의 `content` 텍스트도 스크린리더가 읽어서** 제목이 `DESIGN → CODE CODE CODE`로 읽혔습니다.
의사요소에는 `aria-hidden`을 달 수 없어 HTML로는 막을 방법이 없었습니다.

`content`의 대체 텍스트 문법으로 빈 값을 줘서 해결했습니다.
미지원 브라우저에서는 선언 전체가 무시돼 글리치만 빠지므로 안전합니다.

```css
.cd::before { content: attr(data-text) / ""; }  /* / "" 가 스크린리더에서 감춤 */
```

</details>

<details>
<summary><b>대형 타이포 외곽선이 이중으로 보이던 문제</b> — 웹폰트의 synthetic bold</summary>

<br>

인트로 `DESIGN`의 외곽선(`-webkit-text-stroke`)이 여러 겹으로 겹쳐 보였습니다.
Bebas Neue는 단일 굵기 웹폰트라 굵게 렌더할 때 **브라우저가 글자를 인위적으로 굵게(synthetic bold) 만드는데**,
이 과정에서 stroke가 원래 글자와 굵어진 글자 두 겹에 각각 그려지고 있었습니다.

`font-weight`를 명시해 브라우저의 임의 보정을 끄고, stroke 두께를 조정해 해결했습니다.

</details>

---

## 접근성 · 반응형

- `prefers-reduced-motion: reduce`에서 모든 모션을 끄고 최종 상태를 즉시 표시합니다
- 인터랙티브 요소에 `:focus-visible` 아웃라인, 터치 타깃 44px 확보
- 브레이크포인트 3단계(960 / 768 / 480)에서 레이아웃을 각각 검증했습니다

---

## 로컬 실행

```bash
npm install
npm run dev      # http://localhost:5173
npm run build
```

---

## 함께 만든 프로젝트

| 프로젝트 | 설명 | 역할 |
|---|---|---|
| [화성야화](https://github.com/dohaim918/hwaseong-yahwa-web) | 야간 미디어아트 축제 웹 | 개인 · 기획 / 디자인 / 개발 |
| [PULSE](https://github.com/dohaim918/PULSE) | 게이밍 기어 이커머스 | 5인 팀 · 메인 페이지 / 테마 시스템 총괄 |
| [flowdash](https://github.com/dohaim918/flowdash) | 칸반 태스크 대시보드 | 2인 팀 · 디자인 총괄 / UI · Logic |

---

**김도하** · [GitHub](https://github.com/dohaim918) · nzspave1121@gmail.com

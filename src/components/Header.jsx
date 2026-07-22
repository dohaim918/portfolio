import { nav } from "../data/nav";

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

export default function Header({ activeSec, scrollTo, mode, setMode, menu, setMenu, pgRef }) {
  return (
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
  );
}

import { useEffect, useRef, useState } from "react";
import { nav } from "../data/nav";
import { accentKeys } from "../theme";

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

/* 액센트 스와치 — theme.js 토큰을 실시간으로 바꿔보는 시연 장치.
   색을 골라도 패널을 닫지 않습니다 — 여러 색을 연달아 눌러보는 게 시연의 핵심입니다. */
function AccentPicker({ accentKey, setAccentKey, cv }) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);
  const closeTimer = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e) => { if (!wrapRef.current?.contains(e.target)) setOpen(false); };
    const onKey = (e) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => () => clearTimeout(closeTimer.current), []);

  // 버튼과 패널 사이를 지나갈 때 닫히지 않도록 약간의 유예를 둡니다
  const hold = () => clearTimeout(closeTimer.current);
  const release = () => { closeTimer.current = setTimeout(() => setOpen(false), 160); };

  return (
    <div className="hd-ac" ref={wrapRef} onMouseEnter={() => { hold(); setOpen(true); }} onMouseLeave={release}>
      <button
        className="hd-sw"
        style={{ background: cv[accentKey] }}
        onClick={() => setOpen((v) => !v)}
        aria-label="액센트 컬러 바꾸기"
        aria-expanded={open}
      />
      <div className={`ac-pop${open ? " open" : ""}`} role="group" aria-label="액센트 컬러 선택">
        <p className="ac-lb"><span className="tk-key">accent:</span> <span className="tk-str">'{accentKey}'</span></p>
        <div className="ac-sws">
          {accentKeys.map((k) => (
            <button
              key={k}
              className={`tk-sw${accentKey === k ? " act" : ""}`}
              style={{ background: cv[k] }}
              onClick={() => setAccentKey(k)}
              aria-label={`액센트 컬러 ${k}로 변경`}
              aria-pressed={accentKey === k}
              title={k}
              tabIndex={open ? 0 : -1}
            />
          ))}
        </div>
        <p className="ac-hint">// 페이지 전체 액센트가 즉시 바뀝니다</p>
      </div>
    </div>
  );
}

export default function Header({ activeSec, scrollTo, mode, setMode, accentKey, setAccentKey, cv, menu, setMenu, pgRef }) {
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
          <AccentPicker accentKey={accentKey} setAccentKey={setAccentKey} cv={cv} />
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

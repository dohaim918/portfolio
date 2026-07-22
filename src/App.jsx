import { useState, useEffect, useRef } from "react";
import { theme, accentKeys } from "./theme";
import { buildCss } from "./styles/globalCss";
import { navIds } from "./data/nav";
import { journey } from "./data/journey";
import { skillTabs } from "./data/skills";
import { projects, subFilters } from "./data/projects";
import { useReveal } from "./hooks/useReveal";
import { useScrollSpy } from "./hooks/useScrollSpy";
import { useWheelGate } from "./hooks/useWheelGate";
import Media, { PrMedia } from "./components/Media";
import Header from "./components/Header";
import MobileNav from "./components/MobileNav";
import Contact from "./components/Contact";
import TopButton from "./components/TopButton";

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

/* ---------------- 서브 컴포넌트 ---------------- */

export default function DohaPortfolioV11() {
  const [mode, setMode] = useState("dark");
  const [accentKey, setAccentKey] = useState("pink");
  const [tab, setTab] = useState("Language");
  const [filter, setFilter] = useState("all");
  const [menu, setMenu] = useState(false);
  const [topBtn, setTopBtn] = useState(false);
  const [playKey, setPlayKey] = useState(0); // 인트로 리플레이 트리거 (0 = 첫 로드 풀 시퀀스)
  const wrapRef = useRef(null);   // 페이지 스크롤 컨테이너
  const pgRef = useRef(null);     // 헤더 프로그레스 바
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

  const addReveal = useReveal();
  const activeSec = useScrollSpy(navIds);
  const glideRef = useWheelGate({ wrapRef, introRef, pgRef });

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

  /* 모바일 메뉴 열림 시 배경 스크롤 잠금 (컨테이너 기준) */
  useEffect(() => {
    if (wrapRef.current) wrapRef.current.style.overflowY = menu ? "hidden" : "auto";
  }, [menu]);

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
      <style>{buildCss({ cv, accent, mode })}</style>

      <Header
        activeSec={activeSec}
        scrollTo={scrollTo}
        mode={mode}
        setMode={setMode}
        menu={menu}
        setMenu={setMenu}
        pgRef={pgRef}
      />
      <MobileNav menu={menu} scrollTo={scrollTo} />

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
      <Contact />
      <TopButton topBtn={topBtn} scrollTo={scrollTo} />
    </div>
  );
}

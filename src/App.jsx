import { useState, useEffect, useRef } from "react";
import { theme } from "./theme";
import { buildCss } from "./styles/globalCss";
import { navIds } from "./data/nav";
import { useReveal } from "./hooks/useReveal";
import { useScrollSpy } from "./hooks/useScrollSpy";
import { useWheelGate } from "./hooks/useWheelGate";
import Header from "./components/Header";
import MobileNav from "./components/MobileNav";
import Intro from "./components/Intro";
import Hero from "./components/Hero";
import About from "./components/About";
import Journey from "./components/Journey";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
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

  const cv = theme.colors[mode];
  const accent = cv[accentKey];

  const addReveal = useReveal();
  // intro·hero는 네비에 없는 id — 활성화되면 어떤 버튼과도 일치하지 않아 밑줄이 해제된다
  const activeSec = useScrollSpy(["intro", "hero", ...navIds]);
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

      <Intro introRef={introRef} playKey={playKey} scrollTo={scrollTo} cv={cv} accent={accent} />

      {/* ============ HERO — 테마 시스템 시연 ============ */}
      <Hero mode={mode} accent={accent} accentKey={accentKey} setAccentKey={setAccentKey} cv={cv} />
      <About addReveal={addReveal} />
      <Journey cv={cv} addReveal={addReveal} />
      <Skills tab={tab} setTab={setTab} addReveal={addReveal} />
      <Projects cv={cv} filter={filter} setFilter={setFilter} addReveal={addReveal} />
      <Contact />
      <TopButton topBtn={topBtn} scrollTo={scrollTo} />
    </div>
  );
}

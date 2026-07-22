import { useEffect, useRef } from "react";

/* 인트로 휠 게이트 + 프로그레스 바.
   인트로 구간에서는 네이티브 스크롤을 완전히 차단하고
   휠/스와이프 제스처 1회 = 커스텀 rAF 글라이드 한 화면 이동.
   네이티브 관성과 충돌할 여지가 없어 끊김이 발생하지 않음.
   스크롤바 드래그·키보드 등 비휠 입력은 정지 후 보정으로 커버. */
export function useWheelGate({ wrapRef, introRef, pgRef }) {
  const glideRef = useRef(null);

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

  return glideRef;
}

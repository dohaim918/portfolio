import { useEffect, useState } from "react";

/* 인트로 가시성 — 벗어나면 TOP 버튼을 띄우고, 다시 들어오면 축약 리플레이를 트리거합니다.
   playKey는 Intro의 리마운트 키로, 0이 첫 로드(풀 시퀀스)입니다. */
export function useIntroGate(introRef) {
  const [topBtn, setTopBtn] = useState(false);
  const [playKey, setPlayKey] = useState(0);

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

  return { topBtn, playKey };
}

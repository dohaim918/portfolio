import { useEffect, useState } from "react";

/* 스크롤 스파이 — 현재 섹션을 네비에 하이라이트 */
export function useScrollSpy(ids) {
  const [activeSec, setActiveSec] = useState("");

  useEffect(() => {
    const spy = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActiveSec(e.target.id)),
      { rootMargin: "-40% 0px -55% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) spy.observe(el);
    });
    return () => spy.disconnect();
  }, []);

  return activeSec;
}

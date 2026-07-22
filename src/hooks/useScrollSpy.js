import { useEffect, useState } from "react";

/* 스크롤 스파이 — 현재 섹션을 네비에 하이라이트.
   진입만 보고 이탈을 무시하면 한 배치에 여러 항목이 섞였을 때 이전 값이 남는다.
   교차 중인 집합을 유지하고 문서 순서로 하나를 고른다 — 비면 빈 문자열이라
   인트로·히어로처럼 네비에 없는 구간으로 돌아오면 밑줄이 해제된다. */
export function useScrollSpy(ids) {
  const [activeSec, setActiveSec] = useState("");

  useEffect(() => {
    const visible = new Set();
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) visible.add(e.target.id);
          else visible.delete(e.target.id);
        });
        setActiveSec(ids.find((id) => visible.has(id)) || "");
      },
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

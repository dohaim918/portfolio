import { useEffect, useRef } from "react";

export function useReveal() {
  const revealRefs = useRef([]);

  useEffect(() => {
    /* rootMargin 하단을 18% 깎아 요소가 화면 안쪽으로 충분히 들어온 뒤 재생합니다.
       바닥에 걸치자마자 시작하면 시선이 닿았을 땐 이미 끝나 있어 등장이 체감되지 않습니다. */
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("on")),
      { threshold: 0.15, rootMargin: "0px 0px -18% 0px" }
    );
    revealRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (el) => {
    if (el && !revealRefs.current.includes(el)) revealRefs.current.push(el);
  };
}

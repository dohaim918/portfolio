import { useEffect, useRef } from "react";

export function useReveal() {
  const revealRefs = useRef([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("on")),
      { threshold: 0.1 }
    );
    revealRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (el) => {
    if (el && !revealRefs.current.includes(el)) revealRefs.current.push(el);
  };
}

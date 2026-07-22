import { useEffect, useState } from "react";

/* 인트로 가시성 — 벗어나면 TOP 버튼을 띄우고, 다시 들어오면 축약 리플레이를 재생합니다.

   재생 타이밍이 까다로워 두 가지를 지킵니다.

   1) 화면에서 '완전히' 벗어났을 때(ratio 0) 미리 초기 상태로 되돌리고 멈춥니다(hold).
      완성된 화면이 남아 있다가 재진입 순간 리마운트되면, 보이던 것이 사라졌다
      다시 나타나 깜빡이는 것처럼 보입니다. 35% 지점에서 되돌리면 아직 화면에
      걸쳐 있는 부분이 사라지는 게 보이므로 반드시 0에서 해야 합니다.
   2) 재생은 스크롤이 멎은 뒤에 시작합니다. 교차 즉시 풀면 글라이드(600ms)가
      89ms쯤 지난, 아직 583px 남은 지점에서 글자가 올라와 페이지 이동과 겹쳐
      끊겨 보였습니다. */
export function useIntroGate(introRef) {
  const [topBtn, setTopBtn] = useState(false);
  const [playKey, setPlayKey] = useState(0);
  const [hold, setHold] = useState(false);

  useEffect(() => {
    const el = introRef.current;
    if (!el) return;
    const scroller = el.closest(".wrap");
    let reset = false;   // 초기 상태로 되돌려 대기 중인지
    let pending = false; // 재생 예약 상태인지
    let settleT;

    const play = () => {
      pending = false;
      clearTimeout(settleT);
      setHold(false); // 정지 해제 → 애니메이션이 처음부터 재생
    };
    const arm = () => {
      clearTimeout(settleT);
      settleT = setTimeout(play, 50);
    };

    const ob = new IntersectionObserver(
      (entries) => {
        const r = entries[entries.length - 1].intersectionRatio;
        setTopBtn(r < 0.35);

        if (r === 0 && !reset) {
          // 완전히 벗어남 — 리마운트로 초기 상태로 되돌리고 그대로 멈춰 둡니다
          reset = true;
          setHold(true);
          setPlayKey((k) => k + 1);
        } else if (r >= 0.35 && reset) {
          reset = false;
          pending = true;
          arm(); // 이미 멈춰 있으면 스크롤 이벤트가 안 오므로 여기서도 예약
        }
      },
      { threshold: [0, 0.35] }
    );
    ob.observe(el);

    /* 글라이드는 cubic ease-out이라 끝 100ms쯤은 사실상 멈춘 상태입니다.
       완전 정지까지 기다리면 등장이 늦게 느껴져서, 프레임당 이동량이 3px 아래로
       떨어지면 곧바로 재생합니다. */
    let lastY = scroller?.scrollTop ?? 0;
    const onScroll = () => {
      const y = scroller.scrollTop;
      const moved = Math.abs(y - lastY);
      lastY = y;
      if (!pending) return;
      if (moved < 3) play();
      else arm();
    };
    scroller?.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      ob.disconnect();
      scroller?.removeEventListener("scroll", onScroll);
      clearTimeout(settleT);
    };
  }, []);

  return { topBtn, playKey, hold };
}

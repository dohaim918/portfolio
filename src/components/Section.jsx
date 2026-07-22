import { sections } from "../data/sections";

/* 섹션 골격 — 래퍼 + 타이틀 블록. 라벨·번호·제목은 data/sections.js에서 id로 조회합니다. */
export default function Section({ id, addReveal, children }) {
  const { lb, no, ttl } = sections[id];

  return (
    <section className="sec" id={id}>
      <div className="inner">
        <div className="sec-ttl rv" ref={addReveal}>
          <span className="lb">{lb}</span>
          <span className="no">{no}</span>
          <h2>{ttl}</h2>
        </div>
        {children}
      </div>
    </section>
  );
}

import { journey } from "../data/journey";

export default function Journey({ cv, addReveal }) {
  return (
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
  );
}

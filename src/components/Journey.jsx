import { journey } from "../data/journey";
import { alpha } from "../theme";
import Section from "./Section";

export default function Journey({ cv, addReveal }) {
  return (
    <Section id="journey" addReveal={addReveal}>
      <div className="jn-list">
        {journey.map((j) => (
          <div className="jn-item rv" key={j.date} ref={addReveal}>
            <span className="jn-dot" style={{ borderColor: cv[j.accent] }} />
            <p className="jn-date">{j.date}</p>
            <h3 className="jn-ttl">
              {j.ttl}
              <span className="jn-tag" style={{ color: cv[j.accent], borderColor: alpha(cv[j.accent], "55") }}>{j.tag}</span>
            </h3>
            <p>{j.txt}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

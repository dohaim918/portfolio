import { skillTabs } from "../data/skills";
import Section from "./Section";

export default function Skills({ tab, setTab, addReveal }) {
  return (
    <Section id="skills" addReveal={addReveal}>
      <div className="sk-tabs rv" ref={addReveal} role="tablist" aria-label="스킬 카테고리">
        {Object.keys(skillTabs).map((k) => (
          <button key={k} className={`sk-tab${tab === k ? " act" : ""}`} onClick={() => setTab(k)} role="tab" aria-selected={tab === k}>
            {k}
          </button>
        ))}
      </div>
      <div className="sk-list" role="tabpanel">
        {skillTabs[tab].map((s) => (
          <div className="sk-item" key={s.name}>
            <h3>{s.name}</h3>
            <p>{s.txt}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

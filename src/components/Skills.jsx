import { skillTabs } from "../data/skills";

export default function Skills({ tab, setTab, addReveal }) {
  return (
    <section className="sec" id="skills">
      <div className="inner">
        <div className="sec-ttl rv" ref={addReveal}>
          <span className="lb">SKILLS</span>
          <span className="no">03</span>
          <h2>쓸 수 있는 것보다, 해본 것을 씁니다</h2>
        </div>
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
      </div>
    </section>
  );
}

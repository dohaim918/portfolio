import { projects, subFilters } from "../data/projects";
import Section from "./Section";
import MainProjectCard from "./MainProjectCard";
import SubCard from "./SubCard";

export default function Projects({ cv, filter, setFilter, addReveal }) {
  const mains = projects.filter((p) => p.type === "main");
  const subs = projects.filter((p) => p.type === "sub" && (filter === "all" || p.category === filter));

  return (
    <Section id="projects" addReveal={addReveal}>
      <div className="pf-list">
        {mains.map((p) => (
          <MainProjectCard key={p.num} p={p} cv={cv} addReveal={addReveal} />
        ))}
      </div>

      {/* Sub Projects — 필터 + 확장 슬롯 */}
      <div className="sub-hd rv" ref={addReveal}>
        <h3 className="sub-ttl">SUB PROJECTS</h3>
        <div className="sub-filters" role="tablist" aria-label="프로젝트 필터">
          {subFilters.map((f) => (
            <button key={f.key} className={filter === f.key ? "act" : ""} onClick={() => setFilter(f.key)} role="tab" aria-selected={filter === f.key}>
              {f.txt}
            </button>
          ))}
        </div>
      </div>
      <div className="sub-grid">
        {subs.map((s) => (
          <SubCard key={s.name} s={s} cv={cv} />
        ))}
        <div className="sub-card sub-next" aria-hidden="true">
          <b>+ NEXT WORK</b>
          <p>다음 작업이 이 자리에 추가됩니다</p>
        </div>
      </div>
    </Section>
  );
}

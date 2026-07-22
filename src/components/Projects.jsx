import { projects, subFilters } from "../data/projects";
import Media from "./Media";

export default function Projects({ cv, filter, setFilter, addReveal }) {
  const mains = projects.filter((p) => p.type === "main");
  const subs = projects.filter((p) => p.type === "sub" && (filter === "all" || p.category === filter));

  return (
    <section className="sec" id="projects">
      <div className="inner">
        <div className="sec-ttl rv" ref={addReveal}>
          <span className="lb">MAIN PROJECTS</span>
          <span className="no">04</span>
          <h2>세 개의 대표작, 세 가지 색</h2>
        </div>

        <div className="pf-list">
          {mains.map((p) => (
            <article className="pf-item rv" key={p.num} ref={addReveal}>
              <div className="pf-txt">
                <span className="pf-lb" style={{ color: cv[p.accent] }}>{p.label}</span>
                <h3 className="pf-name"><span className="pf-num">{p.num}</span>{p.name}</h3>
                <p className="pf-meta">{p.period}<br />{p.team}</p>
                <p className="pf-desc">{p.desc}</p>
                <ul className="pf-role">
                  {p.role.map((r, i) => (
                    <li key={i}>
                      <i style={{ position: "absolute", left: 0, top: 10, width: 7, height: 2, background: cv[p.accent] }} />
                      {r}
                    </li>
                  ))}
                </ul>
                <div className="pf-stack">{p.stack.map((s) => <span key={s}>{s}</span>)}</div>
                <div className="pf-links">
                  {p.links.map((l) => (
                    <a
                      key={l.txt}
                      href={l.url}
                      target="_blank"
                      rel="noreferrer"
                      onMouseEnter={(e) => { e.currentTarget.style.color = cv[p.accent]; e.currentTarget.style.borderColor = cv[p.accent]; }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = ""; e.currentTarget.style.borderColor = ""; }}
                    >
                      {l.txt} ↗
                    </a>
                  ))}
                </div>
              </div>
              <div className="pf-media" style={{ boxShadow: `0 30px 80px -40px ${cv[p.accent]}55`, borderRadius: 14 }}>
                <Media
                  img={p.img}
                  label={p.imgLabel}
                  accent={cv[p.accent]}
                  url={p.links[0]?.url}
                />
              </div>
            </article>
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
            <a
              className="sub-card"
              key={s.name}
              href={s.url}
              target="_blank"
              rel="noreferrer"
              style={{ boxShadow: `0 20px 60px -40px ${cv[s.accent]}55` }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = `${cv[s.accent]}66`)}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "")}
            >
              <h3>{s.name}<i>↗</i></h3>
              <p className="sub-cat">{s.category.toUpperCase()}</p>
              <p>{s.txt}</p>
              <div className="sub-stack">{s.stack.map((t) => <span key={t}>{t}</span>)}</div>
            </a>
          ))}
          <div className="sub-card sub-next" aria-hidden="true">
            <b>+ NEXT WORK</b>
            <p>다음 작업이 이 자리에 추가됩니다</p>
          </div>
        </div>
      </div>
    </section>
  );
}

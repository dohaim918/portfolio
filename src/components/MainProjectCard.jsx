import { accentHover } from "../theme";
import Media from "./Media";
import ExtLink from "./ExtLink";
import StackTags from "./StackTags";

/* 대표작 카드 — 텍스트 + 미디어. 좌우 교차 배치는 .pf-item:nth-child(even) CSS가 담당합니다. */
export default function MainProjectCard({ p, cv, addReveal }) {
  const ac = cv[p.accent];

  return (
    <article className="pf-item rv" ref={addReveal}>
      <div className="pf-txt">
        <span className="pf-lb" style={{ color: ac }}>{p.label}</span>
        <h3 className="pf-name"><span className="pf-num">{p.num}</span>{p.name}</h3>
        <p className="pf-meta">{p.period}<br />{p.team}</p>
        <p className="pf-desc">{p.desc}</p>
        <ul className="pf-role">
          {p.role.map((r, i) => (
            <li key={i}>
              <i style={{ position: "absolute", left: 0, top: 10, width: 7, height: 2, background: ac }} />
              {r}
            </li>
          ))}
        </ul>
        <StackTags className="pf-stack" items={p.stack} />
        <div className="pf-links">
          {p.links.map((l) => (
            <ExtLink key={l.txt} href={l.url} {...accentHover(ac, ["color", "borderColor"])}>
              {l.txt} ↗
            </ExtLink>
          ))}
        </div>
      </div>
      <div className="pf-media">
        <Media img={p.img} label={p.imgLabel} accent={ac} url={p.links[0]?.url} />
      </div>
    </article>
  );
}

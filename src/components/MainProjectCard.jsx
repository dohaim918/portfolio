import { alpha, accentHover } from "../theme";
import Media from "./Media";
import ActionLink from "./ActionLink";
import StackTags from "./StackTags";

/* 대표작 카드 — 텍스트 + 미디어. 좌우 교차 배치는 .pf-item:nth-child(even) CSS가 담당합니다. */
export default function MainProjectCard({ p, cv, mode, addReveal }) {
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
          {p.links.map((l, i) => {
            /* 첫 링크가 대표 링크입니다(카드 이미지도 links[0]으로 연결).
               채우면 촌스러워지므로 프로젝트 색을 글자와 테두리에만 얇게 얹고,
               호버 때 테두리만 진해지게 합니다. 링크가 하나뿐이면 견줄 대상이
               없어 강조하지 않습니다. */
            const primary = i === 0 && p.links.length > 1;
            const rest = primary ? { color: ac, borderColor: alpha(ac, "66") } : {};
            return (
              <ActionLink
                key={l.txt}
                href={l.url}
                ownColor
                style={rest}
                {...accentHover(ac, ["color", "borderColor"], rest)}
              >
                {l.txt} ↗
              </ActionLink>
            );
          })}
        </div>
      </div>
      <div className="pf-media">
        <Media img={p.img} label={p.imgLabel} accent={ac} mode={mode} url={p.links[0]?.url} />
      </div>
    </article>
  );
}

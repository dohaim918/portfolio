import { alpha, accentHover } from "../theme";
import ExtLink from "./ExtLink";
import StackTags from "./StackTags";

/* 서브 프로젝트 카드 — 카드 전체가 저장소/데모 링크입니다. */
export default function SubCard({ s, cv }) {
  const ac = cv[s.accent];

  return (
    <ExtLink
      className="sub-card"
      href={s.url}
      style={{ boxShadow: `0 20px 60px -40px ${alpha(ac, "55")}` }}
      {...accentHover(alpha(ac, "66"))}
    >
      <h3>{s.name}<i>↗</i></h3>
      <p className="sub-cat">{s.category.toUpperCase()}</p>
      <p>{s.txt}</p>
      <StackTags className="sub-stack" items={s.stack} />
    </ExtLink>
  );
}

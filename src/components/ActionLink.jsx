import ExtLink from "./ExtLink";

/* 액션 버튼 — 라인 호버 체계(배경 채움 금지).
   size는 본문 액션(md·44px) / 최종 CTA(lg·52px) 2단계만 둡니다.
   ownColor는 프로젝트별 액센트처럼 호버 색을 밖에서 직접 넣는 경우 —
   전역 --accent 호버를 끄고 부상 효과만 남깁니다.
   external=false는 mailto처럼 새 탭으로 열지 않는 링크입니다. */
export default function ActionLink({
  href,
  size = "md",
  pri = false,
  ownColor = false,
  external = true,
  children,
  ...rest
}) {
  const cls = ["btn", `btn-${size}`, pri && "btn-pri", ownColor && "btn-own"]
    .filter(Boolean)
    .join(" ");

  return external ? (
    <ExtLink href={href} className={cls} {...rest}>{children}</ExtLink>
  ) : (
    <a href={href} className={cls} {...rest}>{children}</a>
  );
}

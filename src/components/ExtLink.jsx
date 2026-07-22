/* 외부 링크 — target·rel을 한 곳에서 보장합니다.
   화살표(↗)는 위치마다 붙기도 빠지기도 해서 children으로 넘깁니다.
   mailto는 새 탭으로 열지 않으므로 이 컴포넌트를 쓰지 않습니다. */
export default function ExtLink({ href, children, ...rest }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" {...rest}>
      {children}
    </a>
  );
}

/* 스택 뱃지 목록 — 정적 표시. 호버 체계(액션·필터 버튼)와 무관합니다. */
export default function StackTags({ className, items }) {
  return (
    <div className={className}>
      {items.map((s) => (
        <span key={s}>{s}</span>
      ))}
    </div>
  );
}

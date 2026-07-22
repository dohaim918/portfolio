export default function TopButton({ topBtn, scrollTo }) {
  return (
    <button
      className={`top-btn${topBtn ? " show" : ""}`}
      onClick={() => scrollTo("intro")}
      aria-label="맨 위로 이동"
      tabIndex={topBtn ? 0 : -1}
    >
      <svg viewBox="0 0 24 24"><path d="M12 19V5M5 12l7-7 7 7" /></svg>
    </button>
  );
}

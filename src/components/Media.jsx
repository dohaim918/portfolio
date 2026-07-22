export default function Media({ img, label, accent, url, ratio = "16 / 10" }) {
  /* 프로젝트 미디어 — img가 null이면 placeholder, 경로를 넣으면 실제 스크린샷.
     호버: 이미지 줌 + 액센트 오버레이 + VIEW PROJECT CTA. 전체가 라이브 링크. */
  /* 글로우는 호버 시 부상하는 .md-frm 자신에게 — 래퍼에 두면 카드만 뜨고 그림자가 제자리에 남는다 */
  const glow = { boxShadow: `0 30px 80px -40px ${accent}55` };
  const body = (
    <>
      <div className="md-bar">
        <i style={{ background: accent }} /><i /><i />
        <em>{label}</em>
      </div>
      <div className="md-bd" style={{ aspectRatio: ratio }}>
        {img ? (
          <img src={img} alt={label} loading="lazy" />
        ) : (
          <div className="md-ph">
            <span style={{ color: accent }}>▨</span>
            <em>{label}</em>
            <small>이미지 교체 예정 · img 필드에 경로 입력</small>
          </div>
        )}
        {/* 액센트 오버레이 — 특수 그라디언트값은 인라인 유지 */}
        <div className="md-ov" style={{ background: `linear-gradient(180deg, transparent 42%, ${accent}d9 100%)` }}>
          <span className="md-cta">VIEW PROJECT ↗</span>
        </div>
      </div>
    </>
  );
  return url ? (
    <a className="md-frm" style={glow} href={url} target="_blank" rel="noreferrer" aria-label={`${label} 프로젝트 보기`}>
      {body}
    </a>
  ) : (
    <div className="md-frm" style={glow}>{body}</div>
  );
}

export function PrMedia({ img }) {
  /* 프로필 — 액센트 오프셋 프레임. 호버 시 사진과 프레임이 정렬됨. */
  return (
    <div className="pr-frm">
      <div className="pr-bd">
        {img ? (
          <img src={img} alt="김도하 프로필" loading="lazy" />
        ) : (
          <div className="md-ph">
            <span>▨</span>
            <em>PROFILE IMAGE · 4:5</em>
            <small>이미지 교체 예정</small>
          </div>
        )}
      </div>
    </div>
  );
}

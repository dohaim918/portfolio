import { accentKeys } from "../theme";

export default function Hero({ mode, accent, accentKey, setAccentKey, cv }) {
  return (
    <section className="hero" id="hero">
      <div className="hero-bg" />
      <div className="inner">
        <div>
          <p className="hero-hello">// this page itself is a theme system</p>
          <h2 className="hero-ttl">
            지금 보고 계신 이 페이지도<br />
            <span className="grad">하나의 테마 시스템</span>으로 움직입니다.
          </h2>
          <p className="hero-desc">
            색·폰트·간격이 <strong>theme.js 토큰 하나</strong>로 관리됩니다.
            오른쪽 스와치와 상단 토글을 눌러보세요 — 다크·라이트 반전과
            액센트 교체가 즉시 일어납니다.
          </p>
          <div className="hero-sns">
            <a href="https://github.com/dohaim918" target="_blank" rel="noreferrer">GITHUB ↗</a>
            <a href="https://www.instagram.com/speiq_kskw" target="_blank" rel="noreferrer">INSTAGRAM ↗</a>
            <a href="mailto:nzspave1121@gmail.com">MAIL ↗</a>
          </div>
        </div>

        {/* Signature — 살아있는 theme.js 토큰 카드 */}
        <div className="tk-card" aria-label="테마 토큰 카드 — 스와치를 누르면 페이지 액센트가 바뀝니다">
          <div className="tk-bar"><i /><i /><i /></div>
          <div><span className="tk-key">const </span>doha <span className="tk-key">= {"{"}</span></div>
          <div style={{ paddingLeft: "2ch" }}>
            <span className="tk-key">role:</span> <span className="tk-str">'Design-to-Code'</span>,
          </div>
          <div style={{ paddingLeft: "2ch" }}>
            <span className="tk-key">mode:</span> <span className="tk-str">'{mode}'</span>,
          </div>
          <div style={{ paddingLeft: "2ch" }}>
            <span className="tk-key">accent:</span>{" "}
            <span className="tk-str" style={{ color: accent, transition: "color .3s" }}>'{accent}'</span>,
          </div>
          <div className="tk-swatches">
            {accentKeys.map((k) => (
              <button
                key={k}
                className={`tk-sw${accentKey === k ? " act" : ""}`}
                style={{ background: cv[k] }}
                onClick={() => setAccentKey(k)}
                aria-label={`액센트 컬러 ${k}로 변경`}
                title={k}
              />
            ))}
          </div>
          <div><span className="tk-key">{"}"}</span></div>
          <p className="tk-hint">// 스와치와 상단 토글을 눌러보세요 — 테마 시스템이 실시간으로 반전됩니다</p>
        </div>
      </div>
    </section>
  );
}

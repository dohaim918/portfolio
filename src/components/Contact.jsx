import { social, mailAddr } from "../data/social";
import ActionLink from "./ActionLink";

export default function Contact() {
  return (
    <footer className="ft" id="contact">
      <div className="ft-bg" />
      <div className="inner">
        <h2 className="ft-ttl">LET'S BUILD<br /><b>SOMETHING BRIGHT</b></h2>
        <p>화면의 감각과 코드의 구조를 함께 고민합니다. 어제보다 나은 결과물을 위해 계속 배우고 성장하는 개발자 김도하입니다.</p>
        <div className="ft-links">
          <ActionLink href={social.mail} size="lg" pri external={false}>MAIL — {mailAddr}</ActionLink>
          <ActionLink href={social.github} size="lg">GITHUB ↗</ActionLink>
          <ActionLink href={social.instagram} size="lg">INSTAGRAM ↗</ActionLink>
        </div>
      </div>
      {/* 바닥에 붙이려면 .inner(position:relative) 밖에 있어야 .ft 기준으로 잡힙니다 */}
      <p className="ft-copy">© 2026 DOHA KIM · DESIGN TO CODE · PORTFOLIO v11</p>
    </footer>
  );
}

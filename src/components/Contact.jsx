import { social, mailAddr } from "../data/social";
import ActionLink from "./ActionLink";

export default function Contact() {
  return (
    <footer className="ft" id="contact">
      <div className="ft-bg" />
      <div className="inner">
        <h2 className="ft-ttl">LET'S BUILD<br /><b>SOMETHING BRIGHT</b></h2>
        <p>함께 작업하고 싶거나 더 많은 정보가 필요하다면, 언제든 연락 주세요. 새로운 기회를 기다리고 있습니다.</p>
        <div className="ft-links">
          <ActionLink href={social.mail} size="lg" pri external={false}>MAIL — {mailAddr}</ActionLink>
          <ActionLink href={social.github} size="lg">GITHUB ↗</ActionLink>
          <ActionLink href={social.instagram} size="lg">INSTAGRAM ↗</ActionLink>
        </div>
        <p className="ft-copy">© 2026 DOHA KIM · DESIGN TO CODE · PORTFOLIO v11</p>
      </div>
    </footer>
  );
}

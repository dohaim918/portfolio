import { social } from "../data/social";
import { PrMedia } from "./Media";
import Section from "./Section";
import ActionLink from "./ActionLink";

export default function About({ addReveal }) {
  return (
    <Section id="about" addReveal={addReveal}>
      <div className="ab-grid">
        <div className="rv" ref={addReveal}>
          <PrMedia img="/profile.jpg" />
        </div>
        <div className="ab-txt rv" ref={addReveal}>
          <p>
            디자인 툴에서 개발로 넘어온 만큼, <strong>화면의 균형감과 정보의 흐름</strong>을
            코드 구조만큼 중요하게 다룹니다. Photoshop · Illustrator · After Effects의
            감각은 그대로 인터랙션과 비주얼 디테일로 이어집니다.
          </p>
          <p>
            PULSE에서 <strong>전체 테마 디자인 시스템</strong>을, flowdash에서
            <strong> 디자인 총괄과 핵심 로직</strong>을 맡았고, 반복되는 스타일 작업은
            직접 만든 theme.js 스타터킷으로 시스템화했습니다. 지금은 화성야화 웹을
            기획부터 구현까지 단독으로 진행하고 있습니다.
          </p>
          <p className="ab-quote">"Step by step, I'm learning and improving."</p>
          <div className="ab-sns">
            <ActionLink href={social.github}>GITHUB ↗</ActionLink>
            <ActionLink href={social.instagram}>INSTAGRAM ↗</ActionLink>
            <ActionLink href={social.mail} external={false}>MAIL ↗</ActionLink>
          </div>
        </div>
      </div>
    </Section>
  );
}

import { nav } from "../data/nav";
import { social } from "../data/social";
import ExtLink from "./ExtLink";

export default function MobileNav({ menu, scrollTo }) {
  return (
    <nav className={`mnav${menu ? " open" : ""}`} aria-hidden={!menu}>
      <ul>
        {nav.map((n) => (
          <li key={n.id}>
            <button onClick={() => scrollTo(n.id)} tabIndex={menu ? 0 : -1}>
              <i>{n.no}</i>{n.txt}
            </button>
          </li>
        ))}
      </ul>
      <div className="mnav-ft">
        <ExtLink href={social.github}>GITHUB</ExtLink>
        <a href={social.mail}>MAIL</a>
      </div>
    </nav>
  );
}

import { nav } from "../data/nav";

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
        <a href="https://github.com/dohaim918" target="_blank" rel="noreferrer">GITHUB</a>
        <a href="mailto:nzspave1121@gmail.com">MAIL</a>
      </div>
    </nav>
  );
}

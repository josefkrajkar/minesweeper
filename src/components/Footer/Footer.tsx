// Styles
import { Author, FooterComponent, GitHubLogo, Link } from "./Footer.styles";

function Footer() {
  return (
    <FooterComponent>
      <Author>Author: Josef Krajkář</Author>
      <Link
        href="https://github.com/josefkrajkar/minesweeper"
        target="_blank"
        rel="noopener noreferrer"
      >
        <GitHubLogo src="/github.png" alt="GitHub" />
      </Link>
    </FooterComponent>
  );
}

export default Footer;

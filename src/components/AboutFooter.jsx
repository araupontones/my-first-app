import "./AboutFooter.css";

const GITHUB_URL = "https://github.com/araupontones/my-first-app";
const LINKEDIN_URL = "https://www.linkedin.com/in/andr%C3%A9s-arau-017b1127/"; // TODO: paste your LinkedIn profile URL here

// A link that opens in a new tab. rel="noopener noreferrer" stops the new page
// from controlling this one or seeing where the visitor came from.
function ExternalLink({ href, children }) {
  // No URL yet: show the text without a link, instead of a broken one
  if (!href) return <span>{children}</span>;
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}

function AboutFooter() {
  return (
    <footer className="about">
      <div className="about__inner">
        <div className="about__columns">
          <div className="about__column">
            <h2 className="about__title">About this project</h2>
            <p>
              Made by Andres Arau as the project for Module B, "React
              Foundation", of the{" "}
              <a
                href="https://www.react-graph-gallery.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                React &amp; D3 Dataviz course by Yan Holtz
              </a>
              .
            </p>
            <h3 className="about__subtitle">How it was made</h3>
            <p>
              Concept, design decisions and text by Andres. The code was written
              by Andres together with Claude Code, an AI coding assistant, step
              by step: Andres set the specifications, then reviewed, tested and
              refined each step. Claude (Anthropic) also acted as a mentor for
              design and data-visualisation choices.
            </p>
          </div>

          <div className="about__column">
            <h3 className="about__subtitle">Built with</h3>
            <ul>
              <li>React (components and state)</li>
              <li>D3.js (scales and maths for the charts)</li>
              <li>JavaScript, HTML &amp; CSS</li>
              <li>Vite, deployed on GitHub Pages</li>
            </ul>

            <h3 className="about__subtitle">Data &amp; images</h3>
            <ul>
              <li>
                Dataset: 20 Pokémon with their type, HP and attack, provided for
                the course project
              </li>
              <li>
                Pokémon pictures:{" "}
                <ExternalLink href="https://github.com/PokeAPI/sprites">
                  PokeAPI sprites
                </ExternalLink>
              </li>
              <li>
                Fonts: Luckiest Guy, Fredoka, Nunito and Press Start 2P (
                <ExternalLink href="https://fonts.google.com">
                  Google Fonts
                </ExternalLink>
                )
              </li>
            </ul>
          </div>

          <div className="about__column">
            <h3 className="about__subtitle">Links</h3>
            <ul>
              <li>
                <ExternalLink href={GITHUB_URL}>Code on GitHub</ExternalLink>
              </li>
              <li>
                <ExternalLink href={LINKEDIN_URL}>
                  Andres on LinkedIn
                </ExternalLink>
              </li>
            </ul>
          </div>
        </div>

        <p className="about__smallprint">
          This is an unofficial fan project for learning purposes. Pokémon and
          all related names are trademarks of Nintendo, Game Freak and The
          Pokémon Company. Not affiliated with or endorsed by them.
        </p>
      </div>
    </footer>
  );
}

export default AboutFooter;

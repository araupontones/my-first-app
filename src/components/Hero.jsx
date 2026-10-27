import "./Hero.css";
// Importing the image gives us its final URL (with the /my-first-app/ base included).
import pikachu from "../assets/pikachu.png";

function Hero() {
  return (
    <header className="hero">
      <div className="hero__inner">
        <h1 className="hero__title">Pika-what?</h1>
        <p className="hero__subtitle">
          Everything you need to survive the next car ride, in under 3 minutes.
        </p>
        <img
          className="hero__pikachu"
          src={pikachu}
          alt="Pikachu, the yellow electric mouse"
          width="288"
          height="288"
        />
      </div>
    </header>
  );
}

export default Hero;

import "../hero.css";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="hero shadow mb-4">
      <video autoPlay loop muted className="hero-video">
        <source src="movies.mp4" type="video/mp4" />
      </video>
      <div className="hero-overlay">
        <h1 className="hero-title">WELCOME TO KIDFLIX</h1>
        <p className="hero-subtitle">
          Watch the Best Kids' Movie Trailers – Free & Safe!
        </p>
      </div>
    </section>
  );
}

export default Hero;

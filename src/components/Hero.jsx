import "../hero.css";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="hero">
      <video autoPlay loop muted className="hero-video">
        <source src="popcorn.mp4" type="video/mp4" />
      </video>
      <div className="hero-overlay">
        <h1 className="hero-title">Bienvenido a Kidflix</h1>
        <p className="hero-subtitle">
          Las mejores películas y series para niños en un solo lugar
        </p>
        <Link to="/explorar" className="hero-button">
          Explorar Ahora
        </Link>
      </div>
    </section>
  );
}

export default Hero;

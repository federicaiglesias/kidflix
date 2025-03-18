import "../navbar.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import {
  FaBars,
  FaTimes,
  FaSearch,
  FaInfoCircle,
  FaEnvelope,
} from "react-icons/fa";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar-style">
      <div className="navbar-container">
        <h1 className="logo">
          <Link to={`/`}>KIDFLIX</Link>
        </h1>
        <button className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
        <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
          <li>
            <Link to={`/sobrenosotros`}>
              <FaInfoCircle /> Sobre Nosotros
            </Link>
          </li>
          <li>
            <Link to={`/contacto`}>
              <FaEnvelope /> Contacto
            </Link>
          </li>
          <li>
            <Link to={`/buscar`}>
              <FaSearch /> Buscar Películas
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;

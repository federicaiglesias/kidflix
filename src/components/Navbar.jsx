import "../navbar.css";
import { Link, useLocation } from "react-router-dom"; // Usamos useLocation para detectar la ruta
import { useState, useEffect } from "react";
import { FaBars, FaTimes, FaSearch, FaUserCircle } from "react-icons/fa";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation(); // Obtenemos la ubicación actual

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isColoredNavbar =
    location.pathname === "/buscar" || location.pathname === "/login";

  return (
    <nav
      className={`navbar-style ${scrolled ? "scrolled" : ""} ${
        isColoredNavbar ? "colored" : ""
      }`}
    >
      <div className="navbar-container container">
        <h1 className="logo mt-2">
          <Link to={`/`}>KIDFLIX</Link>
        </h1>
        <button className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
        <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
          <li>
            <Link to={`/buscar`}>
              <FaSearch />
              SEARCH MOVIES
            </Link>
          </li>
          <li>
            <Link to={`/login`}>
              <FaUserCircle />
              LOGIN
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;

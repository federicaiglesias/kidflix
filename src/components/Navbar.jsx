import "../navbar.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  FaBars,
  FaTimes,
  FaSearch,
  FaInfoCircle,
  FaEnvelope,
} from "react-icons/fa";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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

  return (
    <nav className={`navbar-style ${scrolled ? "scrolled" : ""}`}>
      <div className="navbar-container container">
        <h1 className="logo mt-2">
          <Link to={`/`}>
            KIDFLIX
          </Link>
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
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;

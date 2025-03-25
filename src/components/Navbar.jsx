import "../navbar.css";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaBars, FaTimes, FaSearch, FaUserCircle } from "react-icons/fa";
import { auth } from "../firebase/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const isColoredNavbar =
    location.pathname === "/buscar" ||
    location.pathname === "/login" ||
    location.pathname === "/profile";

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
              <FaSearch /> SEARCH MOVIES
            </Link>
          </li>
          {/*<li>
            <Link to={user ? `/profile` : `/login`}>
              <FaUserCircle /> {user ? "MY PROFILE" : "LOGIN"}
            </Link>
          </li>*/}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;

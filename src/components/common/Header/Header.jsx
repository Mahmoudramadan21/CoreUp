/**
 * Header.jsx
 *
 * A header component with navigation links and a hamburger menu for mobile.
 * Optimized with React.memo and lazy-loaded logo image.
 * Accessibility Note: Includes ARIA attributes for navigation and hamburger menu.
 *
 * Props: None
 *
 * Author: Mahmoud Ramadan
 * Created: June 2025
 */

import React, { useState, useCallback } from "react";
import { Link, NavLink } from "react-router-dom";
import styles from "./Header.module.scss";
import logo from "@/assets/logo.svg";
import Button from "../Button/Button";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Memoize toggleMenu to prevent unnecessary re-renders
  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  // Navigation links data
  const navLinks = [
    { name: "Startups", path: "/startups" },
    { name: "Investors", path: "/investors" },
    { name: "Job Seeker", path: "/job-seeker" },
    { name: "Messages", path: "/messages" },
    { name: "Help", path: "/help" },
  ];

  return (
    <header className={styles.header} role="banner">
      <div className={`${styles["header__container"]} container`}>
        {/* Logo */}
        <Link
          to="/"
          className={styles["header__logo"]}
          aria-label="Go to Coreup homepage"
          aria-current="page"
        >
          <img
            src={logo}
            alt="Coreup Logo"
            loading="eager"
            width="150"
            height="40"
          />
        </Link>
        {/* Main Navigation */}
        <nav
          id="main-nav"
          className={`${styles["header__nav"]} ${
            isMenuOpen ? styles["header__nav--open"] : ""
          }`}
          role="navigation"
          aria-label="Main navigation"
        >
          <ul className={styles["header__nav-list"]}>
            {navLinks.map((link) => (
              <li key={link.path} className={styles["header__nav-item"]}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    `${styles["header__nav-link"]} ${
                      isActive ? styles["header__nav-link--active"] : ""
                    }`
                  }
                  aria-current={({ isActive }) =>
                    isActive ? "page" : undefined
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>
          {/* Mobile Actions */}
          <div
            className={`${styles["header__actions"]} ${styles["header__actions--mobile"]}`}
          >
            <Button
              className="btn--primary"
              to="/join"
              aria-label="Join now"
              onClick={() => setIsMenuOpen(false)}
            >
              Join now
            </Button>
            <Link
              to="/login"
              className={styles["header__login"]}
              onClick={() => setIsMenuOpen(false)}
              aria-label="Login to your account"
            >
              Login
            </Link>
          </div>
        </nav>
        {/* Desktop Actions */}
        <div
          className={`${styles["header__actions"]} ${styles["header__actions--desktop"]}`}
        >
          <Button
            className="btn--primary"
            to="/join"
            aria-label="Join now"
            onClick={() => setIsMenuOpen(false)}
          >
            Join now
          </Button>
          <Link
            to="/login"
            className={styles["header__login"]}
            onClick={() => setIsMenuOpen(false)}
            aria-label="Login to your account"
          >
            Login
          </Link>
        </div>
        {/* Hamburger Menu Button */}
        <button
          type="button"
          className={styles["header__hamburger"]}
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          aria-controls="main-nav"
        >
          <span className={styles["header__hamburger-icon"]}>
            {isMenuOpen ? "✕" : "☰"}
          </span>
        </button>
      </div>
    </header>
  );
};

export default React.memo(Header);

/**
 * HeaderInvestor.jsx
 *
 * A header component for investor-specific pages with logo, search, navigation, and profile.
 * Optimized with React.memo and useCallback for performance.
 * Accessibility Note: Includes ARIA attributes and focus states for navigation.
 *
 * Props: None
 *
 * Author: Mahmoud Ramadan
 * Created: June 2025
 */

import React, { useState, useCallback } from "react";
import { Link, NavLink } from "react-router-dom";
import styles from "./HeaderInvestor.module.scss";
import coreUpLogo from "@/assets/logo-coreup.svg";
import magnifierIcon from "@/assets/icons/magnifier.svg";
import profileIcon from "@/assets/icons/profile.svg";

const HeaderInvestor = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Memoize toggle menu handler
  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  // Navigation links data
  const navLinks = [
    { name: "Invest", path: "/invest" },
    { name: "Messages", path: "/messages" },
    { name: "Help", path: "/help" },
  ];

  return (
    <header className={styles.header} role="banner">
      <div className={`${styles["header__container"]} container`}>
        {/* Top Row with Logo and Hamburger */}
        <div className={styles.header__topRow}>
          <Link
            to="/"
            className={styles.header__logo}
            aria-label="Go to CoreUp homepage"
            aria-current="page"
          >
            <img
              src={coreUpLogo}
              alt="CoreUp Logo"
              className={styles.header__logoImage}
              width="172"
              height="42"
              loading="eager"
              fetchpriority="high"
            />
          </Link>
          <button
            type="button"
            className={styles.header__hamburger}
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            aria-controls="investor-nav"
          >
            <span className={styles.header__hamburgerIcon}></span>
          </button>
        </div>

        {/* Dropdown Menu with Search, Navigation, and Profile */}
        <div
          className={`${styles.header__menu} ${
            isMenuOpen ? styles["header__menu--open"] : ""
          }`}
          id="investor-nav"
        >
          {/* Search Bar */}
          <div className={styles.header__search}>
            <input
              type="text"
              placeholder="Search"
              className={styles.header__searchInput}
              aria-label="Search investors or startups"
            />
            <img
              src={magnifierIcon}
              alt=""
              className={styles.header__searchIcon}
              width="16"
              height="16"
              aria-hidden="true"
            />
          </div>

          {/* Navigation and Profile Wrapper */}
          <div className={styles.header__navProfileWrapper}>
            <nav
              className={styles.header__nav}
              aria-label="Investor navigation"
            >
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `${styles.header__navLink} ${
                      isActive ? styles["header__navLink--active"] : ""
                    }`
                  }
                  aria-current={({ isActive }) =>
                    isActive ? "page" : undefined
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </NavLink>
              ))}
            </nav>
            <div className={styles.header__profile}>
              <button
                type="button"
                className={styles.header__profileButton}
                aria-label="Open profile menu"
              >
                <img
                  src={profileIcon}
                  alt=""
                  className={styles.header__profileIcon}
                  width="24"
                  height="24"
                  aria-hidden="true"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default React.memo(HeaderInvestor);

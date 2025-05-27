/**
 * AuthLayout.jsx
 *
 * A layout for authentication pages with a sidebar and header.
 * Optimized with React.memo for performance.
 * Accessibility Note: Includes ARIA attributes for navigation and logo links.
 * SEO Note: Uses semantic HTML for better crawlability.
 *
 * Props:
 * - children: Content to render in the main section
 * - showSidebar: Toggles sidebar visibility
 *
 * Author: Mahmoud Ramadan
 * Created: June 2025
 */

import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import styles from "./AuthLayout.module.scss";
import AuthSidebar from "@/sections/AuthSidebar/AuthSidebar";
import logo from "@/assets/logo-white.svg";

const AuthLayout = ({ children, showSidebar = true }) => {
  {
    /* Determine Page Type for Conditional Styling and Links */
  }
  const isLoginPage = children?.props?.className?.includes("login");
  const navLinkText = isLoginPage ? "Register" : "Login";
  const navLinkPath = isLoginPage ? "/signup" : "/login";

  return (
    <>
      {/* SEO Meta Tags */}
      <Helmet>
        <title>CoreUp - {navLinkText}</title>
        <meta
          name="description"
          content={`Access your CoreUp account or create a new one to connect with investors and startups. Last updated: ${new Date().toLocaleDateString()}`}
        />
        <meta name="keywords" content="authentication, login, signup, CoreUp" />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div
        className={styles.authLayout}
        role="application"
        aria-label="Authentication"
      >
        {showSidebar && <AuthSidebar />}
        {/* Header Section */}
        <header
          className={`${styles.authLayout__header} ${
            isLoginPage ? styles["authLayout__header--login"] : ""
          }`}
          role="banner"
        >
          {/* Logo Link */}
          <Link
            to="/login"
            className={`${styles.authLayout__logo} ${
              isLoginPage ? styles["authLayout__logo--login"] : ""
            }`}
            aria-label="Go to CoreUp homepage"
          >
            <img
              src={logo}
              alt="CoreUp Logo"
              loading="eager"
              width="150"
              height="24"
            />
          </Link>
          {/* Navigation Link */}
          <Link
            to={navLinkPath}
            className={`${styles.authLayout__link} ${
              isLoginPage ? styles["authLayout__link--active"] : ""
            }`}
            aria-label={`Go to ${navLinkText.toLowerCase()} page`}
          >
            {navLinkText}
          </Link>
        </header>
        {/* Main Content */}
        <main className={styles.authLayout__main} role="main">
          {children}
        </main>
      </div>
    </>
  );
};

// PropTypes for type checking
AuthLayout.propTypes = {
  children: PropTypes.node.isRequired,
  showSidebar: PropTypes.bool,
};

// Default props
AuthLayout.defaultProps = {
  showSidebar: true,
};

export default React.memo(AuthLayout);

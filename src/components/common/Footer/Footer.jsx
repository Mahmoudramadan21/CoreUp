/**
 * Footer.jsx
 *
 * A footer component with navigation links, newsletter form, and contact info.
 * Optimized with lazy-loaded images and CSS Modules for performance.
 * Accessibility Note: Includes ARIA attributes and focus states for all interactive elements.
 *
 * Props: None
 *
 * Author: Mahmoud Ramadan
 * Created: June 2025
 */

import React from "react";
import { Link } from "react-router-dom";
import styles from "./Footer.module.scss";
import linkedinIcon from "@/assets/icons/linkedin.svg";

const Footer = () => {
  const newsletterCheckboxId = "newsletter-consent";

  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={`${styles["footer__container"]} container`}>
        {/* Main Footer Columns */}
        <div className={styles["footer__columns"]}>
          {/* Platform Links */}
          <div className={styles["footer__column"]}>
            <h2 className={styles["footer__column-title"]}>Platform</h2>
            <ul className={styles["footer__column-list"]}>
              {[
                { to: "/startups", label: "Startups" },
                { to: "/investors", label: "Investors" },
                { to: "/job-seeker", label: "Job Seeker" },
                { to: "/messages", label: "Messages" },
                { to: "/faqs", label: "FAQs" },
                { to: "/help", label: "Help" },
              ].map(({ to, label }) => (
                <li key={to} className={styles["footer__column-item"]}>
                  <Link
                    to={to}
                    className={styles["footer__column-link"]}
                    aria-label={`Navigate to ${label} page`}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {/* Resources Links */}
          <div className={styles["footer__column"]}>
            <h2 className={styles["footer__column-title"]}>Resources</h2>
            <ul className={styles["footer__column-list"]}>
              {[
                { to: "/blog", label: "Blog" },
                { to: "/portfolio", label: "Portfolio" },
              ].map(({ to, label }) => (
                <li key={to} className={styles["footer__column-item"]}>
                  <Link
                    to={to}
                    className={styles["footer__column-link"]}
                    aria-label={`Navigate to ${label} page`}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {/* Company Links */}
          <div className={styles["footer__column"]}>
            <h2 className={styles["footer__column-title"]}>Company</h2>
            <ul className={styles["footer__column-list"]}>
              {[
                { to: "/careers", label: "Careers" },
                { to: "/terms", label: "Terms of Service" },
                { to: "/privacy", label: "Privacy Policy" },
                { to: "/cookies", label: "Cookies Policy" },
              ].map(({ to, label }) => (
                <li key={to} className={styles["footer__column-item"]}>
                  <Link
                    to={to}
                    className={styles["footer__column-link"]}
                    aria-label={`Navigate to ${label} page`}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {/* Newsletter Subscription Form */}
          <div className={styles["footer__column"]}>
            <h2 className={styles["footer__column-title"]}>
              Subscribe newsletter
            </h2>
            <form
              className={styles["footer__newsletter-form"]}
              aria-describedby="newsletter-description"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className={styles["footer__newsletter-input-wrapper"]}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className={styles["footer__newsletter-input"]}
                  aria-label="Enter your email to subscribe to newsletter"
                  required
                />
                <button
                  type="submit"
                  className={styles["footer__newsletter-button"]}
                  aria-label="Submit newsletter subscription"
                >
                  →
                </button>
              </div>
              <p
                id="newsletter-description"
                className={styles["footer__newsletter-description"]}
              >
                Subscribe to receive updates and news from Coreup.
              </p>
              <label
                htmlFor={newsletterCheckboxId}
                className={styles["footer__newsletter-checkbox"]}
              >
                <input
                  type="checkbox"
                  id={newsletterCheckboxId}
                  className={styles["footer__newsletter-checkbox-input"]}
                  required
                />
                <span className={styles["footer__newsletter-checkbox-text"]}>
                  I agree my personal data to be stored and processed for online
                  communication.{" "}
                  <Link
                    to="/privacy"
                    className={styles["footer__newsletter-link"]}
                    aria-label="Read more about our privacy policy"
                  >
                    Read more
                  </Link>
                </span>
              </label>
            </form>
          </div>
        </div>
        {/* Contact and Copyright Section */}
        <div className={styles["footer__bottom"]}>
          <div className={styles["footer__contact"]}>
            <div className={styles["footer__contact-follow"]}>
              <span className={styles["footer__contact-label"]}>Follow us</span>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles["footer__contact-icon"]}
                aria-label="Follow Coreup on LinkedIn"
              >
                <img
                  src={linkedinIcon}
                  alt="LinkedIn icon"
                  loading="lazy"
                  width="20"
                  height="20"
                />
              </a>
            </div>
            <div className={styles["footer__contact-emails"]}>
              {["office@coreup.com", "media@coreup.com"].map((email) => (
                <a
                  key={email}
                  href={`mailto:${email}`}
                  className={styles["footer__contact-email"]}
                >
                  {email}
                </a>
              ))}
            </div>
          </div>
          <div className={styles["footer__copyright"]}>
            <p>© 2025 Coreup. All rights reserved.</p>
          </div>
        </div>
        {/* Disclaimer Section */}
        <div className={styles["footer__disclaimer"]}>
          <p>
            The material presented via this website is for informational
            purposes only. Nothing on this website constitutes a solicitation
            for the purchase or sale of any financial product or service.
            Material presented on this website does not constitute a public
            offering of securities or investment services in any jurisdiction.
            Investing in startup and early stage companies involves risks,
            including loss of dividends, loss of investment and dilution, and it
            should be done only as part of a diversified portfolio. The
            investments presented in this website are suitable only for
            investors who are sufficiently experienced to understand these risks
            and make their own investment decisions.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default React.memo(Footer);

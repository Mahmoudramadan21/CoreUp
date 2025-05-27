/**
 * InvestorDashboardLayout.jsx
 *
 * A layout for investor dashboard pages with navigation and sidebar.
 * Optimized with React.memo for performance.
 * Accessibility Note: Includes ARIA attributes for navigation and semantic roles.
 * SEO Note: Uses Helmet for meta tags to improve searchability.
 *
 * Props:
 * - showSidebar: Toggles sidebar visibility
 *
 * Author: Mahmoud Ramadan
 * Created: June 2025
 */

import React from "react";
import PropTypes from "prop-types";
import { Outlet, NavLink } from "react-router-dom";
import { Helmet } from "react-helmet";
import HeaderInvestor from "@/components/features/HeaderInvestor/HeaderInvestor";
import Footer from "@/components/common/Footer/Footer";
import Sidebar from "@/components/common/Sidebar/Sidebar";
import styles from "./InvestorDashboardLayout.module.scss";

const InvestorDashboardLayout = ({ showSidebar = false }) => {
  return (
    <>
      {/* SEO Meta Tags */}
      <Helmet>
        <title>CoreUp - Investor Dashboard</title>
        <meta
          name="description"
          content={`Manage your portfolio, matches, and search for opportunities on CoreUp's investor dashboard. Last updated: ${new Date().toLocaleDateString()}`}
        />
        <meta
          name="keywords"
          content="investor, dashboard, portfolio, matches, CoreUp"
        />
        <meta name="robots" content="noindex, follow" />
      </Helmet>

      <div
        className={styles.investorDashboardLayout}
        role="application"
        aria-label="Investor Dashboard"
      >
        <HeaderInvestor />
        <main className={styles.investorDashboardLayout__main} role="main">
          {showSidebar && <Sidebar />}
          {/* Navigation Section */}
          <nav
            className={styles.investorDashboardLayout__nav}
            role="navigation"
            aria-label="Investor dashboard navigation"
          >
            <div
              className={`${styles.investorDashboardLayout__navContainer} container`}
            >
              <NavLink
                to="/investor/portfolio"
                className={({ isActive }) =>
                  `${styles.investorDashboardLayout__navTab} ${
                    isActive ? styles.investorDashboardLayout__navTabActive : ""
                  }`
                }
                aria-current={({ isActive }) => (isActive ? "page" : undefined)}
              >
                My Portfolio
              </NavLink>
              <NavLink
                to="/investor/matches"
                className={({ isActive }) =>
                  `${styles.investorDashboardLayout__navTab} ${
                    isActive ? styles.investorDashboardLayout__navTabActive : ""
                  }`
                }
                aria-current={({ isActive }) => (isActive ? "page" : undefined)}
              >
                My Matches
              </NavLink>
              <NavLink
                to="/investor/search"
                className={({ isActive }) =>
                  `${styles.investorDashboardLayout__navTab} ${
                    isActive ? styles.investorDashboardLayout__navTabActive : ""
                  }`
                }
                aria-current={({ isActive }) => (isActive ? "page" : undefined)}
              >
                Search
              </NavLink>
              <NavLink
                to="/investor/news-feed"
                className={({ isActive }) =>
                  `${styles.investorDashboardLayout__navTab} ${
                    isActive ? styles.investorDashboardLayout__navTabActive : ""
                  }`
                }
                aria-current={({ isActive }) => (isActive ? "page" : undefined)}
              >
                News Feed
              </NavLink>
            </div>
          </nav>
          {/* Content Section */}
          <section
            className={styles.investorDashboardLayout__content}
            role="region"
            aria-label="Dashboard Content"
          >
            <div
              className={`${styles.investorDashboardLayout__contentContainer} container`}
            >
              <Outlet />
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

// PropTypes for type checking
InvestorDashboardLayout.propTypes = {
  showSidebar: PropTypes.bool,
};

// Default props
InvestorDashboardLayout.defaultProps = {
  showSidebar: false,
};

export default React.memo(InvestorDashboardLayout);

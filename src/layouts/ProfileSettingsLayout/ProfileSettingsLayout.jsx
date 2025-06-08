/**
 * ProfileSettingsLayout.jsx
 *
 * A layout component for profile settings pages with sidebar navigation.
 * Optimized with React.memo for performance.
 * Accessibility Note: Includes ARIA attributes for main content and sidebar.
 * SEO Note: Uses Helmet for meta tags to improve searchability.
 *
 * Author: Mahmoud Ramadan
 * Created: June 2025
 */

import React from "react";
import { Outlet } from "react-router-dom";
import { Helmet } from "react-helmet";
import HeaderInvestor from "@/components/features/HeaderInvestor/HeaderInvestor";
import Footer from "@/components/common/Footer/Footer";
import Sidebar from "@/components/common/Sidebar/Sidebar";
import styles from "./ProfileSettingsLayout.module.scss";

const ProfileSettingsLayout = () => {
  return (
    <>
      {/* SEO Meta Tags */}
      <Helmet>
        <title>CoreUp - Profile Settings</title>
        <meta
          name="description"
          content={`Manage your CoreUp profile settings to optimize your investor or startup experience. Last updated: ${new Date().toLocaleDateString()}`}
        />
        <meta
          name="keywords"
          content="profile, settings, investor, startup, CoreUp"
        />
        <meta name="robots" content="noindex, follow" />
      </Helmet>

      <div
        className={styles.profileSettingsLayout}
        role="application"
        aria-label="Profile Settings"
      >
        <HeaderInvestor />
        <div className={styles.profileSettingsLayout__container}>
          <Sidebar />
          {/* Main Content */}
          <main
            className={styles.profileSettingsLayout__main}
            role="main"
            aria-label="Profile settings content"
          >
            <Outlet />
          </main>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default React.memo(ProfileSettingsLayout);

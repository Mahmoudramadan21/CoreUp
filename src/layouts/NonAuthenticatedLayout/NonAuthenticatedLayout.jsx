/**
 * NonAuthenticatedLayout.jsx
 *
 * A layout for pages accessible to non-logged-in users.
 * Optimized with React.memo for performance.
 * Accessibility Note: Includes semantic HTML and ARIA roles.
 * SEO Note: Uses Helmet for meta tags to improve searchability.
 *
 * Author: Mahmoud Ramadan
 * Created: June 2025
 */

import React from "react";
import { Outlet } from "react-router-dom";
import { Helmet } from "react-helmet";
import Header from "@/components/common/Header/Header";
import Footer from "@/components/common/Footer/Footer";
import styles from "./NonAuthenticatedLayout.module.scss";

const NonAuthenticatedLayout = () => {
  return (
    <>
      {/* SEO Meta Tags */}
      <Helmet>
        <title>CoreUp - Welcome</title>
        <meta
          name="description"
          content={`Discover CoreUp, the platform connecting startups and investors. Join today to explore opportunities. Last updated: ${new Date().toLocaleDateString()}`}
        />
        <meta
          name="keywords"
          content="startups, investors, networking, CoreUp"
        />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <div
        className={styles.nonAuthenticatedLayout}
        role="application"
        aria-label="Public Pages"
      >
        <Header />
        {/* Main Content */}
        <main className={styles.nonAuthenticatedLayout__main} role="main">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default React.memo(NonAuthenticatedLayout);

/**
 * InvestorLayout.jsx
 *
 * A layout for general investor pages with header and footer.
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
import HeaderInvestor from "@/components/features/HeaderInvestor/HeaderInvestor";
import Footer from "@/components/common/Footer/Footer";
import styles from "./InvestorLayout.module.scss";

const InvestorLayout = () => {
  return (
    <>
      {/* SEO Meta Tags */}
      <Helmet>
        <title>CoreUp - Investor Portal</title>
        <meta
          name="description"
          content={`Explore investment opportunities and manage your profile on CoreUp's investor portal. Last updated: ${new Date().toLocaleDateString()}`}
        />
        <meta
          name="keywords"
          content="investor, portal, opportunities, CoreUp"
        />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <div
        className={styles.investorLayout}
        role="application"
        aria-label="Investor Portal"
      >
        <HeaderInvestor />
        {/* Main Content */}
        <main className={styles.investorLayout__main} role="main">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default React.memo(InvestorLayout);

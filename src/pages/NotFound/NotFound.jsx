/**
 * NotFound.jsx
 *
 * A page for handling 404 errors with a return-to-home option.
 * Optimized with React.memo for performance.
 * Accessibility Note: Includes ARIA attributes for button and main content.
 * SEO Note: Uses Helmet with meta tags to prevent indexing.
 *
 * Author: Mahmoud Ramadan
 * Created: June 2025
 */

import React from "react";
import { Helmet } from "react-helmet";
import styles from "./NotFound.module.scss";
import Button from "@/components/common/Button/Button";
import NonAuthenticatedLayout from "@/layouts/NonAuthenticatedLayout/NonAuthenticatedLayout";

const NotFound = () => {
  return (
    <>
      {/* SEO Meta Tags */}
      <Helmet>
        <title>404 - Page Not Found - CoreUp</title>
        <meta
          name="description"
          content="The page you’re looking for doesn’t exist on CoreUp."
        />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href="https://coreup.com/404" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "404 - Page Not Found",
            description: "Page not found on CoreUp.",
            url: "https://coreup.com/404",
          })}
        </script>
      </Helmet>
      <NonAuthenticatedLayout>
        <div
          className={styles.notFound}
          role="main"
          aria-label="Page Not Found"
        >
          <h1 className={styles.notFound__title}>404 - Page Not Found</h1>
          <p className={styles.notFound__subtitle}>
            The page you’re looking for doesn’t exist.
          </p>
          <Button to="/" aria-label="Return to homepage">
            Go Home
          </Button>
        </div>
      </NonAuthenticatedLayout>
    </>
  );
};

export default React.memo(NotFound);

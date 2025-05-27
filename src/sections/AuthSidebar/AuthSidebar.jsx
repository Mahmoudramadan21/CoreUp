/*
 * AuthSidebar Component
 * Displays a sidebar for authentication pages with an illustrative image.
 *
 * Props: None
 *
 * Performance: Uses loading="eager" for critical image to optimize LCP.
 * Accessibility: Includes descriptive alt text and aria-label for screen reader support.
 * Note: Image is decorative; aria-hidden is applied to avoid redundancy.
 */

import React from "react";
import styles from "./AuthSidebar.module.scss";
import handshakeImage from "@/assets/handshake.svg";

const AuthSidebar = () => {
  return (
    <aside className={styles.authSidebar} aria-label="Authentication sidebar">
      <div className={styles.authSidebar__image}>
        <img
          src={handshakeImage}
          alt="Illustration of a handshake symbolizing investment partnerships"
          loading="eager"
          width="300"
          height="300"
          aria-hidden="true"
        />
      </div>
    </aside>
  );
};

export default React.memo(AuthSidebar);

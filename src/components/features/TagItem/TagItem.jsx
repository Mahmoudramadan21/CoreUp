/**
 * TagItem.jsx
 *
 * A component for displaying tags with variant styles.
 * Optimized with React.memo for performance.
 * Accessibility Note: Includes ARIA attributes for tag context.
 *
 * Props:
 * - label: Tag text
 * - variant: Tag style (default, large)
 *
 * Author: Mahmoud Ramadan
 * Created: June 2025
 */

import React from "react";
import PropTypes from "prop-types";
import styles from "./TagItem.module.scss";

const TagItem = ({ label, variant = "default" }) => (
  <div
    className={`${styles.tagItem} ${
      variant === "large" ? styles["tagItem--large"] : ""
    }`}
    aria-label={`Tag: ${label}`}
    role="status"
  >
    <span className={styles.tagItem__label}>{label}</span>
  </div>
);

// PropTypes for type checking
TagItem.propTypes = {
  label: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(["default", "large"]),
};

// Default props
TagItem.defaultProps = {
  variant: "default",
};

export default React.memo(TagItem);

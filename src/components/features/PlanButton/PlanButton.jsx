/**
 * PlanButton.jsx
 *
 * A component for pricing plan action buttons with navigation.
 * Optimized with React.memo for performance.
 * Accessibility Note: Includes ARIA attributes for navigation links.
 *
 * Props:
 * - children: Button content
 * - to: Navigation path
 * - variant: Button style (default, primary)
 * - ariaLabel: Accessibility label for screen readers
 *
 * Author: Mahmoud Ramadan
 * Created: June 2025
 */

import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styles from "./PlanButton.module.scss";
import arrowRight from "@/assets/icons/arrow-right.svg";
import arrowRightLight from "@/assets/icons/arrow-right-light.svg";

const PlanButton = ({ children, to, variant = "default", ariaLabel }) => {
  return (
    <Link
      to={to}
      className={`${styles.planButton} ${styles[`planButton--${variant}`]}`}
      aria-label={ariaLabel}
      role="button"
    >
      {/* Button Text */}
      {children}
      {/* Arrow Icon */}
      <img
        src={variant === "default" ? arrowRight : arrowRightLight}
        className={styles["planButton__arrow"]}
        alt=""
        width="20"
        height="20"
        loading="lazy"
        aria-hidden="true"
      />
    </Link>
  );
};

// PropTypes for type checking
PlanButton.propTypes = {
  children: PropTypes.node.isRequired,
  to: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(["default", "primary"]),
  ariaLabel: PropTypes.string.isRequired,
};

// Default props
PlanButton.defaultProps = {
  variant: "default",
};

export default React.memo(PlanButton);

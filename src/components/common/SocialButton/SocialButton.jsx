/**
 * SocialButton.jsx
 *
 * A button component for social media login actions.
 * Optimized with React.memo for performance.
 * Accessibility Note: Includes ARIA attributes and proper icon handling.
 *
 * Props:
 * - className: Custom CSS classes for styling
 * - icon: Social media icon
 * - children: Button content
 * - onClick: Click event handler
 * - ariaLabel: Accessibility label for screen readers
 *
 * Author: Mahmoud Ramadan
 * Created: June 2025
 */

import React from "react";
import PropTypes from "prop-types";
import styles from "./SocialButton.module.scss";

const SocialButton = ({
  className = "",
  icon,
  children,
  onClick,
  ariaLabel,
}) => {
  return (
    <button
      type="button"
      className={`${styles.socialButton} ${className}`}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {/* Social Media Icon */}
      <img src={icon} alt="" className={styles.socialIcon} aria-hidden="true" />
      {children}
    </button>
  );
};

// PropTypes for type checking
SocialButton.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  ariaLabel: PropTypes.string.isRequired,
};

export default React.memo(SocialButton);

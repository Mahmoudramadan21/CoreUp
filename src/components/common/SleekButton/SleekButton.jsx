/**
 * SleekButton.jsx
 *
 * A customizable button component with variant and size options.
 * Optimized with React.memo for performance.
 * Accessibility Note: Includes ARIA attributes and proper disabled states.
 *
 * Props:
 * - type: Button type (button, submit, reset)
 * - className: Custom CSS classes for styling
 * - children: Button content (text or elements)
 * - onClick: Click event handler
 * - disabled: Disables the button when true
 * - ariaLabel: Accessibility label for screen readers
 * - variant: Button style variant (primary, secondary, danger)
 * - size: Button size (small, medium, large)
 *
 * Author: Mahmoud Ramadan
 * Created: June 2025
 */

import React from "react";
import PropTypes from "prop-types";
import styles from "./SleekButton.module.scss";

const SleekButton = ({
  type = "button",
  className = "",
  children,
  onClick,
  disabled = false,
  ariaLabel,
  variant = "primary",
  size = "medium",
}) => {
  return (
    <button
      type={type}
      className={`${styles["sleek-button"]} ${
        styles[`sleek-button--${variant}`]
      } ${styles[`sleek-button--${size}`]} ${className} ${
        disabled ? styles["sleek-button--disabled"] : ""
      }`}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      aria-disabled={disabled}
    >
      {children}
    </button>
  );
};

// PropTypes for type checking
SleekButton.propTypes = {
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  ariaLabel: PropTypes.string,
  variant: PropTypes.oneOf(["primary", "secondary", "danger"]),
  size: PropTypes.oneOf(["small", "medium", "large"]),
};

// Default props
SleekButton.defaultProps = {
  type: "button",
  disabled: false,
  variant: "primary",
  size: "medium",
};

export default React.memo(SleekButton);

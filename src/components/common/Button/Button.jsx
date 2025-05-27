/**
 * Button.jsx
 *
 * A reusable button component for navigation or actions, supporting routing and click handlers.
 * Optimized with React.memo to prevent unnecessary re-renders and useCallback for stable event handlers.
 * Accessibility Note: Includes ARIA attributes and keyboard navigation support.
 *
 * Props:
 * - children: Button content (text or elements)
 * - className: Custom CSS classes for styling
 * - onClick: Click event handler
 * - to: Navigation path for routing
 * - ariaLabel: Accessibility label for screen readers
 * - disabled: Disables the button when true
 *
 * Author: Mahmoud Ramadan
 * Created: June 2025
 */

import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./Button.module.scss";

const Button = ({
  children,
  className = "",
  onClick,
  to,
  ariaLabel,
  disabled = false,
  size,
}) => {
  const navigate = useNavigate();

  /* Memoized click handler */
  const handleClick = useCallback(() => {
    if (disabled) return;
    if (to) {
      navigate(to);
    } else if (onClick) {
      onClick();
    }
  }, [disabled, to, onClick, navigate]);

  /* Determine size modifier class */
  const sizeClass = size ? styles[`button--${size}`] : "";

  return (
    <button
      type="button"
      className={`${styles.button} ${sizeClass} ${
        disabled ? styles["button--disabled"] : ""
      } ${className}`}
      onClick={handleClick}
      aria-label={ariaLabel}
      disabled={disabled}
      aria-disabled={disabled}
    >
      {children}
    </button>
  );
};

// PropTypes for type checking
Button.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
  to: PropTypes.string,
  ariaLabel: PropTypes.string,
  disabled: PropTypes.bool,
  size: PropTypes.oneOf(["md", "lg"]),
};

// Default props
Button.defaultProps = {
  className: "",
  disabled: false,
};

export default React.memo(Button);

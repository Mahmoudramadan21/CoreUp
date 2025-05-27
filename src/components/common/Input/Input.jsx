/**
 * Input.jsx
 *
 * A reusable input component for form fields, supporting text and password inputs.
 * Includes a password visibility toggle for password inputs.
 * Optimized with React.memo and useCallback for performance.
 * Accessibility Note: Includes ARIA attributes and proper labeling.
 *
 * Props:
 * - type: Input type (e.g., text, password)
 * - placeholder: Placeholder text
 * - icon: Optional icon for input
 * - value: Input value
 * - onChange: Change event handler
 * - ariaLabel: Accessibility label for screen readers
 *
 * Author: Mahmoud Ramadan
 * Created: June 2025
 */

import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import styles from "./Input.module.scss";
import eyeIcon from "@/assets/icons/eye.svg";

const Input = ({
  type = "text",
  placeholder,
  icon,
  value,
  onChange,
  ariaLabel,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  // Memoize password toggle handler
  const togglePasswordVisibility = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  // Determine input type based on password visibility
  const inputType =
    type === "password" ? (showPassword ? "text" : "password") : type;

  return (
    <div className={styles.inputWrapper}>
      {/* Optional Input Icon */}
      {icon && (
        <img
          src={icon}
          alt=""
          className={styles.inputIcon}
          aria-hidden="true"
        />
      )}
      {/* Input Field */}
      <input
        type={inputType}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={styles.input}
        aria-label={ariaLabel}
      />
      {/* Password Visibility Toggle */}
      {type === "password" && (
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className={styles.eyeButton}
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          <img src={eyeIcon} alt="" aria-hidden="true" />
        </button>
      )}
    </div>
  );
};

// PropTypes for type checking
Input.propTypes = {
  type: PropTypes.oneOf(["text", "password", "email", "number", "tel", "url"]),
  placeholder: PropTypes.string,
  icon: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  ariaLabel: PropTypes.string.isRequired,
};

export default React.memo(Input);

/**
 * SleekInputBox.jsx
 *
 * A form input component with label and error handling.
 * Optimized with React.memo and useCallback for performance.
 * Accessibility Note: Includes ARIA attributes for error states and labeling.
 *
 * Props:
 * - label: Input label text
 * - id: Unique ID for the input
 * - placeholder: Placeholder text
 * - defaultValue: Initial input value
 * - onChange: Change event handler
 * - type: Input type (text, email, number, password, tel, url)
 * - isInvalid: Indicates if the input is invalid
 * - errorMessage: Error message for invalid state
 *
 * Author: Mahmoud Ramadan
 * Created: June 2025
 */

import React, { useCallback } from "react";
import PropTypes from "prop-types";
import styles from "./SleekInputBox.module.scss";

const SleekInputBox = ({
  label,
  id,
  placeholder = "",
  defaultValue = "",
  onChange,
  type = "text",
  isInvalid = false,
  errorMessage = "",
  ...props
}) => {
  // Memoize change handler to prevent unnecessary re-renders
  const handleChange = useCallback((e) => onChange?.(e), [onChange]);

  return (
    <div
      className={`${styles.sleekInputBox} ${
        isInvalid ? styles.sleekInputBox__invalid : ""
      }`}
    >
      {/* Input Label */}
      {label && (
        <label htmlFor={id} className={styles.sleekInputBox__label}>
          {label}
        </label>
      )}
      {/* Input Field */}
      <input
        id={id}
        type={type}
        className={styles.sleekInputBox__input}
        placeholder={placeholder}
        defaultValue={defaultValue}
        onChange={handleChange}
        aria-invalid={isInvalid}
        aria-describedby={isInvalid && errorMessage ? `${id}-error` : undefined}
        {...props}
      />
      {/* Error Message */}
      {isInvalid && errorMessage && (
        <span
          id={`${id}-error`}
          className={styles.sleekInputBox__error}
          role="alert"
        >
          {errorMessage}
        </span>
      )}
    </div>
  );
};

// PropTypes for type checking
SleekInputBox.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  type: PropTypes.oneOf(["text", "email", "number", "password", "tel", "url"]),
  isInvalid: PropTypes.bool,
  errorMessage: PropTypes.string,
};

export default React.memo(SleekInputBox);

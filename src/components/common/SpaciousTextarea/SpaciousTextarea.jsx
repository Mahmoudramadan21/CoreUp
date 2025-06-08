/**
 * SpaciousTextarea.jsx
 *
 * A textarea component for large text inputs with label, description, and error handling.
 * Optimized with React.memo and useCallback for performance.
 * Accessibility Note: Includes ARIA attributes for error states and descriptions.
 *
 * Props:
 * - label: Textarea label text
 * - id: Unique ID for the textarea
 * - placeholder: Placeholder text
 * - defaultValue: Initial textarea value
 * - onChange: Change event handler
 * - description: Optional description text
 * - isInvalid: Indicates if the textarea is invalid
 * - errorMessage: Error message for invalid state
 *
 * Author: Mahmoud Ramadan
 * Created: June 2025
 */

import React, { useCallback } from "react";
import PropTypes from "prop-types";
import styles from "./SpaciousTextarea.module.scss";

const SpaciousTextarea = ({
  label,
  id,
  placeholder = "",
  defaultValue = "",
  onChange,
  description = "",
  isInvalid = false,
  errorMessage = "",
}) => {
  // Memoize change handler to prevent unnecessary re-renders
  const handleChange = useCallback((e) => onChange?.(e), [onChange]);

  return (
    <div
      className={`${styles.spaciousTextarea} ${
        isInvalid ? styles.spaciousTextarea__invalid : ""
      }`}
    >
      {/* Textarea Label */}
      {label && (
        <label htmlFor={id} className={styles.spaciousTextarea__label}>
          {label}
        </label>
      )}
      {/* Textarea Description */}
      {description && (
        <p id={`${id}-desc`} className={styles.spaciousTextarea__description}>
          {description}
        </p>
      )}
      {/* Textarea Input */}
      <textarea
        id={id}
        className={styles.spaciousTextarea__input}
        placeholder={placeholder}
        defaultValue={defaultValue}
        onChange={handleChange}
        aria-invalid={isInvalid}
        aria-describedby={
          (isInvalid && errorMessage ? `${id}-error` : "") +
          (description ? ` ${id}-desc` : "")
        }
      />
      {/* Error Message */}
      {isInvalid && errorMessage && (
        <span
          id={`${id}-error`}
          className={styles.spaciousTextarea__error}
          role="alert"
        >
          {errorMessage}
        </span>
      )}
    </div>
  );
};

// PropTypes for type checking
SpaciousTextarea.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  defaultValue: PropTypes.string,
  onChange: PropTypes.func,
  description: PropTypes.string,
  isInvalid: PropTypes.bool,
  errorMessage: PropTypes.string,
};

export default React.memo(SpaciousTextarea);

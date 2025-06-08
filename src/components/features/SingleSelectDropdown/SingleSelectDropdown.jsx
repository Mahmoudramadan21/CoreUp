/**
 * SingleSelectDropdown.jsx
 *
 * A single-select dropdown component using react-select.
 * Optimized with React.memo and Suspense for lazy loading.
 * Accessibility Note: Includes ARIA attributes for validation and errors.
 *
 * Props:
 * - label: Dropdown label
 * - id: Unique ID for the dropdown
 * - options: Array of option objects
 * - defaultValue: Default selected option
 * - onChange: Handler for selection changes
 * - placeholder: Placeholder text
 * - isInvalid: Indicates if the dropdown is invalid
 * - errorMessage: Error message for invalid state
 *
 * Author: Mahmoud Ramadan
 * Created: June 2025
 */

import React, { Suspense } from "react";
import PropTypes from "prop-types";
import styles from "./SingleSelectDropdown.module.scss";
import Select from "react-select";

const SingleSelectDropdown = ({
  label,
  id,
  options = [],
  defaultValue = null,
  onChange,
  placeholder = "Select an option...",
  isInvalid = false,
  errorMessage = "",
}) => {
  return (
    <Suspense
      fallback={
        <div role="status" aria-label="Loading dropdown">
          Loading...
        </div>
      }
    >
      {/* Dropdown Container */}
      <div
        className={`${styles.singleSelectDropdown} ${
          isInvalid ? styles.singleSelectDropdown__invalid : ""
        }`}
        role="group"
        aria-labelledby={label ? `${id}-label` : undefined}
      >
        {label && (
          <label
            htmlFor={id}
            className={styles.singleSelectDropdown__label}
            id={`${id}-label`}
          >
            {label}
          </label>
        )}
        <Select
          id={id}
          options={options}
          value={defaultValue}
          onChange={onChange}
          placeholder={placeholder}
          className={styles.singleSelectDropdown__select}
          classNamePrefix="singleSelectDropdown"
          menuPlacement="auto"
          isClearable
          aria-invalid={isInvalid}
          aria-describedby={
            isInvalid && errorMessage ? `${id}-error` : undefined
          }
        />
        {isInvalid && errorMessage && (
          <span
            id={`${id}-error`}
            className={styles.singleSelectDropdown__error}
            role="alert"
          >
            {errorMessage}
          </span>
        )}
      </div>
    </Suspense>
  );
};

// PropTypes for type checking
SingleSelectDropdown.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      label: PropTypes.string,
    })
  ),
  defaultValue: PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    label: PropTypes.string,
  }),
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  isInvalid: PropTypes.bool,
  errorMessage: PropTypes.string,
};

// Default props
SingleSelectDropdown.defaultProps = {
  label: "",
  options: [],
  defaultValue: null,
  placeholder: "Select an option...",
  isInvalid: false,
  errorMessage: "",
};

export default React.memo(SingleSelectDropdown);

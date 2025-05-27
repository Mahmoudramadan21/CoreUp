/**
 * MultiSelectDropdown.jsx
 *
 * A multi-select dropdown component using react-select.
 * Optimized with React.memo and Suspense for lazy loading.
 * Accessibility Note: Includes ARIA attributes and fieldset for form context.
 *
 * Props:
 * - label: Dropdown label text
 * - id: Unique ID for the dropdown
 * - options: Array of option objects
 * - defaultValue: Array of default selected options
 * - onChange: Handler for selection changes
 * - placeholder: Placeholder text for the dropdown
 *
 * Author: Mahmoud Ramadan
 * Created: June 2025
 */

import React, { Suspense } from "react";
import PropTypes from "prop-types";
import styles from "./MultiSelectDropdown.module.scss";
import Select from "react-select";

const MultiSelectDropdown = ({
  label,
  id,
  options = [],
  defaultValue = [],
  onChange,
  placeholder = "Select options...",
  ...props
}) => {
  return (
    <Suspense
      fallback={
        <div role="status" aria-live="polite">
          Loading...
        </div>
      }
    >
      {/* Dropdown Fieldset */}
      <fieldset
        className={styles.multiSelectDropdown}
        aria-label={`Select one or more ${label?.toLowerCase()}`}
      >
        <legend className={styles.multiSelectDropdown__label}>{label}</legend>
        <Select
          id={id}
          aria-labelledby={`${id}-label`}
          isMulti
          options={options}
          value={defaultValue}
          onChange={onChange}
          placeholder={placeholder}
          className={styles.multiSelectDropdown__select}
          classNamePrefix="multiSelectDropdown"
          menuPlacement="auto"
          isClearable
          {...props}
        />
      </fieldset>
    </Suspense>
  );
};

// PropTypes for type checking
MultiSelectDropdown.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.string,
    })
  ),
  defaultValue: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.string,
    })
  ),
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

export default React.memo(MultiSelectDropdown);

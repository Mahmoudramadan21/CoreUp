/**
 * ChoiceTickBox.jsx
 *
 * A reusable checkbox component for multi-select options.
 * Optimized with React.memo and useCallback for performance.
 * Accessibility Note: Includes ARIA attributes and proper labeling.
 *
 * Props:
 * - id: Unique ID for the checkbox
 * - label: Checkbox label text
 * - checked: Indicates if the checkbox is checked
 * - onChange: Handler for checkbox changes
 * - disabled: Disables the checkbox when true
 *
 * Author: Mahmoud Ramadan
 * Created: June 2025
 */

import React, { useCallback } from "react";
import PropTypes from "prop-types";
import styles from "./ChoiceTickBox.module.scss";

const ChoiceTickBox = ({
  id,
  label,
  checked = false,
  onChange,
  disabled = false,
}) => {
  // Memoize change handler
  const handleChange = useCallback(
    (e) => {
      if (onChange) {
        onChange(e.target.checked);
      }
    },
    [onChange]
  );

  return (
    <div className={styles.choiceTickBox}>
      {/* Checkbox Input */}
      <input
        type="checkbox"
        id={id}
        className={styles.choiceTickBox__input}
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
        aria-label={label}
      />
      {/* Checkbox Label */}
      <label htmlFor={id} className={styles.choiceTickBox__label}>
        {label}
      </label>
    </div>
  );
};

// PropTypes for type checking
ChoiceTickBox.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
};

// Default props
ChoiceTickBox.defaultProps = {
  checked: false,
  disabled: false,
};

export default React.memo(ChoiceTickBox);

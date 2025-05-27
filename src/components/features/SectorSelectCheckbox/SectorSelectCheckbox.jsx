/**
 * SectorSelectCheckbox.jsx
 *
 * A component for selecting multiple industries with a maximum limit.
 * Optimized with React.memo and useCallback for performance.
 * Accessibility Note: Includes ARIA attributes and fieldset for form context.
 *
 * Props:
 * - industries: Array of industry names
 * - selectedIndustries: Array of selected industries
 * - onChange: Handler for selection changes
 * - maxSelections: Maximum number of selections
 *
 * Author: Mahmoud Ramadan
 * Created: June 2025
 */

import React, { useCallback } from "react";
import PropTypes from "prop-types";
import styles from "./SectorSelectCheckbox.module.scss";

const SectorSelectCheckbox = ({
  industries,
  selectedIndustries,
  onChange,
  maxSelections = 3,
}) => {
  {
    /* Handle Checkbox Change */
  }
  const handleChange = useCallback(
    (industry) => (e) => {
      const isChecked = e.target.checked;
      if (!isChecked) {
        onChange(selectedIndustries.filter((item) => item !== industry));
        return;
      }
      if (selectedIndustries.length >= maxSelections) return;
      onChange([...selectedIndustries, industry]);
    },
    [selectedIndustries, onChange, maxSelections]
  );

  return (
    <fieldset
      className={styles.sectorSelectCheckbox}
      aria-label={`Select up to ${maxSelections} industries`}
    >
      {/* Legend */}
      <legend className={styles.visuallyHidden}>
        Select up to {maxSelections} industries
      </legend>
      {/* Industry List */}
      <ul className={styles.sectorSelectCheckbox__list} role="list">
        {industries.map((industry, index) => (
          <li
            key={industry}
            className={styles.sectorSelectCheckbox__item}
            role="listitem"
          >
            <div
              className={`${styles.sectorSelectCheckbox__wrapper} ${
                selectedIndustries.includes(industry)
                  ? styles["sectorSelectCheckbox__wrapper--checked"]
                  : ""
              } ${
                selectedIndustries.length >= maxSelections &&
                !selectedIndustries.includes(industry)
                  ? styles["sectorSelectCheckbox__wrapper--disabled"]
                  : ""
              }`}
            >
              <label
                htmlFor={`industry-${index}`}
                className={styles.sectorSelectCheckbox__label}
              >
                <span>{industry}</span>
                <input
                  id={`industry-${index}`}
                  type="checkbox"
                  name="industry"
                  value={industry}
                  checked={selectedIndustries.includes(industry)}
                  onChange={handleChange(industry)}
                  disabled={
                    selectedIndustries.length >= maxSelections &&
                    !selectedIndustries.includes(industry)
                  }
                  aria-label={industry}
                  aria-checked={selectedIndustries.includes(industry)}
                  className={styles.sectorSelectCheckbox__input}
                />
              </label>
            </div>
          </li>
        ))}
      </ul>
    </fieldset>
  );
};

// PropTypes for type checking
SectorSelectCheckbox.propTypes = {
  industries: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedIndustries: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
  maxSelections: PropTypes.number,
};

// Default props
SectorSelectCheckbox.defaultProps = {
  maxSelections: 3,
};

export default React.memo(SectorSelectCheckbox);

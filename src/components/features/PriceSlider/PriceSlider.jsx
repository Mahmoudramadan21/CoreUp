/**
 * PriceSlider.jsx
 *
 * A component for selecting a price range with sliders and inputs.
 * Optimized with React.memo and useCallback for performance.
 * Accessibility Note: Includes ARIA attributes for range inputs.
 *
 * Props:
 * - minValue: Minimum selected value
 * - maxValue: Maximum selected value
 * - onChange: Handler for value changes
 * - absoluteMin: Absolute minimum value
 * - absoluteMax: Absolute maximum value
 * - step: Step increment for values
 *
 * Author: Mahmoud Ramadan
 * Created: June 2025
 */

import React, { useCallback } from "react";
import PropTypes from "prop-types";
import styles from "./PriceSlider.module.scss";

const PriceSlider = ({
  minValue,
  maxValue,
  onChange,
  absoluteMin = 0,
  absoluteMax = 10000,
  step = 100,
}) => {
  {
    /* Handle Min Range Change */
  }
  const handleMinChange = useCallback(
    (e) => {
      const value = Math.round(parseInt(e.target.value, 10) / step) * step;
      if (value <= maxValue && value >= absoluteMin) {
        onChange(value, maxValue);
      }
    },
    [maxValue, absoluteMin, step, onChange]
  );

  {
    /* Handle Max Range Change */
  }
  const handleMaxChange = useCallback(
    (e) => {
      const value = Math.round(parseInt(e.target.value, 10) / step) * step;
      if (value >= minValue && value <= absoluteMax) {
        onChange(minValue, value);
      }
    },
    [minValue, absoluteMax, step, onChange]
  );

  {
    /* Handle Min Input Change */
  }
  const handleMinInputChange = useCallback(
    (e) => {
      let value = parseInt(e.target.value, 10);
      if (isNaN(value)) value = absoluteMin;
      value = Math.round(value / step) * step;
      value = Math.max(absoluteMin, Math.min(value, absoluteMax));
      if (value <= maxValue) {
        onChange(value, maxValue);
      } else {
        onChange(value, Math.min(value + step, absoluteMax));
      }
    },
    [maxValue, absoluteMin, absoluteMax, step, onChange]
  );

  {
    /* Handle Max Input Change */
  }
  const handleMaxInputChange = useCallback(
    (e) => {
      let value = parseInt(e.target.value, 10);
      if (isNaN(value)) value = absoluteMax;
      value = Math.round(value / step) * step;
      value = Math.max(absoluteMin, Math.min(value, absoluteMax));
      if (value >= minValue) {
        onChange(minValue, value);
      } else {
        onChange(Math.max(value - step, absoluteMin), value);
      }
    },
    [minValue, absoluteMin, absoluteMax, step, onChange]
  );

  return (
    <div
      className={styles.sliderContainer}
      role="region"
      aria-label="Investment range slider"
    >
      {/* Slider Inputs */}
      <div className={styles.sliderWrapper}>
        <input
          type="range"
          min={absoluteMin}
          max={absoluteMax}
          step={step}
          value={minValue}
          onChange={handleMinChange}
          className={styles.sliderInput}
          aria-valuemin={absoluteMin}
          aria-valuemax={absoluteMax}
          aria-valuenow={minValue}
          aria-label="Minimum investment amount"
        />
        <input
          type="range"
          min={absoluteMin}
          max={absoluteMax}
          step={step}
          value={maxValue}
          onChange={handleMaxChange}
          className={styles.sliderInput}
          aria-valuemin={absoluteMin}
          aria-valuemax={absoluteMax}
          aria-valuenow={maxValue}
          aria-label="Maximum investment amount"
        />
        <div className={styles.sliderTrack}>
          <div
            className={styles.sliderFill}
            style={{
              left: `${
                ((minValue - absoluteMin) / (absoluteMax - absoluteMin)) * 100
              }%`,
              width: `${
                ((maxValue - minValue) / (absoluteMax - absoluteMin)) * 100
              }%`,
            }}
          />
        </div>
        <div
          className={styles.sliderTooltip}
          style={{
            left: `${
              ((maxValue - absoluteMin) / (absoluteMax - absoluteMin)) * 100
            }%`,
          }}
          aria-hidden="true"
        >
          ${maxValue}
        </div>
      </div>
      {/* Number Inputs */}
      <div className={styles.sliderInputs}>
        <div className={styles.inputGroup}>
          <span className={styles.currencySymbol}>$</span>
          <input
            type="number"
            value={minValue}
            onChange={handleMinInputChange}
            className={styles.numberInput}
            aria-label="Minimum investment amount input"
            min={absoluteMin}
            max={absoluteMax}
            step={step}
          />
        </div>
        <span className={styles.labelDash}>-</span>
        <div className={styles.inputGroup}>
          <span className={styles.currencySymbol}>$</span>
          <input
            type="number"
            value={maxValue}
            onChange={handleMaxInputChange}
            className={styles.numberInput}
            aria-label="Maximum investment amount input"
            min={absoluteMin}
            max={absoluteMax}
            step={step}
          />
        </div>
      </div>
    </div>
  );
};

// PropTypes for type checking
PriceSlider.propTypes = {
  minValue: PropTypes.number.isRequired,
  maxValue: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  absoluteMin: PropTypes.number,
  absoluteMax: PropTypes.number,
  step: PropTypes.number,
};

// Default props
PriceSlider.defaultProps = {
  absoluteMin: 0,
  absoluteMax: 10000,
  step: 100,
};

export default React.memo(PriceSlider);

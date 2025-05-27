/**
 * StatCard.jsx
 *
 * A component for displaying statistical data with progress and actions.
 * Optimized with React.memo and useCallback for performance.
 * Accessibility Note: Includes ARIA attributes for live updates and tooltips.
 *
 * Props:
 * - title: Card title
 * - value: Statistical value
 * - buttonText: Button text
 * - progress: Progress percentage (0-100)
 * - onButtonClick: Handler for button click
 * - infoTooltip: Shows info tooltip
 *
 * Author: Mahmoud Ramadan
 * Created: June 2025
 */

import React, { useCallback } from "react";
import PropTypes from "prop-types";
import styles from "./StatCard.module.scss";

const StatCard = ({
  title,
  value,
  buttonText,
  progress,
  onButtonClick,
  infoTooltip,
}) => {
  {
    /* Handle Button Click */
  }
  const handleClick = useCallback(() => {
    if (onButtonClick) onButtonClick();
  }, [onButtonClick]);

  return (
    <div
      className={styles.statCard}
      role="region"
      aria-label={`${title} statistics`}
    >
      {/* Header Section */}
      <div className={styles.statCard__header}>
        <h3 className={styles.statCard__title}>{title}</h3>
        {infoTooltip && (
          <span
            className={styles.statCard__info}
            role="tooltip"
            aria-label="More information"
          >
            ⓘ
          </span>
        )}
      </div>
      {/* Content Section */}
      <div className={styles.statCard__content}>
        {progress !== undefined && progress >= 0 && (
          <div className={styles.statCard__progress}>
            <svg
              className={styles.statCard__progressCircle}
              aria-hidden="true"
              viewBox="0 0 100 100"
            >
              <defs>
                <linearGradient
                  id="progressGradient"
                  x1="0%"
                  y1="0%"
                  x2="0%"
                  y2="100%"
                >
                  <stop
                    offset="0%"
                    style={{ stopColor: "#05CD99", stopOpacity: 0 }}
                  />
                  <stop
                    offset="92.23%"
                    style={{ stopColor: "#05CD99", stopOpacity: 1 }}
                  />
                </linearGradient>
              </defs>
              <circle
                cx="50"
                cy="50"
                r="40"
                className={styles.statCard__progressBg}
              />
              <circle
                cx="50"
                cy="50"
                r="40"
                className={styles.statCard__progressFill}
                style={{
                  strokeDasharray: 251.2,
                  strokeDashoffset: 251.2 - (progress / 100) * 251.2,
                  stroke: "url(#progressGradient)",
                }}
              />
            </svg>
            <span className={styles.visuallyHidden}>{progress}% progress</span>
          </div>
        )}
        <span className={styles.statCard__value} aria-live="polite">
          {value}
        </span>
      </div>
      {/* Action Button */}
      {buttonText && (
        <button
          className={styles.statCard__button}
          onClick={handleClick}
          aria-label={`Click to ${buttonText.toLowerCase()}`}
          disabled={!onButtonClick}
        >
          {buttonText}
        </button>
      )}
    </div>
  );
};

// PropTypes for type checking
StatCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  buttonText: PropTypes.string,
  progress: PropTypes.number,
  onButtonClick: PropTypes.func,
  infoTooltip: PropTypes.bool,
};

// Default props
StatCard.defaultProps = {
  buttonText: "",
  progress: undefined,
  onButtonClick: null,
  infoTooltip: false,
};

export default React.memo(StatCard);

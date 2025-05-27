/**
 * Step.jsx
 *
 * A component for displaying steps in a "How It Works" section.
 * Optimized with React.memo for performance.
 * Accessibility Note: Includes ARIA attributes for semantic structure.
 *
 * Props:
 * - icon: Step icon URL
 * - title: Step title
 * - description: Step description
 * - connector: Optional connector icon URL
 * - isDocument: Applies document styling
 *
 * Author: Mahmoud Ramadan
 * Created: June 2025
 */

import React from "react";
import PropTypes from "prop-types";
import styles from "./Step.module.scss";

const Step = ({ icon, title, description, connector, isDocument }) => {
  const stepId = title.toLowerCase().replace(/\s+/g, "-");

  return (
    <article
      className={`${styles.step} ${isDocument ? styles["step--document"] : ""}`}
      aria-labelledby={`step-${stepId}`}
      role="region"
    >
      {/* Step Icon */}
      <div
        className={`${styles.step__icon} ${
          isDocument ? styles["step__icon--document"] : ""
        }`}
      >
        <img
          src={icon}
          alt={`${title} icon`}
          loading="lazy"
          width="24"
          height="24"
          aria-hidden="true"
        />
      </div>
      {/* Step Title */}
      <h3 id={`step-${stepId}`} className={styles.step__title}>
        {title}
      </h3>
      {/* Step Description */}
      <p className={styles.step__description}>{description}</p>
      {/* Connector Icon */}
      {connector && (
        <img
          src={connector}
          alt=""
          className={`${styles.step__connector} ${
            isDocument ? styles["step__connector--horizontal"] : ""
          }`}
          loading="lazy"
          aria-hidden="true"
        />
      )}
    </article>
  );
};

// PropTypes for type checking
Step.propTypes = {
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  connector: PropTypes.string,
  isDocument: PropTypes.bool,
};

// Default props
Step.defaultProps = {
  connector: null,
  isDocument: false,
};

export default React.memo(Step);

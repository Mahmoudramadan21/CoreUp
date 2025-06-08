/**
 * Plan.jsx
 *
 * A component for displaying pricing plans with features and actions.
 * Optimized with React.memo for performance.
 * Accessibility Note: Includes ARIA attributes for screen reader support.
 *
 * Props:
 * - title: Plan title
 * - description: Plan description
 * - price: Plan price
 * - period: Billing period
 * - features: Array of plan features
 * - isRecommended: Highlights recommended plan
 * - button: Button component for the plan
 *
 * Author: Mahmoud Ramadan
 * Created: June 2025
 */

import React from "react";
import PropTypes from "prop-types";
import styles from "./Plan.module.scss";
import CheckIcon from "@/assets/icons/check.svg";

const PlanCheckIcon = () => (
  <img
    src={CheckIcon}
    className={styles.plan__checkIcon}
    alt="Feature available check mark"
    width="16"
    height="16"
    loading="lazy"
    aria-hidden="true"
  />
);

const Plan = ({
  title,
  description,
  price,
  period,
  features,
  isRecommended,
  button,
}) => {
  const planId = title.toLowerCase().replace(/\s+/g, "-");

  return (
    <article
      className={`${styles.plan} ${
        isRecommended ? styles["plan--recommended"] : ""
      }`}
      aria-labelledby={`plan-${planId}-title`}
      aria-describedby={`plan-${planId}-desc`}
      role="region"
    >
      {/* Recommended Tag */}
      {isRecommended && (
        <span className={styles.plan__recommendedTag} aria-hidden="true">
          Recommended
        </span>
      )}
      {/* Plan Header */}
      <div className={styles.plan__header}>
        <h2 id={`plan-${planId}-title`} className={styles.plan__title}>
          {title}
        </h2>
        <p id={`plan-${planId}-desc`} className={styles.plan__description}>
          {description}
        </p>
        <div className={styles.plan__price}>
          <span className={styles.plan__priceAmount}>{price}</span>
          <span className={styles.plan__pricePeriod}>{period}</span>
        </div>
      </div>
      {/* Plan Footer */}
      <div className={styles.plan__footer}>
        <ul className={styles.plan__features} role="list">
          {features.map((feature, index) => (
            <li key={index} className={styles.plan__feature} role="listitem">
              <PlanCheckIcon />
              {feature}
            </li>
          ))}
        </ul>
        {button && <div className={styles.plan__button}>{button}</div>}
      </div>
    </article>
  );
};

// PropTypes for type checking
Plan.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  period: PropTypes.string.isRequired,
  features: PropTypes.arrayOf(PropTypes.string).isRequired,
  isRecommended: PropTypes.bool,
  button: PropTypes.node,
};

// Default props
Plan.defaultProps = {
  isRecommended: false,
  button: null,
};

export default React.memo(Plan);

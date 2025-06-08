/**
 * Card.jsx
 *
 * A card component for displaying content with actionable buttons.
 * Optimized with React.memo and semantic HTML for accessibility and SEO.
 * Accessibility Note: Uses ARIA roles and dynamic IDs for screen reader compatibility.
 *
 * Props:
 * - className: Custom CSS classes for styling
 * - title: Card title text
 * - subtitle: Card subtitle text
 * - description: Card description text
 * - role: ARIA role for accessibility (defaults to "article")
 *
 * Author: Mahmoud Ramadan
 * Created: June 2025
 */

import React, { useMemo } from "react";
import PropTypes from "prop-types";
import Button from "../Button/Button";
import styles from "./Card.module.scss";

const Card = ({
  className = "",
  title,
  subtitle,
  description,
  role = "article",
  variant,
}) => {
  /* Memoize the title ID for accessibility */
  const titleId = useMemo(
    () => `card-title-${title.replace(/\s+/g, "-").toLowerCase()}`,
    [title]
  );

  /* Determine variant class */
  const variantClass = variant ? styles[`card--${variant}`] : "";

  return (
    <article
      className={`${styles.card} ${variantClass} ${styles.className}`}
      role={role}
      aria-labelledby={titleId}
    >
      {/* Card Title */}
      <h2 id={titleId} className={styles.card__title}>
        {title}
      </h2>
      {/* Card Subtitle */}
      <h3 className={styles.card__subtitle}>{subtitle}</h3>
      {/* Card Description */}
      <p className={styles.card__description}>{description}</p>
      {/* Card Action Buttons */}
      <div className={styles.card__buttons}>
        <Button
          variant="primary"
          size="md"
          to="/register"
          aria-label={`Join now for ${title}`}
        >
          Join now
        </Button>
        <Button to="#" aria-label={`Read more about ${title}`}>
          Read more
        </Button>
      </div>
    </article>
  );
};

// PropTypes for type checking
Card.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  role: PropTypes.string,
  variant: PropTypes.oneOf(["startup", "investor"]),
};

// Default props
Card.defaultProps = {
  className: "",
  role: "article",
};

export default React.memo(Card);

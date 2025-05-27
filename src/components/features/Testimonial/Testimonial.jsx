/**
 * Testimonial.jsx
 *
 * A component for displaying client testimonials with ratings and avatars.
 * Optimized with React.memo and useMemo for performance.
 * Accessibility Note: Includes ARIA attributes and semantic structure.
 *
 * Props:
 * - avatar: User avatar URL
 * - name: User name
 * - role: User role or industry
 * - text: Testimonial text
 * - isFeatured: Highlights featured testimonial
 *
 * Author: Mahmoud Ramadan
 * Created: June 2025
 */

import React, { useMemo } from "react";
import PropTypes from "prop-types";
import styles from "./Testimonial.module.scss";
import StarIcon from "@/assets/icons/star.svg";
import QuoteIcon from "@/assets/icons/quote.svg";

const Star = () => (
  <img
    src={StarIcon}
    className={styles.testimonial__star}
    alt=""
    width="20"
    height="20"
    loading="lazy"
    aria-hidden="true"
  />
);

const Testimonial = ({ avatar, name, role, text, isFeatured }) => {
  {
    /* Memoize Star Rating */
  }
  const stars = useMemo(
    () => [...Array(5)].map((_, index) => <Star key={index} />),
    []
  );

  const testimonialId = name.toLowerCase().replace(/\s+/g, "-");

  return (
    <article
      className={`${styles.testimonial} ${
        isFeatured ? styles["testimonial--featured"] : ""
      }`}
      aria-labelledby={`testimonial-${testimonialId}`}
      aria-describedby={`testimonial-text-${testimonialId}`}
      role="region"
      itemScope
      itemType="http://schema.org/Review"
    >
      {/* Star Rating */}
      <div
        className={styles.testimonial__stars}
        itemProp="reviewRating"
        itemScope
        itemType="http://schema.org/Rating"
      >
        {stars}
        <meta itemProp="ratingValue" content="5" />
        <meta itemProp="bestRating" content="5" />
      </div>
      {/* Testimonial Text */}
      <p
        id={`testimonial-text-${testimonialId}`}
        className={styles.testimonial__text}
        itemProp="reviewBody"
      >
        {text}
      </p>
      {/* Footer Section */}
      <div className={styles.testimonial__footer}>
        <div
          className={styles.testimonial__user}
          itemProp="author"
          itemScope
          itemType="http://schema.org/Person"
        >
          <img
            src={avatar}
            alt={`${name}'s avatar`}
            className={styles.testimonial__avatar}
            loading="lazy"
            width="50"
            height="50"
            itemProp="image"
          />
          <div className={styles.testimonial__userInfo}>
            <h3
              id={`testimonial-${testimonialId}`}
              className={styles.testimonial__name}
              itemProp="name"
            >
              {name}
            </h3>
            <p className={styles.testimonial__role} itemProp="jobTitle">
              {role}
            </p>
          </div>
        </div>
        <img
          src={QuoteIcon}
          alt=""
          className={styles.testimonial__quote}
          loading="lazy"
          width="30"
          height="30"
          aria-hidden="true"
        />
      </div>
    </article>
  );
};

// PropTypes for type checking
Testimonial.propTypes = {
  avatar: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  isFeatured: PropTypes.bool,
};

// Default props
Testimonial.defaultProps = {
  isFeatured: false,
};

export default React.memo(Testimonial);

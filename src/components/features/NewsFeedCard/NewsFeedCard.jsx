/**
 * NewsFeedCard.jsx
 *
 * A component for displaying a news feed post with user info, text, and media.
 * Optimized with React.memo and useCallback for performance.
 * Accessibility Note: Includes ARIA attributes and schema.org metadata for SEO.
 *
 * Props:
 * - userName: Name of the post author
 * - userInitial: Initial letter for the user avatar
 * - postTime: Timestamp of the post
 * - mainText: Main content of the post
 * - sideText: Optional side text
 * - imageUrl: URL for the post image
 * - imageAlt: Alt text for the post image
 * - onMoreClick: Handler for more options
 *
 * Author: Mahmoud Ramadan
 * Created: June 2025
 */

import React, { useCallback } from "react";
import PropTypes from "prop-types";
import styles from "./NewsFeedCard.module.scss";
import MoreIcon from "@/assets/icons/more-vertical.svg";

const NewsFeedCard = ({
  userName,
  userInitial,
  postTime,
  mainText,
  sideText,
  imageUrl,
  imageAlt,
  onMoreClick,
}) => {
  // Memoize more click handler
  const handleMoreClick = useCallback(() => {
    if (onMoreClick) onMoreClick();
  }, [onMoreClick]);

  // Format post time with error handling
  const formattedPostTime = useCallback(() => {
    if (!postTime || typeof postTime !== "string") {
      return new Date().toISOString();
    }
    const date = new Date(postTime);
    return isNaN(date.getTime())
      ? new Date().toISOString()
      : date.toISOString();
  }, [postTime])();

  return (
    <article
      className={styles.newsFeedCard}
      role="article"
      aria-labelledby={`news-feed-card-title-${userName}`}
      itemscope
      itemtype="http://schema.org/SocialMediaPosting"
    >
      {/* User Info Section */}
      <div className={styles.newsFeedCard__userInfo}>
        <div
          className={styles.newsFeedCard__avatar}
          aria-label={`${userName}'s profile picture`}
        >
          <span itemprop="author">{userInitial}</span>
        </div>
        <div className={styles.newsFeedCard__userDetails}>
          <h3
            id={`news-feed-card-title-${userName}`}
            className={styles.newsFeedCard__userName}
            itemprop="creator"
          >
            {userName}
          </h3>
          <time
            className={styles.newsFeedCard__postTime}
            dateTime={formattedPostTime}
            itemprop="datePublished"
          >
            {postTime || "Just now"}
          </time>
        </div>
      </div>

      {/* Main Post Text */}
      <p className={styles.newsFeedCard__mainText} itemprop="articleBody">
        {mainText}
      </p>

      {/* Side Content */}
      <div className={styles.newsFeedCard__sideContent}>
        {imageUrl && (
          <div className={styles.newsFeedCard__imageWrapper}>
            <img
              src={imageUrl}
              alt={imageAlt}
              className={styles.newsFeedCard__image}
              loading="lazy"
              itemprop="image"
            />
          </div>
        )}
        {sideText && (
          <p className={styles.newsFeedCard__sideText} itemprop="description">
            {sideText}
          </p>
        )}
        <button
          type="button"
          className={styles.newsFeedCard__moreButton}
          onClick={handleMoreClick}
          aria-label={`More options for ${userName}'s post`}
          aria-expanded="false"
        >
          <img
            src={MoreIcon}
            className={styles.newsFeedCard__moreIcon}
            aria-hidden="true"
          />
        </button>
      </div>
    </article>
  );
};

// PropTypes for type checking
NewsFeedCard.propTypes = {
  userName: PropTypes.string.isRequired,
  userInitial: PropTypes.string.isRequired,
  postTime: PropTypes.string,
  mainText: PropTypes.string.isRequired,
  sideText: PropTypes.string,
  imageUrl: PropTypes.string,
  imageAlt: PropTypes.string,
  onMoreClick: PropTypes.func,
};

// Default props
NewsFeedCard.defaultProps = {
  sideText: "",
  imageUrl: "",
  imageAlt: "Post image",
  postTime: "",
  onMoreClick: null,
};

export default React.memo(NewsFeedCard);

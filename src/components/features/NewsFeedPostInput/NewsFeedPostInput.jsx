/**
 * NewsFeedPostInput.jsx
 *
 * A form component for creating new news feed posts.
 * Optimized with React.memo and useCallback for performance.
 * Accessibility Note: Includes ARIA attributes and form validation.
 *
 * Props:
 * - onPostSubmit: Handler for submitting the post
 * - onAddImage: Handler for adding an image
 * - onShareLink: Handler for sharing a link
 * - placeholder: Textarea placeholder text
 *
 * Author: Mahmoud Ramadan
 * Created: June 2025
 */

import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import styles from "./NewsFeedPostInput.module.scss";
import ImageIcon from "@/assets/icons/image.svg";
import LinkIcon from "@/assets/icons/link.svg";
import SleekButton from "@/components/common/SleekButton/SleekButton";

const NewsFeedPostInput = ({
  onPostSubmit,
  onAddImage,
  onShareLink,
  placeholder = "What's the latest?",
}) => {
  const [postText, setPostText] = useState("");

  // Memoize text change handler
  const handleTextChange = useCallback((e) => {
    setPostText(e.target.value);
  }, []);

  // Memoize submit handler
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (postText.trim() && onPostSubmit) {
        onPostSubmit(postText);
        setPostText("");
      }
    },
    [postText, onPostSubmit]
  );

  // Memoize image and link handlers
  const handleAddImage = useCallback(() => {
    if (onAddImage) onAddImage();
  }, [onAddImage]);

  const handleShareLink = useCallback(() => {
    if (onShareLink) onShareLink();
  }, [onShareLink]);

  return (
    <form
      className={styles.newsFeedPostInput}
      onSubmit={handleSubmit}
      aria-label="Create a new post"
    >
      {/* Post Textarea */}
      <textarea
        className={styles.newsFeedPostInput__textarea}
        value={postText}
        onChange={handleTextChange}
        placeholder={placeholder}
        aria-label="Enter your post content"
        rows={3}
      />
      {/* Action Buttons */}
      <div className={styles.newsFeedPostInput__actions}>
        <button
          type="button"
          className={styles.newsFeedPostInput__actionButton}
          onClick={handleAddImage}
          aria-label="Add an image to your post"
          disabled
        >
          <img
            src={ImageIcon}
            className={styles.newsFeedPostInput__icon}
            aria-hidden="true"
          />
          Add Image
        </button>
        <button
          type="button"
          className={styles.newsFeedPostInput__actionButton}
          onClick={handleShareLink}
          aria-label="Share a link in your post"
          disabled
        >
          <img
            src={LinkIcon}
            className={styles.newsFeedPostInput__icon}
            aria-hidden="true"
          />
          Share Link
        </button>
        <SleekButton
          type="submit"
          variant="primary"
          size="medium"
          ariaLabel="Submit post"
          disabled={!postText.trim()}
        >
          Post
        </SleekButton>
      </div>
    </form>
  );
};

// PropTypes for type checking
NewsFeedPostInput.propTypes = {
  onPostSubmit: PropTypes.func,
  onAddImage: PropTypes.func,
  onShareLink: PropTypes.func,
  placeholder: PropTypes.string,
};

// Default props
NewsFeedPostInput.defaultProps = {
  onPostSubmit: null,
  onAddImage: null,
  onShareLink: null,
  placeholder: "What's the latest?",
};

export default React.memo(NewsFeedPostInput);

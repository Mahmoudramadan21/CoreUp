/**
 * ChatMessage.jsx
 *
 * A component for rendering individual chat messages with avatars and timestamps.
 * Optimized with React.memo and useCallback for performance.
 * Accessibility Note: Includes ARIA attributes and double-click support for timestamp visibility.
 *
 * Props:
 * - sender: Name of the message sender
 * - text: Message content
 * - timestamp: Message timestamp
 * - isSent: Indicates if the message was sent by the user
 * - isSameSenderAsPrevious: Indicates if the sender is the same as the previous message
 * - avatarSrc: Source URL for the sender's avatar
 *
 * Author: Mahmoud Ramadan
 * Created: June 2025
 */

import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import styles from "./ChatMessage.module.scss";

const ChatMessage = ({
  sender,
  text,
  timestamp,
  isSent,
  isSameSenderAsPrevious,
  avatarSrc,
}) => {
  const [showTimestamp, setShowTimestamp] = useState(false);

  // Convert timestamp to relative time
  const getRelativeTime = useCallback(() => {
    const now = new Date();
    const msgTime = new Date(timestamp);
    const diffMs = now - msgTime;
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffMs < 1000 * 60) {
      return "Just now";
    } else if (diffMinutes < 60) {
      return `${diffMinutes} minute${diffMinutes !== 1 ? "s" : ""} ago`;
    } else if (diffHours < 24) {
      return `${diffHours} hour${diffHours !== 1 ? "s" : ""} ago`;
    } else {
      return `${diffDays} day${diffDays !== 1 ? "s" : ""} ago`;
    }
  }, [timestamp]);

  // Toggle timestamp visibility on double-click
  const handleDoubleClick = useCallback(() => {
    setShowTimestamp((prev) => !prev);
  }, []);

  return (
    <div
      className={`${styles.chatMessage} ${
        isSent ? styles.chatMessageSent : styles.chatMessageReceived
      } ${isSameSenderAsPrevious ? styles.sameSender : ""}`}
      aria-label={`${sender} sent: ${text} at ${getRelativeTime()}`}
      role="article"
    >
      {/* Message Content */}
      <div
        className={styles.messageContent}
        onDoubleClick={handleDoubleClick}
        tabIndex={0}
        role="button"
        aria-label={`Double-click to ${
          showTimestamp ? "hide" : "show"
        } timestamp`}
      >
        <div className={styles.chatMessageBubble}>
          {text || "No message content"}
        </div>
        {showTimestamp && (
          <div className={styles.chatMessageTimestamp}>{getRelativeTime()}</div>
        )}
      </div>
      {/* Avatar Placeholder */}
      <div className={styles.avatarWrapper}>
        {!isSameSenderAsPrevious && (
          <img
            src={avatarSrc}
            alt={`${sender}'s avatar`}
            className={styles.chatMessageAvatar}
            loading="lazy"
          />
        )}
      </div>
    </div>
  );
};

// PropTypes for type checking
ChatMessage.propTypes = {
  sender: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  timestamp: PropTypes.string.isRequired,
  isSent: PropTypes.bool.isRequired,
  isSameSenderAsPrevious: PropTypes.bool.isRequired,
  avatarSrc: PropTypes.string.isRequired,
};

export default React.memo(ChatMessage);

/**
 * NotificationItem.jsx
 *
 * A component for displaying individual notifications with icons and actions.
 * Optimized with React.memo and useCallback for performance.
 * Accessibility Note: Includes ARIA attributes for screen reader support.
 *
 * Props:
 * - id: Unique notification identifier
 * - type: Notification type (status, message, alert)
 * - title: Notification title
 * - message: Notification message
 * - timestamp: Notification timestamp
 * - read: Indicates if notification is read
 * - onRead: Handler for marking notification as read
 *
 * Author: Mahmoud Ramadan
 * Created: June 2025
 */

import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { formatDistanceToNow } from "date-fns";
import styles from "./NotificationItem.module.scss";
import SleekButton from "@/components/common/SleekButton/SleekButton";
import StatusIcon from "@/assets/icons/status-icon.svg";
import MessageIcon from "@/assets/icons/message-icon.svg";
import AlertIcon from "@/assets/icons/alert-icon.svg";

const NotificationItem = ({
  id,
  type,
  title,
  message,
  timestamp,
  read,
  onRead,
}) => {
  {
    /* Icon Mapping for Notification Types */
  }
  const iconMap = {
    status: (
      <img
        src={StatusIcon}
        alt="Status notification"
        className={styles.notificationItem__icon}
        loading="lazy"
        aria-hidden="true"
      />
    ),
    message: (
      <img
        src={MessageIcon}
        alt="Message notification"
        className={styles.notificationItem__icon}
        loading="lazy"
        aria-hidden="true"
      />
    ),
    alert: (
      <img
        src={AlertIcon}
        alt="Alert notification"
        className={styles.notificationItem__icon}
        loading="lazy"
        aria-hidden="true"
      />
    ),
  };

  {
    /* Format Timestamp */
  }
  const formattedTimestamp = useCallback(() => {
    return timestamp
      ? formatDistanceToNow(new Date(timestamp), { addSuffix: true })
      : "Just now";
  }, [timestamp])();

  {
    /* Handle Mark as Read */
  }
  const handleRead = useCallback(() => {
    if (onRead) onRead(id);
  }, [onRead, id]);

  return (
    <article
      className={`${styles.notificationItem} ${
        !read ? styles["notificationItem--unread"] : ""
      }`}
      role="article"
      aria-labelledby={`notification-${id}-title`}
      aria-describedby={`notification-${id}-desc`}
      aria-live={read ? "off" : "polite"}
    >
      {iconMap[type] || (
        <img
          src={MessageIcon}
          alt="Default notification"
          className={styles.notificationItem__icon}
          loading="lazy"
          aria-hidden="true"
        />
      )}
      <div className={styles.notificationItem__content}>
        {/* Header Section */}
        <div className={styles.notificationItem__header}>
          <span
            id={`notification-${id}-title`}
            className={styles.notificationItem__title}
          >
            {title}
          </span>
          {!read && (
            <span
              className={styles.notificationItem__unreadBadge}
              aria-hidden="true"
            />
          )}
        </div>
        {/* Message Content */}
        <p
          id={`notification-${id}-desc`}
          className={styles.notificationItem__message}
        >
          {message}
        </p>
        {/* Timestamp */}
        <time
          className={styles.notificationItem__timestamp}
          dateTime={new Date(timestamp || Date.now()).toISOString()}
          aria-label={`Posted ${formattedTimestamp}`}
        >
          {formattedTimestamp}
        </time>
        {/* Mark as Read Button */}
        {!read && onRead && (
          <SleekButton
            variant="secondary"
            size="small"
            onClick={handleRead}
            aria-label={`Mark notification ${title} as read`}
          >
            Mark as Read
          </SleekButton>
        )}
      </div>
    </article>
  );
};

// PropTypes for type checking
NotificationItem.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["status", "message", "alert"]).isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  timestamp: PropTypes.string.isRequired,
  read: PropTypes.bool.isRequired,
  onRead: PropTypes.func,
};

// Default props
NotificationItem.defaultProps = {
  onRead: null,
};

export default React.memo(NotificationItem);

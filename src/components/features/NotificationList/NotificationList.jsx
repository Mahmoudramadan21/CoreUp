/**
 * NotificationList.jsx
 *
 * A component for rendering a list of notifications.
 * Optimized with React.memo for performance.
 * Accessibility Note: Includes ARIA roles for status and error messages.
 *
 * Props:
 * - notifications: Array of notification objects
 * - loading: Indicates if notifications are loading
 * - error: Error message if loading fails
 * - onRead: Handler for marking notifications as read
 *
 * Author: Mahmoud Ramadan
 * Created: June 2025
 */

import React from "react";
import PropTypes from "prop-types";
import NotificationItem from "@/components/features/NotificationItem/NotificationItem";
import styles from "./NotificationList.module.scss";

const NotificationList = ({ notifications, loading, error, onRead }) => {
  return (
    <div
      className={styles.notificationList}
      role="feed"
      aria-label="Notifications"
    >
      {/* Loading State */}
      {loading ? (
        <p role="status" aria-label="Loading notifications">
          Loading...
        </p>
      ) : error ? (
        // Error State
        <p className={styles.error} role="alert">
          {error}
        </p>
      ) : notifications.length === 0 ? (
        // Empty State
        <p className={styles.empty} role="status">
          No notifications available.
        </p>
      ) : (
        /* Notification Items */
        notifications.map((notification) => (
          <NotificationItem
            key={notification.id}
            {...notification}
            onRead={onRead}
          />
        ))
      )}
    </div>
  );
};

// PropTypes for type checking
NotificationList.propTypes = {
  notifications: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      type: PropTypes.oneOf(["status", "message", "alert"]).isRequired,
      title: PropTypes.string.isRequired,
      message: PropTypes.string.isRequired,
      timestamp: PropTypes.string.isRequired,
      read: PropTypes.bool.isRequired,
    })
  ).isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  onRead: PropTypes.func,
};

// Default props
NotificationList.defaultProps = {
  error: null,
  onRead: null,
};

export default React.memo(NotificationList);

/**
 * Notifications.jsx
 *
 * A page for displaying user notifications with filtering and read status.
 * Optimized with React.memo and useCallback for performance.
 * Accessibility Note: Includes ARIA attributes for buttons and notification list.
 * SEO Note: Uses Helmet with meta tags to prevent indexing of private content.
 *
 * Author: Mahmoud Ramadan
 * Created: June 2025
 */

import React, { useState, useEffect, useCallback } from "react";
import { Helmet } from "react-helmet";
import InvestorLayout from "@/layouts/InvestorLayout/InvestorLayout";
import NotificationList from "@/components/features/NotificationList/NotificationList";
import SleekButton from "@/components/common/SleekButton/SleekButton";
import styles from "./Notifications.module.scss";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);

  {
    /* Fetch Notifications */
  }
  const fetchNotifications = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Simulated API call
      const response = await new Promise((resolve) =>
        setTimeout(
          () =>
            resolve({
              notifications: [
                {
                  id: "1",
                  type: "status",
                  title: "Portfolio Updated",
                  message: "Your investment portfolio has been updated.",
                  timestamp: "2025-06-03T12:00:00Z",
                  read: false,
                },
                {
                  id: "2",
                  type: "message",
                  title: "New Message from StartupX",
                  message: "StartupX sent you a proposal.",
                  timestamp: "2025-06-03T11:45:00Z",
                  read: true,
                },
                {
                  id: "3",
                  type: "alert",
                  title: "Investment Deadline",
                  message: "Investment opportunity closes in 24 hours.",
                  timestamp: "2025-06-03T11:30:00Z",
                  read: false,
                },
                {
                  id: "4",
                  type: "status",
                  title: "Profile Updated",
                  message: "Your profile details have been saved.",
                  timestamp: "2025-06-03T11:15:00Z",
                  read: true,
                },
                {
                  id: "5",
                  type: "message",
                  title: "New Message from InvestorY",
                  message: "InvestorY wants to discuss a deal.",
                  timestamp: "2025-06-03T11:00:00Z",
                  read: false,
                },
                {
                  id: "6",
                  type: "alert",
                  title: "New Match",
                  message: "A new startup matches your criteria.",
                  timestamp: "2025-06-03T10:45:00Z",
                  read: true,
                },
                {
                  id: "7",
                  type: "status",
                  title: "Account Verified",
                  message: "Your account has been verified.",
                  timestamp: "2025-06-03T10:30:00Z",
                  read: true,
                },
                {
                  id: "8",
                  type: "message",
                  title: "New Message from TeamZ",
                  message: "TeamZ shared project updates.",
                  timestamp: "2025-06-03T10:15:00Z",
                  read: false,
                },
                {
                  id: "9",
                  type: "alert",
                  title: "New Opportunity",
                  message: "A new investment opportunity is available.",
                  timestamp: "2025-06-03T10:00:00Z",
                  read: false,
                },
              ],
            }),
          1000
        )
      );
      setNotifications(response.notifications || []);
    } catch (err) {
      setError("Failed to load notifications. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  {
    /* Mark All Notifications as Read */
  }
  const handleMarkAllRead = useCallback(() => {
    setNotifications((prev) =>
      prev.map((notification) => ({ ...notification, read: true }))
    );
    // TODO: Update backend
  }, []);

  {
    /* Toggle Unread Filter */
  }
  const handleFilterToggle = useCallback(() => {
    setShowUnreadOnly((prev) => !prev);
  }, []);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  {
    /* Filter Notifications */
  }
  const filteredNotifications = showUnreadOnly
    ? notifications.filter((notification) => !notification.read)
    : notifications;

  return (
    <>
      {/* SEO Meta Tags */}
      <Helmet>
        <title>Notifications - CoreUp</title>
        <meta
          name="description"
          content={`View your latest notifications on CoreUp, including updates, messages, and alerts. Last updated: ${new Date().toLocaleDateString()}`}
        />
        <meta name="keywords" content="notifications, dashboard, CoreUp" />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href="https://coreup.com/notifications" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Notifications",
            description: "View notifications on CoreUp.",
            url: "https://coreup.com/notifications",
          })}
        </script>
      </Helmet>
      <InvestorLayout>
        <section
          className={styles.notifications}
          aria-labelledby="notifications-heading"
          role="main"
        >
          <div className={styles.notifications__header}>
            <h2
              id="notifications-heading"
              className={styles.notifications__title}
            >
              Notifications
            </h2>
            <div className={styles.notifications__actions}>
              <SleekButton
                variant="secondary"
                size="small"
                onClick={handleMarkAllRead}
                aria-label="Mark all notifications as read"
                disabled={loading || filteredNotifications.every((n) => n.read)}
              >
                Mark All as Read
              </SleekButton>
              <SleekButton
                variant="secondary"
                size="small"
                onClick={handleFilterToggle}
                aria-label={
                  showUnreadOnly
                    ? "Show all notifications"
                    : "Show unread notifications only"
                }
                disabled={loading}
              >
                {showUnreadOnly ? "Show All" : "Unread Only"}
              </SleekButton>
            </div>
          </div>
          <div className={styles.notifications__content}>
            <div className={styles.notifications__note}>
              Please Note: An impression is counted each time your profile or
              pitch is displayed in a list or viewed by another user.
            </div>
            <NotificationList
              notifications={filteredNotifications}
              loading={loading}
              error={error}
              aria-label="Notification list"
            />
          </div>
        </section>
      </InvestorLayout>
    </>
  );
};

export default React.memo(Notifications);

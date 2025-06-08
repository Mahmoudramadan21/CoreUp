/**
 * Sidebar.jsx
 *
 * A sidebar component for profile settings navigation, with text and icons.
 * Optimized for performance with React.memo and inline SVG icons.
 * Accessibility Note: Includes ARIA attributes and focus states for navigation.
 *
 * Props: None
 *
 * Author: Mahmoud Ramadan
 * Created: June 2025
 */

import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Sidebar.module.scss";

// Inline SVG icons for better performance and accessibility
const ContactInfoIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <title>Contact Info Icon</title>
    <path
      d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
      fill="currentColor"
    />
  </svg>
);

const InvestmentCriteriaIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <title>Investment Criteria Icon</title>
    <path
      d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14h-2v-4h2v4zm0-6h-2V7h2v4z"
      fill="currentColor"
    />
  </svg>
);

const SettingsIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <title>Settings Icon</title>
    <path
      d="M19.14 12.94c.04-.3.06-.61.06-.94s-.02-.64-.06-.94l2.03-1.58a.49.49 0 00.12-.61l-1.92-3.32a.488.488 0 00-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 00-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.56-1.62.94l-2.39-.96a.495.495 0 00-.59.22l-1.92 3.32c-.12.22-.07.49.12.61l2.03 1.58c-.04.3-.06.61-.06.94s.02.64.06.94l-2.03 1.58a.49.49 0 00-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .43-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.49-.12-.61l-2.03-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"
      fill="currentColor"
    />
  </svg>
);

const ChangePasswordIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <title>Change Password Icon</title>
    <path
      d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm9 14H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"
      fill="currentColor"
    />
  </svg>
);

const DeleteAccountIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <title>Delete Account Icon</title>
    <path
      d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"
      fill="currentColor"
    />
  </svg>
);

const LogoutIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <title>Logout Icon</title>
    <path
      d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5-5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"
      fill="currentColor"
    />
  </svg>
);

const Sidebar = () => {
  // Navigation items data
  const navItems = [
    {
      id: "contact-info",
      label: "Contact Info",
      to: "/investor/profile/contact/edit",
      icon: <ContactInfoIcon />,
    },
    {
      id: "investment-criteria",
      label: "Investment Criteria",
      to: "/investor/profile/investment-criteria/edit",
      icon: <InvestmentCriteriaIcon />,
    },
    {
      id: "settings",
      label: "Settings",
      to: "/investor/profile/settings",
      icon: <SettingsIcon />,
    },
    {
      id: "change-password",
      label: "Change Password",
      to: "/investor/profile/change-password",
      icon: <ChangePasswordIcon />,
    },
    {
      id: "delete-account",
      label: "Delete Account",
      to: "/investor/profile/delete",
      icon: <DeleteAccountIcon />,
    },
    {
      id: "logout",
      label: "Logout",
      to: "/investor/profile/logout",
      icon: <LogoutIcon />,
    },
  ];

  return (
    <aside className={styles.sidebar} aria-label="Profile Settings Sidebar">
      {/* Sidebar Navigation */}
      <nav role="navigation" aria-label="Profile Settings Navigation">
        <ul className={styles.navList}>
          {navItems.map((item) => (
            <li key={item.id} className={styles.navItem}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `${styles.navLink} ${isActive ? styles.navLink__active : ""}`
                }
                aria-label={item.label}
                aria-current={({ isActive }) => (isActive ? "page" : undefined)}
              >
                <span className={styles.navLink__icon}>{item.icon}</span>
                <span className={styles.navLink__text}>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default React.memo(Sidebar);

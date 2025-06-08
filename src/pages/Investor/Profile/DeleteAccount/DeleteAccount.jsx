/**
 * DeleteAccount.jsx
 *
 * A profile settings page for initiating account deletion.
 * Optimized with React.memo and useCallback for performance.
 * Accessibility Note: Includes ARIA attributes for form and checkbox.
 * SEO Note: Uses Helmet with noindex for private content.
 *
 * Author: Mahmoud Ramadan
 * Created: June 2025
 */

import React, { useState, useEffect, useCallback } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import SleekButton from "@/components/common/SleekButton/SleekButton";
import styles from "./DeleteAccount.module.scss";

const DeleteAccount = () => {
  const navigate = useNavigate();
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  // Handle checkbox change
  const handleCheckboxChange = useCallback((e) => {
    setIsConfirmed(e.target.checked);
    setMessage({ text: "", type: "" });
  }, []);

  // Handle form submission
  const handleDelete = useCallback(
    (e) => {
      e.preventDefault();
      setIsSubmitting(true);

      if (!isConfirmed) {
        setMessage({
          text: "Please confirm account deletion.",
          type: "error",
        });
        setIsSubmitting(false);
        return;
      }

      // TODO: Implement API call for account deletion
      console.log("Account deletion requested");
      setMessage({
        text: "Account deletion process initiated. Please check your email.",
        type: "success",
      });
      setIsConfirmed(false);
      setTimeout(() => navigate("/investor/profile"), 2000);
      setIsSubmitting(false);
    },
    [isConfirmed, navigate]
  );

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      {/* SEO Meta Tags */}
      <Helmet>
        <title>Delete Account - CoreUp</title>
        <meta
          name="description"
          content="Permanently delete your CoreUp account. This action cannot be undone."
        />
        <meta name="robots" content="noindex, nofollow" />
        <link
          rel="canonical"
          href="https://coreup.com/investor/profile/delete-account"
        />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Delete Account",
            description: "Initiate account deletion on CoreUp.",
            url: "https://coreup.com/investor/profile/delete-account",
          })}
        </script>
      </Helmet>
      <section
        className={styles.deleteAccount}
        role="main"
        aria-label="Delete Account Form"
      >
        {/* Message Display */}
        {message.text && (
          <div
            className={`${styles.deleteAccount__message} ${
              message.type === "success"
                ? styles["deleteAccount__message--success"]
                : styles["deleteAccount__message--error"]
            }`}
            role="alert"
            aria-live="polite"
          >
            {message.text}
          </div>
        )}
        {/* Deletion Form */}
        <form
          onSubmit={handleDelete}
          className={styles.deleteAccount__form}
          aria-labelledby="delete-account-legend"
        >
          <fieldset className={styles.deleteAccount__fieldset}>
            <legend
              id="delete-account-legend"
              className={styles.deleteAccount__visuallyHidden}
            >
              Delete Account
            </legend>
            <p
              id="form-description"
              className={styles.deleteAccount__visuallyHidden}
            >
              Confirm the permanent deletion of your account below.
            </p>
            <p className={styles.deleteAccount__description}>
              Are you sure you want to delete your account? This action cannot
              be undone.
            </p>
            <div className={styles.deleteAccount__checkboxContainer}>
              <input
                type="checkbox"
                id="confirm-deletion"
                className={styles.deleteAccount__checkbox}
                checked={isConfirmed}
                onChange={handleCheckboxChange}
                aria-describedby="checkbox-description"
                aria-required="true"
              />
              <label
                htmlFor="confirm-deletion"
                className={styles.deleteAccount__checkboxLabel}
              >
                I understand that this action is irreversible.
              </label>
            </div>
            <p
              id="checkbox-description"
              className={styles.deleteAccount__checkboxDescription}
            >
              By checking this box, you acknowledge that all your data will be
              permanently deleted.
            </p>
          </fieldset>
          <button
            type="submit"
            className={styles.deleteAccount__submitButton}
            disabled={isSubmitting || !isConfirmed}
            aria-label={
              isSubmitting
                ? "Deleting account..."
                : "Delete account permanently"
            }
          >
            {isSubmitting ? "Deleting..." : "Delete"}
          </button>
        </form>
      </section>
    </>
  );
};

export default React.memo(DeleteAccount);

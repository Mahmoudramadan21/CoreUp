/**
 * ChangePassword.jsx
 *
 * A profile settings page for updating the user's password.
 * Optimized with React.memo and useCallback for performance.
 * Accessibility Note: Includes ARIA attributes for form fields and errors.
 * SEO Note: Uses Helmet with noindex for private content.
 *
 * Author: Mahmoud Ramadan
 * Created: June 2025
 */

import React, { useState, useEffect, useCallback } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import SleekInputBox from "@/components/common/SleekInputBox/SleekInputBox";
import SleekButton from "@/components/common/SleekButton/SleekButton";
import styles from "./ChangePassword.module.scss";

const initialState = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

const ChangePassword = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Handle input changes
  const handleInputChange = useCallback(
    (field) => (e) => {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));
      setErrors((prev) => ({ ...prev, [field]: "" }));
      setSuccessMessage("");
    },
    []
  );

  // Validate password strength
  const validatePassword = useCallback((password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (!password) return "Password is required";
    if (password.length < minLength)
      return "Password must be at least 8 characters long";
    if (!hasUpperCase)
      return "Password must contain at least one uppercase letter";
    if (!hasNumber) return "Password must contain at least one number";
    if (!hasSpecialChar)
      return "Password must contain at least one special character";
    return "";
  }, []);

  // Handle form submission
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      setIsSubmitting(true);

      const newErrors = {
        currentPassword: validatePassword(formData.currentPassword),
        newPassword: validatePassword(formData.newPassword),
        confirmPassword:
          formData.newPassword !== formData.confirmPassword
            ? "Passwords do not match"
            : "",
      };

      if (Object.values(newErrors).some((error) => error)) {
        setErrors(newErrors);
        setIsSubmitting(false);
        return;
      }

      // TODO: Implement API call for password change
      console.log("Password change request:", formData);
      setSuccessMessage("Password changed successfully!");
      setFormData(initialState);
      setTimeout(() => navigate("/investor/profile"), 2000);
    },
    [formData, validatePassword, navigate]
  );

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      {/* SEO Meta Tags */}
      <Helmet>
        <title>Change Password - CoreUp</title>
        <meta
          name="description"
          content="Securely update your account password on CoreUp."
        />
        <meta name="robots" content="noindex, nofollow" />
        <link
          rel="canonical"
          href="https://coreup.com/investor/profile/change-password"
        />
        <script type="text/javascript">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Change Password",
            description: "Update your account password on CoreUp.",
            url: "https://coreup.com/investor/profile/change-password",
          })}
        </script>
      </Helmet>
      <section
        className={styles.changePassword}
        role="main"
        aria-label="Change Password Form"
      >
        {/* Success Message */}
        {successMessage && (
          <div
            className={styles.changePassword__success}
            aria-label="Success message"
            aria-live="polite"
          >
            {successMessage}
          </div>
        )}
        {/* Password Form */}
        <form onSubmit={handleSubmit} className={styles.changePassword__form}>
          <fieldset
            className={styles.changePassword__fieldset}
            aria-describedby="form-description"
          >
            <legend className={styles.changePassword__visuallyHidden}>
              Change Password
            </legend>
            <p
              id="form-description"
              className={styles.changePassword__visuallyHidden}
            >
              Update your account password using the fields below.
            </p>
            <SleekInputBox
              label="Current Password"
              id="current-password"
              type="password"
              placeholder="Enter current password..."
              value={formData.currentPassword}
              onChange={handleInputChange("currentPassword")}
              isInvalid={!!errors.currentPassword}
              errorMessage={errors.currentPassword}
              aria-required="true"
              aria-describedby="current-password-error"
            />
            <SleekInputBox
              label="New Password"
              id="new-password"
              type="password"
              placeholder="Enter new password..."
              value={formData.newPassword}
              onChange={handleInputChange("newPassword")}
              isInvalid={!!errors.newPassword}
              errorMessage={errors.newPassword}
              aria-required="true"
              aria-describedby="new-password-error"
            />
            <SleekInputBox
              label="Confirm New Password"
              id="Confirm-password"
              type="password"
              placeholder="Confirm new password..."
              value={formData.confirmPassword}
              onChange={handleInputChange("confirmPassword")}
              isInvalid={!!errors.confirmPassword}
              errorMessage={errors.confirmPassword}
              aria-required="true"
              aria-describedby="confirm-password-error"
            />
          </fieldset>
          <button
            type="submit"
            className={styles.changePassword__submitButton}
            disabled={isSubmitting}
            aria-label={
              isSubmitting ? "Saving changes..." : "Save password changes"
            }
          >
            {isSubmitting ? "Saving..." : "Save"}
          </button>
        </form>
      </section>
    </>
  );
};

export default React.memo(ChangePassword);

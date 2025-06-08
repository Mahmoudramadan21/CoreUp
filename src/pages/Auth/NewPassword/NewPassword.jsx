/**
 * NewPassword.jsx
 *
 * A page for setting a new password with strength validation.
 * Optimized with React.memo and useCallback for performance.
 * Accessibility Note: Includes ARIA attributes for form and strength indicator.
 * SEO Note: Uses Helmet with schema.org structured data for crawlability.
 *
 * Author: Mahmoud Ramadan
 * Created: June 2025
 */

import React, { useState, useCallback } from "react";
import { Helmet } from "react-helmet";
import styles from "./NewPassword.module.scss";
import AuthLayout from "@/layouts/AuthLayout/AuthLayout";
import Input from "@/components/common/Input/Input";
import Button from "@/components/common/Button/Button";
import lockIcon from "@/assets/icons/lock.svg";

const NewPassword = () => {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [formErrors, setFormErrors] = useState({});

  {
    /* Calculate Password Strength */
  }
  const calculatePasswordStrength = useCallback((value) => {
    let strength = 0;
    if (value.length > 0) strength += 25;
    if (value.length >= 8) strength += 25;
    if (/[A-Z]/.test(value)) strength += 25;
    if (/[0-9]/.test(value) || /[!@#$%^&*]/.test(value)) strength += 25;
    return strength;
  }, []);

  {
    /* Validate Form Data */
  }
  const validateForm = useCallback(() => {
    const errors = {};
    if (!formData.password.trim()) errors.password = "Password is required";
    else if (passwordStrength < 75) errors.password = "Password is too weak";
    if (!formData.confirmPassword.trim())
      errors.confirmPassword = "Confirm password is required";
    else if (formData.password !== formData.confirmPassword)
      errors.confirmPassword = "Passwords do not match";
    return errors;
  }, [formData, passwordStrength]);

  {
    /* Handle Password Change */
  }
  const handlePasswordChange = useCallback(
    (e) => {
      const value = e.target.value;
      setFormData((prev) => ({ ...prev, password: value }));
      setPasswordStrength(calculatePasswordStrength(value));
      setFormErrors((prev) => ({
        ...prev,
        password: null,
        confirmPassword: null,
      }));
    },
    [calculatePasswordStrength]
  );

  {
    /* Handle Confirm Password Change */
  }
  const handleConfirmPasswordChange = useCallback((e) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, confirmPassword: value }));
    setFormErrors((prev) => ({ ...prev, confirmPassword: null }));
  }, []);

  {
    /* Handle Form Submission */
  }
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const errors = validateForm();
      setFormErrors(errors);
      if (Object.keys(errors).length === 0) {
        console.log("New password set:", formData.password); // TODO: API call
        // TODO: Navigate to login or success page
      }
    },
    [formData, validateForm]
  );

  return (
    <>
      {/* SEO Meta Tags */}
      <Helmet>
        <title>Set New Password - CoreUp</title>
        <meta
          name="description"
          content={`Set a new password for your CoreUp account to regain access. Last updated: ${new Date().toLocaleDateString()}`}
        />
        <meta name="keywords" content="new password, password reset, CoreUp" />
        <meta name="robots" content="noindex, follow" />
        <link rel="canonical" href="https://coreup.com/auth/new-password" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Set New Password",
            description: "Set a new password for CoreUp.",
            url: "https://coreup.com/auth/new-password",
          })}
        </script>
      </Helmet>
      <AuthLayout showSidebar={false}>
        <div
          className={styles.newPassword}
          role="main"
          aria-label="Set New Password"
        >
          {/* Page Title */}
          <h1 className={styles.newPassword__title}>Set a New Password</h1>
          {/* Page Subtitle */}
          <p className={styles.newPassword__subtitle}>
            Your previous password has been reset. Please set a new password.
          </p>
          {/* Password Form */}
          <form
            onSubmit={handleSubmit}
            className={styles.newPassword__form}
            aria-labelledby="new-password-form"
          >
            <Input
              id="password"
              type="password"
              placeholder="New Password"
              icon={lockIcon}
              value={formData.password}
              onChange={handlePasswordChange}
              aria-label="New password"
              aria-describedby={
                formErrors.password ? "password-error" : "strength-desc"
              }
              aria-invalid={!!formErrors.password}
            />
            {/* Password Strength Bar */}
            <div className={styles.newPassword__strength} aria-hidden="true">
              <div
                className={styles.newPassword__strengthBar}
                style={{ width: `${passwordStrength}%` }}
              />
            </div>
            <span id="strength-desc" className={styles.visuallyHidden}>
              Password strength: {passwordStrength}%
            </span>
            {formErrors.password && (
              <p id="password-error" className={styles.error} role="alert">
                {formErrors.password}
              </p>
            )}
            <Input
              id="confirm-password"
              type="password"
              placeholder="Confirm New Password"
              icon={lockIcon}
              value={formData.confirmPassword}
              onChange={handleConfirmPasswordChange}
              aria-label="Confirm new password"
              aria-describedby={
                formErrors.confirmPassword
                  ? "confirm-password-error"
                  : undefined
              }
              aria-invalid={!!formErrors.confirmPassword}
            />
            {formErrors.confirmPassword && (
              <p
                id="confirm-password-error"
                className={styles.error}
                role="alert"
              >
                {formErrors.confirmPassword}
              </p>
            )}
            <Button
              type="submit"
              className="button button--lg"
              aria-label="Set new password"
              disabled={
                !formData.password ||
                !formData.confirmPassword ||
                passwordStrength < 75
              }
            >
              Set Password
            </Button>
          </form>
        </div>
      </AuthLayout>
    </>
  );
};

export default React.memo(NewPassword);

/**
 * Signup.jsx
 *
 * A page for user registration with role selection and terms agreement.
 * Optimized with React.memo and useCallback for performance.
 * Accessibility Note: Includes ARIA attributes for form and role selection.
 * SEO Note: Uses Helmet with schema.org structured data for crawlability.
 *
 * Author: Mahmoud Ramadan
 * Created: June 2025
 */

import React, { useState, useCallback } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import styles from "./Signup.module.scss";
import AuthLayout from "@/layouts/AuthLayout/AuthLayout";
import Input from "@/components/common/Input/Input";
import Button from "@/components/common/Button/Button";
import userIcon from "@/assets/icons/user-gray-icon.svg";
import emailIcon from "@/assets/icons/email.svg";
import lockIcon from "@/assets/icons/lock.svg";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "investor",
    terms: false,
  });
  const [formErrors, setFormErrors] = useState({});

  {
    /* Validate Form Data */
  }
  const validateForm = useCallback(() => {
    const errors = {};
    if (!formData.firstName.trim()) errors.firstName = "First name is required";
    if (!formData.lastName.trim()) errors.lastName = "Last name is required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) errors.email = "Email is required";
    else if (!emailRegex.test(formData.email))
      errors.email = "Invalid email address";
    if (!formData.password.trim()) errors.password = "Password is required";
    else if (formData.password.length < 8)
      errors.password = "Password must be at least 8 characters";
    if (!formData.confirmPassword.trim())
      errors.confirmPassword = "Confirm password is required";
    else if (formData.password !== formData.confirmPassword)
      errors.confirmPassword = "Passwords do not match";
    if (!formData.terms) errors.terms = "You must agree to the terms";
    return errors;
  }, [formData]);

  {
    /* Handle Form Submission */
  }
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const errors = validateForm();
      setFormErrors(errors);
      if (Object.keys(errors).length === 0) {
        console.log("Signup submitted:", formData); // TODO: API call
        // TODO: Navigate to verification or dashboard
      }
    },
    [formData, validateForm]
  );

  return (
    <>
      {/* SEO Meta Tags */}
      <Helmet>
        <title>Sign Up - CoreUp</title>
        <meta
          name="description"
          content={`Create a CoreUp account to explore investment opportunities. Last updated: ${new Date().toLocaleDateString()}`}
        />
        <meta name="keywords" content="signup, registration, CoreUp" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://coreup.com/auth/signup" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Sign Up",
            description: "Create a CoreUp account.",
            url: "https://coreup.com/auth/signup",
          })}
        </script>
      </Helmet>
      <AuthLayout showSidebar={false}>
        <div className={styles.signup} role="main" aria-label="Sign Up">
          {/* Page Title */}
          <h1 className={styles.signup__title}>Create an Account</h1>
          {/* Page Subtitle */}
          <p className={styles.signup__subtitle}>
            Let’s get you set up to access your personal account.
          </p>
          {/* Signup Form */}
          <form
            onSubmit={handleSubmit}
            className={styles.signup__form}
            aria-labelledby="signup-form"
          >
            <Input
              id="first-name"
              type="text"
              placeholder="First Name"
              icon={userIcon}
              value={formData.firstName}
              onChange={(e) => {
                setFormData((prev) => ({ ...prev, firstName: e.target.value }));
                setFormErrors((prev) => ({ ...prev, firstName: null }));
              }}
              aria-label="First name"
              aria-describedby={
                formErrors.firstName ? "first-name-error" : undefined
              }
              aria-invalid={!!formErrors.firstName}
            />
            {formErrors.firstName && (
              <p id="first-name-error" className={styles.error} role="alert">
                {formErrors.firstName}
              </p>
            )}
            <Input
              id="last-name"
              type="text"
              placeholder="Last Name"
              icon={userIcon}
              value={formData.lastName}
              onChange={(e) => {
                setFormData((prev) => ({ ...prev, lastName: e.target.value }));
                setFormErrors((prev) => ({ ...prev, lastName: null }));
              }}
              aria-label="Last name"
              aria-describedby={
                formErrors.lastName ? "last-name-error" : undefined
              }
              aria-invalid={!!formErrors.lastName}
            />
            {formErrors.lastName && (
              <p id="last-name-error" className={styles.error} role="alert">
                {formErrors.lastName}
              </p>
            )}
            <Input
              id="email"
              type="email"
              placeholder="Email Address"
              icon={emailIcon}
              value={formData.email}
              onChange={(e) => {
                setFormData((prev) => ({ ...prev, email: e.target.value }));
                setFormErrors((prev) => ({ ...prev, email: null }));
              }}
              aria-label="Email address"
              aria-describedby={formErrors.email ? "email-error" : undefined}
              aria-invalid={!!formErrors.email}
            />
            {formErrors.email && (
              <p id="email-error" className={styles.error} role="alert">
                {formErrors.email}
              </p>
            )}
            <Input
              id="password"
              type="password"
              placeholder="Password"
              icon={lockIcon}
              value={formData.password}
              onChange={(e) => {
                setFormData((prev) => ({ ...prev, password: e.target.value }));
                setFormErrors((prev) => ({ ...prev, password: null }));
              }}
              aria-label="Password"
              aria-describedby={
                formErrors.password ? "password-error" : undefined
              }
              aria-invalid={!!formErrors.password}
            />
            {formErrors.password && (
              <p id="password-error" className={styles.error} role="alert">
                {formErrors.password}
              </p>
            )}
            <Input
              id="confirm-password"
              type="password"
              placeholder="Confirm Password"
              icon={lockIcon}
              value={formData.confirmPassword}
              onChange={(e) => {
                setFormData((prev) => ({
                  ...prev,
                  confirmPassword: e.target.value,
                }));
                setFormErrors((prev) => ({ ...prev, confirmPassword: null }));
              }}
              aria-label="Confirm password"
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
            {/* Role Selection */}
            <fieldset
              className={styles.signup__role}
              aria-labelledby="role-selection"
            >
              <legend id="role-selection" className={styles.signup__roleTitle}>
                Who are you?
              </legend>
              <div className={styles.signup__roleOptions}>
                <label>
                  <input
                    type="radio"
                    name="role"
                    value="investor"
                    checked={formData.role === "investor"}
                    onChange={() =>
                      setFormData((prev) => ({ ...prev, role: "investor" }))
                    }
                    aria-label="Investor role"
                  />
                  Investor
                </label>
                <label>
                  <input
                    type="radio"
                    name="role"
                    value="startup"
                    checked={formData.role === "startup"}
                    onChange={() =>
                      setFormData((prev) => ({ ...prev, role: "startup" }))
                    }
                    aria-label="Startup role"
                  />
                  Startup
                </label>
                <label>
                  <input
                    type="radio"
                    name="role"
                    value="job-seeker"
                    checked={formData.role === "job-seeker"}
                    onChange={() =>
                      setFormData((prev) => ({ ...prev, role: "job-seeker" }))
                    }
                    aria-label="Job seeker role"
                  />
                  Job Seeker
                </label>
              </div>
            </fieldset>
            {/* Terms Agreement */}
            <div className={styles.signup__terms}>
              <input
                type="checkbox"
                id="terms"
                name="terms"
                checked={formData.terms}
                onChange={() =>
                  setFormData((prev) => ({ ...prev, terms: !prev.terms }))
                }
                aria-label="Agree to terms of use and privacy policy"
                aria-describedby={formErrors.terms ? "terms-error" : undefined}
                aria-invalid={!!formErrors.terms}
              />
              <label htmlFor="terms" className={styles.signup__termsLabel}>
                By creating an account, I agree to our{" "}
                <Link
                  to="/terms"
                  className={styles.signup__termsLink}
                  aria-label="Terms of use"
                >
                  Terms of Use
                </Link>{" "}
                and{" "}
                <Link
                  to="/privacy"
                  className={styles.signup__termsLink}
                  aria-label="Privacy policy"
                >
                  Privacy Policy
                </Link>
              </label>
            </div>
            {formErrors.terms && (
              <p id="terms-error" className={styles.error} role="alert">
                {formErrors.terms}
              </p>
            )}
            <Button
              type="submit"
              className="button button--lg"
              aria-label="Create account"
              disabled={
                !formData.firstName ||
                !formData.lastName ||
                !formData.email ||
                !formData.password ||
                !formData.confirmPassword ||
                !formData.terms
              }
            >
              Create Account
            </Button>
          </form>
        </div>
      </AuthLayout>
    </>
  );
};

export default React.memo(Signup);

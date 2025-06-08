/**
 * ForgotPassword.jsx
 *
 * A page for password recovery with email input and social login options.
 * Optimized with React.memo and useCallback for performance.
 * Accessibility Note: Includes ARIA attributes for form and buttons.
 * SEO Note: Uses Helmet with schema.org structured data for crawlability.
 *
 * Author: Mahmoud Ramadan
 * Created: June 2025
 */

import React, { useState, useCallback } from "react";
import { Helmet } from "react-helmet";
import styles from "./ForgotPassword.module.scss";
import AuthLayout from "@/layouts/AuthLayout/AuthLayout";
import Input from "@/components/common/Input/Input";
import Button from "@/components/common/Button/Button";
import SocialButton from "@/components/common/SocialButton/SocialButton";
import emailIcon from "@/assets/icons/email.svg";
import facebookIcon from "@/assets/icons/facebook.svg";
import googleIcon from "@/assets/icons/google.svg";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  {
    /* Validate Email */
  }
  const validateEmail = useCallback((value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value) ? "" : "Please enter a valid email address";
  }, []);

  {
    /* Handle Form Submission */
  }
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const emailError = validateEmail(email);
      setError(emailError);
      if (!emailError) {
        console.log("Password recovery initiated for:", email); // TODO: API call
        // TODO: Navigate to verification page
      }
    },
    [email, validateEmail]
  );

  {
    /* Handle Email Change */
  }
  const handleEmailChange = useCallback((e) => {
    setEmail(e.target.value);
    setError("");
  }, []);

  return (
    <>
      {/* SEO Meta Tags */}
      <Helmet>
        <title>Forgot Password - CoreUp</title>
        <meta
          name="description"
          content={`Recover your CoreUp account by entering your email address to receive a password reset link. Last updated: ${new Date().toLocaleDateString()}`}
        />
        <meta
          name="keywords"
          content="forgot password, password recovery, CoreUp"
        />
        <meta name="robots" content="noindex, follow" />
        <link rel="canonical" href="https://coreup.com/auth/forgot-password" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Forgot Password",
            description: "Recover your CoreUp account password.",
            url: "https://coreup.com/auth/forgot-password",
          })}
        </script>
      </Helmet>
      <AuthLayout showSidebar={false}>
        <div
          className={styles.forgotPassword}
          role="main"
          aria-label="Password Recovery"
        >
          {/* Page Title */}
          <h1 className={styles.forgotPassword__title}>Forgot Password</h1>
          {/* Page Subtitle */}
          <p className={styles.forgotPassword__subtitle}>
            Don’t worry, it happens to all of us. Enter your email below to
            recover your password.
          </p>
          {/* Recovery Form */}
          <form
            onSubmit={handleSubmit}
            className={styles.forgotPassword__form}
            aria-labelledby="forgot-password-form"
          >
            <Input
              id="email"
              type="email"
              placeholder="Email Address"
              icon={emailIcon}
              value={email}
              onChange={handleEmailChange}
              aria-label="Email address"
              aria-describedby={error ? "email-error" : undefined}
              aria-invalid={!!error}
            />
            {error && (
              <p id="email-error" className={styles.error} role="alert">
                {error}
              </p>
            )}
            <Button
              type="submit"
              className="button button--lg"
              aria-label="Send recovery code"
              disabled={!email}
            >
              Send Code
            </Button>
          </form>
          {/* Divider */}
          <div className={styles.forgotPassword__divider} aria-hidden="true">
            OR
          </div>
          {/* Social Login Options */}
          <div className={styles.forgotPassword__social}>
            <SocialButton
              className="socialButton--facebook"
              icon={facebookIcon}
              aria-label="Continue with Facebook"
            >
              Continue with Facebook
            </SocialButton>
            <SocialButton icon={googleIcon} aria-label="Continue with Google">
              Continue with Google
            </SocialButton>
          </div>
        </div>
      </AuthLayout>
    </>
  );
};

export default React.memo(ForgotPassword);

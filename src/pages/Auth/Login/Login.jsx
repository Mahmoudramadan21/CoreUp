/**
 * Login.jsx
 *
 * A page for user authentication with email, password, and social login options.
 * Optimized with React.memo and useCallback for performance.
 * Accessibility Note: Includes ARIA attributes for form and navigation links.
 * SEO Note: Uses Helmet with schema.org structured data for crawlability.
 *
 * Author: Mahmoud Ramadan
 * Created: June 2025
 */

import React, { useState, useCallback } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import styles from "./Login.module.scss";
import AuthLayout from "@/layouts/AuthLayout/AuthLayout";
import Input from "@/components/common/Input/Input";
import Button from "@/components/common/Button/Button";
import SocialButton from "@/components/common/SocialButton/SocialButton";
import emailIcon from "@/assets/icons/email.svg";
import lockIcon from "@/assets/icons/lock.svg";
import facebookIcon from "@/assets/icons/facebook.svg";
import googleIcon from "@/assets/icons/google.svg";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [formErrors, setFormErrors] = useState({});

  {
    /* Validate Form Data */
  }
  const validateForm = useCallback(() => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) errors.email = "Email is required";
    else if (!emailRegex.test(formData.email))
      errors.email = "Invalid email address";
    if (!formData.password.trim()) errors.password = "Password is required";
    else if (formData.password.length < 8)
      errors.password = "Password must be at least 8 characters";
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
        console.log("Login submitted:", formData); // TODO: API call
        // TODO: Navigate to dashboard
      }
    },
    [formData, validateForm]
  );

  return (
    <>
      {/* SEO Meta Tags */}
      <Helmet>
        <title>Login - CoreUp</title>
        <meta
          name="description"
          content={`Log in to your CoreUp account to access personalized investment opportunities. Last updated: ${new Date().toLocaleDateString()}`}
        />
        <meta name="keywords" content="login, CoreUp, investment platform" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://coreup.com/auth/login" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Login",
            description: "Log in to CoreUp.",
            url: "https://coreup.com/auth/login",
            potentialAction: {
              "@type": "LoginAction",
              target: "https://coreup.com/auth/login",
              agent: { "@type": "Person" },
            },
          })}
        </script>
      </Helmet>
      <AuthLayout showSidebar={true}>
        <div className={styles.login} role="main" aria-label="Login">
          <div className={styles.login__container}>
            {/* Page Title */}
            <h1 className={styles.login__title}>Welcome to Invest World</h1>
            {/* Page Subtitle */}
            <p className={styles.login__subtitle}>Log in to continue</p>
            {/* Login Form */}
            <form
              onSubmit={handleSubmit}
              className={styles.login__form}
              aria-labelledby="login-form"
            >
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
                  setFormData((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }));
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
              {/* Form Options */}
              <div className={styles.login__options}>
                <label className={styles.login__checkbox}>
                  <input
                    type="checkbox"
                    checked={formData.rememberMe}
                    onChange={() =>
                      setFormData((prev) => ({
                        ...prev,
                        rememberMe: !prev.rememberMe,
                      }))
                    }
                    aria-label="Remember me"
                  />
                  Remember me
                </label>
                <Link
                  to="/forgot-password"
                  className={styles.login__forgotLink}
                  aria-label="Forgot password"
                >
                  Forgot Password?
                </Link>
              </div>
              <Button
                type="submit"
                className="button button--lg"
                aria-label="Log in"
                disabled={!formData.email || !formData.password}
              >
                Log in
              </Button>
            </form>
            {/* Divider */}
            <div className={styles.login__divider} aria-hidden="true">
              OR
            </div>
            {/* Social Login Options */}
            <div className={styles.login__social}>
              <SocialButton
                icon={facebookIcon}
                className="socialButton--facebook"
                aria-label="Continue with Facebook"
              >
                Continue with Facebook
              </SocialButton>
              <SocialButton icon={googleIcon} aria-label="Continue with Google">
                Continue with Google
              </SocialButton>
            </div>
            {/* Register Link */}
            <p className={styles.login__register}>
              Don’t have an account?{" "}
              <Link
                to="/signup"
                className={styles.login__registerLink}
                aria-label="Register for a new account"
              >
                Register
              </Link>
            </p>
          </div>
        </div>
      </AuthLayout>
    </>
  );
};

export default React.memo(Login);

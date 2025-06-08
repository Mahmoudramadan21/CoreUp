/**
 * VerifyCode.jsx
 *
 * A page for email verification with code input.
 * Optimized with React.memo and useCallback for performance.
 * Accessibility Note: Includes ARIA attributes for form and button.
 * SEO Note: Uses Helmet with schema.org structured data for crawlability.
 *
 * Author: Mahmoud Ramadan
 * Created: June 2025
 */

import React, { useState, useCallback } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import styles from "./VerifyCode.module.scss";
import AuthLayout from "@/layouts/AuthLayout/AuthLayout";
import Input from "@/components/common/Input/Input";
import Button from "@/components/common/Button/Button";

const VerifyCode = () => {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  {
    /* Validate Code */
  }
  const validateCode = useCallback((value) => {
    const codeRegex = /^\d{6}$/;
    return codeRegex.test(value) ? "" : "Please enter a valid 6-digit code";
  }, []);

  {
    /* Handle Code Change */
  }
  const handleCodeChange = useCallback((e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 6);
    setCode(value);
    setError("");
  }, []);

  {
    /* Handle Form Submission */
  }
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const codeError = validateCode(code);
      setError(codeError);
      if (!codeError) {
        console.log("Verification code submitted:", code); // TODO: API call
        navigate("/new-password");
      }
    },
    [code, validateCode, navigate]
  );

  return (
    <>
      {/* SEO Meta Tags */}
      <Helmet>
        <title>Verify Code - CoreUp</title>
        <meta
          name="description"
          content={`Enter the verification code sent to your email to proceed with password reset. Last updated: ${new Date().toLocaleDateString()}`}
        />
        <meta
          name="keywords"
          content="verify code, email verification, CoreUp"
        />
        <meta name="robots" content="noindex, follow" />
        <link rel="canonical" href="https://coreup.com/auth/verify-code" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Verify Code",
            description: "Verify your email for CoreUp.",
            url: "https://coreup.com/auth/verify-code",
          })}
        </script>
      </Helmet>
      <AuthLayout showSidebar={false}>
        <div className={styles.verifyCode} role="main" aria-label="Verify Code">
          {/* Page Title */}
          <h1 className={styles.verifyCode__title}>Verify Code</h1>
          {/* Page Subtitle */}
          <p className={styles.verifyCode__subtitle}>
            An authentication code has been sent to your email.
          </p>
          {/* Verification Form */}
          <form
            onSubmit={handleSubmit}
            className={styles.verifyCode__form}
            aria-labelledby="verify-code-form"
          >
            <Input
              id="code"
              type="text"
              placeholder="Enter 6-digit Code"
              value={code}
              onChange={handleCodeChange}
              aria-label="Verification code"
              aria-describedby={error ? "code-error" : undefined}
              aria-invalid={!!error}
              inputMode="numeric"
              maxLength={6}
            />
            {error && (
              <p id="code-error" className={styles.error} role="alert">
                {error}
              </p>
            )}
            <Button
              type="submit"
              className="button button--lg"
              aria-label="Submit verification code"
              disabled={code.length !== 6}
            >
              Verify Code
            </Button>
          </form>
        </div>
      </AuthLayout>
    </>
  );
};

export default React.memo(VerifyCode);

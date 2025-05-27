/**
 * authRoutes.jsx
 *
 * Route configuration for authentication-related pages.
 * Defines public routes for login, signup, password reset, etc.
 *
 * Author: Mahmoud Ramadan
 * Created: June 2025
 */

import { lazy, Suspense } from "react";
import { Route } from "react-router-dom";
import LoadingFallback from "@/components/common/LoadingFallback/LoadingFallback";

const Login = lazy(() => import("@/pages/Auth/Login/Login"));
const Signup = lazy(() => import("@/pages/Auth/Signup/Signup"));
const ForgotPassword = lazy(() =>
  import("@/pages/Auth/ForgotPassword/ForgotPassword")
);
const NewPassword = lazy(() => import("@/pages/Auth/NewPassword/NewPassword"));
const VerifyCode = lazy(() => import("@/pages/Auth/VerifyCode/VerifyCode"));

const authRoutes = [
  <Route
    key="login"
    path="/login"
    element={
      <Suspense fallback={<LoadingFallback />}>
        <Login />
      </Suspense>
    }
  />,
  <Route
    key="signup"
    path="/signup"
    element={
      <Suspense fallback={<LoadingFallback />}>
        <Signup />
      </Suspense>
    }
  />,
  <Route
    key="forgot-password"
    path="/forgot-password"
    element={
      <Suspense fallback={<LoadingFallback />}>
        <ForgotPassword />
      </Suspense>
    }
  />,
  <Route
    key="new-password"
    path="/new-password"
    element={
      <Suspense fallback={<LoadingFallback />}>
        <NewPassword />
      </Suspense>
    }
  />,
  <Route
    key="verify-code"
    path="/verify-code"
    element={
      <Suspense fallback={<LoadingFallback />}>
        <VerifyCode />
      </Suspense>
    }
  />,
];

export default authRoutes;

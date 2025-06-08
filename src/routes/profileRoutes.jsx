/**
 * profileRoutes.jsx
 *
 * Routes for profile-related pages including public profile and settings.
 * Uses ProtectedRoute for investor profile settings.
 *
 * Author: Mahmoud Ramadan
 * Created: June 2025
 */

import { lazy, Suspense } from "react";
import { Route, Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import InvestorLayout from "@/layouts/InvestorLayout/InvestorLayout";
import ProfileSettingsLayout from "@/layouts/ProfileSettingsLayout/ProfileSettingsLayout";
import LoadingFallback from "@/components/common/LoadingFallback/LoadingFallback";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const InvestorProfile = lazy(() =>
  import("@/pages/Investor/Profile/InvestorProfile/InvestorProfile")
);
const ContactInfoEdit = lazy(() =>
  import("@/pages/Investor/Profile/ContactInfoEdit/ContactInfoEdit")
);
const InvestmentCriteriaEdit = lazy(() =>
  import(
    "@/pages/Investor/Profile/InvestmentCriteriaEdit/InvestmentCriteriaEdit"
  )
);
const InvestorProfileSettings = lazy(() =>
  import(
    "@/pages/Investor/Profile/InvestorProfileSettings/InvestorProfileSettings"
  )
);
const ChangePassword = lazy(() =>
  import("@/pages/Investor/Profile/ChangePassword/ChangePassword")
);
const DeleteAccount = lazy(() =>
  import("@/pages/Investor/Profile/DeleteAccount/DeleteAccount")
);

const profileRoutes = [
  <Route key="profile" path="/profile" element={<InvestorLayout />}>
    <Route
      index
      element={
        <Suspense fallback={<LoadingFallback />}>
          <InvestorProfile />
        </Suspense>
      }
    />
  </Route>,
  <Route
    key="investor-profile"
    path="/investor/profile"
    element={
      <ProtectedRoute>
        <ProfileSettingsLayout />
      </ProtectedRoute>
    }
  >
    <Route index element={<Navigate to="contact/edit" replace />} />
    <Route
      path="contact/edit"
      element={
        <Suspense fallback={<LoadingFallback />}>
          <ContactInfoEdit />
        </Suspense>
      }
    />
    <Route
      path="investment-criteria/edit"
      element={
        <Suspense fallback={<LoadingFallback />}>
          <InvestmentCriteriaEdit />
        </Suspense>
      }
    />
    <Route
      path="settings"
      element={
        <Suspense fallback={<LoadingFallback />}>
          <InvestorProfileSettings />
        </Suspense>
      }
    />
    <Route
      path="change-password"
      element={
        <Suspense fallback={<LoadingFallback />}>
          <ChangePassword />
        </Suspense>
      }
    />
    <Route
      path="delete"
      element={
        <Suspense fallback={<LoadingFallback />}>
          <DeleteAccount />
        </Suspense>
      }
    />
  </Route>,
];

export default profileRoutes;

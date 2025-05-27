/**
 * investorRoutes.jsx
 *
 * Routes for investor-related pages including home, dashboard, and registration.
 * Ensures InvestorDashboardLayout is rendered only once for /investor/* routes.
 *
 * Author: Mahmoud Ramadan
 * Created: June 2025
 */

import { lazy, Suspense } from "react";
import { Route, Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import InvestorLayout from "@/layouts/InvestorLayout/InvestorLayout";
import InvestorDashboardLayout from "@/layouts/InvestorDashboardLayout/InvestorDashboardLayout";
import LoadingFallback from "@/components/common/LoadingFallback/LoadingFallback";

const ProtectedRoute = ({ children }) => {
  const { isAuth } = { isAuth: true };
  return isAuth ? children : <Navigate to="/login" replace />;
};

const Home = lazy(() => import("@/pages/Home/Home"));
const InvestorRegister = lazy(() =>
  import("@/pages/Auth/InvestorRegister/InvestorRegister")
);
const Portfolio = lazy(() =>
  import("@/pages/Investor/Dashboard/Portfolio/Portfolio")
);
const Matches = lazy(() =>
  import("@/pages/Investor/Dashboard/Matches/Matches")
);
const NewsFeed = lazy(() =>
  import("@/pages/Investor/Dashboard/NewsFeed/NewsFeed")
);
const Search = lazy(() => import("@/pages/Investor/Dashboard/Search/Search"));
const Notifications = lazy(() => import("@/pages/Notifications/Notifications"));

const investorRoutes = [
  <Route key="root" path="/" element={<InvestorLayout />}>
    <Route
      index
      element={
        <Suspense fallback={<LoadingFallback />}>
          <Home />
        </Suspense>
      }
    />
    <Route
      path="notifications"
      element={
        <ProtectedRoute>
          <Suspense fallback={<LoadingFallback />}>
            <Notifications />
          </Suspense>
        </ProtectedRoute>
      }
    />
  </Route>,
  <Route
    key="investor-register"
    path="/investor/register"
    element={<InvestorLayout />}
  >
    <Route
      index
      element={
        <Suspense fallback={<LoadingFallback />}>
          <InvestorRegister />
        </Suspense>
      }
    />
  </Route>,
  <Route
    key="investor-dashboard"
    path="/investor"
    element={
      <ProtectedRoute>
        <InvestorDashboardLayout />
      </ProtectedRoute>
    }
  >
    <Route index element={<Navigate to="/investor/portfolio" replace />} />
    <Route
      path="portfolio"
      element={
        <Suspense fallback={<LoadingFallback />}>
          <Portfolio />
        </Suspense>
      }
    />
    <Route
      path="matches"
      element={
        <Suspense fallback={<LoadingFallback />}>
          <Matches />
        </Suspense>
      }
    />
    <Route
      path="news-feed"
      element={
        <Suspense fallback={<LoadingFallback />}>
          <NewsFeed />
        </Suspense>
      }
    />
    <Route
      path="search"
      element={
        <Suspense fallback={<LoadingFallback />}>
          <Search />
        </Suspense>
      }
    />
  </Route>,
];

export default investorRoutes;

/**
 * App.jsx
 *
 * Main application component.
 * Sets up the router, global styles, and context providers.
 * Handles route rendering with error boundaries and lazy loading.
 *
 * Author: Mahmoud Ramadan
 * Created: June 2025
 */

import React, { Suspense } from "react";
import { Helmet } from "react-helmet";
import { BrowserRouter as Router, Routes } from "react-router-dom";
import ErrorBoundary from "@/components/common/ErrorBoundary/ErrorBoundary";
import LoadingFallback from "@/components/common/LoadingFallback/LoadingFallback";
import AuthProvider from "@/context/AuthContext";
import routes from "@/routes/index";
import "./styles/global.scss"; // Global styles

const App = () => (
  <ErrorBoundary>
    <AuthProvider>
      <Router>
        <Helmet>
          <title>CoreUp - Investor Platform</title>
          <meta
            name="description"
            content="CoreUp connects investors with opportunities."
          />
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>{routes}</Routes>
        </Suspense>
      </Router>
    </AuthProvider>
  </ErrorBoundary>
);

export default App;

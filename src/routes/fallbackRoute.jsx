/**
 * fallbackRoute.jsx
 *
 * Fallback route for handling unmatched paths.
 * Renders NotFound page for invalid URLs.
 *
 * Author: Mahmoud Ramadan
 * Created: June 2025
 */

import { lazy, Suspense } from "react";
import { Route } from "react-router-dom";
import LoadingFallback from "@/components/common/LoadingFallback/LoadingFallback";

const NotFound = lazy(() => import("@/pages/NotFound/NotFound"));

const fallbackRoute = [
  <Route
    key="not-found"
    path="*"
    element={
      <Suspense fallback={<LoadingFallback />}>
        <NotFound />
      </Suspense>
    }
  />,
];

export default fallbackRoute;

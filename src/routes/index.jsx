/**
 * routes/index.jsx
 *
 * Aggregates all route configurations from sub-route files.
 * Exports combined routes for use in App.jsx.
 *
 * Author: Mahmoud Ramadan
 * Created: June 2025
 */

import authRoutes from "./authRoutes";
import chatRoutes from "./ChatRoutes";
import fallbackRoute from "./fallbackRoute";
import investorRoutes from "./InvestorRoutes";
import profileRoutes from "./profileRoutes";

// import authRoutes from "./authRoutes";
// import investorRoutes from "./investorRoutes";
// import profileRoutes from "./profileRoutes";
// import chatRoutes from "./chatRoutes";
// import fallbackRoute from "./fallbackRoute";

const routes = [
  ...authRoutes,
  ...investorRoutes,
  ...profileRoutes,
  ...chatRoutes,
  ...fallbackRoute,
];

export default routes;

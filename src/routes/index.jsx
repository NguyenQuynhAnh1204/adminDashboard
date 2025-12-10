import { createBrowserRouter } from "react-router-dom";

import publicRoutes from "./public/public.route";
import adminRoutes from "./admin/admin.route";
import posRoutes from "./pos/pos.route";

const router = createBrowserRouter([
  ...publicRoutes,
  ...adminRoutes,
  ...posRoutes
]);

export default router;

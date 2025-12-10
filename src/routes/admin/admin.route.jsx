import ProRoute from "../../components/ProRoute";
import CustomThemeProvider from "../../context/CustomThemeProvider";
import AdminLayout from "../../pages/Admin/AdminLayout";
import Dashboard from "../../pages/Admin/Dashboard";

import userRoutes from "./user.route";
import productRoutes from "./product.route";
import orderRoutes from "./order.route";

const adminRoutes = [
  {
    path: "admin",
    element: (
      <ProRoute role="admin" allowedRoles={["admin"]}>
        <CustomThemeProvider>
          <AdminLayout />
        </CustomThemeProvider>
      </ProRoute>
    ),
    children: [
      { path: "dashboard", element: <Dashboard /> },

      ...userRoutes,
      ...productRoutes,
      ...orderRoutes
    ]
  }
];

export default adminRoutes;

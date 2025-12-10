import OrderList from "../../pages/Admin/Order";

const orderRoutes = [{
  path: "orders",
  children: [
    { index: true, element: <OrderList /> },
  ]
}];

export default orderRoutes;

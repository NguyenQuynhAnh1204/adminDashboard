import ProRoute from "../../components/ProRoute";

import PosHome from "../../pages/POS/PosHome";
import OrderReview from "../../pages/POS/PosViewPrint";
import PosPayment from "../../pages/POS/PosPayment";

const posRoutes = [
  {
    path: "pos",
    element: (
      <ProRoute role="cashier" allowedRoles={["cashier"]} />
    ),
    children: [
      { index: true, element: <PosHome /> },
      { path: "home", element: <PosHome /> },
      { path: "print", element: <OrderReview /> },
      { path: "bill", element: <PosPayment /> }
    ]
  }
];

export default posRoutes;

import HomePage from "../../pages/Home";
import NotFound from "../../pages/Admin/NotFound";

const publicRoutes = [
  { path: "/", element: <HomePage /> },
  { path: "*", element: <NotFound /> }
];

export default publicRoutes;

import ProductList from "../../pages/Admin/ProductList";
import ProductItem from "../../pages/Admin/ProductItem";
import ImportPage from "../../pages/Admin/Import";

const productRoutes = [{
  path: "products",
  children: [
    { index: true, element: <ProductList /> },
    { path: ":productId", element: <ProductItem type="info" /> },
    { path: "new", element: <ProductItem type="new" /> },
    { path: "import", element: <ImportPage/>}
  ]
}];

export default productRoutes;

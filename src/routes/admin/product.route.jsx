import ProductList from "../../pages/Admin/ProductList";
import ProductItem from "../../pages/Admin/ProductItem";

const productRoutes = [{
  path: "products",
  children: [
    { index: true, element: <ProductList /> },
    { path: ":productId", element: <ProductItem type="info" /> },
    { path: "new", element: <ProductItem type="new" /> }
  ]
}];

export default productRoutes;

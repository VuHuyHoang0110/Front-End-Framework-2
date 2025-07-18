import { createBrowserRouter, Link } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import ProductList from "./components/ProductList";
import CategoryList from "./components/CategoryList";
import "./App.css";
import Homepage from "./components/Homepage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
  },
  {
    path: "/products",
    element: <ProductList />,
  },
  {
    path: "/categories",
    element: <CategoryList />,
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

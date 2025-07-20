// router.ts
import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./root";
import Home from "../app/routes/home";
import ProductPage from "./pages/ProductPage";
import AdminPage from "./pages/AdminPage";
import CartPage from "./pages/CartPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "products", element: <ProductPage /> },
      { path: "admin", element: <AdminPage /> },
      { path: "cart", element: <CartPage /> },
    ],
  },
]);

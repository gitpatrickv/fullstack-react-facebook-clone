import { createBrowserRouter } from "react-router-dom";
import Layout from "../pages/user/Layout";
import ErrorPage from "../pages/user/ErrorPage";
import LoginPage from "../pages/auth/LoginPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [{ index: true, element: <LoginPage /> }],
  },
]);

export default router;

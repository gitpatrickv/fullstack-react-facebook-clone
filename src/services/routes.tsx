import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/auth/LoginPage";
import ErrorPage from "../pages/user/ErrorPage";
import HomePage from "../pages/user/HomePage";
import Layout from "../pages/user/Layout";
import FriendsPage from "../pages/user/FriendsPage";
import MarketPage from "../pages/user/MarketPage";
import WatchPage from "../pages/user/WatchPage";
import GamesPage from "../pages/user/GamesPage";
import UserRoute from "../components/ProtectedRoute/UserRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <LoginPage />,
      },
      {
        path: "/home",
        element: (
          <UserRoute>
            <HomePage />
          </UserRoute>
        ),
      },
      {
        path: "/friends",
        element: (
          <UserRoute>
            <FriendsPage />
          </UserRoute>
        ),
      },
      {
        path: "/watch",
        element: (
          <UserRoute>
            <WatchPage />
          </UserRoute>
        ),
      },
      {
        path: "/marketplace",
        element: (
          <UserRoute>
            <MarketPage />
          </UserRoute>
        ),
      },
      {
        path: "/games",
        element: (
          <UserRoute>
            <GamesPage />
          </UserRoute>
        ),
      },
    ],
  },
]);

export default router;

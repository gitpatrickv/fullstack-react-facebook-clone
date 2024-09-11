import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/auth/LoginPage";
import ErrorPage from "../pages/user/ErrorPage";
import HomePage from "../pages/user/HomePage";
import Layout from "../pages/user/Layout";
import FriendsPage from "../pages/user/FriendsPage";
import MarketPage from "../pages/user/MarketPage";
import WatchPage from "../pages/user/WatchPage";
import GamesPage from "../pages/user/GamesPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <LoginPage /> },
      { path: "/home", element: <HomePage /> },
      { path: "/friends", element: <FriendsPage /> },
      { path: "/watch", element: <WatchPage /> },
      { path: "/marketplace", element: <MarketPage /> },
      { path: "/games", element: <GamesPage /> },
    ],
  },
]);

export default router;

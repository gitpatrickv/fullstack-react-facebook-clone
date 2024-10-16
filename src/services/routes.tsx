import { createBrowserRouter } from "react-router-dom";
import UserRoute from "../components/ProtectedRoute/UserRoute";
import LoginPage from "../pages/auth/LoginPage";
import ErrorPage from "../pages/user/ErrorPage";
import FriendRequestPage from "../pages/user/FriendRequestPage";
import FriendSuggestionPage from "../pages/user/FriendSuggestionPage";
import FriendsListPage from "../pages/user/FriendsListPage";
import FriendsPage from "../pages/user/FriendsPage";
import GamesPage from "../pages/user/GamesPage";
import HomePage from "../pages/user/HomePage";
import Layout from "../pages/user/Layout";
import MarketPage from "../pages/user/MarketPage";
import ProfileAboutPage from "../pages/user/ProfileAboutPage";
import ProfileFriendListPage from "../pages/user/ProfileFriendListPage";
import ProfilePage from "../pages/user/ProfilePage";
import ProfilePhotosPage from "../pages/user/ProfilePhotosPage";
import WatchPage from "../pages/user/WatchPage";

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
        children: [
          {
            path: "requests",
            element: <FriendRequestPage />,
          },
          {
            path: "suggestions",
            element: <FriendSuggestionPage />,
            // children: [
            //   {
            //     path: "profile/:userId",
            //     element: <ProfilePage />,
            //   },
            // ],
          },
          {
            path: "list",
            element: <FriendsListPage />,
          },
        ],
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
      {
        path: "/profile/:userId",
        element: (
          <UserRoute>
            <ProfilePage />
          </UserRoute>
        ),
        children: [
          {
            path: "friends",
            element: <ProfileFriendListPage />,
          },
          {
            path: "about",
            element: <ProfileAboutPage />,
          },
          {
            path: "photos",
            element: <ProfilePhotosPage />,
          },
        ],
      },
    ],
  },
]);

export default router;

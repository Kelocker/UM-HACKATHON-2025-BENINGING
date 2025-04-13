import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./page/HomePage.tsx";
import AiBotPage from "./page/AiBotPage.tsx";
import ErrorPage from "./page/ErrorPage.tsx";
import UploadPage from "./page/UploadPage.tsx";
import CollaborationPage from "./page/CollaborationPage.tsx";

export const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/aibot", element: <AiBotPage /> },
      { path: "/upload", element: <UploadPage /> },
      { path: "/collaboration", element: <CollaborationPage /> },
    ],
  },
]);

function AppRouter() {
  return <RouterProvider router={router} />;
}

export default AppRouter;

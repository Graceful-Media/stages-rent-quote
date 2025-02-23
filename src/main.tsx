
import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from "./App";
import "./index.css";
import NotFound from "./pages/NotFound";
import TemplatesPage from "./pages/admin/Templates";
import Index from "./pages/Index";
import Auth from "./pages/auth/Auth";
import AdminGuard from "./components/admin/AdminGuard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Index />,
      },
      {
        path: "auth",
        element: <Auth />,
      },
      {
        path: "admin/templates",
        element: (
          <AdminGuard>
            <TemplatesPage />
          </AdminGuard>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);

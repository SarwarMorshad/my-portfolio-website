import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import ErrorPage from "../pages/ErrorPage";

// ===========================
// Router Configuration
// ===========================
const router = createBrowserRouter([
  // ===========================
  // Public Routes (MainLayout)
  // ===========================
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
]);

export default router;

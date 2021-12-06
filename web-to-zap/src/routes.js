import { Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";

const routes = (isLoggedIn) => [
  {
    path: "/",
    element: isLoggedIn ? <Dashboard /> : <Navigate to="/" />,
    children: [
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/", element: <Navigate to="/dashboard" /> },
    ],
  },
  {
    path: "/",
    element: !isLoggedIn ? <Login /> : <Navigate to="/dashboard" />,
    children: [
      { path: "login", element: <Login /> },
      { path: "/", element: <Navigate to="/login" /> },
    ],
  },
];

export default routes;

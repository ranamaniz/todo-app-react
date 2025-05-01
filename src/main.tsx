import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from "./pages/ErrorPage.tsx";
import Todos from "./pages/Todos.tsx";
import Signup from "./pages/account/Signup.tsx";
import Login from "./pages/account/Login/index.tsx";

// TODO: take it to separte place
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { path: "", element: <Navigate to="todos" replace /> },
      { path: "todos", element: <Todos /> },
    ],
  },
  { path: "signup", element: <Signup /> },
  { path: "login", element: <Login /> },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

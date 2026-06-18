import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
//import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router";
import App from "./components/App.jsx";
import Game from "./components/Game.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/game",
    element: <Game />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />,
  </StrictMode>,
);

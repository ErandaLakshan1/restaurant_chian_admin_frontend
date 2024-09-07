import React from "react";
import ReactDOM from "react-dom/client";
import "./assests/styles/index.css";

import Login from "./pages/auth/Login";
import DashBoard from "./pages/DashBoard";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <DashBoard />
  </React.StrictMode>
);

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./assests/styles/index.css";

import Login from "./pages/auth/Login";
import Home from "./pages/Home";
import Branch from "./pages/branch/Branch";
import AddBranch from "./pages/branch/AddBranch";
import BranchDetails from "./pages/branch/BranchDetails";
import Menu from "./pages/menu/Menu";
import AddMenu from "./pages/menu/AddMenu";
import MenuDetails from "./pages/menu/MenuDetails";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<Login />} />
        <Route path="/branch" element={<Branch />} />
        <Route path="/add-branch" element={<AddBranch />} />
        <Route path="/branch-details" element={<BranchDetails />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/add-menu" element={<AddMenu />} />
        <Route path="/menu-details" element={<MenuDetails />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

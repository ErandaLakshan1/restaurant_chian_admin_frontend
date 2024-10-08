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
import Table from "./pages/reservation/Table";
import AddTable from "./pages/reservation/AddTable";
import TableDetails from "./pages/reservation/TableDetails";
import TableReservation from "./pages/reservation/TableReservation";
import Coupons from "./pages/order/Coupons";
import AddCoupon from "./pages/order/AddCoupon";
import CouponDetails from "./pages/order/CouponDetails";
import Orders from "./pages/order/Orders";
import Staff from "./pages/Staff";
import AddStaff from "./pages/AddStaff";

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
        <Route path="/tables" element={<Table />} />
        <Route path="/add-table" element={<AddTable />} />
        <Route path="/table-details" element={<TableDetails />} />
        <Route path="/table-reservations" element={<TableReservation />} />
        <Route path="/coupons" element={<Coupons />} />
        <Route path="/add-coupon" element={<AddCoupon />} />
        <Route path="/coupon-details" element={<CouponDetails />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/staff" element={<Staff />} />
        <Route path="/add-staff" element={<AddStaff />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

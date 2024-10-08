import React, { useEffect } from "react";
import "../assests/styles/components/sidebar.css";
import logoImg from "../assests/images/logo.png";
import { isAuthenticated } from "../utils/authUtils";
import { useNavigate, NavLink } from "react-router-dom";
import { userData } from "../utils/authUtils";

const Sidebar = () => {
  const navigate = useNavigate();
  const user = userData(); 

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/sign-in");
    }
  }, [navigate]);

  return (
    <>
      <div className="sidebar">
        <div className="sidebar-header">
          <img src={logoImg} alt="Company Logo" className="sidebar-logo" />
        </div>
        <ul className="sidebar-links">
          <li>
            <NavLink to="/" className="sidebar-link" activeClassName="active">
              Home
            </NavLink>
          </li>

          {user && user.role === "admin" ? (
            <li>
              <NavLink
                to="/branch"
                className="sidebar-link"
                activeClassName="active"
              >
                Branch
              </NavLink>
            </li>
          ) : user && user.role === "manager" ? (
            <li>
              <NavLink
                to={`/branch-details?id=${user.branch}`}
                className="sidebar-link"
                activeClassName="active"
              >
                Branch
              </NavLink>
            </li>
          ) : null}
          <li>
            <NavLink
              to="/menu"
              className="sidebar-link"
              activeClassName="active"
            >
              Menu
            </NavLink>
          </li>

          {user && (user.role === "manager" || user.role === "admin") && (
            <li>
              <NavLink
                to="/tables"
                className="sidebar-link"
                activeClassName="active"
              >
                Tables
              </NavLink>
            </li>
          )}

          <li>
            <NavLink
              to="/table-reservations"
              className="sidebar-link"
              activeClassName="active"
            >
              Reservations
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/coupons"
              className="sidebar-link"
              activeClassName="active"
            >
              Coupons
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/orders"
              className="sidebar-link"
              activeClassName="active"
            >
              Orders
            </NavLink>
          </li>

          {user && (user.role === "admin" || user.role === "manager") && (
            <li>
              <NavLink
                to="/staff"
                className="sidebar-link"
                activeClassName="active"
              >
                Staff
              </NavLink>
            </li>
          )}
        </ul>
      </div>
    </>
  );
};
export default Sidebar;

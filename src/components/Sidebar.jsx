import React, { useState, useEffect } from "react";
import "../assests/styles/components/sidebar.css";
import logoImg from "../assests/images/logo.png";
import { isAuthenticated } from "../utils/authUtils";
import { useNavigate, NavLink } from "react-router-dom";
import { userData } from "../utils/authUtils";

const Sidebar = () => {
  const navigate = useNavigate();

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

          {userData().role === "admin" ? (
            <li>
              <NavLink
                to="/branch"
                className="sidebar-link"
                activeClassName="active"
              >
                Branch
              </NavLink>
            </li>
          ) : null}
          <li>
            <NavLink
              to="/messages"
              className="sidebar-link"
              activeClassName="active"
            >
              Messages
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/settings"
              className="sidebar-link"
              activeClassName="active"
            >
              Settings
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;

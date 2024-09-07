import React from "react";
import "../assests/styles/components/sidebar.css";
import avtarImg from "../assests/images/avatar.png";

const Sidebar = () => {
  return (
    <>
      <div className="sidebar">
        <div className="sidebar-header">
          <img src={avtarImg} alt="Avatar" className="sidebar-avatar" />
          <h2 className="sidebar-username">John Doe</h2>
        </div>
        <ul className="sidebar-links">
          <li>
            <a href="#home" className="sidebar-link">
              Home
            </a>
          </li>
          <li>
            <a href="#profile" className="sidebar-link">
              Profile
            </a>
          </li>
          <li>
            <a href="#messages" className="sidebar-link">
              Messages
            </a>
          </li>
          <li>
            <a href="#settings" className="sidebar-link">
              Settings
            </a>
          </li>
        </ul>
        <button className="sidebar-signout">Sign Out</button>
      </div>
    </>
  );
};

export default Sidebar;

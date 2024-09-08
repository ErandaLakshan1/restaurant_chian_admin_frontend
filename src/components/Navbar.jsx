import React, { useState } from "react";
import "../assests/styles/components/navbar.css";
import avatarImg from "../assests/images/avatar.png";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <>

      <div className="navbar">
        <div className="navbar-content">
          <div className="navbar-avatar" onClick={toggleDropdown}>
            <img src={avatarImg} alt="Avatar" className="navbar-avatar-img" />
          </div>
          {dropdownOpen && (
            <div className="navbar-dropdown">
              <a href="#profile" className="navbar-dropdown-link">
                Profile
              </a>
              <a href="#signout" className="navbar-dropdown-link">
                Sign Out
              </a>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;

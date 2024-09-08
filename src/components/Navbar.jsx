import React, { useState } from "react";
import "../assests/styles/components/navbar.css";
import avatarImg from "../assests/images/avatar.png";
import { removeAccessToken, removeRefreshToken } from "../utils/authUtils";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleSignOut = () => {
    removeAccessToken();
    removeRefreshToken();
    navigate("/sign-in");
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
              <a
                className="navbar-dropdown-link"
                onClick={() => handleSignOut()}
              >
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

import React, { useState, useEffect } from "react";
import "../../assests/styles/pages/menu/menu.css";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import noImage from "../../assests/images/no-img.jpg";
import { popAlert } from "../../utils/alerts";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";
import { userData } from "../../utils/authUtils";
import { getMenuItems } from "../../service/menu.service";

const Menu = () => {
  const [branches, setBranches] = useState([]);
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // to get the menu items
  const fetchMenuItems = async () => {
    setLoading(true);

    try {
      const response = await getMenuItems();
      console.log(response);
      setMenus(response.data);
    } catch (error) {
      popAlert(
        "Oops...",
        "An unexpected error occurred. Please try again.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenuItems();
  }, []);

  return (
    <>
      {loading ? Loader(loading) : null}
      <Navbar />
      <Sidebar />

      <div className="body">
        <div className="menu-page">
          <div className="menu-header">
            <h1>All Menu Items</h1>
            {userData().role === "admin" ||
              (userData().role === "manager" && (
                <button
                  className="add-menu-button"
                  onClick={() => navigate("/add-menu")}
                >
                  Add New Menu Item
                </button>
              ))}
          </div>
          {menus.length === 0 && <div>No menu items available.....</div>}
          <div className="menu-list">
            {menus.map((menu) => (
              <div
                className="menu-item"
                key={menu.id}
                onClick={() => navigate(`/menu-details?id=${menu.id}`)}
              >
                <img
                  src={menu.images[0]?.image_url || noImage}
                  alt={menu.name}
                  className="menu-image"
                />
                <div className="menu-details">
                  <div className="menu-name">{menu.name}</div>
                  <div className="menu-category">{menu.category}</div>
                  <div className="menu-price">Rs. {menu.price}</div>
                  <button
                    className={`menu-availability-button ${
                      menu.is_available ? "available" : "unavailable"
                    }`}
                  >
                    {menu.is_available ? "Available" : "Unavailable"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Menu;

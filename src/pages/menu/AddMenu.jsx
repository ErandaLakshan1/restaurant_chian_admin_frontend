import React, { useState, useEffect } from "react";
import "../../assests/styles/pages/menu/add_menu.css";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import Loader from "../../components/Loader";
import { popAlert } from "../../utils/alerts";
import { useNavigate } from "react-router-dom";
import { userData } from "../../utils/authUtils";
import { getAllBranches } from "../../service/branch.service";
import { addMenuItem } from "../../service/menu.service";

const AddMenu = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [menuName, setMenuName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [branch, setBranch] = useState("");
  const [description, setDescription] = useState("");
  const [availability, setAvailability] = useState(true);
  const [image, setImage] = useState(null);
  const [branches, setBranches] = useState([]);

  // to get all the branches
  const fetchBranches = async () => {
    setLoading(true);
    try {
      const response = await getAllBranches();
      setBranches(response.data);
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
    if (userData().role === "staff") {
      popAlert("Oops...", "You don't have permisson for this", "error");
      navigate("/");
    }
    fetchBranches();
  }, [navigate]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage({ file, imageUrl });
    }
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    const formData = new FormData();
    formData.append("name", menuName);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("price", price);
    formData.append("branch", branch);
    formData.append(
      "is_available",
      capitalizeFirstLetter(availability ? "true" : "false")
    );
    if (image) {
      formData.append("images", image.file);
    }

    try {
      const response = await addMenuItem(formData);
      console.log(response);

      if (!response.success) {
        popAlert(
          "Oops...",
          "An unexpected error occurred. Please try again.",
          "error"
        );
      } else {
        setMenuName("");
        setCategory("");
        setPrice("");
        setBranch("");
        setDescription("");
        setImage(null);
        setAvailability(true);
        popAlert("Success!", "Menu item added successfully.", "success");
      }
    } catch (error) {
      console.log(error);
      popAlert(
        "Oops...",
        "An unexpected error occurred. Please try again.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Sidebar />
      <Navbar />
      {loading && <Loader />}
      <div className="body">
        <div className="add-menu-container">
          <h1 className="add-menu-title">Add New Menu Item</h1>
          <form onSubmit={handleSubmit} className="add-menu-form">
            <div className="add-menu-row">
              <label className="add-menu-label">
                Name
                <input
                  type="text"
                  className="add-menu-input"
                  value={menuName}
                  onChange={(e) => setMenuName(e.target.value)}
                  required
                />
              </label>
              <label className="add-menu-label">
                Category
                <input
                  type="text"
                  className="add-menu-input"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                />
              </label>
            </div>

            <div className="add-menu-row">
              <label className="add-menu-label">
                Price
                <input
                  type="text"
                  className="add-menu-input"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </label>

              {userData().role === "admin" && (
                <label className="add-menu-label">
                  Branch
                  <select
                    className="add-menu-select"
                    value={branch}
                    onChange={(e) => setBranch(e.target.value)}
                    required
                  >
                    <option value="">Select a branch</option>
                    {branches.map((branch) => (
                      <option key={branch.id} value={branch.id}>
                        {branch.name}
                      </option>
                    ))}
                  </select>
                </label>
              )}
            </div>

            <div className="add-menu-row">
              <label className="add-menu-label availability-label">
                Availability
                <div className="availability-checkbox">
                  <input
                    type="checkbox"
                    checked={availability}
                    onChange={(e) => setAvailability(e.target.checked)}
                    id="availability"
                  />
                  <span className="availability-text">
                    {availability ? "Available" : "Unavailable"}
                  </span>
                </div>
              </label>
              <label className="add-menu-label">
                Description
                <textarea
                  className="add-menu-textarea"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </label>
            </div>

            <label className="add-menu-label">
              Image
              <input
                type="file"
                className="add-menu-file-input"
                accept="image/*"
                onChange={handleImageChange}
              />
            </label>

            {image && (
              <div className="add-menu-image-preview">
                <img
                  src={image.imageUrl}
                  alt="Selected"
                  className="add-menu-preview-image"
                />
              </div>
            )}

            <button type="submit" className="add-menu-submit-button">
              Add Menu Item
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddMenu;

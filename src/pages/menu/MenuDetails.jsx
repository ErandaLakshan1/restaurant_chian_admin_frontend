import React, { useState, useEffect } from "react";
import "../../assests/styles/pages/menu/menu_details.css";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import Loader from "../../components/Loader";
import { userData } from "../../utils/authUtils";
import { useNavigate, useLocation } from "react-router-dom";
import { popAlert } from "../../utils/alerts";
import { getAllBranches } from "../../service/branch.service";
import {
  getMenuItemDetails,
  addMenuItemImg,
  deleteMenuItem,
  deleteMenuItemImage,
  updateMenuItems,
} from "../../service/menu.service";

const MenuDetails = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [menuItem, setMenuItem] = useState({});
  const [images, setImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
    is_available: true,
  });
  const role = userData().role;

  const fetchMenuItemDetails = async () => {
    setLoading(true);
    try {
      const response = await getMenuItemDetails(id);
      if (response.success) {
        setMenuItem(response.data);
        setFormData({
          name: response.data.name,
          category: response.data.category,
          price: response.data.price,
          description: response.data.description,
          is_available: response.data.is_available,
        });
        setImages(response.data.images || []);
      } else {
        popAlert("Error", "Failed to load menu item details.", "error");
      }
    } catch (error) {
      console.error(error);
      popAlert("Error", "Failed to load menu item details.", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenuItemDetails();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    const imagePreviews = files.map((file) => URL.createObjectURL(file));
    setNewImages(imagePreviews);
  };

  const handleAddImages = async () => {
    if (newImages.length === 0) {
      popAlert("Error", "Add images to update.", "error");
      return;
    }

    const formData = new FormData();
    const fileInputs = document.querySelector('input[type="file"]').files;
    for (let i = 0; i < fileInputs.length; i++) {
      formData.append("images", fileInputs[i]);
    }
    setLoading(true);

    try {
      const response = await addMenuItemImg(id, formData);
      if (response.success) {
        setImages((prevImages) => [...prevImages, ...newImages]);
        setNewImages([]);
        fetchMenuItemDetails();
        popAlert("Success", "Images added successfully.", "success");
      } else {
        popAlert("Error", "Failed to add images.", "error");
      }
    } catch (error) {
      console.error(error);
      popAlert("Error", "Failed to add images.", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteImage = async (imageId) => {
    setLoading(true);
    try {
      const response = await deleteMenuItemImage(imageId);
      if (response.success) {
        setImages((prevImages) =>
          prevImages.filter((img) => img.id !== imageId)
        );
        popAlert("Success", "Image deleted successfully.", "success");
      } else {
        popAlert("Error", "Failed to delete image.", "error");
      }
    } catch (error) {
      console.error(error);
      popAlert("Error", "Failed to delete image.", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteMenuItem = async () => {
    if (window.confirm("Are you sure you want to delete this menu item?")) {
      setLoading(true);
      try {
        const response = await deleteMenuItem(id);
        if (response.success) {
          popAlert("Success", "Menu item deleted successfully.", "success");
          navigate("/menu");
        } else {
          popAlert("Error", "Failed to delete menu item.", "error");
        }
      } catch (error) {
        console.error(error);
        popAlert("Error", "Failed to delete menu item.", "error");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleUpdateDetails = async () => {
    setLoading(true);
    try {
      const response = await updateMenuItems(formData, id);
      if (response.success) {
        setMenuItem(response.data);
        popAlert(
          "Success",
          "Menu item details updated successfully.",
          "success"
        );
      } else {
        popAlert("Error", "Failed to update menu item details.", "error");
      }
    } catch (error) {
      console.error(error);
      popAlert("Error", "Failed to update menu item details.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Sidebar />
      <Navbar />
      {loading ? Loader(loading) : null}
      <div className="body">
        <div className="menu-item-details-container">
          <h1 className="menu-item-details-title">Menu Item Details</h1>
          <div className="menu-item-details-form">
            <div className="menu-item-details-row">
              <label className="menu-item-details-label">
                Name
                <input
                  type="text"
                  className="menu-item-details-input"
                  name="name"
                  value={formData.name || ""}
                  onChange={handleInputChange}
                  disabled={role === "staff"}
                />
              </label>
              <label className="menu-item-details-label">
                Category
                <input
                  type="text"
                  className="menu-item-details-input"
                  name="category"
                  value={formData.category || ""}
                  onChange={handleInputChange}
                  disabled={role === "staff"}
                />
              </label>
            </div>

            <div className="menu-item-details-row">
              <label className="menu-item-details-label">
                Price
                <input
                  type="text"
                  className="menu-item-details-input"
                  name="price"
                  value={formData.price || ""}
                  onChange={handleInputChange}
                  disabled={role === "staff"}
                />
              </label>
              <label className="menu-item-details-label">
                Availability
                <div className="availability-checkbox">
                  <input
                    type="checkbox"
                    checked={formData.is_available}
                    onChange={handleInputChange}
                    name="is_available"
                    id="is_available"
                  />
                  <span className="availability-text">
                    {formData.is_available ? "Available" : "Unavailable"}
                  </span>
                </div>
              </label>
            </div>

            <div className="menu-item-details-row">
              <label className="menu-item-details-label">
                Description
                <textarea
                  className="menu-item-details-textarea"
                  name="description"
                  value={formData.description || ""}
                  onChange={handleInputChange}
                  disabled={role === "staff"}
                />
              </label>
            </div>

            <>
              <button
                onClick={handleUpdateDetails}
                className="menu-item-details-update-button"
              >
                Save Changes
              </button>

              <div className="menu-item-details-images">
                <h2>Current Image</h2>
                <div className="menu-item-details-image-preview">
                  {images.length > 0 ? (
                    images.map((img) => (
                      <div
                        key={img.id}
                        className="menu-item-details-image-container"
                      >
                        <img
                          src={img.image_url}
                          alt={`Menu Item Image ${img.id}`}
                          className="menu-item-details-image"
                        />
                        {(role === "admin" || role === "manager") && (
                          <button
                            onClick={() => handleDeleteImage(img.id)}
                            className="menu-item-details-delete-button"
                            aria-label="Delete image"
                          >
                            &times;
                          </button>
                        )}
                      </div>
                    ))
                  ) : (
                    <p>No available images in the database.</p>
                  )}
                </div>

                {(role === "admin" || role === "manager") && (
                  <>
                    <h2>Select New Images</h2>
                    {newImages.length > 0 && (
                      <div className="menu-item-details-image-preview">
                        {newImages.map((img, index) => (
                          <img
                            key={index}
                            src={img}
                            alt={`Selected Preview ${index}`}
                            className="menu-item-details-image"
                          />
                        ))}
                      </div>
                    )}
                    <input
                      type="file"
                      className="menu-item-details-file-input"
                      multiple
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                    <button
                      onClick={handleAddImages}
                      className="menu-item-details-add-images-button"
                    >
                      Add Images
                    </button>
                  </>
                )}
              </div>
            </>

            {(role === "admin" || role === "manager") && (
              <button
                onClick={handleDeleteMenuItem}
                className="menu-item-details-delete-item-button"
              >
                Delete Menu Item
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MenuDetails;

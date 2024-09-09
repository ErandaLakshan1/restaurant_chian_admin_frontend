import React, { useState, useEffect } from "react";
import "../../assests/styles/pages/branch/branch_details.css";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import Loader from "../../components/Loader";
import { userData } from "../../utils/authUtils";
import { useNavigate, useLocation } from "react-router-dom";
import { popAlert } from "../../utils/alerts";
import {
  getBranchDetails,
  deleteBranchImage,
  addImages,
  deleteBranch,
  updateBranchDetails,
} from "../../service/branch.service";

const BranchDetails = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [branch, setBranch] = useState({});
  const [images, setImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    contact_number: "",
    longitude: "",
    latitude: "",
    description: "",
  });

  const fetchBranchDetails = async () => {
    setLoading(true);
    try {
      const response = await getBranchDetails(id);
      if (response.success) {
        setBranch(response.data);
        setFormData({
          name: response.data.name,
          address: response.data.address,
          contact_number: response.data.contact_number,
          longitude: response.data.longitude,
          latitude: response.data.latitude,
          description: response.data.description,
        });
        setImages(response.data.images || []);
      } else {
        popAlert("Error", "Failed to load branch details.", "error");
      }
    } catch (error) {
      console.error(error);
      popAlert("Error", "Failed to load branch details.", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userData().role !== "admin" && userData().role !== "manager") {
      popAlert("Oops...", "You don't have permission for this", "error");
      navigate("/");
    }

    fetchBranchDetails();
  }, [navigate, id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
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
      const response = await addImages(formData, id);
      console.log(response);
      if (response.success) {
        setImages((prevImages) => [...prevImages, ...newImages]);
        setNewImages([]);
        fetchBranchDetails();
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
      const response = await deleteBranchImage(imageId);
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

  const handleDeleteBranch = async () => {
    if (window.confirm("Are you sure you want to delete this branch?")) {
      setLoading(true);
      try {
        const response = await deleteBranch(id);
        if (response.success) {
          popAlert("Success", "Branch deleted successfully.", "success");
          navigate("/");
        } else {
          popAlert("Error", "Failed to delete branch.", "error");
        }
      } catch (error) {
        console.error(error);
        popAlert("Error", "Failed to delete branch.", "error");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleUpdateDetails = async () => {
    setLoading(true);
    try {
      const response = await updateBranchDetails(formData, id);
      if (response.success) {
        setBranch(response.data);
        popAlert("Success", "Branch details updated successfully.", "success");
      } else {
        popAlert("Error", "Failed to update branch details.", "error");
      }
    } catch (error) {
      console.error(error);
      popAlert("Error", "Failed to update branch details.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? Loader(loading) : null}
      <Sidebar />
      <Navbar />

      <div className="body">
        <div className="branch-details-container">
          <h1 className="branch-details-title">Branch Details</h1>
          <div className="branch-details-form">
            <div className="branch-details-row">
              <label className="branch-details-label">
                Branch Name
                <input
                  type="text"
                  className="branch-details-input"
                  name="name"
                  value={formData.name || ""}
                  onChange={handleInputChange}
                />
              </label>
              <label className="branch-details-label">
                Address
                <input
                  type="text"
                  className="branch-details-input"
                  name="address"
                  value={formData.address || ""}
                  onChange={handleInputChange}
                />
              </label>
            </div>

            <div className="branch-details-row">
              <label className="branch-details-label">
                Longitude
                <input
                  type="text"
                  className="branch-details-input"
                  name="longitude"
                  value={formData.longitude || ""}
                  onChange={handleInputChange}
                />
              </label>
              <label className="branch-details-label">
                Latitude
                <input
                  type="text"
                  className="branch-details-input"
                  name="latitude"
                  value={formData.latitude || ""}
                  onChange={handleInputChange}
                />
              </label>
            </div>

            <div className="branch-details-row">
              <label className="branch-details-label">
                Contact Number
                <input
                  type="text"
                  className="branch-details-input"
                  name="contact_number"
                  value={formData.contact_number || ""}
                  onChange={handleInputChange}
                />
              </label>
              <label className="branch-details-label">
                Description
                <textarea
                  className="branch-details-textarea"
                  name="description"
                  value={formData.description || ""}
                  onChange={handleInputChange}
                />
              </label>
            </div>

            {userData().role === "admin" && (
              <button
                onClick={handleUpdateDetails}
                className="branch-details-update-button"
              >
                Save Changes
              </button>
            )}

            <div className="branch-details-images">
              <h2>Current Images</h2>
              <div className="branch-details-image-preview">
                {images.length > 0 ? (
                  images.map((img) => (
                    <div
                      key={img.id}
                      className="branch-details-image-container"
                    >
                      <img
                        src={img.image_url}
                        alt={`Branch Image ${img.id}`}
                        className="branch-details-image"
                      />
                      <button
                        onClick={() => handleDeleteImage(img.id)}
                        className="branch-details-delete-button"
                        aria-label="Delete image"
                      >
                        &times;
                      </button>
                    </div>
                  ))
                ) : (
                  <p>No available images in the database.</p>
                )}
              </div>

              <h2>Select New Images</h2>
              {newImages.length > 0 && (
                <div className="branch-details-image-preview">
                  {newImages.map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt={`Selected Preview ${index}`}
                      className="branch-details-image"
                    />
                  ))}
                </div>
              )}
              <input
                type="file"
                className="branch-details-file-input"
                multiple
                accept="image/*"
                onChange={handleImageChange}
              />
              <button
                onClick={handleAddImages}
                className="branch-details-add-images-button"
              >
                Add Images
              </button>
            </div>

            {userData().role === "admin" && (
              <button
                onClick={handleDeleteBranch}
                className="branch-details-delete-branch-button"
              >
                Delete Branch
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default BranchDetails;

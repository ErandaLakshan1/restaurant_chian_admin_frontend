import React, { useState, useEffect } from "react";
import "../../assests/styles/pages/branch/add_branch.css";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import Loader from "../../components/Loader";
import { popAlert } from "../../utils/alerts";
import { useNavigate } from "react-router-dom";
import { userData } from "../../utils/authUtils";
import { createBranch } from "../../service/branch.service";

const AddBranch = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [branchName, setBranchName] = useState("");
  const [address, setAddress] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (!userData().role === "admin") {
      popAlert("Oops...", "You don't have permisson for this", "error");
      navigate("/");
    }
  }, [navigate]);

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    const imagePreviews = files.map((file) => URL.createObjectURL(file));
    setImages((prevImages) => [...prevImages, ...imagePreviews]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);
    const formData = new FormData();
    formData.append("name", branchName);
    formData.append("address", address);
    formData.append("contact_number", contactNumber);
    formData.append("longitude", longitude);
    formData.append("latitude", latitude);
    formData.append("description", description);
    images.forEach((image, index) => {
      formData.append("images", image);
    });

    try {
      const response = await createBranch(formData);
      if (!response.success) {
        const errorMessages = {};
       
        popAlert("Oops...", "An unexpected error occurred. Please try again.", "error");
      } else {
        // Reset the form
        setBranchName('');
        setAddress('');
        setContactNumber('');
        setLongitude('');
        setLatitude('');
        setDescription('');
        setImages([]);
        popAlert("Success!", "Branch added successfully.", "success");
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
      {loading ? Loader(loading) : null}
      <div className="body">
        <div className="add-branch-container">
          <h1 className="add-branch-title">Add New Branch</h1>
          <form onSubmit={handleSubmit} className="add-branch-form">
            <div className="add-branch-row">
              <label className="add-branch-label">
                Branch Name
                <input
                  type="text"
                  className="add-branch-input"
                  value={branchName}
                  onChange={(e) => setBranchName(e.target.value)}
                  required
                />
              </label>
              <label className="add-branch-label">
                Address
                <input
                  type="text"
                  className="add-branch-input"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </label>
            </div>

            <div className="add-branch-row">
              <label className="add-branch-label">
                Longitude
                <input
                  type="text"
                  className="add-branch-input"
                  value={longitude}
                  onChange={(e) => setLongitude(e.target.value)}
                  required
                />
              </label>
              <label className="add-branch-label">
                Latitude
                <input
                  type="text"
                  className="add-branch-input"
                  value={latitude}
                  onChange={(e) => setLatitude(e.target.value)}
                  required
                />
              </label>
            </div>

            <div className="add-branch-row">
              <label className="add-branch-label">
                Contact Number
                <input
                  type="text"
                  className="add-branch-input"
                  value={contactNumber}
                  onChange={(e) => setContactNumber(e.target.value)}
                  required
                />
              </label>
              <label className="add-branch-label">
                Description
                <textarea
                  className="add-branch-textarea"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </label>
            </div>

            <label className="add-branch-label">
              Images
              <input
                type="file"
                className="add-branch-file-input"
                multiple
                accept="image/*"
                onChange={handleImageChange}
              />
            </label>

            <div className="add-branch-image-preview">
              {images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Preview ${index}`}
                  className="add-branch-preview-image"
                />
              ))}
            </div>

            <button type="submit" className="add-branch-submit-button">
              Add Branch
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddBranch;

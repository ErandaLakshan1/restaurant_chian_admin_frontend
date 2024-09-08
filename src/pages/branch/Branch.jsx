import React, { useState, useEffect } from "react";
import "../../assests/styles/pages/branch/branch.css";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import noImage from "../../assests/images/no-img.jpg";
import { getAllBranches } from "../../service/branch.service";
import Loader from "../../components/Loader";
import { popAlert } from "../../utils/alerts";
import { userData } from "../../utils/authUtils";
import { useNavigate } from "react-router-dom";

const Branch = () => {
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
    fetchBranches();
  }, []);

  useEffect(() => {
    if (userData().role === "manager" || userData().role === "staff") {
      popAlert("Oops...", "You don't have permisson for this", "error");
      navigate("/");
    }
  }, [navigate]);

  return (
    <>
      {loading ? Loader(loading) : null}
      <Navbar />
      <Sidebar />
      <div className="body">
        <div className="branch-page">
          <div className="branch-header">
            <h1>All Branches</h1>
            <button
              className="add-branch-button"
              onClick={() => navigate("/add-branch")}
            >
              Add New Branch
            </button>
          </div>
          {branches.length === 0 && (
            <>
              <div>No branches available.....</div>
            </>
          )}
          <div className="branch-list">
            {branches.map((branch) => {
              return (
                <div
                  className="branch-item"
                  key={branch.id}
                  onClick={() => navigate(`/branch-details?id=${branch.id}`)}
                >
                  <img
                    src={
                      branch.images[0]?.image_url
                        ? branch.images[0]?.image_url
                        : noImage
                    }
                    alt={branch.name}
                    className="branch-image"
                  />
                  <div className="branch-details">
                    <div className="branch-name">{branch.name}</div>
                    <div className="branch-address">{branch.address}</div>
                    <div className="branch-contact">
                      {branch.contact_number}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Branch;

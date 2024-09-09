import React, { useState, useEffect } from "react";
import "../../assests/styles/pages/reservation/add_table.css";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import Loader from "../../components/Loader";
import { popAlert } from "../../utils/alerts";
import { useNavigate } from "react-router-dom";
import { userData } from "../../utils/authUtils";
import { getAllBranches } from "../../service/branch.service";
import { createTable } from "../../service/reservation.service";

const AddTable = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [branchId, setBranchId] = useState("");
  const [branches, setBranches] = useState([]);
  const [tableNumber, setTableNumber] = useState("");
  const [seatingCapacity, setSeatingCapacity] = useState("");
  const [description, setDescription] = useState("");

  const fetchBranches = async () => {
    setLoading(true);
    try {
      const response = await getAllBranches();
      setBranches(response.data);
      if (response.data.length > 0) {
        setBranchId(response.data[0].id);
      }
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
      popAlert("Oops...", "You don't have permission for this", "error");
      navigate("/");
    } else if (userData().role === "admin") {
      fetchBranches();
    }
  }, [navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const data = {
      branch: branchId,
      table_number: tableNumber,
      seating_capacity: seatingCapacity,
      description,
    };

    try {
      const response = await createTable(data);
      if (!response.success) {
        popAlert(
          "Oops...",
          "An unexpected error occurred. Please try again.",
          "error"
        );
      } else {
        setBranchId("");
        setTableNumber("");
        setSeatingCapacity("");
        setDescription("");
        popAlert("Success!", "Table added successfully.", "success");
      }
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

  return (
    <>
      <Sidebar />
      <Navbar />
      {loading ? Loader(loading) : null}
      <div className="body">
        <div className="add-branch-container">
          <h1 className="add-branch-title">Add New Table</h1>
          <form onSubmit={handleSubmit} className="add-branch-form">
            {userData().role === "admin" && (
              <div className="add-branch-row">
                <label className="add-branch-label">
                  Branch
                  <select
                    className="add-branch-input"
                    value={branchId}
                    onChange={(e) => setBranchId(e.target.value)}
                    required
                  >
                    <option value="" disabled>
                      Select Branch
                    </option>
                    {branches.map((branch) => (
                      <option key={branch.id} value={branch.id}>
                        {branch.name}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            )}
            <div className="add-branch-row">
              <label className="add-branch-label">
                Table Number
                <input
                  type="text"
                  className="add-branch-input"
                  value={tableNumber}
                  onChange={(e) => setTableNumber(e.target.value)}
                  required
                />
              </label>
              <label className="add-branch-label">
                Seating Capacity
                <input
                  type="number"
                  className="add-branch-input"
                  value={seatingCapacity}
                  onChange={(e) => setSeatingCapacity(e.target.value)}
                  required
                />
              </label>
            </div>

            <div className="add-branch-row">
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

            <button type="submit" className="add-branch-submit-button">
              Add Table
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddTable;

import React, { useState, useEffect } from "react";
import "../../assests/styles/pages/reservation/table_details.css";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import Loader from "../../components/Loader";
import { userData } from "../../utils/authUtils";
import { useNavigate, useLocation } from "react-router-dom";
import { popAlert } from "../../utils/alerts";
import {
  getTableDetails,
  editTableDetails,
  deleteTable,
} from "../../service/reservation.service";

const TableDetails = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const branchId = queryParams.get("branchId");
  const tableId = queryParams.get("tableId");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [table, setTable] = useState({});
  const [formData, setFormData] = useState({
    table_number: "",
    seating_capacity: "",
    description: "",
  });

  const fetchTableDetails = async () => {
    setLoading(true);
    try {
      const response = await getTableDetails(branchId, tableId);
      if (response.success) {
        setTable(response.data);
        setFormData({
          table_number: response.data.table_number,
          seating_capacity: response.data.seating_capacity,
          description: response.data.description,
        });
      } else {
        popAlert("Error", "Failed to load table details.", "error");
      }
    } catch (error) {
      console.error(error);
      popAlert("Error", "Failed to load table details.", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userData().role !== "admin" && userData().role !== "manager") {
      popAlert("Oops...", "You don't have permission for this", "error");
      navigate("/");
    }

    fetchTableDetails();
  }, [navigate, branchId, tableId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleUpdateDetails = async () => {
    setLoading(true);
    try {
      const response = await editTableDetails(formData, tableId);
      if (response.success) {
        setTable(response.data);
        popAlert("Success", "Table details updated successfully.", "success");
      } else {
        popAlert("Error", "Failed to update table details.", "error");
      }
    } catch (error) {
      console.error(error);
      popAlert("Error", "Failed to update table details.", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTable = async () => {
    if (window.confirm("Are you sure you want to delete this table?")) {
      setLoading(true);
      try {
        const response = await deleteTable(tableId);
        if (response.success) {
          popAlert("Success", "Table deleted successfully.", "success");
          navigate(`/tables`);
        } else {
          popAlert("Error", "Failed to delete table.", "error");
        }
      } catch (error) {
        console.error(error);
        popAlert("Error", "Failed to delete table.", "error");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      {loading ? Loader(loading) : null}
      <Sidebar />
      <Navbar />

      <div className="body">
        <div className="table-details-container">
          <h1 className="table-details-title">Table Details</h1>
          <div className="table-details-form">
            <div className="table-details-row">
              <label className="table-details-label">
                Table Number
                <input
                  type="text"
                  className="table-details-input"
                  name="table_number"
                  value={formData.table_number || ""}
                  onChange={handleInputChange}
                />
              </label>
              <label className="table-details-label">
                Seating Capacity
                <input
                  type="number"
                  className="table-details-input"
                  name="seating_capacity"
                  value={formData.seating_capacity || ""}
                  onChange={handleInputChange}
                />
              </label>
            </div>

            <div className="table-details-row">
              <label className="table-details-label">
                Description
                <textarea
                  className="table-details-textarea"
                  name="description"
                  value={formData.description || ""}
                  onChange={handleInputChange}
                />
              </label>
            </div>

            {(userData().role === "admin" || userData().role === "manager") && (
              <>
                <button
                  onClick={handleUpdateDetails}
                  className="table-details-update-button"
                >
                  Save Changes
                </button>

                <button
                  onClick={handleDeleteTable}
                  className="table-details-delete-button"
                >
                  Delete Table
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default TableDetails;

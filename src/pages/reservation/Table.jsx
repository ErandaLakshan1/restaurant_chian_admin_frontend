// src/pages/Table.js
import React, { useState, useEffect } from "react";
import "../../assests/styles/pages/reservation/tables.css";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { getAllBranches } from "../../service/branch.service";
import Loader from "../../components/Loader";
import { popAlert } from "../../utils/alerts";
import { userData } from "../../utils/authUtils";
import { useNavigate } from "react-router-dom";
import { getTablesAccordingToBranch } from "../../service/reservation.service";

const Table = () => {
  const [loading, setLoading] = useState(false);
  const [tables, setTables] = useState([]);
  const [branches, setBranches] = useState([]);
  const [branchId, setBranchId] = useState(null);
  const [branchOptions, setBranchOptions] = useState([]);
  const navigate = useNavigate();

  const fetchTables = async () => {
    if (!branchId) return;
    setLoading(true);
    try {
      const response = await getTablesAccordingToBranch(branchId);
      if (response.success) {
        setTables(response.data);
      } else {
        popAlert(
          "Oops...",
          response.errors.general || "Failed to fetch tables.",
          "error"
        );
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

  const fetchBranches = async () => {
    setLoading(true);
    try {
      const response = await getAllBranches();
      if (response.data.length > 0) {
        const firstBranchId = response.data[0].id;
        setBranchOptions(
          response.data.map((branch) => ({
            id: branch.id,
            name: branch.name,
          }))
        );
        if (userData().role === "admin") {
          setBranchId(firstBranchId);
        } else if (userData().role === "manager") {
          setBranchId(userData().branch);
        }
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
    const role = userData().role;
    if (role === "admin" || role === "manager") {
      fetchBranches();
    } else {
      popAlert(
        "Access Denied",
        "You don't have permission to access this page.",
        "error"
      );
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    if (branchId) {
      fetchTables();
    }
  }, [branchId]);

  return (
    <>
      {loading ? Loader(loading) : null}
      <Sidebar />
      <Navbar />

      <div className="body">
        <div className="table-page">
          <div className="table-header">
            <h1>All Tables</h1>
            <button
              className="add-table-button"
              onClick={() => navigate("/add-table")}
            >
              Add New Table
            </button>
          </div>
          {userData().role === "admin" && (
            <div className="branch-selection">
              <select
                value={branchId || ""}
                onChange={(e) => setBranchId(e.target.value)}
              >
                <option value="" disabled>
                  Select Branch
                </option>
                {branchOptions.map((branch) => (
                  <option key={branch.id} value={branch.id}>
                    {branch.name}
                  </option>
                ))}
              </select>
            </div>
          )}
          {tables.length === 0 && <div>No tables available.....</div>}
          <div className="table-list">
            {tables.map((table) => (
              <div
                className="table-item"
                key={table.id}
                onClick={() =>
                  navigate(
                    `/table-details?tableId=${table.id}&branchId=${table.branch}`
                  )
                }
              >
                <div className="table-details">
                  <div className="table-number">Table {table.table_number}</div>
                  <div className="table-capacity">
                    Seating Capacity: {table.seating_capacity}
                  </div>
                  <div className="table-description">{table.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Table;

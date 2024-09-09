import React, { useState, useEffect } from "react";
import "../assests/styles/pages/staff.css";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Loader from "../components/Loader";
import { userData } from "../utils/authUtils";
import { useNavigate } from "react-router-dom";
import { staffAccordingToBranch } from "../service/users.service";
import { getAllBranches } from "../service/branch.service";

const Staff = () => {
  const [loading, setLoading] = useState(false);
  const [staff, setStaff] = useState([]);
  const [branches, setBranches] = useState([]);
  const [branchId, setBranchId] = useState(null);
  const [branchOptions, setBranchOptions] = useState([]);
  const [noStaffMessage, setNoStaffMessage] = useState(""); // New state for no staff message
  const navigate = useNavigate();

  const fetchStaff = async () => {
    if (!branchId) return;
    setLoading(true);
    setNoStaffMessage(""); // Reset the no staff message
    try {
      const response = await staffAccordingToBranch(branchId);
      if (response.success) {
        if (response.data.length === 0) {
          setNoStaffMessage("No staff found for this branch.");
        } else {
          setStaff(response.data);
        }
      } else {
        setNoStaffMessage(
          response.errors.general || "No staff found for this branch."
        );
        setStaff([]);
      }
    } catch (error) {
      setNoStaffMessage("An unexpected error occurred. Please try again.");
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
      setNoStaffMessage("An unexpected error occurred. Please try again."); // Set the no staff message
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const role = userData().role;
    if (role === "admin" || role === "manager") {
      fetchBranches();
    } else {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    if (branchId) {
      fetchStaff();
    }
  }, [branchId]);

  return (
    <>
      {loading && Loader(loading)}
      <Sidebar />
      <Navbar />

      <div className="body">
        <div className="staff-page">
          <div className="staff-header">
            <h1>All Staff</h1>
            <button
              className="add-staff-button"
              onClick={() => navigate("/add-staff")}
            >
              Add New User
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
          {noStaffMessage && (
            <div className="no-staff-message">{noStaffMessage}</div>
          )}
          <div className="staff-list">
            {staff.length > 0 &&
              staff.map((member) => (
                <div className="staff-item" key={member.username}>
                  <div className="staff-details">
                    <div className="staff-name">
                      {member.first_name} {member.last_name}
                    </div>
                    <div className="staff-email">Email: {member.email}</div>
                    <div className="staff-role">Role: {member.user_type}</div>
                    <div className="staff-username">
                      Username: {member.username}
                    </div>
                    <div className="staff-address">
                      Address: {member.address || "N/A"}
                    </div>
                    <div className="staff-nic">NIC: {member.nic || "N/A"}</div>
                    <div className="staff-mobile">
                      Mobile Number: {member.mobile_number || "N/A"}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Staff;

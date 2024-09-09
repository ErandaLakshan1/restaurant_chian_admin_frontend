import React, { useState, useEffect } from "react";
import "../assests/styles/pages/add_staff.css";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { userData } from "../utils/authUtils";
import { popAlert } from "../utils/alerts";
import { useNavigate } from "react-router-dom";
import { createStaff } from "../service/users.service";
import { getAllBranches } from "../service/branch.service";
import Loader from "../components/Loader";

const AddStaff = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [branchId, setBranchId] = useState("");
  const [branches, setBranches] = useState([]);
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [userType, setUserType] = useState("staff");
  const [address, setAddress] = useState("");
  const [nic, setNic] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");

  const fetchBranches = async () => {
    setLoading(true);
    try {
      const response = await getAllBranches();
      setBranches(response.data);
      if (response.data.length > 0) {
        setBranchId(
          userData().role === "admin" ? response.data[0].id : userData().branch
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

  useEffect(() => {
    if (userData().role === "staff") {
      popAlert("Oops...", "You don't have permission for this", "error");
      navigate("/");
    } else if (userData().role === "admin" || userData().role === "manager") {
      fetchBranches();
    }
  }, [navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const data = {
      username,
      first_name: firstName,
      last_name: lastName,
      email,
      user_type: userType,
      address,
      nic,
      branch: branchId,
      mobile_number: mobileNumber,
    };

    try {
      const response = await createStaff(data);
      console.log(response);
      if (!response.success) {
        const errorMessages = response.errors;

        const formattedErrors = Object.keys(errorMessages)
          .map((field) => {
            return errorMessages[field].join(", ");
          })
          .join(". ");

        popAlert(
          "Oops...",
          formattedErrors || "An unexpected error occurred. Please try again.",
          "error"
        );
      } else {
        setUsername("");
        setFirstName("");
        setLastName("");
        setEmail("");
        setUserType("staff");
        setAddress("");
        setNic("");
        setBranchId(
          userData().role === "admin" ? branches[0]?.id : userData().branch
        );
        setMobileNumber("");
        popAlert("Success!", "User added successfully.", "success");
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
      {loading ? Loader(loading) : null}
      <Sidebar />
      <Navbar />
      <div className="body">
        <div className="add-branch-container">
          <h1 className="add-branch-title">Add New User</h1>
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
                Username
                <input
                  type="text"
                  className="add-branch-input"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </label>
              <label className="add-branch-label">
                First Name
                <input
                  type="text"
                  className="add-branch-input"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </label>
              <label className="add-branch-label">
                Last Name
                <input
                  type="text"
                  className="add-branch-input"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </label>
            </div>
            <div className="add-branch-row">
              <label className="add-branch-label">
                Email
                <input
                  type="email"
                  className="add-branch-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </label>
              <label className="add-branch-label">
                User Type
                <select
                  className="add-branch-input"
                  value={userType}
                  onChange={(e) => setUserType(e.target.value)}
                  required
                >
                  {userData().role === "admin" && (
                    <option value="manager">Manager</option>
                  )}
                  <option value="staff">Staff</option>
                  <option value="delivery_partner">Delivery Partner</option>
                </select>
              </label>
            </div>
            <div className="add-branch-row">
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
              <label className="add-branch-label">
                NIC
                <input
                  type="text"
                  className="add-branch-input"
                  value={nic}
                  onChange={(e) => setNic(e.target.value)}
                  required
                />
              </label>
              <label className="add-branch-label">
                Mobile Number
                <input
                  type="text"
                  className="add-branch-input"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                />
              </label>
            </div>
            <button type="submit" className="add-branch-submit-button">
              Add User
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddStaff;

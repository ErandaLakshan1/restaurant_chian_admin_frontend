import React, { useState, useEffect } from "react";
import "../../assests/styles/pages/order/add_coupon.css";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { popAlert } from "../../utils/alerts";
import { useNavigate } from "react-router-dom";
import { userData } from "../../utils/authUtils";
import { addCoupon } from "../../service/order.service";
import { formatDateToISO } from "../../utils/formatDate";
import Loader from "../../components/Loader";

const AddCoupon = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState("");
  const [discountPercentage, setDiscountPercentage] = useState("");
  const [expirationDate, setExpirationDate] = useState("");

  useEffect(() => {
    if (userData().role !== "admin") {
      popAlert("Oops...", "You don't have permission for this", "error");
      navigate("/");
    }
  }, [navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const data = {
      code,
      discount_percentage: discountPercentage,
      expiration_date: formatDateToISO(new Date(expirationDate)),
    };
    try {
      const response = await addCoupon(data);
      setCode("");
      setDiscountPercentage("");
      setExpirationDate("");
      popAlert("Success!", "Coupon added successfully.", "success");
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
        <div className="add-coupon-container">
          <h1 className="add-coupon-title">Add New Coupon</h1>
          <form onSubmit={handleSubmit} className="add-coupon-form">
            <div className="add-coupon-row">
              <label className="add-coupon-label">
                Coupon Code
                <input
                  type="text"
                  className="add-coupon-input"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  required
                />
              </label>
            </div>
            <div className="add-coupon-row">
              <label className="add-coupon-label">
                Discount Percentage
                <input
                  type="number"
                  className="add-coupon-input"
                  value={discountPercentage}
                  onChange={(e) => setDiscountPercentage(e.target.value)}
                  required
                />
              </label>
              <label className="add-coupon-label">
                Expiration Date
                <input
                  type="date"
                  className="add-coupon-input"
                  value={expirationDate}
                  onChange={(e) => setExpirationDate(e.target.value)}
                  required
                />
              </label>
            </div>
            <button type="submit" className="add-coupon-submit-button">
              Add Coupon
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddCoupon;

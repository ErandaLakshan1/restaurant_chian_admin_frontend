import React, { useState, useEffect } from "react";
import "../../assests/styles/pages/order/coupon_details.css";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import Loader from "../../components/Loader";
import { userData } from "../../utils/authUtils";
import { useNavigate, useLocation } from "react-router-dom";
import { popAlert } from "../../utils/alerts";
import {
  editCoupon,
  deleteCoupon,
  getCouponDetails,
} from "../../service/order.service";
import { formatDateToISO } from "../../utils/formatDate";

const CouponDetails = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const couponId = queryParams.get("id");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [coupon, setCoupon] = useState({});
  const [formData, setFormData] = useState({
    code: "",
    discount_percentage: "",
    expiration_date: "",
  });

  const fetchCouponDetails = async () => {
    setLoading(true);
    try {
      const response = await getCouponDetails(couponId);
      if (response.success) {
        setCoupon(response.data);
        setFormData({
          code: response.data.code,
          discount_percentage: response.data.discount_percentage,
          expiration_date: response.data.expiration_date,
        });
      } else {
        popAlert("Error", "Failed to load coupon details.", "error");
      }
    } catch (error) {
      console.error(error);
      popAlert("Error", "Failed to load coupon details.", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userData().role !== "admin") {
      popAlert("Oops...", "You don't have permission for this", "error");
      navigate("/");
    }

    fetchCouponDetails();
  }, [navigate, couponId]);

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
      const formattedDate = formatDateToISO(new Date(formData.expiration_date));
      const response = await editCoupon(couponId, {
        ...formData,
        expiration_date: formattedDate,
      });
      console.log(response);
      if (response.success) {
        setCoupon(response.data);
        popAlert("Success", "Coupon details updated successfully.", "success");
      } else {
        popAlert("Error", "Failed to update coupon details.", "error");
      }
    } catch (error) {
      console.error(error);
      popAlert("Error", "Failed to update coupon details.", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCoupon = async () => {
    if (window.confirm("Are you sure you want to delete this coupon?")) {
      setLoading(true);
      try {
        const response = await deleteCoupon(couponId);
        if (response.success) {
          popAlert("Success", "Coupon deleted successfully.", "success");
          navigate(`/coupons`);
        } else {
          popAlert("Error", "Failed to delete coupon.", "error");
        }
      } catch (error) {
        console.error(error);
        popAlert("Error", "Failed to delete coupon.", "error");
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
        <div className="coupon-details-container">
          <h1 className="coupon-details-title">Coupon Details</h1>
          <div className="coupon-details-form">
            <div className="coupon-details-row">
              <label className="coupon-details-label">
                Coupon Code
                <input
                  type="text"
                  className="coupon-details-input"
                  name="code"
                  value={formData.code || ""}
                  onChange={handleInputChange}
                />
              </label>
              <label className="coupon-details-label">
                Discount Percentage
                <input
                  type="number"
                  step="0.01"
                  className="coupon-details-input"
                  name="discount_percentage"
                  value={formData.discount_percentage || ""}
                  onChange={handleInputChange}
                />
              </label>
            </div>

            <div className="coupon-details-row">
              <label className="coupon-details-label">
                Expiration Date
                <input
                  type="date"
                  className="coupon-details-input"
                  name="expiration_date"
                  value={formData.expiration_date || ""}
                  onChange={handleInputChange}
                />
              </label>
            </div>

            <button
              onClick={handleUpdateDetails}
              className="coupon-details-update-button"
            >
              Save Changes
            </button>

            <button
              onClick={handleDeleteCoupon}
              className="coupon-details-delete-button"
            >
              Delete Coupon
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CouponDetails;

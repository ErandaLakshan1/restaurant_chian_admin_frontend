import React, { useState, useEffect } from "react";
import "../../assests/styles/pages/order/coupons.css";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import Loader from "../../components/Loader";
import { useNavigate } from "react-router-dom";
import { userData } from "../../utils/authUtils";
import { popAlert } from "../../utils/alerts";
import { getAllCoupons } from "../../service/order.service";

const Coupons = () => {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const role = userData().role;

  const fetchCoupons = async () => {
    setLoading(true);
    try {
      const response = await getAllCoupons();
      setCoupons(response.data);
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
    fetchCoupons();
  }, []);

  return (
    <>
      {loading ? Loader(loading) : null}
      <Navbar />
      <Sidebar />
      <div className="body">
        <div className="coupons-page">
          <div className="coupons-header">
            <h1>All Coupons</h1>
            {role === "admin" && (
              <button
                className="add-coupon-button"
                onClick={() => navigate("/add-coupon")}
              >
                Add New Coupon
              </button>
            )}
          </div>
          {coupons.length === 0 && <div>No coupons available.....</div>}
          <div className="coupon-list">
            {coupons.map((coupon) => (
              <div className="coupon-item" key={coupon.id} onClick={() => navigate(`/coupon-details?id=${coupon.id}`)}>
                <div className="coupon-details">
                  <div className="coupon-code">
                    <strong>Code:</strong> {coupon.code}
                  </div>
                  <div className="coupon-discount">
                    <strong>Discount:</strong> {coupon.discount_percentage}%
                  </div>
                  <div className="coupon-expiration">
                    <strong>Expiration Date:</strong> {coupon.expiration_date}
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

export default Coupons;

import React, { useState, useEffect } from "react";
import "../../assests/styles/pages/order/orders.css";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import noImage from "../../assests/images/no-img.jpg";
import { popAlert } from "../../utils/alerts";
import { userData } from "../../utils/authUtils";
import Loader from "../../components/Loader";
import { getAllBranches } from "../../service/branch.service";
import { getOrdersAccordingToBranch } from "../../service/order.service";

const Orders = () => {
  const [branches, setBranches] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedBranchId, setSelectedBranchId] = useState(null);
  const [branchOptions, setBranchOptions] = useState([]);
  const [serverMessage, setServerMessage] = useState("");

  const fetchBranches = async () => {
    setLoading(true);
    try {
      const response = await getAllBranches();
      if (response.success) {
        setBranches(response.data);
        setBranchOptions(
          response.data.map((branch) => ({
            id: branch.id,
            name: branch.name,
          }))
        );
        if (userData().role === "admin") {
          setSelectedBranchId(response.data[0]?.id || null);
        } else if (
          userData().role === "manager" ||
          userData().role === "staff"
        ) {
          setSelectedBranchId(userData().branch);
        }
      } else {
        popAlert("Oops...", "Failed to fetch branches.", "error");
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

  const fetchOrders = async () => {
    if (!selectedBranchId) return;
    setLoading(true);
    try {
      const response = await getOrdersAccordingToBranch(selectedBranchId);
      if (response.success) {
        setOrders(response.data.orders);
        setServerMessage("");
      } else {
        setOrders([]);
        setServerMessage(
          response.errors.general || "No orders found for this branch."
        );
      }
    } catch (error) {
      setOrders([]);
      setServerMessage("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBranches();
  }, []);

  useEffect(() => {
    if (selectedBranchId) {
      fetchOrders();
    }
  }, [selectedBranchId]);

  return (
    <>
      {loading && <Loader />}
      <Navbar />
      <Sidebar />
      <div className="body">
        <div className="order-page">
          <div className="order-header">
            <h1>All Orders</h1>
            {userData().role === "admin" && (
              <div className="branch-selection">
                <select
                  value={selectedBranchId || ""}
                  onChange={(e) => setSelectedBranchId(e.target.value)}
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
          </div>
          {serverMessage && (
            <div className="server-message">{serverMessage}</div>
          )}{" "}
          {/* Display server message */}
          <div className="order-list">
            {orders.map((order) => (
              <div className="order-item" key={order.id}>
                <div className="order-header-details">
                  <div className="order-date">
                    {new Date(order.created_at).toLocaleDateString()}
                  </div>
                  <div className="order-info">
                    <div className="order-type">{order.order_type}</div>
                    <div className="customer-name">
                      {order.customer_first_name} {order.customer_last_name}
                    </div>
                  </div>
                </div>
                <div className="order-items">
                  {order.order_items.map((item, index) => {
                    const totalPrice = item.menu_item.price * item.quantity;
                    return (
                      <div key={index} className="order-item-detail">
                        <img
                          src={item.menu_item.images[0]?.image_url || noImage}
                          alt={item.menu_item.name}
                          className="order-item-image"
                        />
                        <div className="order-item-info">
                          <div className="order-item-name">
                            {item.menu_item.name}
                          </div>
                          <div className="order-item-details">
                            <div className="order-item-price">
                              Rs. {item.menu_item.price}
                            </div>
                            <div className="order-item-quantity">
                              Qty: {item.quantity}
                            </div>
                            <div className="order-item-total">
                              Rs. {totalPrice}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="order-summary">
                  <div className="summary-row">
                    <p className="summary-label">Total:</p>
                    <p className="summary-value">Rs. {order.total_price}</p>
                  </div>
                  {order.coupon && (
                    <>
                      <div className="summary-row">
                        <p className="summary-label">Coupon Applied:</p>
                        <p className="summary-value">{order.coupon.code}</p>
                      </div>
                      <div className="summary-row">
                        <p className="summary-label">Discount:</p>
                        <p className="summary-value">
                          Rs. {order.discount_applied}
                        </p>
                      </div>
                    </>
                  )}
                  <div className="summary-row">
                    <p className="summary-label">Final Total Paid:</p>
                    <p className="summary-value">Rs. {order.final_price}</p>
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

export default Orders;

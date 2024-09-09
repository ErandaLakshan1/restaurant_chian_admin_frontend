import React, { useState, useEffect } from "react";
import "../../assests/styles/pages/reservation/table_reservation.css";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { getAllBranches } from "../../service/branch.service";
import Loader from "../../components/Loader";
import { popAlert } from "../../utils/alerts";
import { userData } from "../../utils/authUtils";
import { getAllReservations } from "../../service/reservation.service";

const TableReservation = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchReservations = async () => {
    setLoading(true);
    try {
      const response = await getAllReservations();
      setReservations(response.data);
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
    fetchReservations();
  }, []);

  return (
    <>
      {loading ? Loader(loading) : null}
      <Navbar />
      <Sidebar />
      <div className="body">
        <div className="reservations-page">
          <h1>Reservations</h1>
          {userData().role === "admin" ? (
            Object.keys(reservations).length > 0 ? (
              Object.entries(reservations).map(
                ([branchName, reservationList]) =>
                  reservationList.length > 0 && (
                    <div key={branchName} className="branch-reservations">
                      <h2>{branchName}</h2>
                      <div className="reservation-list">
                        {reservationList.map((reservation) => (
                          <div
                            className="reservation-item"
                            key={reservation.id}
                          >
                            <div className="reservation-details">
                              <div>
                                <strong>Customer:</strong>{" "}
                                {reservation.customer_first_name}{" "}
                                {reservation.customer_last_name}
                              </div>
                              <div>
                                <strong>Table:</strong> {reservation.table}
                              </div>
                              <div>
                                <strong>Date:</strong>{" "}
                                {reservation.reservation_date}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
              )
            ) : (
              <div>No reservations available.</div>
            )
          ) : reservations.length > 0 ? (
            <div className="reservation-list">
              {reservations.map((reservation) => (
                <div className="reservation-item" key={reservation.id}>
                  <div className="reservation-details">
                    <div>
                      <strong>Customer:</strong>{" "}
                      {reservation.customer_first_name}{" "}
                      {reservation.customer_last_name}
                    </div>
                    <div>
                      <strong>Table:</strong> {reservation.table}
                    </div>
                    <div>
                      <strong>Date:</strong> {reservation.reservation_date}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div>No reservations available.</div>
          )}
        </div>
      </div>
    </>
  );
};

export default TableReservation;

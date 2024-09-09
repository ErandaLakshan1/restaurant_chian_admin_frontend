import React, { useState, useEffect } from "react";
import "../../assests/styles/pages/reservation/table_reservation.css";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { getAllBranches } from "../../service/branch.service";
import Loader from "../../components/Loader";
import { popAlert } from "../../utils/alerts";
import { userData } from "../../utils/authUtils";
import { useNavigate } from "react-router-dom";

const TableReservation = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <Sidebar />
      <Navbar />
    </>
  );
};

export default TableReservation;

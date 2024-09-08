import React from "react";
import "../assests/styles/pages/home.css";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const Home = () => {
  return (
    <>
      <Navbar />
      <Sidebar />
      <div className="home body">
        <div className="home-welcome">
          <h1>Welcome to the Admin Dashboard</h1>
          <p>Here you can manage all aspects of your application.</p>
        </div>

        <div className="home-overview">
          <div className="overview-card">
            <h3>Total Restaurants</h3>
            <p>125</p>
          </div>
          <div className="overview-card">
            <h3>Pending Reviews</h3>
            <p>34</p>
          </div>
          <div className="overview-card">
            <h3>Active Users</h3>
            <p>1,234</p>
          </div>
          <div className="overview-card">
            <h3>Monthly Revenue</h3>
            <p>$12,345</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;

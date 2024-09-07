import React from "react";
import "../assests/styles/components/loader.css";
import SyncLoader from "react-spinners/SyncLoader";

const Loader = ({ loading }) => {
  return (
    <div className="loaderDiv">
      <div className="loader">
        <center>
          <span>Loading</span>
        </center>

        <SyncLoader
          size={40}
          color={"#ff8c00"}
          loading={loading}
          speedMultiplier={1.1}
        />
      </div>
    </div>
  );
};

export default Loader;

import React, { useState } from "react";
import "../../assests/styles/pages/auth/login.css";
import Loader from "../../components/Loader";
import { popAlert } from "../../utils/alerts";
import logInImg from "../../assests/images/login.svg";
import { loginUser } from "../../service/auth.service";
import { setAccessToken, setRefreshToken } from "../../utils/authUtils";

const Login = () => {
  const [data, setData] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData({
      ...data,
      [name]: value,
    });
  };

  const handlesubmit = async (e) => {
    e.preventDefault();

    if (!data.username || !data.password) {
      popAlert("Oops...", "All the fields are required!", "error");
    } else {
      setLoading(true);

      const formdata = {
        username: data.username,
        password: data.password,
      };

      try {
        const response = await loginUser(formdata);
        if (!response.success) {
          popAlert("Oops...", response.errors.detail, "error");
        } else {
          setData({
            username: "",
            password: "",
          });

          setAccessToken(response.data.access);
          setRefreshToken(response.data.refresh);
          //   navigate("/");
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
    }
  };

  return (
    <>
      {loading ? Loader(loading) : null}
      <div className="login-page">
        <div className="login-page-img-section">
          <img src={logInImg} alt="Login" />
        </div>

        <div className="login-page-form-section">
          <h1>Sign In</h1>
          <form onSubmit={handlesubmit}>
            <div className="login-page-form-group">
              <label
                htmlFor="username"
                className="login-page-lg-form-group-label"
              >
                Enter Your Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={data.username}
                onChange={handleChange}
                className="login-page-form-group-input"
              />
            </div>

            <div className="login-page-form-group">
              <label
                htmlFor="password"
                className="login-page-lg-form-group-label"
              >
                Enter Your Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                className="login-page-form-group-input"
              />
            </div>
            <button className="login-page-sign-in-button">Sign In</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;

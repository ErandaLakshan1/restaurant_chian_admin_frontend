import { jwtDecode } from "jwt-decode";

export const getAccessToken = () => {
  return localStorage.getItem("accessToken");
};

export const setAccessToken = (token) => {
  localStorage.setItem("accessToken", token);
};

export const removeAccessToken = () => {
  localStorage.removeItem("accessToken");
};

export const getRefreshToken = () => {
  return localStorage.getItem("refreshToken");
};

export const setRefreshToken = (token) => {
  localStorage.setItem("refreshToken", token);
};

export const removeRefreshToken = () => {
  localStorage.removeItem("refreshToken");
};

export const isAuthenticated = () => {
  return !!getAccessToken();
};

export const userData = () => {
  if (isAuthenticated()) {
    const decodedData = jwtDecode(getAccessToken());
    const data = {
      role: decodedData.user_type,
      userId: decodedData.user_id,
      username: decodedData.username,
      branch: decodedData.branch || null,
    };

    return data;
  }
};

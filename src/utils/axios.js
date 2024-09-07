import axios from "axios";
import constants from "../constants";
import { getAccessToken } from "./authUtils";

export const getApI = () => {
  const token = getAccessToken();

  return axios.create({
    baseURL: constants.API_BASE_URL,
    headers: {
      Authorization: token ? "Bearer " + token : null,
      "Content-type": "application/json",
    },
  });
};

export const getApiForFormData = () => {
  const token = getAccessToken();

  return axios.create({
    baseURL: constants.API_BASE_URL,
    headers: {
      Authorization: token ? "Bearer " + token : null,
      "Content-type": "multipart/form-data",
    },
  });
};

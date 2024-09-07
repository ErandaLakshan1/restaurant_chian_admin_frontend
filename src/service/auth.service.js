import { getApI } from "../utils/axios";

//for user login
export const loginUser = async (data) => {
  try {
    const response = await getApI().post("api/users/token/", data);
    return { success: true, data: response.data };
  } catch (error) {
    if (error.response && error.response.data) {
      console.log(error);
      return { success: false, errors: error.response.data };
    } else {
      console.error("An unexpected error occurred:", error);
      return {
        success: false,
        errors: { general: "An unexpected error occurred. Please try again." },
      };
    }
  }
};

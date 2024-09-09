import { userData } from "../utils/authUtils";
import { getApI } from "../utils/axios";

// to get the staff according to branch
export const staffAccordingToBranch = async (branchId) => {
  try {
    let response;
    if (userData().role === "admin") {
      response = await getApI().get(
        `api/users/get/users_by_branch/${branchId}/`
      );
    } else {
      response = await getApI().get("api/users/get/users_by_branch/");
    }
    console.log(response.data);
    return { success: true, data: response.data };
  } catch (error) {
    if (error.response && error.response.data) {
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

// to create staff
export const createStaff = async (data) => {
  try {
    const response = await getApI().post(
      "api/users/create/create_staff/",
      data
    );
    return { success: true, data: response.data };
  } catch (error) {
    if (error.response && error.response.data) {
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

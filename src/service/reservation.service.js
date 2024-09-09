import { getApI } from "../utils/axios";

// to get tables according to branch
export const getTablesAccordingToBranch = async (branchId) => {
  try {
    const response = await getApI().get(
      `api/reservation/get/table_list/${branchId}/`
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

// to create a table
export const createTable = async (data) => {
  try {
    const response = await getApI().post("api/reservation/create/table/", data);
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

// to get the table details
export const getTableDetails = async (branchId, tableId) => {
  try {
    const response = await getApI().get(
      `api/reservation/get/table_list/${branchId}/${tableId}/`
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

// to edit table details
export const editTableDetails = async (data, tableId) => {
  try {
    const response = await getApI().patch(
      `api/reservation/update/table/${tableId}/`,
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

//to delete the table
export const deleteTable = async (tableId) => {
  try {
    const response = await getApI().delete(
      `api/reservation/delete/table/${tableId}/`
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

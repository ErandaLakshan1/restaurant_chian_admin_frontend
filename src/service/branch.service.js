import { getApI, getApiForFormData } from "../utils/axios";

// to get all availabel branches
export const getAllBranches = async () => {
  try {
    const response = await getApI().get("api/branches/get_branches/");
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

// to create a branch
export const createBranch = async (data) => {
  try {
    const response = await getApiForFormData().post(
      "api/branches/add_branch/",
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

// to get the details by branch
export const getBranchDetails = async (branchId) => {
  try {
    const response = await getApI().get(
      `api/branches/get_branches/${branchId}/`
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

// to update the branch details
export const updateBranchDetails = async (data, branchId) => {
  try {
    const response = await getApI().patch(
      `api/branches/update_branch/${branchId}/`,
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

// to delete branch images
export const deleteBranchImage = async (imageId) => {
  try {
    const response = await getApI().delete(
      `api/branches/delete_branch_image/${imageId}/`
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

// to add images to branch
export const addImages = async (data, branchId) => {
  try {
    const response = await getApiForFormData().post(
      `api/branches/add_branch_images/${branchId}/`,
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

//to delete the branch
export const deleteBranch = async (branchId) => {
  try {
    const response = await getApI().delete(
      `api/branches/delete_branch/${branchId}/`
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

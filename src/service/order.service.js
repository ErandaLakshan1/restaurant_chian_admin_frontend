import { getApI } from "../utils/axios";

// to get all coupons
export const getAllCoupons = async () => {
  try {
    const response = await getApI().get("api/orders/get/coupons/");
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

// to add coupons
export const addCoupon = async (data) => {
  try {
    const response = await getApI().post("api/orders/create/coupon/", data);
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

//to get couopn details
export const getCouponDetails = async (couponId) => {
  try {
    const response = await getApI().get(`api/orders/get/coupon/${couponId}/`);
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

// to edit coupon
export const editCoupon = async (couponId, data) => {
  try {
    const response = await getApI().patch(
      `api/orders/update/coupon/${couponId}/`, data
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

// to delete coupon
export const deleteCoupon = async (couponId) => {
  try {
    const response = await getApI().delete(
      `api/orders/delete/coupon/${couponId}/`
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

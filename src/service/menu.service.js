import { getApI, getApiForFormData } from "../utils/axios";

//to get menu items
export const getMenuItems = async () => {
  try {
    const response = await getApI().get("api/menu/get/menu_items/");
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

// to add menu item
export const addMenuItem = async (data) => {
  try {
    const response = await getApiForFormData().post(
      "api/menu/create/menu_item/",
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

// to view menu item details
export const getMenuItemDetails = async (itemId) => {
  try {
    const response = await getApI().get(`api/menu/get/menu_item/${itemId}/`);
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

// to update menu items
export const updateMenuItems = async (data, itemId) => {
  try {
    const response = await getApI().patch(
      `api/menu/update/menu_item/${itemId}/`,
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

// to delete menu item image
export const deleteMenuItemImage = async (itemId) => {
  try {
    const response = await getApI().delete(
      `api/menu/delete/menu_item_images/${itemId}/`
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

// to add menu item image
export const addMenuItemImg = async (itemId, data) => {
  try {
    const response = await getApiForFormData().post(
      `api/menu/update/menu_item_images/${itemId}/`,
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

//to delete menu item
export const deleteMenuItem = async (itemId) => {
  try {
    const response = await getApI().delete(
      `api/menu/delete/menu_item/${itemId}/`
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

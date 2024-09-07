import Swal from "sweetalert2";

export const popAlert = (titel, text, icon, confirmButtonText) => {
  return Swal.fire({
    title: titel,
    text: text,
    icon: icon,
    confirmButtonText: confirmButtonText || "Ok",
    confirmButtonColor: "#ff8c00",
  });
};

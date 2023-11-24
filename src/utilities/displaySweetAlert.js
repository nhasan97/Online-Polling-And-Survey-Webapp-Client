import Swal from "sweetalert2";

export const showAlertOnSuccess = (msg) => {
  Swal.fire({
    position: "center",
    icon: "success",
    title: msg,
    showConfirmButton: false,
    timer: 1500,
  });
};

export const showAlertOnError = (msg) => {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: msg,
  });
};

export const showAlertWithConfirmation = (msg, confirmButtonText) => {
  return Swal.fire({
    title: msg,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: confirmButtonText,
  });
};

import PropTypes from "prop-types";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastNotification = ({ position = "top-right", autoClose = 2000 }) => {
  return (
    <ToastContainer
      position={position}
      autoClose={autoClose}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  );
};

ToastNotification.propTypes = {
  position: PropTypes.oneOf([
    "top-right",
    "top-center",
    "top-left",
    "bottom-right",
    "bottom-center",
    "bottom-left",
  ]),
  autoClose: PropTypes.number,
};

export const showToast = (type) => {
  switch (type) {
    case "fieldError":
      toast.error("Please complete all mandatory fields.");
      break;
    case "error":
      toast.error("Something went wrong!");
      break;
    case "success":
      toast.success("Data saved successfully!");
      break;
    case "submmited":
      toast.success("Data submitted successfully!");
      break;
    default:
      toast.success("Data saved successfully!");
      break;
  }
};

export default ToastNotification;

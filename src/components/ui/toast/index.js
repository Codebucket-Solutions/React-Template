import toast from "react-hot-toast";

export const actionNotifier = {
  
  success: (message) => {
    toast.success(message);
  },

  error: (message) => {
    toast.error(message);
  },

  warning: (message) => {
    toast(message);
  },

  info: (message) => {
    toast(message);
  },

  loading: (message = "Please wait...") => {
    return toast.loading(message, {
      style: {
        background: "#4b5563",
        color: "white",
        borderRadius: "10px"
      }
    });
  },

  dismiss: (toastId) => {
    toast.dismiss(toastId);
  },

  custom: (component) => {
    toast.custom(component);
  }
};

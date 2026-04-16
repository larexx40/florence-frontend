import Swal from "sweetalert2"

// Toast configuration for quick notifications
const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer
    toast.onmouseleave = Swal.resumeTimer
  },
  customClass: {
    popup: "colored-toast",
  },
})

// Success toast
export const showSuccessToast = (message: string) => {
  Toast.fire({
    icon: "success",
    title: message,
    iconColor: "#8B7355",
  })
}

// Error toast
export const showErrorToast = (message: string) => {
  Toast.fire({
    icon: "error",
    title: message,
    iconColor: "#DC2626",
  })
}

// Warning toast
export const showWarningToast = (message: string) => {
  Toast.fire({
    icon: "warning",
    title: message,
    iconColor: "#F59E0B",
  })
}

// Info toast
export const showInfoToast = (message: string) => {
  Toast.fire({
    icon: "info",
    title: message,
    iconColor: "#3B82F6",
  })
}

// Modal for critical errors requiring user action
export const showErrorModal = (title: string, message: string) => {
  return Swal.fire({
    icon: "error",
    title,
    text: message,
    confirmButtonColor: "#8B7355",
    confirmButtonText: "OK",
  })
}

// Modal for confirmations (delete, etc.)
export const showConfirmModal = (title: string, message: string, confirmText = "Yes", cancelText = "Cancel") => {
  return Swal.fire({
    icon: "warning",
    title,
    text: message,
    showCancelButton: true,
    confirmButtonColor: "#8B7355",
    cancelButtonColor: "#6B6560",
    confirmButtonText: confirmText,
    cancelButtonText: cancelText,
  })
}

// Modal for success with action
export const showSuccessModal = (title: string, message: string) => {
  return Swal.fire({
    icon: "success",
    title,
    text: message,
    confirmButtonColor: "#8B7355",
    timer: 2000,
    showConfirmButton: false,
  })
}

// Loading state
export const showLoading = (title: string) => {
  return Swal.fire({
    title,
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading()
    },
  })
}

// Close loading
export const closeLoading = () => {
  Swal.close()
}

export default {
  showSuccessToast,
  showErrorToast,
  showWarningToast,
  showInfoToast,
  showErrorModal,
  showConfirmModal,
  showSuccessModal,
  showLoading,
  closeLoading,
}

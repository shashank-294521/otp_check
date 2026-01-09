import axios from "axios";

const API = axios.create({
  baseURL: "https://stapubox.com/trial",
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
    "X-Api-Token": "trial_33936967_a47d7566cab85d2f8284bd8901b92d52"
  }
});

// Global response handler
API.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message =
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      "Something went wrong. Please try again.";
    return Promise.reject(message);
  }
);

// Send OTP
export const sendOtp = (mobile) => {
  return API.post("/sendOtp", { mobile });
};

// Resend OTP
export const resendOtp = (mobile) => {
  return API.post(`/resendOtp?mobile=${mobile}`);
};

// Verify OTP
export const verifyOtp = (mobile, otp) => {
  return API.post(`/verifyOtp?mobile=${mobile}&otp=${otp}`);
};

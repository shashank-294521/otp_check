// Validate Indian mobile number
export const validateMobile = (mobile) => {
  // Must be 10 digits, start with 6,7,8 or 9
  const regex = /^[6-9]\d{9}$/;
  return regex.test(mobile);
};

// Validate OTP (4 digit)
export const validateOtp = (otp) => {
  // Only digits, exactly 4 characters
  const regex = /^\d{4}$/;
  return regex.test(otp);
};

// Sanitize mobile input (remove spaces, non-numeric)
export const sanitizeMobile = (value) => {
  return value.replace(/[^0-9]/g, "").slice(0, 10);
};

// Sanitize OTP input
export const sanitizeOtp = (value) => {
  return value.replace(/[^0-9]/g, "").slice(0, 4);
};

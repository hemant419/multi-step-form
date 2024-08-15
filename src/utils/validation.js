export const validateEmail = (emailId) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailId) {
    return "Email is required.";
  } else if (!emailRegex.test(emailId)) {
    return "Email is not valid.";
  }
  return "";
};

export const validatePassword = (password) => {
  const passwordRegex =
    /^(?=(?:.*[A-Z]){2})(?=(?:.*[a-z]){2})(?=(?:.*\d){2})(?=(?:.*[@$!%*?&]){2}).{8,}$/;
  if (!password) {
    return "Password is required.";
  } else if (!passwordRegex.test(password)) {
    return "Password must contain at least 2 capital letters, 2 small letters, 2 numbers, and 2 special characters.";
  }
  return "";
};

export const validateName = (name, isRequired = true) => {
  const nameRegex = /^[A-Za-z]+$/;
  if (isRequired && !name) {
    return "This field is required.";
  } else if (name && !nameRegex.test(name)) {
    return "This field should contain only alphabets.";
  } else if (name && (name.length < 2 || name.length > 50)) {
    return "This field should be between 2 to 50 characters.";
  }
  return "";
};

export const validateAddress = (address) => {
  if (!address) {
    return "Address is required.";
  } else if (address.length < 10) {
    return "Address should be at least 10 characters long.";
  }
  return "";
};

export const validatePhoneNumber = (phoneNumber) => {
  const phoneRegex = /^[0-9]{10}$/;
  if (!phoneNumber) {
    return "Phone number is required.";
  } else if (!phoneRegex.test(phoneNumber)) {
    return "Phone number must be a 10 digit number.";
  }
  return "";
};

export const validateCountryCode = (countryCode) => {
  const validCountryCodes = ["+91", "+1"];
  if (!countryCode) {
    return "Country code is required.";
  } else if (!validCountryCodes.includes(countryCode)) {
    return "Invalid country code.";
  }
  return "";
};

export const validateTermsAndConditions = (acceptTermsAndCondition) => {
  if (!acceptTermsAndCondition) {
    return "You must accept the terms and conditions.";
  }
  return "";
};

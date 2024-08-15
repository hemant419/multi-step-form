import PropTypes from "prop-types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  validateCountryCode,
  validatePhoneNumber,
  validateTermsAndConditions,
} from "../utils/validation";
import { showToast } from "./common/ToastNotification";

const FormStep3 = ({ data, onSave, onBack }) => {
  const [countryCode, setCountryCode] = useState(data.countryCode);
  const [phoneNumber, setPhoneNumber] = useState(data.phoneNumber);
  const [acceptTermsAndCondition, setAcceptTermsAndCondition] = useState(
    data.acceptTermsAndCondition,
  );
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    let tempErrors = {};

    tempErrors.countryCode = validateCountryCode(countryCode);
    tempErrors.phoneNumber = validatePhoneNumber(phoneNumber);
    tempErrors.acceptTermsAndCondition = validateTermsAndConditions(acceptTermsAndCondition);

    setErrors(tempErrors);
    return Object.values(tempErrors).every((error) => error === null || error === "");
  };

  const handleSubmit = async () => {
    if (validate()) {
      const submitData = { ...data, countryCode, phoneNumber };
      delete submitData.acceptTermsAndCondition;

      try {
        const response = await fetch("https://codebuddy.review/submit", {
          method: "POST",
          body: JSON.stringify(submitData),
        });
        const result = await response.json();

        if (result.message.toLowerCase() === "success") {
          showToast("submitted");
        } else {
          showToast("Submission failed. Please try again.", "error");
        }
        navigate("/posts");
      } catch (error) {
        showToast(error.message || "An error occurred.");
      }
    }
  };

  const handleCountryCodeChange = (e) => {
    setCountryCode(e.target.value);
    setErrors({ ...errors, countryCode: validateCountryCode(e.target.value) });
  };

  const handlePhoneChange = (e) => {
    setPhoneNumber(e.target.value);
    setErrors({ ...errors, phoneNumber: validatePhoneNumber(e.target.value) });
  };

  const handleTermsChange = (e) => {
    setAcceptTermsAndCondition(e.target.checked);
    setErrors({
      ...errors,
      acceptTermsAndCondition: validateTermsAndConditions(e.target.checked),
    });
  };

  const handleSave = () => {
    if (validate()) {
      onSave({ countryCode, phoneNumber, acceptTermsAndCondition });
      showToast("Data saved successfully!", "success");
    } else {
      showToast("fieldError");
    }
  };

  return (
    <div className="mx-auto max-w-lg rounded-lg bg-white p-6 shadow-md sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl">
      <h2 className="mb-6 text-center text-2xl font-semibold sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl">
        Form 3
      </h2>
      <div className="mb-4">
        <label
          htmlFor="country-code"
          className="block text-sm font-medium text-gray-700 sm:text-base md:text-sm lg:text-base"
        >
          Country Code:
        </label>
        <select
          value={countryCode}
          onChange={handleCountryCodeChange}
          className={`mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 ${
            errors.countryCode
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:ring-indigo-500"
          }`}
        >
          <option value="">Select Country Code</option>
          <option value="+91">India (+91)</option>
          <option value="+1">America (+1)</option>
        </select>
        {errors.countryCode && <p className="mt-1 text-sm text-red-500">{errors.countryCode}</p>}
      </div>
      <div className="mb-4">
        <label
          htmlFor="phone"
          className="block text-sm font-medium text-gray-700 sm:text-base md:text-sm lg:text-base"
        >
          Phone Number:
        </label>
        <input
          type="text"
          value={phoneNumber}
          onChange={handlePhoneChange}
          className={`mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 ${
            errors.phoneNumber
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:ring-indigo-500"
          }`}
        />
        {errors.phoneNumber && <p className="mt-1 text-sm text-red-500">{errors.phoneNumber}</p>}
      </div>
      <div className="mb-4 flex items-start sm:flex-col md:flex-col">
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={acceptTermsAndCondition}
            onChange={handleTermsChange}
            className="h-4 w-4 cursor-pointer rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          />
          <label htmlFor="terms-conditions" className="ml-2 text-sm text-gray-700 sm:text-base">
            Accept Terms and Conditions
          </label>
        </div>
        {errors.acceptTermsAndCondition && (
          <p className="mt-1 text-sm text-red-500">{errors.acceptTermsAndCondition}</p>
        )}
      </div>

      <div className="mt-6 flex flex-col sm:flex-row sm:justify-between">
        <button
          onClick={onBack}
          className="mb-4 rounded-md bg-gray-200 px-4 py-2 text-gray-500 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 sm:mb-0"
        >
          Back
        </button>
        <div className="flex flex-col sm:flex-row sm:space-x-2">
          <button
            onClick={handleSave}
            className="mb-2 rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:mb-0"
          >
            Save
          </button>
          <button
            onClick={handleSubmit}
            className="rounded-md bg-green-500 px-4 py-2 text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

FormStep3.propTypes = {
  data: PropTypes.shape({
    countryCode: PropTypes.string.isRequired,
    phoneNumber: PropTypes.string.isRequired,
    acceptTermsAndCondition: PropTypes.bool.isRequired,
  }).isRequired,
  onSave: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
};

export default FormStep3;

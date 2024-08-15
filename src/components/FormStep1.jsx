import PropTypes from "prop-types";
import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { validateEmail, validatePassword } from "../utils/validation";
import { showToast } from "./common/ToastNotification";

const FormStep1 = ({ data, onSave, onNext }) => {
  const [emailId, setEmailId] = useState(data.emailId);
  const [password, setPassword] = useState(data.password);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    let tempErrors = {};

    tempErrors.emailId = validateEmail(emailId);
    tempErrors.password = validatePassword(password);

    setErrors(tempErrors);

    return Object.values(tempErrors).every((error) => error === null || error === "");
  };

  const handleSave = () => {
    if (validate()) {
      onSave({ emailId, password });
      showToast("success");
    } else {
      showToast("fieldError");
    }
  };

  const handleNext = () => {
    if (validate()) {
      onSave({ emailId, password });
      onNext();
    }
  };

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleEmailChange = (e) => {
    setEmailId(e.target.value);
    setErrors({ ...errors, emailId: validateEmail(e.target.value) });
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setErrors({ ...errors, password: validatePassword(e.target.value) });
  };

  return (
    <div className="mx-auto max-w-lg rounded-lg bg-white p-6 shadow-md sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl">
      <h2 className="mb-6 text-center text-2xl font-semibold sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl">
        Form 1
      </h2>
      <div className="mb-4">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 sm:text-base md:text-sm lg:text-base"
        >
          Email ID:
        </label>
        <input
          type="text"
          value={emailId}
          onChange={handleEmailChange}
          className={`mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 ${
            errors.emailId
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:ring-indigo-500"
          }`}
        />
        {errors.emailId && <p className="mt-1 text-sm text-red-500">{errors.emailId}</p>}
      </div>
      <div className="relative mb-4">
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700 sm:text-base md:text-sm lg:text-base"
        >
          Password:
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={handlePasswordChange}
            className={`mt-1 block w-full rounded-md border px-3 py-2 pr-10 shadow-sm focus:outline-none focus:ring-2 ${
              errors.password
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-indigo-500"
            }`}
          />
          <button
            type="button"
            onClick={handlePasswordVisibility}
            className={`absolute inset-y-0 right-0 flex items-center px-3 ${
              errors.password
                ? "top-1/2 -translate-y-1/2 transform"
                : "top-1/2 -translate-y-1/2 transform"
            }`}
          >
            {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
          </button>
        </div>
        {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
      </div>
      <div className="mt-6 flex flex-col sm:flex-row sm:justify-between">
        <button
          disabled
          className="mb-4 cursor-not-allowed rounded-md bg-gray-200 px-4 py-2 text-gray-500 sm:mb-0"
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
            onClick={handleNext}
            className="rounded-md bg-green-500 px-4 py-2 text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Save and Next
          </button>
        </div>
      </div>
    </div>
  );
};

FormStep1.propTypes = {
  data: PropTypes.shape({
    emailId: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }).isRequired,
  onSave: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
};

export default FormStep1;

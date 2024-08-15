import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { validateAddress, validateName } from "../utils/validation";
import { showToast } from "./common/ToastNotification";

const FormStep2 = ({ data, onSave, onBack, onNext }) => {
  const [firstName, setFirstName] = useState(data.firstName);
  const [lastName, setLastName] = useState(data.lastName);
  const [address, setAddress] = useState(data.address);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setFirstName(data.firstName);
    setLastName(data.lastName);
    setAddress(data.address);
  }, [data]);

  const validate = () => {
    let tempErrors = {};

    tempErrors.firstName = validateName(firstName);
    tempErrors.lastName = validateName(lastName, false);
    tempErrors.address = validateAddress(address);

    setErrors(tempErrors);
    return Object.values(tempErrors).every((error) => error === null || error === "");
  };

  const handleChange = (setter, validator) => (e) => {
    setter(e.target.value);
    const value = e.target.value;
    setErrors((prevErrors) => ({
      ...prevErrors,
      [e.target.name]: validator(value),
    }));
  };

  const handleSave = () => {
    if (validate()) {
      onSave({ firstName, lastName, address });
      showToast("success");
    } else {
      showToast("fieldError");
    }
  };

  const handleNext = () => {
    if (validate()) {
      onSave({ firstName, lastName, address });
      onNext();
    }
  };

  return (
    <div className="mx-auto max-w-lg rounded-lg bg-white p-6 shadow-md sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl">
      <h2 className="mb-6 text-center text-2xl font-semibold sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl">
        Form 2
      </h2>
      <div className="mb-4">
        <label
          htmlFor="first-name"
          className="block text-sm font-medium text-gray-700 sm:text-base md:text-sm lg:text-base"
        >
          First Name:
        </label>
        <input
          type="text"
          name="firstName"
          value={firstName}
          onChange={handleChange(setFirstName, validateName)}
          className={`mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 ${
            errors.firstName
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:ring-indigo-500"
          }`}
        />
        {errors.firstName && <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>}
      </div>
      <div className="mb-4">
        <label
          htmlFor="last-name"
          className="block text-sm font-medium text-gray-700 sm:text-base md:text-sm lg:text-base"
        >
          Last Name:
        </label>
        <input
          type="text"
          name="lastName"
          value={lastName}
          onChange={handleChange(setLastName, validateName)}
          className={`mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 ${
            errors.lastName
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:ring-indigo-500"
          }`}
        />
        {errors.lastName && <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>}
      </div>
      <div className="mb-4">
        <label
          htmlFor="address"
          className="block text-sm font-medium text-gray-700 sm:text-base md:text-sm lg:text-base"
        >
          Address:
        </label>
        <input
          type="text"
          name="address"
          value={address}
          onChange={handleChange(setAddress, validateAddress)}
          className={`mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 ${
            errors.address
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:ring-indigo-500"
          }`}
        />
        {errors.address && <p className="mt-1 text-sm text-red-500">{errors.address}</p>}
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

FormStep2.propTypes = {
  data: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
  }).isRequired,
  onSave: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
};

export default FormStep2;

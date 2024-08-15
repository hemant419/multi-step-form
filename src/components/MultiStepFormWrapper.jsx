import { useState } from "react";
import FormStep1 from "./FormStep1";
import FormStep2 from "./FormStep2";
import FormStep3 from "./FormStep3";

const MultiStepFormWrapper = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    emailId: "",
    password: "",
    firstName: "",
    lastName: "",
    address: "",
    countryCode: "",
    phoneNumber: "",
    acceptTermsAndCondition: false,
  });

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };
  const handleBack = () => setCurrentStep(currentStep - 1);
  const handleSave = (newData) => {
    setFormData({ ...formData, ...newData });
  };

  return (
    <div>
      <div>
        {currentStep === 1 && <FormStep1 data={formData} onSave={handleSave} onNext={handleNext} />}
        {currentStep === 2 && (
          <FormStep2 data={formData} onSave={handleSave} onBack={handleBack} onNext={handleNext} />
        )}
        {currentStep === 3 && <FormStep3 data={formData} onSave={handleSave} onBack={handleBack} />}
      </div>
    </div>
  );
};

export default MultiStepFormWrapper;

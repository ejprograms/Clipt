
import React, { useState, useEffect } from 'react';

export const FadingInstructions: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const steps = [
    'Paste your YouTube link',
    'Select your time frame',
    'Download your clip'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % steps.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [steps.length]);

  return (
    <div className="h-16 flex items-center justify-center">
      <p className="text-lg font-semibold text-white transition-opacity duration-500">
        {steps[currentStep]}
      </p>
    </div>
  );
};

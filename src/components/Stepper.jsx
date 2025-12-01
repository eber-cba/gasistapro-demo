import React from 'react';

const Stepper = ({ steps }) => {
  if (!steps || steps.length === 0) {
    return null;
  }

  return (
    <div className="stepper-container">
      {steps.map((step, index) => (
        <div key={index} className="stepper-item">
          <div className="stepper-number">{index + 1}</div>
          <div className="stepper-content">{step}</div>
        </div>
      ))}
    </div>
  );
};

export default Stepper;
import React from "react";
import "./CalculationSteps.css";

// Mapeo de tipos de paso a clases de CSS e íconos (ejemplo)
const stepConfig = {
  info: { icon: "ℹ️", className: "info-step" },
  step: { icon: "➡️", className: "step-header" },
  calculation: { icon: "🧮", className: "calc-step" },
  result: { icon: "✅", className: "result-step" },
  error: { icon: "❌", className: "error-step" },
};

const CalculationSteps = ({ steps }) => {
  if (!steps || steps.length === 0) {
    return null;
  }

  return (
    <div className="calculation-steps-container">
      <h4>Guía del Cálculo</h4>
      <div className="steps-timeline">
        {steps.map((step, index) => {
          const config = stepConfig[step.type] || stepConfig.info;
          return (
            <div key={index} className={`step-item ${config.className}`}>
              <span className="step-icon">{config.icon}</span>
              <p className="step-text">{step.text}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalculationSteps;

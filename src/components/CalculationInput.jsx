import React from "react";
import useStore from "../hooks/useStore";
import TramoInput from "./TramoInput"; // Reutilizaremos TramoInput para cada ítem
import "./CalculationInput.css";

const CalculationInput = () => {
  const { tramos, addTramo } = useStore();

  return (
    <div className="calculation-input card">
      <h2>Tramos de la Instalación</h2>
      <div className="tramos-list">
        {tramos.map((tramo) => (
          <TramoInput key={tramo.id} tramo={tramo} />
        ))}
      </div>
      <button onClick={addTramo} className="add-tramo-btn">
        + Agregar Tramo
      </button>
    </div>
  );
};

export default CalculationInput;

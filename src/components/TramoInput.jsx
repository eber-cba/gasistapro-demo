import React from "react";
import useStore from "../hooks/useStore";
import TramoArtifacts from "./TramoArtifacts";
import "./TramoInput.css";

const TramoInput = ({ tramo }) => {
  const { updateTramo, updateAccesoriosManual, removeTramo } = useStore();

  const handleManualAccesoriosChange = (e) => {
    updateAccesoriosManual(tramo.id, e.target.value);
  };

  return (
    <div className="tramo-card">
      <div className="tramo-card-header">
        <input
          type="text"
          value={tramo.name}
          onChange={(e) => updateTramo(tramo.id, "name", e.target.value)}
          className="tramo-title-input"
        />
        <button
          onClick={() => removeTramo(tramo.id)}
          className="delete-tramo-btn"
        >
          ×
        </button>
      </div>

      <div className="tramo-card-body">
        <div className="input-row">
          <label htmlFor={`distancia-${tramo.id}`}>Distancia Real (m)</label>
          <input
            id={`distancia-${tramo.id}`}
            type="text"
            value={tramo.distancia_real}
            onChange={(e) =>
              updateTramo(tramo.id, "distancia_real", e.target.value)
            }
          />
        </div>

        <div className="accesorios-manual-section">
          <label htmlFor={`accesorios-${tramo.id}`}>
            Accesorios (nombre, cantidad, ...)
          </label>
          <textarea
            id={`accesorios-${tramo.id}`}
            value={tramo.accesoriosManualInput}
            onChange={handleManualAccesoriosChange}
            placeholder="Ej: codo 90, 2, te, 1, valvula, 1"
            rows="3"
          />
        </div>

        <TramoArtifacts tramoId={tramo.id} artifacts={tramo.artifacts} />
      </div>
    </div>
  );
};

export default TramoInput;

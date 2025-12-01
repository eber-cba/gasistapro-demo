import React, { useState } from "react";
import useStore from "../hooks/useStore";
import artifactsData from "../data/artifacts.json";
import "./TramoArtifacts.css";

const POWER_FACTOR = 9300;

const TramoArtifacts = ({ tramoId, artifacts }) => {
  const {
    addArtifactToTramo,
    removeArtifactFromTramo,
    updateArtifactPowerInTramo,
  } = useStore();
  const [selectedName, setSelectedName] = useState(artifactsData[0].name);

  const handleAdd = () => {
    const artifactToAdd = artifactsData.find(
      (art) => art.name === selectedName
    );
    if (artifactToAdd) {
      addArtifactToTramo(tramoId, artifactToAdd);
    }
  };

  const getConsumption = (power_kcalh) =>
    (power_kcalh / POWER_FACTOR).toFixed(4);
  const safeArtifacts = Array.isArray(artifacts) ? artifacts : [];

  return (
    <div className="tramo-artifacts-section">
      <label>Artefactos en este tramo</label>
      <div className="artifacts-list">
        {safeArtifacts.map((art) => (
          <div key={art.id} className="artifact-row">
            <span>{art.name}</span>
            {art.isCustom ? (
              <input
                type="number"
                value={art.power_kcalh}
                onChange={(e) =>
                  updateArtifactPowerInTramo(
                    tramoId,
                    art.id,
                    Number(e.target.value)
                  )
                }
                className="power-input"
              />
            ) : (
              <span className="power-display">{art.power_kcalh} kcal/h</span>
            )}
            <span className="consumption-display">
              {getConsumption(art.power_kcalh)} m³/h
            </span>
            <button
              onClick={() => removeArtifactFromTramo(tramoId, art.id)}
              className="remove-btn"
            >
              ×
            </button>
          </div>
        ))}
      </div>
      <div className="artifact-adder">
        <select
          value={selectedName}
          onChange={(e) => setSelectedName(e.target.value)}
        >
          {artifactsData.map((art) => (
            <option key={art.name} value={art.name}>
              {art.name}
            </option>
          ))}
        </select>
        <button onClick={handleAdd}>+ Añadir</button>
      </div>
    </div>
  );
};

export default TramoArtifacts;

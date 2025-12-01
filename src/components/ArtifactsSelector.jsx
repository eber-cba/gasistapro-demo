import React, { useState } from "react";
import useStore from "../hooks/useStore";
import artifactsData from "../data/artifacts.json";
import "./ArtifactsSelector.css";

const ArtifactsSelector = () => {
  const {
    selectedArtifacts,
    addArtifact,
    removeArtifact,
    updateArtifactPower,
    totalConsumption,
  } = useStore();
  const [selectedArtifactName, setSelectedArtifactName] = useState(
    artifactsData[0].name
  );

  const handleAddArtifact = () => {
    const artifactToAdd = artifactsData.find(
      (art) => art.name === selectedArtifactName
    );
    if (artifactToAdd) {
      addArtifact(artifactToAdd);
    }
  };

  const getConsumption = (power_kcalh) => (power_kcalh / 9300).toFixed(4);

  return (
    <div className="artifacts-selector card">
      <h2>Selección de Artefactos</h2>
      <div className="selector-bar">
        <select
          value={selectedArtifactName}
          onChange={(e) => setSelectedArtifactName(e.target.value)}
        >
          {artifactsData.map((art) => (
            <option key={art.name} value={art.name}>
              {art.name}
            </option>
          ))}
        </select>
        <button onClick={handleAddArtifact}>Agregar</button>
      </div>

      <div className="selected-artifacts-list">
        {selectedArtifacts.map((art) => (
          <div key={art.id} className="artifact-item">
            <span>{art.name}</span>
            {art.isCustom ? (
              <input
                type="number"
                value={art.power_kcalh}
                onChange={(e) =>
                  updateArtifactPower(art.id, Number(e.target.value))
                }
                className="power-input"
              />
            ) : (
              <span>{art.power_kcalh} kcal/h</span>
            )}
            <span>
              <strong>{getConsumption(art.power_kcalh)} m³/h</strong>
            </span>
            <button
              onClick={() => removeArtifact(art.id)}
              className="remove-btn"
            >
              ×
            </button>
          </div>
        ))}
      </div>

      <div className="total-consumption">
        <h3>Consumo Total: {totalConsumption.toFixed(4)} m³/h</h3>
        <p className="explanation">
          El consumo total es la suma de los consumos individuales de cada
          artefacto. Cada consumo (m³/h) se calcula dividiendo la potencia
          (kcal/h) por el poder calorífico del gas natural (~9300 kcal/m³).
        </p>
      </div>
    </div>
  );
};

export default ArtifactsSelector;

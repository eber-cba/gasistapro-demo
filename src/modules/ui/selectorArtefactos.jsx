import React, { useState } from "react";
import initialArtifactsData from "../../data/artifacts.json";
import { calcularConsumo } from "../calculos/formulaConsumo";
import "./selectorArtefactos.css";

// Helper para formatear números con coma decimal
const formatNumber = (num) =>
  num.toLocaleString("es-AR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 4,
  });

const SelectorArtefactos = ({ onSelectionChange }) => {
  const [availableArtifacts, setAvailableArtifacts] =
    useState(initialArtifactsData);
  const [selectedArtifacts, setSelectedArtifacts] = useState([]);
  const [customName, setCustomName] = useState("");
  const [customPower, setCustomPower] = useState("");

  const handleAddArtifact = (artifact) => {
    const consumption = calcularConsumo(artifact.power_kcalh);
    const artifactWithDetails = {
      ...artifact,
      instanceId: Date.now(),
      consumo: consumption, // Guardamos el objeto completo de consumo
    };
    const newSelection = [...selectedArtifacts, artifactWithDetails];
    setSelectedArtifacts(newSelection);
    // Para los cálculos, pasamos solo el consumo redondeado
    onSelectionChange(
      newSelection.map((a) => ({ ...a, consumo: a.consumo.rounded }))
    );
  };

  const handleRemoveArtifact = (instanceId) => {
    const newSelection = selectedArtifacts.filter(
      (a) => a.instanceId !== instanceId
    );
    setSelectedArtifacts(newSelection);
    onSelectionChange(
      newSelection.map((a) => ({ ...a, consumo: a.consumo.rounded }))
    );
  };

  const handleAddCustomArtifact = () => {
    if (customName && customPower > 0) {
      const newArtifact = {
        name: customName,
        power_kcalh: parseInt(customPower, 10),
      };
      setAvailableArtifacts([...availableArtifacts, newArtifact]);
      setCustomName("");
      setCustomPower("");
    }
  };

  return (
    <div className="selector-artefactos">
      <h2>Seleccionar Artefactos</h2>
      <div className="artifact-list">
        {availableArtifacts.map((artifact, index) => {
          const consumo = calcularConsumo(artifact.power_kcalh);
          return (
            <div key={index} className="artifact-item">
              <div className="artifact-info">
                <span>{artifact.name}</span>
                <span>
                  {artifact.power_kcalh.toLocaleString("es-AR")} Kcal/h
                </span>
                <span className="consumo-info">
                  Consumo: <b>{consumo.rounded.toLocaleString("es-AR")} m³/h</b>
                  <small> (real: {formatNumber(consumo.original)})</small>
                </span>
              </div>
              <button onClick={() => handleAddArtifact(artifact)}>
                Agregar
              </button>
            </div>
          );
        })}
      </div>

      <div className="custom-artifact-form">
        <h3>Agregar Artefacto Personalizado</h3>
        <input
          type="text"
          placeholder="Nombre del artefacto"
          value={customName}
          onChange={(e) => setCustomName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Kcal/h"
          value={customPower}
          onChange={(e) => setCustomPower(e.target.value)}
        />
        <button onClick={handleAddCustomArtifact}>Añadir a la lista</button>
      </div>

      <div className="selected-artifacts">
        <h3>Artefactos Seleccionados</h3>
        {selectedArtifacts.length > 0 ? (
          <ul>
            {selectedArtifacts.map((artifact) => (
              <li key={artifact.instanceId} className="selected-artifact-item">
                <div className="artifact-info">
                  <span>{artifact.name}</span>
                  <span className="consumo-info">
                    <b>
                      {artifact.consumo.rounded.toLocaleString("es-AR")} m³/h
                    </b>
                    <small>
                      {" "}
                      (real: {formatNumber(artifact.consumo.original)})
                    </small>
                  </span>
                </div>
                <button
                  onClick={() => handleRemoveArtifact(artifact.instanceId)}
                  className="remove-btn"
                >
                  Quitar
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No hay artefactos seleccionados.</p>
        )}
      </div>
    </div>
  );
};

export default SelectorArtefactos;

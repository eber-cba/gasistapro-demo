import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { FaPlus, FaTimes, FaFire } from "react-icons/fa";
import initialArtifactsData from "../../data/artifacts.json";
import { calcularConsumo } from "../calculos/formulaConsumo";

// Helper para formatear números con coma decimal
const formatNumber = (num) =>
  num.toLocaleString("es-AR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 4,
  });

const SelectorArtefactos = ({ selectedArtifacts = [], onAddArtifact, onRemoveArtifact }) => {
  const [availableArtifacts, setAvailableArtifacts] =
    useState(initialArtifactsData);
  const [customName, setCustomName] = useState("");
  const [customPower, setCustomPower] = useState("");

  // Since we now enforce single artifact, get the first one or null
  const selectedArtifact = selectedArtifacts.length > 0 ? selectedArtifacts[0] : null;

  const handleAddArtifact = (artifact) => {
    const consumption = calcularConsumo(artifact.power_kcalh);
    const artifactWithDetails = {
      ...artifact,
      consumo: consumption.rounded,
      originalConsumo: consumption.original,
    };
    
    onAddArtifact(artifactWithDetails);
    
    toast.success(`${artifact.name} seleccionado`, {
      icon: "✅",
      style: {
        borderRadius: "12px",
        background: "#667eea",
        color: "#fff",
      },
    });
  };

  const handleRemoveArtifact = () => {
    if (selectedArtifact) {
      onRemoveArtifact(selectedArtifact.id);
      toast.success("Artefacto eliminado", {
        icon: "🗑️",
        style: {
          borderRadius: "12px",
          background: "#ff6b9d",
          color: "#fff",
        },
      });
    }
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
      toast.success("Artefacto personalizado añadido a la lista", {
        icon: "🎉",
        style: {
          borderRadius: "12px",
          background: "#00f2c3",
          color: "#1a202c",
        },
      });
    }
  };

  return (
    <div className="card" style={{ marginBottom: "var(--spacing-6)" }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h2 style={{ 
          color: "var(--primary-color)", 
          marginBottom: "var(--spacing-4)",
          display: "flex",
          alignItems: "center",
          gap: "var(--spacing-2)",
        }}>
          <FaFire /> Seleccionar Artefacto
        </h2>

        {/* Show selected artifact if exists */}
        {selectedArtifact ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{
              padding: "var(--spacing-4)",
              background: "linear-gradient(135deg, rgba(102, 126, 234, 0.15) 0%, rgba(118, 75, 162, 0.15) 100%)",
              borderRadius: "var(--radius-xl)",
              border: "2px solid var(--primary-color)",
              marginBottom: "var(--spacing-4)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "var(--spacing-3)" }}>
              <div style={{ flex: 1 }}>
                <h3 style={{ 
                  fontSize: "var(--font-size-xl)", 
                  fontWeight: "var(--font-weight-bold)", 
                  color: "var(--text-primary)",
                  marginBottom: "var(--spacing-2)",
                }}>
                  {selectedArtifact.name}
                </h3>
                <div style={{ fontSize: "var(--font-size-base)", color: "var(--text-secondary)", marginBottom: "var(--spacing-2)" }}>
                  Potencia: <strong>{selectedArtifact.power_kcalh?.toLocaleString("es-AR")} Kcal/h</strong>
                </div>
                
                {/* Elegant calculation display */}
                <div style={{
                  padding: "var(--spacing-3)",
                  background: "var(--bg-secondary)",
                  borderRadius: "var(--radius-md)",
                  fontSize: "var(--font-size-sm)",
                  color: "var(--text-muted)",
                  fontFamily: "monospace",
                  marginTop: "var(--spacing-2)",
                }}>
                  <div style={{ marginBottom: "var(--spacing-1)" }}>
                    <span style={{ opacity: 0.7 }}>Cálculo de consumo:</span>
                  </div>
                  <div style={{ color: "var(--text-secondary)" }}>
                    {selectedArtifact.power_kcalh?.toLocaleString("es-AR")} Kcal/h ÷ 9300 = <strong style={{ color: "var(--primary-color)" }}>{selectedArtifact.consumo.toLocaleString("es-AR")} m³/h</strong>
                  </div>
                  {selectedArtifact.originalConsumo && (
                    <div style={{ fontSize: "var(--font-size-xs)", opacity: 0.6, marginTop: "var(--spacing-1)" }}>
                      Valor exacto: {formatNumber(selectedArtifact.originalConsumo)} m³/h
                    </div>
                  )}
                </div>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleRemoveArtifact}
                className="btn-danger btn-small"
                style={{ marginLeft: "var(--spacing-3)" }}
              >
                <FaTimes /> Cambiar
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <>
            {/* Available Artifacts List */}
            <div
              style={{
                maxHeight: "300px",
                overflowY: "auto",
                marginBottom: "var(--spacing-4)",
                padding: "var(--spacing-2)",
                border: "1px solid var(--border-color)",
                borderRadius: "var(--radius-lg)",
              }}
            >
              {availableArtifacts.map((artifact, index) => {
                const consumo = calcularConsumo(artifact.power_kcalh);
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.02, backgroundColor: "var(--bg-secondary)" }}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "var(--spacing-3)",
                      borderBottom: "1px solid var(--border-light)",
                      borderRadius: "var(--radius-md)",
                      transition: "all var(--transition-base)",
                      gap: "var(--spacing-2)",
                      flexWrap: "wrap",
                    }}
                  >
                    <div style={{ flex: "1 1 200px", minWidth: "150px" }}>
                      <div style={{ fontWeight: "var(--font-weight-semibold)", color: "var(--text-primary)", marginBottom: "var(--spacing-1)" }}>
                        {artifact.name}
                      </div>
                      <div style={{ fontSize: "var(--font-size-sm)", color: "var(--text-secondary)" }}>
                        {artifact.power_kcalh.toLocaleString("es-AR")} Kcal/h
                      </div>
                      <div style={{ fontSize: "var(--font-size-sm)", color: "var(--text-muted)" }}>
                        Consumo: <strong style={{ color: "var(--primary-color)" }}>{consumo.rounded.toLocaleString("es-AR")} m³/h</strong>
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleAddArtifact(artifact)}
                      className="btn-primary btn-small"
                      style={{ flexShrink: 0 }}
                    >
                      <FaPlus /> Seleccionar
                    </motion.button>
                  </motion.div>
                );
              })}
            </div>

            {/* Custom Artifact Form */}
            <div
              style={{
                padding: "var(--spacing-4)",
                border: "2px dashed var(--border-color)",
                borderRadius: "var(--radius-lg)",
                background: "var(--bg-secondary)",
              }}
            >
              <h3 style={{ fontSize: "var(--font-size-lg)", marginBottom: "var(--spacing-3)", color: "var(--text-primary)" }}>
                Artefacto Personalizado
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-3)" }}>
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
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAddCustomArtifact}
                  className="btn-success"
                >
                  <FaPlus /> Añadir a la lista
                </motion.button>
              </div>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default SelectorArtefactos;

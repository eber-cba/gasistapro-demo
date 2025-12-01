import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlus, FaTrash, FaRuler, FaArrowRight, FaArrowLeft } from "react-icons/fa";
import toast from "react-hot-toast";
import useStore from "../hooks/useStore";
import StepIndicator from "./StepIndicator";
import SelectorArtefactos from "../modules/ui/selectorArtefactos";
import SelectorAccesorios from "../modules/ui/selectorAccesorios";

const TramoManager = () => {
  const {
    tramos,
    addTramo,
    removeTramo,
    updateTramo,
    addArtifactToTramo,
    removeArtifactFromTramo,
  } = useStore();

  // Track current step for each tramo
  const [tramoSteps, setTramoSteps] = useState({});

  // Initialize step state for new tramos
  useEffect(() => {
    tramos.forEach(tramo => {
      if (!tramoSteps[tramo.id]) {
        setTramoSteps(prev => ({ ...prev, [tramo.id]: 1 }));
      }
    });
  }, [tramos]);

  const handleAccesoriosChange = (tramoId, newAccesorios) => {
    const accessoriesWithIds = newAccesorios.map(a => ({
      id: a.id || Date.now() + Math.random().toString(),
      tipo: a.tipo,
      cantidad: a.cantidad
    }));
    updateTramo(tramoId, "accesorios", accessoriesWithIds);
  };

  // Validation functions
  const isStep1Complete = (tramo) => tramo.artifacts && tramo.artifacts.length > 0;
  const isStep2Complete = (tramo) => tramo.distancia_real && parseFloat(tramo.distancia_real) > 0;
  const isStep3Complete = () => true; // Accessories are optional
  
  const getCompletedSteps = (tramo) => {
    const completed = [];
    if (isStep1Complete(tramo)) completed.push(1);
    if (isStep2Complete(tramo)) completed.push(2);
    if (isStep3Complete(tramo)) completed.push(3);
    return completed;
  };

  const canProceedToStep = (tramo, targetStep) => {
    if (targetStep === 1) return true;
    if (targetStep === 2) return isStep1Complete(tramo);
    if (targetStep === 3) return isStep1Complete(tramo) && isStep2Complete(tramo);
    if (targetStep === 4) return isStep1Complete(tramo) && isStep2Complete(tramo);
    return false;
  };

  const handleNextStep = (tramoId, tramo) => {
    const currentStep = tramoSteps[tramoId] || 1;
    const nextStep = currentStep + 1;

    if (nextStep > 4) return;

    // Validate current step before proceeding
    if (currentStep === 1 && !isStep1Complete(tramo)) {
      toast.error("Por favor, selecciona un artefacto antes de continuar", {
        icon: "⚠️",
        style: { borderRadius: "12px", background: "#ff6b9d", color: "#fff" },
      });
      return;
    }

    if (currentStep === 2 && !isStep2Complete(tramo)) {
      toast.error("Por favor, ingresa una distancia real válida", {
        icon: "⚠️",
        style: { borderRadius: "12px", background: "#ff6b9d", color: "#fff" },
      });
      return;
    }

    setTramoSteps(prev => ({ ...prev, [tramoId]: nextStep }));
  };

  const handlePrevStep = (tramoId) => {
    const currentStep = tramoSteps[tramoId] || 1;
    if (currentStep > 1) {
      setTramoSteps(prev => ({ ...prev, [tramoId]: currentStep - 1 }));
    }
  };

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-8)" }}>
      <AnimatePresence>
        {tramos.map((tramo, index) => {
          const currentStep = tramoSteps[tramo.id] || 1;
          const completedSteps = getCompletedSteps(tramo);

          return (
            <motion.div
              key={tramo.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              style={{
                background: "var(--bg-card)",
                borderRadius: "var(--radius-xl)",
                padding: "var(--spacing-6)",
                boxShadow: "var(--shadow-md)",
                border: "1px solid var(--border-light)",
                position: "relative",
              }}
            >
              {/* Tramo Header */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "var(--spacing-6)",
                  borderBottom: "2px solid var(--border-light)",
                  paddingBottom: "var(--spacing-4)",
                }}
              >
                <h2
                  style={{
                    fontSize: "var(--font-size-2xl)",
                    fontWeight: "var(--font-weight-bold)",
                    color: "var(--primary-color)",
                    margin: 0,
                  }}
                >
                  {tramo.name}
                </h2>
                {tramos.length > 1 && (
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => removeTramo(tramo.id)}
                    className="btn-danger btn-icon"
                    title="Eliminar Tramo"
                    style={{
                      padding: "var(--spacing-2)",
                      borderRadius: "var(--radius-full)",
                    }}
                  >
                    <FaTrash />
                  </motion.button>
                )}
              </div>

              {/* Step Indicator */}
              <StepIndicator currentStep={currentStep} completedSteps={completedSteps} />

              {/* Step Content with smooth transitions */}
              <div style={{ minHeight: "400px", position: "relative", overflow: "hidden" }}>
                <AnimatePresence mode="wait" custom={currentStep}>
                  {currentStep === 1 && (
                    <motion.div
                      key="step1"
                      custom={1}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <SelectorArtefactos
                        selectedArtifacts={tramo.artifacts}
                        onAddArtifact={(artifact) => addArtifactToTramo(tramo.id, artifact)}
                        onRemoveArtifact={(artifactId) => removeArtifactFromTramo(tramo.id, artifactId)}
                      />
                    </motion.div>
                  )}

                  {currentStep === 2 && (
                    <motion.div
                      key="step2"
                      custom={2}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="card" style={{ background: "var(--bg-secondary)" }}>
                        <label
                          htmlFor={`distancia-${tramo.id}`}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "var(--spacing-2)",
                            marginBottom: "var(--spacing-2)",
                            fontWeight: "var(--font-weight-semibold)",
                            color: "var(--text-primary)",
                            fontSize: "var(--font-size-lg)",
                          }}
                        >
                          <FaRuler /> Distancia Real (metros):
                        </label>
                        <input
                          type="number"
                          id={`distancia-${tramo.id}`}
                          value={tramo.distancia_real}
                          onChange={(e) => updateTramo(tramo.id, "distancia_real", e.target.value)}
                          placeholder="Ej: 15.5"
                          step="0.01"
                          min="0"
                          style={{
                            width: "100%",
                            padding: "var(--spacing-3)",
                            fontSize: "var(--font-size-lg)",
                            borderRadius: "var(--radius-md)",
                            border: "2px solid var(--border-color)",
                          }}
                        />
                        <div style={{
                          marginTop: "var(--spacing-3)",
                          padding: "var(--spacing-3)",
                          background: "var(--bg-card)",
                          borderRadius: "var(--radius-md)",
                          fontSize: "var(--font-size-sm)",
                          color: "var(--text-muted)",
                        }}>
                          💡 <strong>Tip:</strong> Ingresa la distancia en metros desde el medidor hasta este punto de consumo.
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {currentStep === 3 && (
                    <motion.div
                      key="step3"
                      custom={3}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <SelectorAccesorios
                        accesorios={tramo.accesorios}
                        onAccesorioChange={(newAccesorios) => handleAccesoriosChange(tramo.id, newAccesorios)}
                      />
                    </motion.div>
                  )}

                  {currentStep === 4 && (
                    <motion.div
                      key="step4"
                      custom={4}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="card" style={{ background: "linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)" }}>
                        <h3 style={{ color: "var(--primary-color)", marginBottom: "var(--spacing-4)" }}>
                          ✅ Resumen del Tramo
                        </h3>
                        <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-3)" }}>
                          <div>
                            <strong>Artefacto:</strong> {tramo.artifacts[0]?.name || "No seleccionado"}
                          </div>
                          <div>
                            <strong>Distancia Real:</strong> {tramo.distancia_real || "0"} m
                          </div>
                          <div>
                            <strong>Accesorios:</strong> {tramo.accesorios?.length || 0} seleccionados
                          </div>
                        </div>
                        <div style={{
                          marginTop: "var(--spacing-4)",
                          padding: "var(--spacing-3)",
                          background: "var(--bg-card)",
                          borderRadius: "var(--radius-md)",
                          fontSize: "var(--font-size-sm)",
                          color: "var(--text-muted)",
                        }}>
                          ✨ Este tramo está listo. Puedes agregar más tramos o proceder al cálculo final.
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Navigation Buttons */}
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "var(--spacing-6)",
                gap: "var(--spacing-3)",
              }}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handlePrevStep(tramo.id)}
                  className="btn-outline"
                  disabled={currentStep === 1}
                  style={{
                    opacity: currentStep === 1 ? 0.5 : 1,
                    cursor: currentStep === 1 ? "not-allowed" : "pointer",
                  }}
                >
                  <FaArrowLeft /> Anterior
                </motion.button>

                {currentStep < 4 && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleNextStep(tramo.id, tramo)}
                    className="btn-primary"
                  >
                    Siguiente <FaArrowRight />
                  </motion.button>
                )}
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>

      {/* Add Tramo Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={addTramo}
        className="btn-secondary"
        style={{
          alignSelf: "center",
          padding: "var(--spacing-4) var(--spacing-8)",
          fontSize: "var(--font-size-lg)",
          display: "flex",
          alignItems: "center",
          gap: "var(--spacing-2)",
          boxShadow: "var(--shadow-lg)",
        }}
      >
        <FaPlus /> Agregar Nuevo Tramo
      </motion.button>
    </div>
  );
};

export default TramoManager;

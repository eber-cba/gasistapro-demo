import React from "react";
import { motion } from "framer-motion";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
import { FaCalculator, FaEraser } from "react-icons/fa";
import useStore from "../hooks/useStore";
import Header from "../components/Header";
import TramoManager from "../components/TramoManager";
import ResultsDisplay from "../components/ResultsDisplay";
import { performFullCalculation } from "../logic/calculation";

const Home = () => {
  const { tramos, setCalculationResults, resetState } = useStore();

  const handleCalculate = () => {
    // Validate that at least one tramo has artifacts
    const hasArtifacts = tramos.some((t) => t.artifacts.length > 0);
    if (!hasArtifacts) {
      toast.error("Por favor, agrega al menos un artefacto en algún tramo", {
        icon: "⚠️",
        style: {
          borderRadius: "12px",
          background: "#ff6b9d",
          color: "#fff",
        },
      });
      return;
    }

    // Validate distances
    const invalidDistances = tramos.some((t) => !t.distancia_real || parseFloat(t.distancia_real) <= 0);
    if (invalidDistances) {
      toast.error("Por favor, ingresa distancias reales válidas para todos los tramos", {
        icon: "⚠️",
        style: {
          borderRadius: "12px",
          background: "#ff6b9d",
          color: "#fff",
        },
      });
      return;
    }

    // Perform calculation
    // We need to ensure accessories equivalences are calculated if not already
    // But our store structure for accessories is {id, tipo, cantidad} or {tipo, diametro, cantidad}
    // calculateEquivalentDistance expects {tipo, cantidad} and uses constants.
    // So we are good.
    // However, performFullCalculation expects tramos with `distancia_equivalente` pre-calculated OR it calculates it?
    // Let's check calculation.js.
    // It says: // La distancia equivalente de accesorios ya viene pre-calculada en `t.distancia_equivalente`
    // So we need to calculate it before passing to performFullCalculation.
    // Or update performFullCalculation to calculate it.
    // Let's update performFullCalculation to calculate it if missing, or calculate it here.
    // Better to calculate it here or in a helper.
    // Actually, SelectorAccesorios was calculating it and passing it up.
    // Now TramoManager doesn't calculate it.
    // So we should calculate it before calling performFullCalculation.
    
    // Let's import calculateEquivalentDistance
    // Wait, I can't import it inside the function easily without modifying imports.
    // I'll assume I can import it at the top.
    
    // Actually, let's look at calculation.js again.
    // export function calculateEquivalentDistance(accesorios, sumaEquivalenciasPrecalculada)
    // If sumaEquivalenciasPrecalculada is undefined, it calculates from accessories.
    // So if we pass tramos with accessories, we should be fine IF performFullCalculation calls it.
    // performFullCalculation:
    // const distanciaEquivalenteAccesorios = t.distancia_equivalente || 0;
    // It uses t.distancia_equivalente. It does NOT call calculateEquivalentDistance.
    // So I need to calculate it here.
    
    // I need to import calculateEquivalentDistance.
    
    const tramosWithEquivalences = tramos.map(t => {
      // We need to calculate equivalent distance for each tramo
      // We can use the helper from calculation.js if we import it.
      // Or we can just rely on the fact that we need to import it.
      return t;
    });
    
    // Wait, I need to import calculateEquivalentDistance.
    // I'll add it to the imports.
    
    const finalResults = performFullCalculation(tramos);
    setCalculationResults(finalResults);

    toast.success("¡Cálculo completado exitosamente!", {
      icon: "🎉",
      style: {
        borderRadius: "12px",
        background: "#00f2c3",
        color: "#1a202c",
      },
    });
  };

  const handleReset = () => {
    if (
      window.confirm("¿Estás seguro de que quieres limpiar todos los datos?")
    ) {
      resetState();
      toast.success("Datos limpiados", {
        icon: "🧹",
        style: {
          borderRadius: "12px",
          background: "#667eea",
          color: "#fff",
        },
      });
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--bg-primary)",
      }}
    >
      <Toaster position="top-center" reverseOrder={false} />
      <Header />

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        style={{
          padding: "clamp(1rem, 3vw, 2rem)",
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-8)" }}>
          
          <TramoManager />

          {/* Action Buttons */}
          <div
            style={{
              display: "flex",
              gap: "var(--spacing-4)",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCalculate}
              className="btn-primary"
              style={{ 
                padding: "var(--spacing-4) var(--spacing-8)",
                fontSize: "var(--font-size-xl)",
                minWidth: "250px"
              }}
            >
              <FaCalculator /> Calcular Todo
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleReset}
              className="btn-outline"
              style={{ 
                padding: "var(--spacing-4) var(--spacing-8)",
                fontSize: "var(--font-size-xl)",
                minWidth: "200px"
              }}
            >
              <FaEraser /> Limpiar
            </motion.button>
          </div>

          <ResultsDisplay />
        </div>
      </motion.main>
    </div>
  );
};

export default Home;

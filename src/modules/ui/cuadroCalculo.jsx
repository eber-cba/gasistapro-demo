import React from "react";
import { motion } from "framer-motion";
import { FaCalculator, FaRuler, FaPlus, FaEquals } from "react-icons/fa";

const CuadroCalculo = ({ distanciaReal, sumaEquivalencias }) => {
  const distanciaTotal = distanciaReal + sumaEquivalencias;

  return (
    <div className="card" style={{ marginBottom: "var(--spacing-6)" }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <h2 style={{ 
          color: "var(--primary-color)", 
          marginBottom: "var(--spacing-4)",
          display: "flex",
          alignItems: "center",
          gap: "var(--spacing-2)",
        }}>
          <FaCalculator /> Cuadro General de Cálculo
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-3)" }}>
          {/* Distancia Real */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "var(--spacing-4)",
              background: "var(--bg-secondary)",
              borderRadius: "var(--radius-lg)",
              border: "1px solid var(--border-color)",
              gap: "var(--spacing-2)",
              flexWrap: "wrap",
            }}
          >
            <span style={{ 
              display: "flex", 
              alignItems: "center", 
              gap: "var(--spacing-2)",
              fontWeight: "var(--font-weight-semibold)",
              color: "var(--text-primary)",
            }}>
              <FaRuler style={{ color: "var(--info-color)" }} />
              DISTANCIA REAL:
            </span>
            <span style={{ 
              fontSize: "var(--font-size-lg)", 
              fontWeight: "var(--font-weight-bold)",
              color: "var(--info-color)",
            }}>
              {distanciaReal.toFixed(2)} m
            </span>
          </motion.div>

          {/* Plus Icon */}
          <div style={{ textAlign: "center", color: "var(--text-muted)" }}>
            <FaPlus size={20} />
          </div>

          {/* Distancia Equivalente */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "var(--spacing-4)",
              background: "var(--bg-secondary)",
              borderRadius: "var(--radius-lg)",
              border: "1px solid var(--border-color)",
              gap: "var(--spacing-2)",
              flexWrap: "wrap",
            }}
          >
            <span style={{ 
              display: "flex", 
              alignItems: "center", 
              gap: "var(--spacing-2)",
              fontWeight: "var(--font-weight-semibold)",
              color: "var(--text-primary)",
            }}>
              <FaRuler style={{ color: "var(--secondary-color)" }} />
              DISTANCIA EQUIV. ACCESORIOS:
            </span>
            <span style={{ 
              fontSize: "var(--font-size-lg)", 
              fontWeight: "var(--font-weight-bold)",
              color: "var(--secondary-color)",
            }}>
              {sumaEquivalencias.toFixed(2)} m
            </span>
          </motion.div>

          {/* Equals Icon */}
          <div style={{ textAlign: "center", color: "var(--text-muted)" }}>
            <FaEquals size={20} />
          </div>

          {/* Distancia Total */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "var(--spacing-5)",
              background: "var(--primary-gradient)",
              borderRadius: "var(--radius-lg)",
              boxShadow: "var(--shadow-lg)",
              gap: "var(--spacing-2)",
              flexWrap: "wrap",
            }}
          >
            <span style={{ 
              display: "flex", 
              alignItems: "center", 
              gap: "var(--spacing-2)",
              fontWeight: "var(--font-weight-bold)",
              color: "white",
              fontSize: "var(--font-size-lg)",
            }}>
              <FaCalculator />
              DISTANCIA TOTAL:
            </span>
            <span style={{ 
              fontSize: "var(--font-size-2xl)", 
              fontWeight: "var(--font-weight-extrabold)",
              color: "white",
              textShadow: "0 2px 4px rgba(0,0,0,0.2)",
            }}>
              {distanciaTotal.toFixed(2)} m
            </span>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default CuadroCalculo;

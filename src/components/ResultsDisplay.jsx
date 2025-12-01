import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCheckCircle, FaChartBar } from "react-icons/fa";
import useStore from "../hooks/useStore";
import ConsumptionChart from "./ConsumptionChart";
import DiameterChart from "./DiameterChart";
import DistanceChart from "./DistanceChart";

const ResultsDisplay = () => {
  const { tramos } = useStore();
  const hasResults = tramos.some((t) => t.diametro_definitivo);

  if (!hasResults) {
    return (
      <div className="card">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{ textAlign: "center", padding: "var(--spacing-8)" }}
        >
          <FaChartBar size={48} style={{ color: "var(--text-muted)", marginBottom: "var(--spacing-4)" }} />
          <h2 style={{ color: "var(--text-secondary)", marginBottom: "var(--spacing-2)" }}>
            Resultados Finales
          </h2>
          <p style={{ color: "var(--text-muted)", fontStyle: "italic" }}>
            La tabla de resultados y el gráfico aparecerán aquí después de calcular.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="card">
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
          <FaCheckCircle /> Tabla de Cálculo Final
        </h2>

        <div style={{ overflowX: "auto", marginBottom: "var(--spacing-6)" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "var(--font-size-sm)",
            }}
          >
            <thead>
              <tr style={{ background: "var(--primary-gradient)", color: "white" }}>
                <th style={{ padding: "var(--spacing-3)", textAlign: "left", borderRadius: "var(--radius-md) 0 0 0", whiteSpace: "nowrap" }}>
                  Tramo
                </th>
                <th style={{ padding: "var(--spacing-3)", textAlign: "center", whiteSpace: "nowrap" }}>
                  Dist. Real
                </th>
                <th style={{ padding: "var(--spacing-3)", textAlign: "center", whiteSpace: "nowrap" }}>
                  Dist. Equiv.
                </th>
                <th style={{ padding: "var(--spacing-3)", textAlign: "center", whiteSpace: "nowrap" }}>
                  Dist. Def.
                </th>
                <th style={{ padding: "var(--spacing-3)", textAlign: "center", whiteSpace: "nowrap" }}>
                  Consumo Acum.
                </th>
                <th style={{ padding: "var(--spacing-3)", textAlign: "center", whiteSpace: "nowrap" }}>
                  ∅ Provisorio
                </th>
                <th style={{ padding: "var(--spacing-3)", textAlign: "center", borderRadius: "0 var(--radius-md) 0 0", whiteSpace: "nowrap" }}>
                  ∅ Definitivo
                </th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {tramos.map((tramo, index) => (
                  <motion.tr
                    key={tramo.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    style={{
                      background: index % 2 === 0 ? "var(--bg-card)" : "var(--bg-secondary)",
                      borderBottom: "1px solid var(--border-light)",
                    }}
                  >
                    <td style={{ padding: "var(--spacing-3)", fontWeight: "var(--font-weight-semibold)" }}>
                      {tramo.name}
                    </td>
                    <td style={{ padding: "var(--spacing-3)", textAlign: "center", color: "var(--text-secondary)" }}>
                      {normalizeNumber(tramo.distancia_real).toFixed(2)} m
                    </td>
                    <td style={{ padding: "var(--spacing-3)", textAlign: "center", color: "var(--text-secondary)" }}>
                      {(tramo.distancia_equivalente || 0).toFixed(2)} m
                    </td>
                    <td style={{ padding: "var(--spacing-3)", textAlign: "center", color: "var(--text-secondary)" }}>
                      {(tramo.distancia_definitiva || 0).toFixed(2)} m
                    </td>
                    <td style={{ padding: "var(--spacing-3)", textAlign: "center", color: "var(--text-secondary)" }}>
                      {(tramo.consumo_acumulado_m3h || 0).toFixed(4)} m³/h
                    </td>
                    <td style={{ padding: "var(--spacing-3)", textAlign: "center", color: "var(--text-secondary)" }}>
                      {tramo.diametro_provisorio || "-"}
                    </td>
                    <td
                      style={{
                        padding: "var(--spacing-3)",
                        textAlign: "center",
                        fontWeight: "var(--font-weight-bold)",
                        fontSize: "var(--font-size-lg)",
                        color: "var(--primary-color)",
                      }}
                    >
                      {tramo.diametro_definitivo || "-"}
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

        <div className="responsive-grid" style={{ display: "grid", gap: "var(--spacing-6)", marginTop: "var(--spacing-8)" }}>
          <div className="card" style={{ padding: "var(--spacing-4)" }}>
            <h3 style={{ 
              color: "var(--text-primary)", 
              marginBottom: "var(--spacing-4)",
              display: "flex",
              alignItems: "center",
              gap: "var(--spacing-2)",
              fontSize: "var(--font-size-lg)"
            }}>
              <FaChartBar /> Comparativa de Diámetros
            </h3>
            <DiameterChart data={tramos} />
          </div>

          <div className="card" style={{ padding: "var(--spacing-4)" }}>
            <h3 style={{ 
              color: "var(--text-primary)", 
              marginBottom: "var(--spacing-4)",
              display: "flex",
              alignItems: "center",
              gap: "var(--spacing-2)",
              fontSize: "var(--font-size-lg)"
            }}>
              <FaChartBar /> Comparativa de Distancias
            </h3>
            <DistanceChart data={tramos} />
          </div>
        </div>

        <div className="card" style={{ padding: "var(--spacing-4)", marginTop: "var(--spacing-6)" }}>
          <h3 style={{ 
            color: "var(--text-primary)", 
            marginBottom: "var(--spacing-4)",
            display: "flex",
            alignItems: "center",
            gap: "var(--spacing-2)",
          }}>
            <FaChartBar /> Desglose de Consumo por Tramo
          </h3>
          <ConsumptionChart tramos={tramos} />
        </div>
      </motion.div>
    </div>
  );
};

// Helper para normalizar números por si acaso
const normalizeNumber = (value) => {
  if (typeof value === "number") return value;
  if (typeof value === "string") {
    const num = parseFloat(value.replace(",", "."));
    return isNaN(num) ? 0 : num;
  }
  return 0;
};

export default ResultsDisplay;

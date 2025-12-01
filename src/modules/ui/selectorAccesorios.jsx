import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaTools } from "react-icons/fa";
import { tablaEquivalencias } from "../accesorios/equivalencias";
import "./SelectorAccesorios.css";

const SelectorAccesorios = ({ accesorios = [], onAccesorioChange }) => {
  const handleAccesorioChange = (tipo, diametro, cantidad) => {
    // Need to store both tipo AND diametro to differentiate same tipo with different diameters
    const existingIndex = accesorios.findIndex(
      (a) => a.tipo === tipo && a.diametro === diametro
    );

    let newAccesorios;
    if (existingIndex >= 0) {
      if (cantidad > 0) {
        // Update existing
        newAccesorios = accesorios.map((a, index) => 
          index === existingIndex ? { ...a, cantidad } : a
        );
      } else {
        // Remove if quantity is 0
        newAccesorios = accesorios.filter((_, index) => index !== existingIndex);
      }
    } else if (cantidad > 0) {
      // Add new - include both tipo and diametro
      newAccesorios = [...accesorios, { tipo, diametro, cantidad }];
    } else {
      // No change needed
      newAccesorios = accesorios;
    }

    onAccesorioChange(newAccesorios);
  };

  return (
    <div className="card" style={{ marginBottom: "var(--spacing-6)" }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <h2 style={{ 
          color: "var(--primary-color)", 
          marginBottom: "var(--spacing-4)",
          display: "flex",
          alignItems: "center",
          gap: "var(--spacing-2)",
        }}>
          <FaTools /> Seleccionar Accesorios
        </h2>

        <div className="accesorios-table-container">
          <table className="accesorios-table">
            <thead>
              <tr style={{ background: "var(--primary-gradient)", color: "white" }}>
                <th style={{ padding: "var(--spacing-3)", textAlign: "left", borderRadius: "var(--radius-md) 0 0 0" }}>
                  ACCESORIO
                </th>
                <th style={{ padding: "var(--spacing-3)", textAlign: "center", width: "80px" }}>
                  CANT.
                </th>
                <th style={{ padding: "var(--spacing-3)", textAlign: "center", width: "60px" }}>
                  ∅
                </th>
                <th style={{ padding: "var(--spacing-3)", textAlign: "center", width: "80px" }}>
                  EQUIV.
                </th>
                <th style={{ padding: "var(--spacing-3)", textAlign: "center", width: "100px", borderRadius: "0 var(--radius-md) 0 0" }}>
                  SUBTOTAL
                </th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(tablaEquivalencias).map((diametro, dIndex) =>
                Object.keys(tablaEquivalencias[diametro]).map((tipo, tIndex) => {
                  const equivalencia = tablaEquivalencias[diametro][tipo];
                  // Search by both tipo AND diametro to differentiate same tipo with different diameters
                  const cantidad = accesorios.find(
                    (a) => a.tipo === tipo && a.diametro === diametro
                  )?.cantidad || 0;
                  const subtotal = (cantidad * equivalencia).toFixed(2);
                  const isHighlighted = cantidad > 0;

                  return (
                    <motion.tr
                      key={`${diametro}-${tipo}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: (dIndex * 10 + tIndex) * 0.02 }}
                      className={isHighlighted ? "highlighted-row" : ""}
                      style={{
                        background: isHighlighted
                          ? "linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)"
                          : dIndex % 2 === 0
                          ? "var(--bg-card)"
                          : "var(--bg-secondary)",
                        // Border bottom is handled by CSS class for mobile, but we can keep it here for desktop override if needed
                        // or rely on CSS.
                      }}
                    >
                      <td data-label="Accesorio">
                        {tipo.replace(/_/g, " ")}
                      </td>
                      <td data-label="Cantidad" style={{ textAlign: "center" }}>
                        <input
                          type="number"
                          min="0"
                          value={cantidad === 0 ? '' : cantidad}
                          onChange={(e) =>
                            handleAccesorioChange(
                              tipo,
                              diametro,
                              e.target.value === '' ? 0 : parseInt(e.target.value, 10)
                            )
                          }
                          placeholder="0"
                          style={{
                            width: "60px",
                            padding: "var(--spacing-2)",
                            textAlign: "center",
                            border: isHighlighted ? "2px solid var(--primary-color)" : "1px solid var(--border-color)",
                            borderRadius: "var(--radius-md)",
                            fontSize: "var(--font-size-sm)",
                            background: "white",
                            color: "#000",
                            cursor: "text",
                          }}
                        />
                      </td>
                      <td data-label="Diámetro" style={{ textAlign: "center", color: "var(--text-secondary)" }}>
                        {diametro}
                      </td>
                      <td data-label="Equivalencia" style={{ textAlign: "center", color: "var(--text-secondary)" }}>
                        {equivalencia}
                      </td>
                      <td
                        data-label="Subtotal"
                        style={{
                          textAlign: "center",
                          fontWeight: "var(--font-weight-semibold)",
                          color: isHighlighted ? "var(--primary-color)" : "var(--text-muted)",
                        }}
                      >
                        {subtotal}
                      </td>
                    </motion.tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default SelectorAccesorios;

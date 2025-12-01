import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaTools } from "react-icons/fa";
import { tablaEquivalencias } from "../accesorios/equivalencias";
import { tablaEquivalencias } from "../accesorios/equivalencias";

const SelectorAccesorios = ({ accesorios = [], onAccesorioChange }) => {
  const handleAccesorioChange = (tipo, diametro, cantidad) => {
    // Create a new array to avoid mutating props directly if they were passed by reference
    // although in React props should be immutable.
    // We will build the new list based on the current props.
    
    const existingIndex = accesorios.findIndex(
      (a) => a.tipo === tipo && a.diametro === diametro
    );

    let newAccesorios;
    if (existingIndex >= 0) {
      if (cantidad > 0) {
        newAccesorios = accesorios.map((a, index) => 
          index === existingIndex ? { ...a, cantidad } : a
        );
      } else {
        newAccesorios = accesorios.filter((_, index) => index !== existingIndex);
      }
    } else if (cantidad > 0) {
      newAccesorios = [...accesorios, { tipo, diametro, cantidad }];
    } else {
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

        <div style={{ overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "var(--font-size-sm)",
            }}
          >
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
                  const cantidad =
                    accesorios.find(
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
                      style={{
                        background: isHighlighted
                          ? "linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)"
                          : dIndex % 2 === 0
                          ? "var(--bg-card)"
                          : "var(--bg-secondary)",
                        borderBottom: "1px solid var(--border-light)",
                        transition: "all var(--transition-base)",
                      }}
                    >
                      <td style={{ padding: "var(--spacing-3)", fontWeight: isHighlighted ? "var(--font-weight-semibold)" : "normal" }}>
                        {tipo.replace("_", " ")}
                      </td>
                      <td style={{ padding: "var(--spacing-2)", textAlign: "center" }}>
                        <input
                          type="number"
                          min="0"
                          value={cantidad}
                          onChange={(e) =>
                            handleAccesorioChange(
                              tipo,
                              diametro,
                              parseInt(e.target.value, 10) || 0
                            )
                          }
                          style={{
                            width: "60px",
                            padding: "var(--spacing-2)",
                            textAlign: "center",
                            border: isHighlighted ? "2px solid var(--primary-color)" : "1px solid var(--border-color)",
                            borderRadius: "var(--radius-md)",
                            fontSize: "var(--font-size-sm)",
                          }}
                        />
                      </td>
                      <td style={{ padding: "var(--spacing-3)", textAlign: "center", color: "var(--text-secondary)" }}>
                        {diametro}
                      </td>
                      <td style={{ padding: "var(--spacing-3)", textAlign: "center", color: "var(--text-secondary)" }}>
                        {equivalencia}
                      </td>
                      <td
                        style={{
                          padding: "var(--spacing-3)",
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

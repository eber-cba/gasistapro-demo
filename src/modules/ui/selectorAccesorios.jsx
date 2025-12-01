import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTools, FaSearch, FaPlus, FaMinus } from "react-icons/fa";
import { tablaEquivalencias, nombresAccesorios } from "../accesorios/equivalencias";
import "./SelectorAccesorios.css";

const SelectorAccesorios = ({ accesorios = [], onAccesorioChange }) => {
  const [selectedDiameter, setSelectedDiameter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Get all available diameters
  const diameters = Object.keys(tablaEquivalencias);

  const handleAccesorioChange = (tipo, diametro, cantidad) => {
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

  const incrementar = (tipo, diametro) => {
    const current = accesorios.find(
      (a) => a.tipo === tipo && a.diametro === diametro
    )?.cantidad || 0;
    handleAccesorioChange(tipo, diametro, current + 1);
  };

  const decrementar = (tipo, diametro) => {
    const current = accesorios.find(
      (a) => a.tipo === tipo && a.diametro === diametro
    )?.cantidad || 0;
    if (current > 0) {
      handleAccesorioChange(tipo, diametro, current - 1);
    }
  };

  const getCantidad = (tipo, diametro) => {
    return accesorios.find(
      (a) => a.tipo === tipo && a.diametro === diametro
    )?.cantidad || 0;
  };

  // Filter accessories by diameter and search term
  const filteredData = useMemo(() => {
    let data = {};

    diameters.forEach(diametro => {
      if (selectedDiameter !== "all" && diametro !== selectedDiameter) {
        return;
      }

      Object.keys(tablaEquivalencias[diametro]).forEach(tipo => {
        const nombre = nombresAccesorios[tipo] || tipo.replace(/_/g, " ");
        
        if (searchTerm && !nombre.toLowerCase().includes(searchTerm.toLowerCase())) {
          return;
        }

        if (!data[diametro]) {
          data[diametro] = [];
        }

        data[diametro].push({
          tipo,
          nombre,
          equivalencia: tablaEquivalencias[diametro][tipo],
          cantidad: getCantidad(tipo, diametro)
        });
      });
    });

    return data;
  }, [selectedDiameter, searchTerm, accesorios]);

  // Calculate total equivalent distance
  const totalEquivalente = accesorios.reduce((sum, acc) => {
    const equiv = tablaEquivalencias[acc.diametro]?.[acc.tipo] || 0;
    return sum + (equiv * acc.cantidad);
  }, 0);

  return (
    <div className="card accesorios-selector-nuevo">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <h2 className="accesorios-title">
          <FaTools /> Seleccionar Accesorios
        </h2>

        {/* Filters Section */}
        <div className="accesorios-filters">
          {/* Diameter Filter */}
          <div className="filter-group">
            <label>Filtrar por Diámetro:</label>
            <select 
              value={selectedDiameter} 
              onChange={(e) => setSelectedDiameter(e.target.value)}
              className="diameter-select"
            >
              <option value="all">Todos los diámetros</option>
              {diameters.map(d => (
                <option key={d} value={d}>{d}"</option>
              ))}
            </select>
          </div>

          {/* Search */}
          <div className="filter-group">
            <label>Buscar accesorio:</label>
            <div className="search-input-container">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Ej: codo, te, llave..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
          </div>
        </div>

        {/* Accessories Grid */}
        <div className="accesorios-grid-container">
          {Object.keys(filteredData).length === 0 ? (
            <div className="no-results">
              <p>No se encontraron accesorios con ese criterio</p>
            </div>
          ) : (
            Object.entries(filteredData).map(([diametro, items]) => (
              <div key={diametro} className="diameter-section">
                <h3 className="diameter-header">
                  Diámetro {diametro}"
                </h3>
                
                <div className="accesorios-grid">
                  <AnimatePresence>
                    {items.map(item => {
                      const isSelected = item.cantidad > 0;
                      
                      return (
                        <motion.div
                          key={`${diametro}-${item.tipo}`}
                          layout
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          className={`accesorio-card ${isSelected ? 'selected' : ''}`}
                        >
                          <div className="accesorio-info">
                            <h4 className="accesorio-nombre">{item.nombre}</h4>
                            <div className="accesorio-details">
                              <span className="equiv-label">Equiv:</span>
                              <span className="equiv-value">{item.equivalencia}m</span>
                            </div>
                          </div>

                          <div className="accesorio-controls">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => decrementar(item.tipo, diametro)}
                              className="btn-control btn-minus"
                              disabled={item.cantidad === 0}
                            >
                              <FaMinus />
                            </motion.button>

                            <div className="cantidad-display">
                              {item.cantidad}
                            </div>

                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => incrementar(item.tipo, diametro)}
                              className="btn-control btn-plus"
                            >
                              <FaPlus />
                            </motion.button>
                          </div>

                          {isSelected && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="subtotal-info"
                            >
                              Subtotal: {(item.cantidad * item.equivalencia).toFixed(2)}m
                            </motion.div>
                          )}
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Summary */}
        {accesorios.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="accesorios-summary"
          >
            <div className="summary-row">
              <span className="summary-label">Total de accesorios seleccionados:</span>
              <span className="summary-value">{accesorios.length}</span>
            </div>
            <div className="summary-row total-row">
              <span className="summary-label">Distancia Equivalente Total:</span>
              <span className="summary-value total-value">{totalEquivalente.toFixed(2)} m</span>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default SelectorAccesorios;

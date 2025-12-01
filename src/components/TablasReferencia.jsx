import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaTable, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import tablaNumero3 from '../data/tablaNumero3.json';
import tablaNumero18 from '../data/tablaNumero18.json';
import './TablasReferencia.css';

const TablasReferencia = ({ highlightedValues = null }) => {
  const [tabla3Expanded, setTabla3Expanded] = useState(false);
  const [tabla18Expanded, setTabla18Expanded] = useState(false);

  // Helper para verificar si un valor debe estar resaltado
  const isHighlighted = (tabla, row, col, value) => {
    if (!highlightedValues) return false;
    
    if (tabla === 3) {
      // Resaltar valores usados en Tabla 3
      return highlightedValues.tabla3?.distancia === row?.distancia &&
             highlightedValues.tabla3?.consumo === col;
    } else if (tabla === 18) {
      // Resaltar accesorios usados en Tabla 18
      return highlightedValues.tabla18?.some(acc => 
        acc.nombre === row?.nombre && 
        acc.diametro === col &&
        acc.cantidad === value?.cant
      );
    }
    return false;
  };

  return (
    <div className="tablas-referencia-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="tablas-header"
      >
        <FaTable className="tablas-icon" />
        <h2>Tablas de Referencia Técnica</h2>
        <p className="tablas-subtitle">
          Consulta las tablas utilizadas en los cálculos de instalación de gas
        </p>
      </motion.div>

      {/* Tabla N°3 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="tabla-card"
      >
        <div 
          className="tabla-card-header"
          onClick={() => setTabla3Expanded(!tabla3Expanded)}
        >
          <div className="tabla-title-section">
            <h3>Tabla N° 3 - Gas Natural</h3>
            <p className="tabla-description">
              Caudal en litros de gas por hora para cañerías de diferentes diámetros y longitudes
            </p>
          </div>
          <button className="expand-button">
            {tabla3Expanded ? <FaChevronUp /> : <FaChevronDown />}
          </button>
        </div>

        {tabla3Expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="tabla-content"
          >
            <div className="tabla-scroll-container">
              <table className="tabla-3">
                <thead>
                  <tr>
                    <th rowSpan="2">Longitud (m)</th>
                    <th colSpan="9">Diámetros de la Cañería en Milímetros</th>
                  </tr>
                  <tr>
                    <th>13 (1/2")</th>
                    <th>19 (3/4")</th>
                    <th>25 (1")</th>
                    <th>32 (1 1/4")</th>
                    <th>38 (1 1/2")</th>
                    <th>51 (2")</th>
                    <th>63 (2 1/2")</th>
                    <th>76 (3")</th>
                    <th>101 (4")</th>
                  </tr>
                </thead>
                <tbody>
                  {tablaNumero3.map((row, idx) => (
                    <tr key={idx}>
                      <td className="distancia-col">{row.distancia}</td>
                      <td className={isHighlighted(3, row, '13') ? 'highlighted' : ''}>{row['13']}</td>
                      <td className={isHighlighted(3, row, '19') ? 'highlighted' : ''}>{row['19']}</td>
                      <td className={isHighlighted(3, row, '25') ? 'highlighted' : ''}>{row['25']}</td>
                      <td className={isHighlighted(3, row, '32') ? 'highlighted' : ''}>{row['32']}</td>
                      <td className={isHighlighted(3, row, '38') ? 'highlighted' : ''}>{row['38']}</td>
                      <td className={isHighlighted(3, row, '51') ? 'highlighted' : ''}>{row['51']}</td>
                      <td className={isHighlighted(3, row, '63') ? 'highlighted' : ''}>{row['63']}</td>
                      <td className={isHighlighted(3, row, '76') ? 'highlighted' : ''}>{row['76']}</td>
                      <td className={isHighlighted(3, row, '101') ? 'highlighted' : ''}>{row['101']}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="tabla-note">
              <strong>Nota:</strong> Densidad 0,65. Caída de presión h = 10 mm.
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Tabla N°18 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="tabla-card"
      >
        <div 
          className="tabla-card-header"
          onClick={() => setTabla18Expanded(!tabla18Expanded)}
        >
          <div className="tabla-title-section">
            <h3>Tabla N° 18 - Gas Natural</h3>
            <p className="tabla-description">
              Longitudes equivalentes de accesorios a rosca, en diámetros
            </p>
          </div>
          <button className="expand-button">
            {tabla18Expanded ? <FaChevronUp /> : <FaChevronDown />}
          </button>
        </div>

        {tabla18Expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="tabla-content"
          >
            {/* Accesorios Simples */}
            <div className="accesorios-simples">
              <h4>Factores de Diámetro (d)</h4>
              <div className="accesorios-grid">
                {Object.entries(tablaNumero18.accesorios_simples).map(([nombre, valor]) => (
                  <div key={nombre} className="accesorio-simple-item">
                    <span className="accesorio-nombre">{nombre}</span>
                    <span className="accesorio-valor">{valor}</span>
                  </div>
                ))}
              </div>
              <div className="tabla-note">
                <strong>Ejemplo:</strong> {tablaNumero18.nota}
              </div>
            </div>

            {/* Tabla Detallada */}
            <div className="tabla-scroll-container">
              <h4>Complemento para Tabla N° 18</h4>
              {tablaNumero18.tabla_detallada.accesorios.map((accesorio, accIdx) => (
                <div key={accIdx} className="accesorio-section">
                  <h5>
                    {accesorio.nombre} 
                    <span className="factor-badge">Factor: {accesorio.factor_d}d</span>
                  </h5>
                  <table className="tabla-18">
                    <thead>
                      <tr>
                        <th>CANT.</th>
                        {tablaNumero18.tabla_detallada.diametros.map((diam, idx) => (
                          <th key={idx}>{diam}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {accesorio.valores.map((fila, filaIdx) => (
                        <tr key={filaIdx}>
                          <td className="cantidad-col">{fila.cant}</td>
                          <td className={isHighlighted(18, accesorio, '1/2', fila) ? 'highlighted' : ''}>
                            {fila['1/2']}
                          </td>
                          <td className={isHighlighted(18, accesorio, '3/4', fila) ? 'highlighted' : ''}>
                            {fila['3/4']}
                          </td>
                          <td className={isHighlighted(18, accesorio, '1', fila) ? 'highlighted' : ''}>
                            {fila['1']}
                          </td>
                          <td className={isHighlighted(18, accesorio, '1_1/4', fila) ? 'highlighted' : ''}>
                            {fila['1_1/4']}
                          </td>
                          <td className={isHighlighted(18, accesorio, '1_1/2', fila) ? 'highlighted' : ''}>
                            {fila['1_1/2']}
                          </td>
                          <td className={isHighlighted(18, accesorio, '2', fila) ? 'highlighted' : ''}>
                            {fila['2']}
                          </td>
                          <td className={isHighlighted(18, accesorio, '2_1/2', fila) ? 'highlighted' : ''}>
                            {fila['2_1/2']}
                          </td>
                          <td className={isHighlighted(18, accesorio, '3', fila) ? 'highlighted' : ''}>
                            {fila['3']}
                          </td>
                          <td className={isHighlighted(18, accesorio, '4', fila) ? 'highlighted' : ''}>
                            {fila['4']}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default TablasReferencia;

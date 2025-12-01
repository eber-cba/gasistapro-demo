import React from 'react';
import { motion } from 'framer-motion';
import { FaCalculator, FaTable, FaArrowRight } from 'react-icons/fa';
import './CalculationBreakdown.css';

const CalculationBreakdown = ({ tramo, calculationSteps = null }) => {
  if (!tramo) return null;

  // Extraer información del tramo
  const { 
    name, 
    distancia_real, 
    accesorios = [], 
    artifacts = [],
    distancia_equivalente,
    distancia_definitiva,
    consumo_propio_m3h,
    diametro_provisorio,
    diametro_definitivo
  } = tramo;

  const artefacto = artifacts[0];

  return (
    <div className="calculation-breakdown">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="breakdown-header"
      >
        <FaCalculator className="breakdown-icon" />
        <h3>Desglose de Cálculos - {name}</h3>
      </motion.div>

      {/* Paso 1: Artefacto */}
      {artefacto && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="breakdown-step"
        >
          <div className="step-number">1</div>
          <div className="step-content">
            <h4>Artefacto Seleccionado</h4>
            <div className="calculation-row">
              <span className="label">Tipo:</span>
              <span className="value">{artefacto.name}</span>
            </div>
            <div className="calculation-row">
              <span className="label">Potencia:</span>
              <span className="value">{artefacto.power_kcalh?.toLocaleString('es-AR')} Kcal/h</span>
            </div>
            <div className="calculation-row">
              <span className="label">Consumo:</span>
              <span className="value highlighted">{artefacto.consumo?.toFixed(3)} m³/h</span>
            </div>
            <div className="formula">
              <code>Consumo = Potencia / 9300</code>
            </div>
          </div>
        </motion.div>
      )}

      {/* Paso 2: Accesorios y Tabla 18 */}
      {accesorios.length > 0 && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="breakdown-step"
        >
          <div className="step-number">2</div>
          <div className="step-content">
            <h4>
              <FaTable /> Cálculo con Tabla N° 18
            </h4>
            <p className="step-description">
              Longitudes equivalentes de accesorios
            </p>
            
            {accesorios.map((acc, idx) => {
              const equivalencia = getEquivalencia(acc);
              const subtotal = equivalencia * acc.cantidad;
              
              return (
                <div key={idx} className="accessory-calc">
                  <div className="accessory-name">
                    {acc.tipo.replace(/_/g, ' ')} ({acc.diametro || 'N/A'})
                  </div>
                  <div className="calculation-steps">
                    <div className="calc-step">
                      <span className="table-ref">
                        <FaTable /> Tabla 18 → {acc.tipo} @ {acc.diametro}: <strong>{equivalencia}m</strong>
                      </span>
                    </div>
                    <div className="calc-step">
                      <span className="operation">
                        {equivalencia}m × {acc.cantidad} unidades = <strong className="highlighted">{subtotal.toFixed(2)}m</strong>
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}

            <div className="total-equivalencia">
              <span className="label">Distancia Equivalente Total:</span>
              <span className="value highlighted">{distancia_equivalente?.toFixed(2) || 0} m</span>
            </div>
          </div>
        </motion.div>
      )}

      {/* Paso 3: Distancia Definitiva */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        className="breakdown-step"
      >
        <div className="step-number">3</div>
        <div className="step-content">
          <h4>Distancia Definitiva</h4>
          <div className="formula-box">
            <div className="formula-line">
              <span>Distancia Real:</span>
              <span className="value">{distancia_real} m</span>
            </div>
            <div className="formula-operator">+</div>
            <div className="formula-line">
              <span>Distancia Equivalente:</span>
              <span className="value">{distancia_equivalente?.toFixed(2) || 0} m</span>
            </div>
            <div className="formula-divider"></div>
            <div className="formula-line result">
              <span>Distancia Definitiva:</span>
              <span className="value highlighted">{distancia_definitiva?.toFixed(2) || 0} m</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Paso 4: Tabla 3 - Selección de Diámetro */}
      {diametro_definitivo && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="breakdown-step"
        >
          <div className="step-number">4</div>
          <div className="step-content">
            <h4>
              <FaTable /> Selección de Diámetro con Tabla N° 3
            </h4>
            <p className="step-description">
              Caudal en litros de gas por hora para cañerías
            </p>
            
            <div className="table-lookup">
              <div className="lookup-param">
                <span className="param-label">Distancia Definitiva:</span>
                <span className="param-value">{distancia_definitiva?.toFixed(2)} m</span>
              </div>
              <div className="lookup-param">
                <span className="param-label">Consumo:</span>
                <span className="param-value">{consumo_propio_m3h?.toFixed(3)} m³/h</span>
              </div>
              
              <div className="table-intersection">
                <FaArrowRight />
                <span className="intersection-text">
                  Buscando en Tabla N°3 la intersección de distancia y consumo
                </span>
              </div>

              <div className="diameter-result">
                <div className="result-row">
                  <span className="label">Diámetro Provisorio:</span>
                  <span className="value">{diametro_provisorio || 'N/A'}</span>
                </div>
                <div className="result-row">
                  <span className="label">Diámetro Definitivo:</span>
                  <span className="value highlighted-large">{diametro_definitivo || 'N/A'}</span>
                </div>
              </div>
            </div>

            {calculationSteps && calculationSteps.length > 0 && (
              <div className="detailed-steps">
                <h5>Pasos detallados:</h5>
                {calculationSteps.map((step, idx) => (
                  <div key={idx} className="detail-step">
                    <span className="step-bullet">•</span>
                    <span className="step-text">{step}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
};

// Helper function to get equivalencia from tabla 18
const getEquivalencia = (accesorio) => {
  // Esta es una función helper que debería importar tablaEquivalencias
  // Por ahora retorna un valor por defecto
  const tablaEquivalencias = {
    "3/4": {
      codo_90: 0.57,
      tee: 1.14,
      llave_paso: 0.2,
      reduccion: 0.3,
      union: 0.1,
    },
    "1/2": {
      codo_90: 0.39,
      tee: 0.78,
      llave_paso: 1.3,
      reduccion: 0.25,
      union: 0.08,
    },
    1: {
      codo_90: 0.76,
      tee: 1.52,
      llave_paso: 0.25,
      reduccion: 0.35,
      union: 0.12,
    },
    "3/8": {
      codo_90: 0.3,
      tee: 0.6,
      llave_paso: 1.1,
      reduccion: 0.2,
      union: 0.06,
    },
  };

  if (accesorio.diametro && tablaEquivalencias[accesorio.diametro]) {
    return tablaEquivalencias[accesorio.diametro][accesorio.tipo] || 0;
  }
  
  return 0;
};

export default CalculationBreakdown;

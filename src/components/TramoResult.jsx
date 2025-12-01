import React from 'react';
import Stepper from './Stepper';

const TramoResult = ({ tramo }) => {
  if (!tramo.distancia_definitiva && !tramo.consumo_m3h) {
    return null; // Don't show results until there's input
  }

  const isCalculated = tramo.diametro_provisorio && tramo.diametro_definitivo;

  return (
    <div className="tramo-result-card">
      <h4>Tramo: {tramo.tramo || 'N/A'}</h4>

      <p><strong>Distancias</strong></p>
      <ul>
        <li>Distancia Real: {tramo.distancia_real.toFixed(2)} m</li>
        <li>Distancia Equivalente: {tramo.distancia_equivalente.toFixed(2)} m</li>
        <li>Distancia Definitiva: {tramo.distancia_definitiva.toFixed(2)} m</li>
      </ul>

      <p><strong>Consumo</strong></p>
      <ul>
        <li>Consumo total: {tramo.consumo_m3h.toFixed(2)} m³/h</li>
      </ul>

      {isCalculated ? (
        <>
          <p><strong>Selección de Diámetros (Tabla Nº3)</strong></p>
          <ul>
            <li>Ø Provisorio: {tramo.diametro_provisorio}</li>
            <li>Ø Definitivo: {tramo.diametro_definitivo}</li>
          </ul>
        </>
      ) : (
        <p style={{color: 'orange'}}>Esperando datos válidos para el cálculo de diámetros.</p>
      )}

      {tramo.calculationSteps && tramo.calculationSteps.length > 0 && (
        <>
          <h5>Pasos del Cálculo para este Tramo:</h5>
          <Stepper steps={tramo.calculationSteps} />
        </>
      )}
    </div>
  );
};

export default TramoResult;
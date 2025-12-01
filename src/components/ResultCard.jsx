import React from "react";
import useStore from "../hooks/useStore";

const ResultCard = () => {
  const { calculatedResults, history } = useStore();

  if (!calculatedResults || calculatedResults.length === 0) {
    return (
      <div className="result-card-container card">
        <p>Realiza un cálculo para ver los resultados.</p>
      </div>
    );
  }

  return (
    <div className="result-card-container">
      {calculatedResults.map((tramoResult, index) => (
        <div key={tramoResult.id || index} className="card tramo-result-card">
          <h2>Resultados para {tramoResult.tramo}</h2>
          <p>
            <strong>Distancia Real:</strong>{" "}
            {tramoResult.distancia_real.toFixed(2)} m
          </p>
          <p>
            <strong>Diámetro Cañería:</strong> {tramoResult.diametro_cana}
          </p>
          {tramoResult.accesorios && tramoResult.accesorios.length > 0 && (
            <div>
              <strong>Accesorios:</strong>
              <ul>
                {tramoResult.accesorios.map((acc, idx) => (
                  <li key={acc.id || idx}>
                    {acc.accesorio} (x{acc.cantidad})
                  </li>
                ))}
              </ul>
            </div>
          )}
          <p>
            <strong>Distancia Equivalente (accesorios):</strong>{" "}
            {tramoResult.distancia_equivalente.toFixed(2)} m
          </p>
          <p>
            <strong>Longitud Total Corregida:</strong>{" "}
            {tramoResult.longitud_total_corregida.toFixed(2)} m
          </p>
          <p>
            <strong>Caudal Disponible:</strong>{" "}
            {tramoResult.caudal_disponible.toFixed(3)} L/h
          </p>

          <div className="explanation-panel">
            <h3>Explicación Detallada:</h3>
            {tramoResult.explanation_steps &&
              tramoResult.explanation_steps.map((step, stepIdx) => (
                <p key={stepIdx} className="explanation-step">
                  {step}
                </p>
              ))}
          </div>
        </div>
      ))}

      {history.length > 0 && (
        <div className="history-section card">
          <h2>Cálculos Recientes</h2>
          {history.map((histItem, histIndex) => (
            <div key={histIndex} className="history-item">
              <h4>Cálculo #{history.length - histIndex}</h4>
              {histItem &&
                histItem.results &&
                histItem.results.map((tramoInHistory, tramoHistIdx) => (
                  <p key={tramoHistIdx}>
                    Tramo {tramoInHistory.tramo}:{" "}
                    {tramoInHistory.caudal_disponible.toFixed(3)} L/h
                  </p>
                ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ResultCard;

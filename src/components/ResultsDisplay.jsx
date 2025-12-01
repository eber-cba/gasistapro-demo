import React from "react";
import useStore from "../hooks/useStore";
import ConsumptionChart from "./ConsumptionChart"; // Importar el gráfico
import "./ResultsDisplay.css";

const ResultsDisplay = () => {
  const { tramos } = useStore();
  const hasResults = tramos.some((t) => t.diametro_definitivo);

  if (!hasResults) {
    return (
      <div className="results-display-card">
        <h2>Resultados Finales</h2>
        <p className="placeholder-text">
          La tabla de resultados y el gráfico aparecerán aquí.
        </p>
      </div>
    );
  }

  return (
    <div className="results-display-card">
      <h2>Tabla de Cálculo Final</h2>
      <div className="results-table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Tramo</th>
              <th>Dist. Real</th>
              <th>Dist. Equiv.</th>
              <th>Dist. Def.</th>
              <th>Consumo Acum.</th>
              <th>Ø Provisorio</th>
              <th>Ø Definitivo</th>
            </tr>
          </thead>
          <tbody>
            {tramos.map((tramo) => (
              <tr key={tramo.id}>
                <td>{tramo.name}</td>
                <td>{normalizeNumber(tramo.distancia_real).toFixed(2)} m</td>
                <td>{(tramo.distancia_equivalente || 0).toFixed(2)} m</td>
                <td>{(tramo.distancia_definitiva || 0).toFixed(2)} m</td>
                <td>{(tramo.consumo_acumulado_m3h || 0).toFixed(4)} m³/h</td>
                <td>{tramo.diametro_provisorio || "-"}</td>
                <td className="final-diameter-value">
                  {tramo.diametro_definitivo || "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="chart-container">
        <h3>Desglose de Consumo por Tramo</h3>
        <ConsumptionChart tramos={tramos} />
      </div>
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

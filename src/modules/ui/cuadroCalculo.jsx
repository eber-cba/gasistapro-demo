import React from "react";
import "./cuadroCalculo.css";

const CuadroCalculo = ({ distanciaReal, sumaEquivalencias }) => {
  const distanciaTotal = distanciaReal + sumaEquivalencias;

  return (
    <div className="cuadro-calculo">
      <h2>Cuadro General de Cálculo</h2>
      <div className="calculo-item">
        <span>DISTANCIA REAL:</span>
        <span>{distanciaReal.toFixed(2)} m</span>
      </div>
      <div className="calculo-item">
        <span>DISTANCIA EQUIV. ACCESORIOS:</span>
        <span>{sumaEquivalencias.toFixed(2)} m</span>
      </div>
      <div className="calculo-item total">
        <span>DISTANCIA TOTAL:</span>
        <span>{distanciaTotal.toFixed(2)} m</span>
      </div>
    </div>
  );
};

export default CuadroCalculo;

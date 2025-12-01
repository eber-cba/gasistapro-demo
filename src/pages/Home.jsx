import React, { useState } from "react";
import useStore from "../hooks/useStore";
import Header from "../components/Header";
import SelectorArtefactos from "../modules/ui/selectorArtefactos";
import SelectorAccesorios from "../modules/ui/selectorAccesorios";
import CuadroCalculo from "../modules/ui/cuadroCalculo";
import ResultsDisplay from "../components/ResultsDisplay"; // Mantendremos este por ahora
import { performFullCalculation } from "../logic/calculation";

import "./Home.css";

const Home = () => {
  const { tramos, setCalculationResults, resetState } = useStore();
  const [selectedArtifacts, setSelectedArtifacts] = useState([]);
  const [sumaEquivalencias, setSumaEquivalencias] = useState(0);
  const [distanciaReal, setDistanciaReal] = useState(0);
  const [distanciaRealStr, setDistanciaRealStr] = useState(""); // Estado para el string del input

  const handleCalculate = () => {
    // 1. Construir un "tramo único" a partir del estado actual
    const tramoUnico = [
      {
        id: "tramo-unico",
        name: "Tramo 1 (Más Lejano)",
        distancia_real: distanciaReal,
        artifacts: selectedArtifacts,
        accesorios: [], // Los accesorios ya están calculados en sumaEquivalencias
        distancia_equivalente: sumaEquivalencias, // Pasar la suma precalculada
      },
    ];

    // 2. Ejecutar el cálculo completo
    const finalResults = performFullCalculation(tramoUnico);

    // 3. Actualizar el estado con los resultados
    setCalculationResults(finalResults);
  };

  const handleReset = () => {
    if (
      window.confirm("¿Estás seguro de que quieres limpiar todos los datos?")
    ) {
      resetState();
      setSelectedArtifacts([]);
      setSumaEquivalencias(0);
      setDistanciaReal(0);
      setDistanciaRealStr("");
    }
  };

  return (
    <div className="home-container">
      <Header />
      <main className="main-grid">
        <div className="input-column">
          {/* Componentes nuevos */}
          <SelectorArtefactos onSelectionChange={setSelectedArtifacts} />
          <SelectorAccesorios onEquivalenciaChange={setSumaEquivalencias} />

          <div className="distancia-real-input">
            <label htmlFor="distanciaReal">Distancia Real (m):</label>
            <input
              type="text"
              inputMode="decimal"
              id="distanciaReal"
              value={distanciaRealStr}
              onChange={(e) => {
                const userInput = e.target.value;
                setDistanciaRealStr(userInput); // Actualiza lo que ve el usuario

                const sanitizedValue = userInput.replace(",", ".");
                if (!isNaN(sanitizedValue) && sanitizedValue.trim() !== "") {
                  setDistanciaReal(parseFloat(sanitizedValue));
                } else {
                  setDistanciaReal(0);
                }
              }}
              placeholder="Ej: 19,35"
            />
          </div>

          <CuadroCalculo
            distanciaReal={distanciaReal}
            sumaEquivalencias={sumaEquivalencias}
          />
        </div>
        <div className="results-column">
          <div className="action-buttons">
            <button onClick={handleCalculate} className="calculate-btn">
              Calcular Medida
            </button>
            <button onClick={handleReset} className="reset-btn">
              Limpiar Todo
            </button>
          </div>
          <ResultsDisplay /> {/* Esto se deberá refactorizar o reemplazar */}
        </div>
      </main>
    </div>
  );
};

export default Home;

import React, { useState } from 'react';
import Header from '../components/Header';
import InputForm from '../components/InputForm';
import ResultCard from '../components/ResultCard';
import ChartResult from '../components/ChartResult';
import PipePreview from '../components/PipePreview';
import CanvasPlan from '../components/CanvasPlan';

const Home = () => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="container">
      <Header />
      <div className="card">
        <h3>Para tu papá (breve explicación)</h3>
        <p>
          1. Ingresás la potencia total (kcal/h) de los artefactos.
          <br />
          2. Indicás la longitud del tramo (m).
          <br />
          3. Seleccionás el diámetro de caño que pensás usar.
          <br />
          La app te dice si ese caño soporta la potencia y te recomienda otro diámetro si no.
          Además podés dibujar un plano del recorrido y guardar la imagen.
        </p>
      </div>

      <div className="card">
        <InputForm />
        <ResultCard />
      </div>

      <div className="card">
        <button onClick={() => setShowDetails(!showDetails)}>
          {showDetails ? 'Ocultar' : 'Mostrar'} Detalles Gráficos y Plano
        </button>
        {showDetails && (
          <div>
            <ChartResult />
            <PipePreview />
            <CanvasPlan />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;

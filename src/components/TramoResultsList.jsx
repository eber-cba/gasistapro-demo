import React from 'react';
import useStore from '../hooks/useStore';
import TramoResult from './TramoResult';

const TramoResultsList = () => {
  const { tramos } = useStore();

  if (tramos.length === 0) {
    return null;
  }

  return (
    <div className="card">
      <h3>Resultados por Tramo</h3>
      <p className="input-clarification">
        Aquí se muestran los resultados calculados para cada tramo de la instalación.
      </p>
      {tramos.map((tramo) => (
        <TramoResult key={tramo.id} tramo={tramo} />
      ))}
    </div>
  );
};

export default TramoResultsList;
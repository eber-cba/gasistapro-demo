import React from 'react';
import useStore from '../hooks/useStore';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const ResultCard = () => {
  const { resultadoActual, potenciaTotal } = useStore();

  if (!resultadoActual) {
    return null;
  }

  const { aprobado, potencia_max, material_recomendado, mensaje, diametro_recomendado } = resultadoActual;

  return (
    <div style={{ color: aprobado ? 'green' : 'red' }}>
      <h3>Resultado</h3>
      {aprobado ? <FaCheckCircle /> : <FaTimesCircle />}
      <p>Diámetro elegido: {useStore.getState().diametroSeleccionado}"</p>
      <p>Potencia total: {potenciaTotal} kcal/h</p>
      <p>Potencia máxima para el tramo: {potencia_max.toFixed(2)} kcal/h</p>
      <p>Material recomendado: {material_recomendado}</p>
      <p>{mensaje}</p>
    </div>
  );
};

export default ResultCard;

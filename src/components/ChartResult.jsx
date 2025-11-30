import React from 'react';
import useStore from '../hooks/useStore';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ChartResult = () => {
  const { resultadoActual, potenciaTotal } = useStore();

  if (!resultadoActual) {
    return null;
  }

  const { potencia_max, aprobado } = resultadoActual;

  const data = [
    {
      name: 'Potencia',
      'Potencia Total': potenciaTotal,
      'Potencia Máxima': potencia_max,
    },
  ];

  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Potencia Total" fill={aprobado ? 'var(--success-color)' : 'var(--danger-color)'} />
          <Bar dataKey="Potencia Máxima" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartResult;

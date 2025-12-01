import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import useStore from '../hooks/useStore';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ChartResult = () => {
  const { calculatedResults } = useStore();

  if (!calculatedResults || calculatedResults.length === 0) {
    return (
      <div className="chart-result-container card">
        <p>Realiza un cálculo para ver el gráfico de caudales.</p>
      </div>
    );
  }

  const data = {
    labels: calculatedResults.map((tramo) => tramo.tramo),
    datasets: [
      {
        label: 'Caudal Disponible (L/h)',
        data: calculatedResults.map((tramo) => tramo.caudal_disponible),
        backgroundColor: 'rgba(54, 162, 235, 0.6)', // Blue color for caudal
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allow chart to take full container width/height
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Caudal Disponible por Tramo',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Caudal (L/h)',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Tramo',
        },
      },
    },
  };

  return (
    <div className="chart-result-container card">
      <h2>Gráfico de Caudales</h2>
      <div style={{ height: '300px' }}> {/* Fixed height for chart container */}
        <Bar data={data} options={options} />
      </div>
      {/* Optionally display total caudal or other summaries */}
    </div>
  );
};

export default ChartResult;
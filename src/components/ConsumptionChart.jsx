import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const ConsumptionChart = ({ tramos }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext("2d");
    chartInstance.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: tramos.map((t) => t.name),
        datasets: [
          {
            label: "Consumo Propio (m³/h)",
            data: tramos.map((t) => t.consumo_propio_m3h),
            backgroundColor: "rgba(0, 123, 255, 0.6)",
            borderColor: "rgba(0, 123, 255, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }, [tramos]);

  return <canvas ref={chartRef} />;
};

export default ConsumptionChart;

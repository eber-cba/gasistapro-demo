import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

const DiameterChart = ({ data }) => {
  // Transform data for the chart
  // We need to map diameter strings (e.g., '1/2"') to numbers for visualization if we want scale,
  // but for categorical comparison, we can just map them to arbitrary values or just use them as labels.
  // However, bar charts need numerical values for height.
  // Let's map diameters to numerical values: 1/2" -> 1, 3/4" -> 2, 1" -> 3, etc.
  
  const diameterToValue = (d) => {
    if (!d) return 0;
    if (d.includes('1/2')) return 1;
    if (d.includes('3/4')) return 2;
    if (d.includes('1"')) return 3;
    if (d.includes('1 1/4')) return 4;
    if (d.includes('1 1/2')) return 5;
    return 0;
  };

  const valueToDiameter = (v) => {
    if (v === 1) return '1/2"';
    if (v === 2) return '3/4"';
    if (v === 3) return '1"';
    if (v === 4) return '1 1/4"';
    if (v === 5) return '1 1/2"';
    return '';
  };

  const chartData = data.map(t => ({
    name: t.name.replace('Tramo ', 'T'),
    Provisorio: diameterToValue(t.diametro_provisorio),
    Definitivo: diameterToValue(t.diametro_definitivo),
    diametroProvisorioLabel: t.diametro_provisorio,
    diametroDefinitivoLabel: t.diametro_definitivo,
  }));

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{ background: 'var(--bg-card)', padding: '10px', border: '1px solid var(--border-color)', borderRadius: '8px' }}>
          <p style={{ fontWeight: 'bold' }}>{label}</p>
          <p style={{ color: '#8884d8' }}>Provisorio: {payload[0].payload.diametroProvisorioLabel}</p>
          <p style={{ color: '#82ca9d' }}>Definitivo: {payload[1].payload.diametroDefinitivoLabel}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <BarChart
          data={chartData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border-light)" />
          <XAxis dataKey="name" stroke="var(--text-secondary)" />
          <YAxis hide />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar dataKey="Provisorio" fill="#8884d8" radius={[4, 4, 0, 0]}>
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill="url(#colorProv)" />
            ))}
          </Bar>
          <Bar dataKey="Definitivo" fill="#82ca9d" radius={[4, 4, 0, 0]}>
             {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill="url(#colorDef)" />
            ))}
          </Bar>
          <defs>
            <linearGradient id="colorProv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorDef" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
            </linearGradient>
          </defs>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DiameterChart;

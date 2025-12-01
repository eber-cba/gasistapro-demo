import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

const DistanceChart = ({ data }) => {
  const chartData = data.map(t => ({
    name: t.name.replace('Tramo ', 'T'),
    Real: parseFloat(t.distancia_real),
    Equivalente: parseFloat(t.distancia_equivalente),
    Definitiva: parseFloat(t.distancia_definitiva),
  }));

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
          <YAxis stroke="var(--text-secondary)" />
          <Tooltip 
            contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '8px' }}
            itemStyle={{ color: 'var(--text-primary)' }}
          />
          <Legend />
          <Bar dataKey="Real" fill="#8884d8" name="Dist. Real (m)">
             {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill="url(#colorReal)" />
            ))}
          </Bar>
          <Bar dataKey="Equivalente" fill="#82ca9d" name="Dist. Equiv. (m)">
             {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill="url(#colorEquiv)" />
            ))}
          </Bar>
          <Bar dataKey="Definitiva" fill="#ffc658" name="Dist. Def. (m)">
             {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill="url(#colorDef)" />
            ))}
          </Bar>
          <defs>
            <linearGradient id="colorReal" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#667eea" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#667eea" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorEquiv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#764ba2" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#764ba2" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorDef" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#00f2c3" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#00f2c3" stopOpacity={0}/>
            </linearGradient>
          </defs>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DistanceChart;

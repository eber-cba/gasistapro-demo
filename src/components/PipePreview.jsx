import React from 'react';
import useStore from '../hooks/useStore';

const PipePreview = () => {
  const { diametroSeleccionado } = useStore();

  const diameterMap = {
    '3/4': 10,
    '1': 20,
    '1¼': 30,
  };

  const width = diameterMap[diametroSeleccionado] || 10;

  return (
    <div>
      <h4>Vista Previa del Caño</h4>
      <svg width="100" height={width + 20}>
        <rect width="100" height={width} y="10" style={{ fill: 'grey' }} />
        <text x="50" y={width / 2 + 15} textAnchor="middle" fill="white">
          {diametroSeleccionado}"
        </text>
      </svg>
    </div>
  );
};

export default PipePreview;

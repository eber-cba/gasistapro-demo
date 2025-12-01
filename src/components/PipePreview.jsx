import React from 'react';
import useStore from '../hooks/useStore';

// Mappings for visual pipe width based on diameter (in inches)
const diameterVisualMapping = {
  "1/2\"": 20,
  "3/4\"": 25,
  "1\"": 30,
  "1 1/4\"": 35,
  "1 1/2\"": 40,
  "2\"": 45,
  "2 1/2\"": 50,
  "3\"": 55,
  "4\"": 60,
  // Corresponding keys for 13, 19, 25, etc. are internal to data
};

// Simple material-to-color mapping (for demonstration, as material isn't explicitly calculated yet)
const materialColors = {
  'default': '#808080', // Gray
  'steel': '#A9A9A9',
  'copper': '#B87333',
  'plastic': '#5DADE2',
};

const PipePreview = () => {
  const { tramos } = useStore(); // Get current tramo inputs to show selected diameter
  const { calculatedResults } = useStore(); // Get results for potential material info

  // For simplicity, let's show the diameter of the first tramo input by default
  // or the diameter of the last calculated tramo if results are present.
  const selectedDiameterInput = tramos.length > 0 ? tramos[0].diametro_definitivo : null;
  const diameterToDisplay = selectedDiameterInput; // Currently no material info from calculation

  const pipeWidth = diameterToDisplay ? diameterVisualMapping[diameterToDisplay] || 20 : 20;
  const pipeColor = materialColors['default']; // Default color as material isn't in current results

  if (!diameterToDisplay) {
    return (
      <div className="pipe-preview-container card">
        <p>Selecciona un diámetro para ver la previsualización de la tubería.</p>
      </div>
    );
  }

  return (
    <div className="pipe-preview-container card">
      <h2>Previsualización de Tubería</h2>
      <svg width="100%" height="100" viewBox="0 0 200 100">
        {/* Background for context */}
        <rect x="0" y="0" width="200" height="100" fill="#f0f0f0" />

        {/* Pipe */}
        <rect
          x={(200 - pipeWidth) / 2}
          y={(100 - pipeWidth) / 2}
          width={pipeWidth}
          height={pipeWidth}
          rx={pipeWidth / 2} // Make it circular
          fill={pipeColor}
          stroke="#333"
          strokeWidth="2"
        />

        {/* Diameter Label */}
        <text
          x="100"
          y="50"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="white"
          fontSize="14"
          fontWeight="bold"
        >
          {diameterToDisplay}
        </text>

        {/* Material Label (optional) */}
        <text
          x="100"
          y="75"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="#333"
          fontSize="10"
        >
          Material: (no determinado)
        </text>
      </svg>
      <p>Diámetro seleccionado (primer tramo): <strong>{diameterToDisplay}</strong></p>
    </div>
  );
};

export default PipePreview;
import React from 'react';
import tablaCanos from '../data/tablaCanos.json';

const TechnicalTable = () => {
  return (
    <div>
      <h4>Tabla Técnica de Cañerías (tablaCanos.json)</h4>
      <p className="input-clarification">
        Esta tabla contiene los datos técnicos de potencias máximas permitidas para diferentes diámetros y longitudes de cañerías, según normativas vigentes. Es la base para el cálculo de aprobación de instalaciones.
      </p>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid #ccc' }}>
            <th style={{ padding: '8px', textAlign: 'left' }}>Diámetro</th>
            <th style={{ padding: '8px', textAlign: 'left' }}>Longitud (m)</th>
            <th style={{ padding: '8px', textAlign: 'left' }}>Potencia Máx (kcal/h)</th>
            <th style={{ padding: '8px', textAlign: 'left' }}>Material Recomendado</th>
            <th style={{ padding: '8px', textAlign: 'left' }}>Uso Provisorio Máx</th>
          </tr>
        </thead>
        <tbody>
          {tablaCanos.map((diametroData, index) => (
            <React.Fragment key={index}>
              {diametroData.longitudes.map((longitudData, subIndex) => (
                <tr key={`${index}-${subIndex}`} style={{ borderBottom: '1px dotted #eee' }}>
                  {subIndex === 0 && (
                    <td rowSpan={diametroData.longitudes.length} style={{ padding: '8px', borderRight: '1px solid #ccc' }}>
                      {diametroData.diametro}"
                    </td>
                  )}
                  <td style={{ padding: '8px' }}>{longitudData.metros}</td>
                  <td style={{ padding: '8px' }}>{longitudData.potencia_max}</td>
                  {subIndex === 0 && (
                    <td rowSpan={diametroData.longitudes.length} style={{ padding: '8px', borderRight: '1px solid #ccc' }}>
                      {diametroData.material_recomendado}
                    </td>
                  )}
                   {subIndex === 0 && (
                    <td rowSpan={diametroData.longitudes.length} style={{ padding: '8px' }}>
                      {diametroData.uso_provisorio_max ? 'Sí' : 'No'}
                    </td>
                  )}
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TechnicalTable;
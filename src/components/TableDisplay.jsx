import React from 'react';
import './TableDisplay.css'; // Assuming specific CSS for table styling

const TableDisplay = ({ title, description, columns, data, highlightColumn, highlightRow }) => {
  if (!data || data.length === 0) {
    return (
      <div className="table-display card">
        <h3>{title}</h3>
        <p>{description}</p>
        <p>No hay datos disponibles para esta tabla.</p>
      </div>
    );
  }

  return (
    <div className="table-display card">
      <h3>{title}</h3>
      <p className="table-description">{description}</p>
      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              {columns.map((col, index) => (
                <th key={index} className={highlightColumn === col ? 'highlight-col' : ''}>
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex} className={highlightRow === row.longitud_m || highlightRow === row.accesorio ? 'highlight-row' : ''}>
                {columns.map((col, colIndex) => {
                  let cellValue = '';
                  let cellKey = col;
                  if (col === "Longitud (m)") {
                    cellValue = row.longitud_m;
                  } else if (col === "accesorio") { // For Tabla 18
                    cellValue = row.accesorio;
                  } else if (col === "cant") { // For Tabla 18
                    cellValue = row.cant;
                  } else {
                    // For diameter columns, map column names to data keys (e.g., "13 1/2"" -> "13")
                    const dataKey = col.split(' ')[0];
                    cellValue = row[dataKey] || row.valores?.[dataKey] || '';
                  }
                  return (
                    <td key={colIndex} className={highlightColumn === col ? 'highlight-col' : ''}>
                      <span className="tooltip-container">
                        {cellValue}
                        {/* Add tooltip functionality here if needed */}
                      </span>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableDisplay;

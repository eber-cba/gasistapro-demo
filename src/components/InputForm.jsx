import React, { useState } from 'react';
import useStore from '../hooks/useStore';
import { v4 as uuidv4 } from 'uuid';

const InputForm = () => {
  const {
    tramos,
    addTramo,
    updateTramo,
    removeTramo,
    calculateAllTramos,
    uniqueAccessoryNames,
    pipeDiameters,
    addAccesorio,
    updateAccesorio,
    removeAccesorio,
  } = useStore();

  const [newAccesorioType, setNewAccesorioType] = useState(uniqueAccessoryNames[0] || '');
  const [newAccesorioQuantity, setNewAccesorioQuantity] = useState(1);
  const [selectedTramoForAccesorio, setSelectedTramoForAccesorio] = useState(tramos[0]?.id || '');

  // Update selectedTramoForAccesorio when tramos change
  React.useEffect(() => {
    if (tramos.length > 0 && !selectedTramoForAccesorio) {
      setSelectedTramoForAccesorio(tramos[0].id);
    } else if (tramos.length === 0) {
      setSelectedTramoForAccesorio('');
    }
  }, [tramos, selectedTramoForAccesorio]);


  const handleTramoInputChange = (id, field, value) => {
    // Basic validation for numeric inputs
    if (field === 'distancia_real') {
      // Allow empty string or numbers with comma/period
      if (value === '' || /^-?\d*([,\.]\d*)?$/.test(value)) {
        updateTramo(id, field, value);
      }
    } else {
      updateTramo(id, field, value);
    }
  };

  const handleAccesorioAdd = (tramoId) => {
    if (newAccesorioType && newAccesorioQuantity > 0) {
      addAccesorio(tramoId, newAccesorioType, newAccesorioQuantity);
      setNewAccesorioQuantity(1); // Reset quantity
    }
  };

  const handleCalculate = (e) => {
    e.preventDefault();
    calculateAllTramos();
  };

  return (
    <div className="input-form-container">
      <form onSubmit={handleCalculate}>
        {tramos.map((tramo, tramoIndex) => (
          <div key={tramo.id} className="tramo-input-group card">
            <h3>Tramo {tramoIndex + 1}: {tramo.tramo}</h3>
            <div className="form-field">
              <label htmlFor={`tramo-name-${tramo.id}`}>Nombre del Tramo:</label>
              <input
                id={`tramo-name-${tramo.id}`}
                type="text"
                value={tramo.tramo}
                onChange={(e) => handleTramoInputChange(tramo.id, 'tramo', e.target.value)}
                placeholder="Ej: Cocina - T1"
              />
            </div>
            <div className="form-field">
              <label htmlFor={`distancia-real-${tramo.id}`}>Distancia Real (m):</label>
              <input
                id={`distancia-real-${tramo.id}`}
                type="text"
                value={tramo.distancia_real}
                onChange={(e) => handleTramoInputChange(tramo.id, 'distancia_real', e.target.value)}
                placeholder="Ej: 22,10"
              />
            </div>
            <div className="form-field">
              <label htmlFor={`diametro-cana-${tramo.id}`}>Diámetro Cañería:</label>
              <select
                id={`diametro-cana-${tramo.id}`}
                value={tramo.diametro_cana}
                onChange={(e) => handleTramoInputChange(tramo.id, 'diametro_cana', e.target.value)}
              >
                {pipeDiameters.map((diameter, idx) => (
                  <option key={idx} value={diameter}>{diameter}</option>
                ))}
              </select>
            </div>

            <h4>Accesorios del Tramo:</h4>
            {tramo.accesorios.map((acc, accIndex) => (
              <div key={acc.id} className="accesorio-item">
                <span>{acc.accesorio} - Cant: {acc.cantidad}</span>
                <button type="button" onClick={() => removeAccesorio(tramo.id, acc.id)} className="button-danger small-button">X</button>
              </div>
            ))}

            <div className="add-accesorio-section">
              <select value={newAccesorioType} onChange={(e) => setNewAccesorioType(e.target.value)}>
                {uniqueAccessoryNames.map((name, idx) => (
                  <option key={idx} value={name}>{name}</option>
                ))}
              </select>
              <input
                type="number"
                min="1"
                value={newAccesorioQuantity}
                onChange={(e) => setNewAccesorioQuantity(parseInt(e.target.value) || 1)}
              />
              <button type="button" onClick={() => handleAccesorioAdd(tramo.id)} className="button-secondary">
                Add Accesorio
              </button>
            </div>

            {tramos.length > 1 && (
              <button
                type="button"
                onClick={() => removeTramo(tramo.id)}
                className="button-danger remove-tramo-button"
              >
                Eliminar Tramo
              </button>
            )}
          </div>
        ))}
        <div className="form-actions">
          <button type="button" onClick={addTramo} className="button-secondary add-tramo-button">
            Añadir Tramo
          </button>
          <button type="submit" className="button-primary calculate-button">
            Calcular Todo
          </button>
        </div>
      </form>
    </div>
  );
};

export default InputForm;
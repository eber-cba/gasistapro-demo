import React from 'react';
import useStore from '../hooks/useStore';
import TramoInput from './TramoInput';
import { FaTrashAlt } from 'react-icons/fa';

const TramoList = () => {
  const { tramos, addTramo, removeTramo, resetTramos } = useStore();

  return (
    <div className="card">
      <h3>Definición de Tramos</h3>
      <p className="input-clarification">
        Agrega y configura cada tramo de la instalación de gas. La distancia definitiva y los diámetros
        provisorio/definitivo se calcularán automáticamente.
      </p>
      
      <button onClick={addTramo} className="primary">Agregar Tramo</button>
      <button onClick={resetTramos} className="danger">Limpiar Todos los Tramos</button>

      {tramos.map((tramo) => (
        <div key={tramo.id} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '15px', margin: '15px 0', position: 'relative' }}>
          <TramoInput tramo={tramo} />
          <button
            onClick={() => removeTramo(tramo.id)}
            style={{ position: 'absolute', top: '10px', right: '10px', background: 'none', border: 'none', color: 'red', cursor: 'pointer', padding: '5px', margin: 0 }}
            title="Eliminar Tramo"
          >
            <FaTrashAlt />
          </button>
        </div>
      ))}

      {tramos.length === 0 && (
        <p className="input-clarification">No hay tramos configurados. Agrega uno para empezar.</p>
      )}
    </div>
  );
};

export default TramoList;
import React from 'react';
import useStore from '../hooks/useStore';
import { evaluarCañeria } from '../logic/calcularCañeria';
import tabla from '../data/tablaCanos.json';

const InputForm = () => {
  const {
    potenciaTotal,
    setPotenciaTotal,
    longitud,
    setLongitud,
    diametroSeleccionado,
    setDiametroSeleccionado,
    setResultadoActual,
  } = useStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    const resultado = evaluarCañeria(tabla, Number(potenciaTotal), Number(longitud), diametroSeleccionado);
    setResultadoActual(resultado);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="potencia">Potencia total (kcal/h)</label>
        <input
          type="number"
          id="potencia"
          value={potenciaTotal}
          onChange={(e) => setPotenciaTotal(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="longitud">Longitud (m)</label>
        <input
          type="number"
          id="longitud"
          value={longitud}
          onChange={(e) => setLongitud(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="diametro">Diámetro</label>
        <select
          id="diametro"
          value={diametroSeleccionado}
          onChange={(e) => setDiametroSeleccionado(e.target.value)}
        >
          {tabla.map((d) => (
            <option key={d.diametro} value={d.diametro}>
              {d.diametro}"
            </option>
          ))}
        </select>
      </div>
      <button type="submit">Calcular</button>
    </form>
  );
};

export default InputForm;

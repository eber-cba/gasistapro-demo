import React, { useState } from "react";
import { tablaEquivalencias } from "../accesorios/equivalencias";
import { calcularSumaEquivalencias } from "../calculos/distanciaEquivalente";
import "./selectorAccesorios.css";

const SelectorAccesorios = ({ onEquivalenciaChange }) => {
  const [accesorios, setAccesorios] = useState([]);

  const handleAccesorioChange = (tipo, diametro, cantidad) => {
    const newAccesorios = [...accesorios];
    const existing = newAccesorios.find(
      (a) => a.tipo === tipo && a.diametro === diametro
    );

    if (existing) {
      existing.cantidad = cantidad;
    } else {
      newAccesorios.push({ tipo, diametro, cantidad });
    }

    const filteredAccesorios = newAccesorios.filter((a) => a.cantidad > 0);
    setAccesorios(filteredAccesorios);

    const suma = calcularSumaEquivalencias(filteredAccesorios);
    onEquivalenciaChange(suma);
  };

  return (
    <div className="selector-accesorios">
      <h2>Seleccionar Accesorios</h2>
      <table>
        <thead>
          <tr>
            <th>ACCESORIO</th>
            <th>CANT.</th>
            <th>∅</th>
            <th>EQUIV.</th>
            <th>SUBTOTAL</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(tablaEquivalencias).map((diametro) =>
            Object.keys(tablaEquivalencias[diametro]).map((tipo) => {
              const equivalencia = tablaEquivalencias[diametro][tipo];
              const cantidad =
                accesorios.find(
                  (a) => a.tipo === tipo && a.diametro === diametro
                )?.cantidad || 0;
              const subtotal = (cantidad * equivalencia).toFixed(2);

              return (
                <tr key={`${diametro}-${tipo}`}>
                  <td>{tipo.replace("_", " ")}</td>
                  <td>
                    <input
                      type="number"
                      min="0"
                      value={cantidad}
                      onChange={(e) =>
                        handleAccesorioChange(
                          tipo,
                          diametro,
                          parseInt(e.target.value, 10)
                        )
                      }
                    />
                  </td>
                  <td>{diametro}</td>
                  <td>{equivalencia}</td>
                  <td>{subtotal}</td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SelectorAccesorios;

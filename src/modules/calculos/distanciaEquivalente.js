import { tablaEquivalencias } from "../accesorios/equivalencias";

/**
 * Calcula la distancia equivalente total sumando la distancia real
 * y la suma de las equivalencias de los accesorios seleccionados.
 *
 * @param {number} distanciaReal La distancia real de la tubería.
 * @param {Array<Object>} accesoriosSeleccionados Un array de objetos, donde cada objeto
 *   representa un accesorio seleccionado y tiene las propiedades:
 *   - tipo {string} (ej. "codo_90", "tee")
 *   - diametro {string} (ej. "3/4", "1/2")
 *   - cantidad {number}
 * @returns {number} La distancia equivalente total.
 */
export function calcularDistanciaEquivalente(
  distanciaReal,
  accesoriosSeleccionados
) {
  if (
    typeof distanciaReal !== "number" ||
    !Array.isArray(accesoriosSeleccionados)
  ) {
    return 0;
  }

  const sumaEquivalencias = accesoriosSeleccionados.reduce(
    (total, accesorio) => {
      const { tipo, diametro, cantidad } = accesorio;
      const equivalencia = tablaEquivalencias[diametro]?.[tipo] || 0;
      return total + cantidad * equivalencia;
    },
    0
  );

  return distanciaReal + sumaEquivalencias;
}

/**
 * Calcula solo la suma de las distancias equivalentes de los accesorios.
 *
 * @param {Array<Object>} accesoriosSeleccionados Array de accesorios.
 * @returns {number} La suma de las equivalencias.
 */
export function calcularSumaEquivalencias(accesoriosSeleccionados) {
  if (!Array.isArray(accesoriosSeleccionados)) {
    return 0;
  }

  return accesoriosSeleccionados.reduce((total, accesorio) => {
    const { tipo, diametro, cantidad } = accesorio;
    const equivalencia = tablaEquivalencias[diametro]?.[tipo] || 0;
    return total + cantidad * equivalencia;
  }, 0);
}

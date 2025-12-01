const KcalPorM3 = 9300;

/**
 * Calcula el consumo en m³/h a partir de la potencia en Kcal/h.
 * Devuelve tanto el valor original como el redondeado a 2 decimales.
 *
 * @param {number} kcalH Potencia en Kcal/h.
 * @returns {{original: number, rounded: number}} Un objeto con el consumo original y el redondeado.
 */
export function calcularConsumo(kcalH) {
  if (typeof kcalH !== "number" || kcalH < 0) {
    return { original: 0, rounded: 0 };
  }
  const result = kcalH / KcalPorM3;
  const roundedResult = Math.round(result * 100) / 100;

  return { original: result, rounded: roundedResult };
}

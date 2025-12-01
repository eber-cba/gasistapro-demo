import { generateUuid } from "../utils/uuid_wrapper";
import tablaAccesorios from "../data/tablaAccesorios.json";

// Lista de nombres de accesorios conocidos para hacer matching
const accesoriosConocidos = tablaAccesorios.datos.map((d) =>
  d.accesorio.toLowerCase()
);

/**
 * Parsea un string de accesorios y cantidades.
 * Ejemplo de input: "codo 90, 2, te 45, 1, valvula, 1"
 * @param {string} inputString El texto introducido por el usuario.
 * @returns {Array<{id: string, accesorio: string, cantidad: number}>}
 */
export function parseAccesoriosString(inputString) {
  if (!inputString || typeof inputString !== "string") {
    return [];
  }

  const parts = inputString.split(",").map((p) => p.trim());
  const accesorios = [];

  for (let i = 0; i < parts.length; i += 2) {
    const nombreInput = parts[i].toLowerCase();
    const cantidadStr = parts[i + 1];

    if (!nombreInput || !cantidadStr) {
      continue; // Ignorar pares incompletos
    }

    const cantidad = parseInt(cantidadStr, 10);
    if (isNaN(cantidad) || cantidad <= 0) {
      continue; // Ignorar si la cantidad no es un número válido
    }

    // Buscar el nombre oficial del accesorio (case-insensitive)
    const nombreOficial = accesoriosConocidos.find((conocido) =>
      conocido.includes(nombreInput)
    );

    if (nombreOficial) {
      accesorios.push({
        id: generateUuid(),
        accesorio: nombreOficial.toUpperCase(), // Guardar en el formato oficial
        cantidad: cantidad,
      });
    }
  }

  return accesorios;
}

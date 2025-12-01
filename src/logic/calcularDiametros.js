import tablaNumero3 from '../data/tablaNumero3.json';

// Helper function to extract consumption keys and their numeric values
const getConsumoKeys = () => {
  const keys = Object.keys(tablaNumero3[0]).filter(key => key.startsWith('consumo_'));
  return keys.map(key => ({
    key: key,
    value: parseFloat(key.replace('consumo_', '').replace('_', '.'))
  })).sort((a, b) => a.value - b.value);
};

// Helper to get diameter from the table based on row and consumption key
const getDiameter = (row, consumoKey) => {
  return row[consumoKey] || null;
};

// Main calculation function
export function calcularDiametros(distancia_definitiva, consumo_m3h) {
  const steps = [];
  const consumoKeys = getConsumoKeys();

  steps.push(`Iniciando cálculo para Distancia Definitiva: ${distancia_definitiva} m, Consumo: ${consumo_m3h} m³/h.`);
  steps.push(`Utilizando la Tabla Nº3 (tablaNumero3.json) para la selección de diámetros.`);

  let isValid = true;
  let mensaje = '';
  let diametroProvisorio = null;
  let diametroDefinitivo = null;

  // Get min/max from tablaNumero3
  const minDistance = tablaNumero3[0].distancia;
  const maxDistance = tablaNumero3[tablaNumero3.length - 1].distancia;
  const minConsumo = consumoKeys[0].value;
  const maxConsumo = consumoKeys[consumoKeys.length - 1].value;

  // Check if inputs are within table range
  if (distancia_definitiva < minDistance || distancia_definitiva > maxDistance) {
    isValid = false;
    mensaje = `Distancia Definitiva (${distancia_definitiva} m) fuera del rango de la Tabla Nº3 (${minDistance}-${maxDistance} m).`;
    steps.push(`Error: ${mensaje}`);
  }
  if (consumo_m3h < minConsumo || consumo_m3h > maxConsumo) {
    isValid = false;
    mensaje = (mensaje ? mensaje + ' y ' : '') + `Consumo (${consumo_m3h} m³/h) fuera del rango de la Tabla Nº3 (${minConsumo}-${maxConsumo} m³/h).`;
    steps.push(`Error: ${mensaje}`);
  }

  if (!isValid) {
    return {
      distancia_definitiva: distancia_definitiva,
      diametro_provisorio: null,
      diametro_definitivo: null,
      steps,
      isValid,
      mensaje,
    };
  }

  // 1. Find relevant distance row(s)
  let lowerDistRow = null;
  let upperDistRow = null;

  for (const row of tablaNumero3) {
    if (row.distancia <= distancia_definitiva) {
      lowerDistRow = row;
    }
    if (row.distancia >= distancia_definitiva) {
      upperDistRow = row;
      break;
    }
  }

  // Fallback, though inputs should be in range now
  if (!lowerDistRow) lowerDistRow = tablaNumero3[0];
  if (!upperDistRow) upperDistRow = tablaNumero3[tablaNumero3.length - 1];


  // 2. Find relevant consumption column(s)
  let lowerConsumoKey = null;
  let upperConsumoKey = null;

  for (let i = 0; i < consumoKeys.length; i++) {
    if (consumoKeys[i].value <= consumo_m3h) {
      lowerConsumoKey = consumoKeys[i];
    }
    if (consumoKeys[i].value >= consumo_m3h) {
      upperConsumoKey = consumoKeys[i];
      break;
    }
  }
  
  // Fallback, though inputs should be in range now
  if (!lowerConsumoKey) lowerConsumoKey = consumoKeys[0];
  if (!upperConsumoKey) upperConsumoKey = consumoKeys[consumoKeys.length - 1];

  steps.push(`Paso 1: Buscando distancias en la Tabla Nº3 para ${distancia_definitiva} m.`);
  steps.push(`  - Distancia Inferior (o igual): ${lowerDistRow ? lowerDistRow.distancia : 'N/A'} m.`);
  steps.push(`  - Distancia Superior (o igual): ${upperDistRow ? upperDistRow.distancia : 'N/A'} m.`);
  
  steps.push(`Paso 2: Buscando consumos en la Tabla Nº3 para ${consumo_m3h} m³/h.`);
  steps.push(`  - Consumo Inferior (o igual): ${lowerConsumoKey ? lowerConsumoKey.value : 'N/A'} m³/h.`);
  steps.push(`  - Consumo Superior (o igual): ${upperConsumoKey ? upperConsumoKey.value : 'N/A'} m³/h.`);

  // Determine diameter based on closest distance and consumption (always choose larger for safety)
  // Simplification: For safety, if a value is between two table values, we take the one corresponding to the higher distance/consumption.
  // This means using upperDistRow and upperConsumoKey for selection.

  if (upperDistRow && upperConsumoKey) {
    diametroProvisorio = getDiameter(upperDistRow, upperConsumoKey.key);
    diametroDefinitivo = getDiameter(upperDistRow, upperConsumoKey.key); // For now, assume same
    steps.push(`Paso 3: Se selecciona el diámetro en la intersección de Distancia ${upperDistRow.distancia} m y Consumo ${upperConsumoKey.value} m³/h de la Tabla Nº3.`);
    steps.push(`  - Diámetro Provisorio: ${diametroProvisorio}.`);
    steps.push(`  - Diámetro Definitivo: ${diametroDefinitivo}.`);
  } else {
    // This case should ideally not be hit if isValid check passes, but as a safeguard
    isValid = false;
    mensaje = "Error interno: No se pudo determinar el diámetro con los datos proporcionados.";
    steps.push(`Paso 3: Error interno en la determinación del diámetro.`);
  }

  // Handle cases where diameter might be null from table lookup (e.g., if a cell is empty in JSON)
  if (isValid && (!diametroProvisorio || !diametroDefinitivo)) {
      isValid = false;
      mensaje = "El diámetro resultante de la búsqueda en la Tabla Nº3 es nulo. Verifique los rangos de entrada.";
      steps.push(`Advertencia: El diámetro obtenido de la Tabla Nº3 es nulo. Asegúrese de que los valores de entrada estén dentro de los rangos de la tabla.`);
  }


  return {
    distancia_definitiva: distancia_definitiva,
    diametro_provisorio: diametroProvisorio,
    diametro_definitivo: diametroDefinitivo,
    steps,
    isValid,
    mensaje,
  };
}


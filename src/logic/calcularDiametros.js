import tablaNumero3 from '../data/tablaNumero3.json';

/**
 * Calcula el diámetro de cañería necesario basándose en la Tabla N°3 de Gas Natural.
 * 
 * Lógica:
 * 1. Busca la fila correspondiente a la distancia (inmediata superior).
 * 2. En esa fila, busca el primer diámetro cuyo caudal máximo permitido sea mayor o igual al consumo requerido.
 * 
 * @param {number} distancia_definitiva - Distancia real + equivalente (m)
 * @param {number} consumo_m3h - Consumo del artefacto (m³/h)
 * @returns {object} Resultado del cálculo con pasos y validación
 */
export function calcularDiametros(distancia_definitiva, consumo_m3h) {
  const steps = [];
  
  steps.push(`Iniciando cálculo para Distancia Definitiva: ${distancia_definitiva.toFixed(2)} m, Consumo: ${consumo_m3h.toFixed(3)} m³/h.`);
  steps.push(`Utilizando la Tabla Nº3 (Caudales máximos en litros/hora) para la selección de diámetros.`);

  let isValid = true;
  let mensaje = '';
  let diametroCalculado = null;

  // 1. Validar rangos generales
  // La tabla está ordenada por distancia. Tomamos min y max.
  const distancias = tablaNumero3.map(r => r.distancia);
  const minDist = Math.min(...distancias);
  const maxDist = Math.max(...distancias);

  if (distancia_definitiva > maxDist) {
    isValid = false;
    mensaje = `La distancia (${distancia_definitiva} m) excede el máximo de la tabla (${maxDist} m).`;
    steps.push(`Error: ${mensaje}`);
    return { isValid, mensaje, steps, diametro_definitivo: null };
  }

  // 2. Encontrar la fila de distancia adecuada (inmediata superior)
  // Ejemplo: Si distancia es 2.5m, buscamos la fila de 3m (o la que corresponda según tabla)
  let filaSeleccionada = tablaNumero3.find(row => row.distancia >= distancia_definitiva);

  if (!filaSeleccionada) {
    // Esto no debería pasar si validamos maxDist, pero por seguridad
    filaSeleccionada = tablaNumero3[tablaNumero3.length - 1];
    steps.push(`Advertencia: Usando la última fila de distancia disponible (${filaSeleccionada.distancia} m).`);
  } else {
    steps.push(`Paso 1: Seleccionada fila de distancia: ${filaSeleccionada.distancia} m (para cubrir ${distancia_definitiva} m).`);
  }

  // 3. Buscar el diámetro adecuado en la fila seleccionada
  // La fila tiene claves numéricas que representan los diámetros (ej: "13", "19", "25"...)
  // Los valores son caudales en Litros/Hora. Debemos convertir el consumo de m3/h a Litros/Hora.
  
  const consumo_litros_hora = consumo_m3h * 1000;
  steps.push(`Paso 2: Conversión de consumo: ${consumo_m3h} m³/h = ${consumo_litros_hora.toFixed(0)} l/h.`);

  // Obtener todas las claves que son diámetros (excluyendo "distancia")
  // Asumimos que las claves numéricas son los diámetros en mm
  const diametrosDisponibles = Object.keys(filaSeleccionada)
    .filter(k => k !== 'distancia')
    .sort((a, b) => parseFloat(a) - parseFloat(b)); // Ordenar de menor a mayor diámetro

  steps.push(`Paso 3: Buscando diámetro capaz de suministrar ${consumo_litros_hora.toFixed(0)} l/h en la fila de ${filaSeleccionada.distancia} m.`);

  for (const diametro of diametrosDisponibles) {
    // Los valores en el JSON son strings con separador de miles (ej: "4,420") o decimales
    // Asumimos formato español "1.000,00" o "1,000" -> necesitamos valor numérico puro
    let valorRaw = filaSeleccionada[diametro];
    if (typeof valorRaw === 'string') {
      // Eliminar puntos de miles y reemplazar coma decimal por punto si fuera necesario
      // En este caso el JSON tiene "4,420" que parece ser 4420 (miles con coma) o 4.420 (decimal con coma)?
      // Revisando el JSON: "13": "3,580" para 2m. 13mm suele llevar ~3-4 m3/h. 3580 l/h tiene sentido.
      // Entonces la coma es separador de miles.
      valorRaw = valorRaw.replace(/,/g, '').replace(/\./g, '');
    }
    
    const caudalMaximo = parseFloat(valorRaw);
    
    // Si el caudal máximo de este diámetro soporta el consumo requerido
    if (caudalMaximo >= consumo_litros_hora) {
      diametroCalculado = diametro; // Este es el diámetro en mm (ej: "13", "19")
      steps.push(`✅ Encontrado: Diámetro ${diametro} mm soporta hasta ${caudalMaximo} l/h.`);
      break;
    } else {
      // steps.push(`  - Diámetro ${diametro} mm: Insuficiente (max ${caudalMaximo} l/h).`);
    }
  }

  if (!diametroCalculado) {
    isValid = false;
    mensaje = `No se encontró un diámetro capaz de soportar el consumo de ${consumo_m3h} m³/h a ${distancia_definitiva} m.`;
    steps.push(`Error: ${mensaje}`);
  } else {
    steps.push(`Resultado: Diámetro seleccionado ${diametroCalculado} mm.`);
  }

  return {
    distancia_definitiva,
    diametro_provisorio: diametroCalculado, // Mantenemos compatibilidad de nombres
    diametro_definitivo: diametroCalculado,
    steps,
    isValid,
    mensaje,
  };
}

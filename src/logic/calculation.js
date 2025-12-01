import { POWER_FACTOR, ACCESORIOS_EQUIVALENCIAS } from "../data/constants";
import { tablaEquivalencias } from "../modules/accesorios/equivalencias";

// --- Funciones de Cálculo Puras ---

export function calculateConsumption(artifacts) {
  // Handle both formats: artifacts with pre-calculated consumo, or with power_kcalh
  return artifacts.reduce((sum, art) => {
    if (art.consumo !== undefined) {
      return sum + art.consumo;
    }
    // Fallback: calculate from power_kcalh if consumo is not present
    if (art.power_kcalh) {
      return sum + (art.power_kcalh / 9300);
    }
    return sum;
  }, 0);
}

export function calculateEquivalentDistance(
  accesorios,
  sumaEquivalenciasPrecalculada
) {
  if (sumaEquivalenciasPrecalculada !== undefined) {
    return sumaEquivalenciasPrecalculada;
  }
  
  return accesorios.reduce((total, acc) => {
    // Try to get equivalencia using diametro if available
    let equivalencia = 0;
    if (acc.diametro && tablaEquivalencias[acc.diametro] && tablaEquivalencias[acc.diametro][acc.tipo]) {
      equivalencia = tablaEquivalencias[acc.diametro][acc.tipo];
    } else {
      // Fallback to old constant if diametro not available
      equivalencia = ACCESORIOS_EQUIVALENCIAS[acc.tipo] || 0;
    }
    return total + equivalencia * Number(acc.cantidad);
  }, 0);
}

export function calculateDefinitiveDistance(real, equivalent) {
  return Number(real) + equivalent;
}

export function selectDiameter(definitiveDistance, accumulatedConsumption) {
  if (accumulatedConsumption <= 2.0 && definitiveDistance <= 20) {
    return '½"';
  }
  if (accumulatedConsumption <= 4.0 && definitiveDistance <= 40) {
    return '¾"';
  }
  return '1"';
}

// --- Lógica de Orquestación ---

export function performFullCalculation(tramos) {
  let calculatedTramos = JSON.parse(JSON.stringify(tramos));

  // 1. Calcular consumo propio
  calculatedTramos.forEach((t) => {
    t.consumo_propio_m3h = calculateConsumption(t.artifacts);
  });

  // 2. Calcular consumo acumulado
  let accumulatedConsumption = 0;
  for (let i = calculatedTramos.length - 1; i >= 0; i--) {
    accumulatedConsumption += calculatedTramos[i].consumo_propio_m3h;
    calculatedTramos[i].consumo_acumulado_m3h = accumulatedConsumption;
  }

  // 3. Bucle de cálculo iterativo
  calculatedTramos.forEach((t) => {
    // La distancia equivalente de accesorios ya viene pre-calculada en `t.distancia_equivalente`
    // Si no viene, la calculamos usando los accesorios
    let distanciaEquivalenteAccesorios = t.distancia_equivalente;
    
    if (distanciaEquivalenteAccesorios === undefined || distanciaEquivalenteAccesorios === null) {
       distanciaEquivalenteAccesorios = calculateEquivalentDistance(t.accesorios || []);
    }

    // Calcular la distancia definitiva CORRECTA
    const distanciaDefinitiva = calculateDefinitiveDistance(
      t.distancia_real,
      distanciaEquivalenteAccesorios
    );

    // Asignar los valores correctos al tramo para la tabla final
    t.distancia_equivalente = distanciaEquivalenteAccesorios;
    t.distancia_definitiva = distanciaDefinitiva;

    let diametroProvisorio = '½"'; // Siempre empezamos con el más chico
    let diametroDefinitivo = "";

    for (let i = 0; i < 5; i++) {
      // Usar la distancia definitiva correcta para la selección de diámetro
      diametroDefinitivo = selectDiameter(
        distanciaDefinitiva,
        t.consumo_acumulado_m3h
      );

      t.diametro_provisorio = diametroProvisorio;

      if (diametroDefinitivo === diametroProvisorio) {
        break; // Estabilizado
      }
      diametroProvisorio = diametroDefinitivo; // Siguiente iteración
    }
    t.diametro_definitivo = diametroDefinitivo;
  });

  return calculatedTramos;
}

// src/data/constants.js

export const POWER_FACTOR = 9300; // kcal/m³

export const ACCESORIOS_EQUIVALENCIAS = {
  codo_90: 1.0,
  codo_45: 0.5,
  curva: 0.8,
  t_derivacion: 1.2,
  llave_esferica: 0.4,
  union: 0.3,
  tapon: 0.1,
};

// Lista de nombres para los menús desplegables
export const ACCESORIOS_LIST = [
  { key: "codo_90", name: "Codo 90°" },
  { key: "codo_45", name: "Codo 45°" },
  { key: "curva", name: "Curva" },
  { key: "t_derivacion", name: "T derivación" },
  { key: "llave_esferica", name: "Llave Esférica" },
  { key: "union", name: "Unión" },
  { key: "tapon", name: "Tapón" },
];

export const ARTEFACTOS_DEFAULT_POWER = {
  cocina: 10000,
  termotanque: 14000,
  calefon: 12000,
  estufa_chica: 2000,
  estufa_mediana: 3000,
  estufa_grande: 5000,
};

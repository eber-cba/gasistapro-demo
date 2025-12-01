import { describe, it, expect } from "vitest";
import {
  calcularDistanciaEquivalente,
  calcularSumaEquivalencias,
} from "../src/modules/calculos/distanciaEquivalente";

describe("Cálculo de Distancia Equivalente", () => {
  const accesoriosEjemplo = [
    { tipo: "codo_90", diametro: "3/4", cantidad: 4 },
    { tipo: "te_flujo_90", diametro: "3/4", cantidad: 1 },
    { tipo: "codo_90", diametro: "1/2", cantidad: 3 },
    { tipo: "llave_macho", diametro: "1/2", cantidad: 1 },
  ];

  it("debería calcular la suma de equivalencias de accesorios correctamente", () => {
    // CODO 3/4 → 4 × 0.57 = 2.28
    // T 3/4 → 1 × 1.14 = 1.14
    // CODO 1/2 → 3 × 0.39 = 1.17
    // LLAVE 1/2 → 1 × 1.30 = 1.30
    // TOTAL = 5.89
    const sumaEsperada = 4 * 0.57 + 1 * 1.14 + 3 * 0.39 + 1 * 1.3;
    expect(
      parseFloat(calcularSumaEquivalencias(accesoriosEjemplo).toFixed(2))
    ).toBe(parseFloat(sumaEsperada.toFixed(2)));
  });

  it("debería dar EXACTO 5.89 para el ejemplo del papá", () => {
    expect(
      parseFloat(calcularSumaEquivalencias(accesoriosEjemplo).toFixed(2))
    ).toBe(5.89);
  });

  it("debería calcular la distancia total equivalente correctamente", () => {
    const distanciaReal = 19.35;
    const sumaEquivalencias = 5.89;
    const distanciaTotalEsperada = distanciaReal + sumaEquivalencias;
    expect(
      parseFloat(
        calcularDistanciaEquivalente(distanciaReal, accesoriosEjemplo).toFixed(
          2
        )
      )
    ).toBe(parseFloat(distanciaTotalEsperada.toFixed(2)));
  });

  it("debería devolver la distancia real si no hay accesorios", () => {
    expect(calcularDistanciaEquivalente(10, [])).toBe(10);
  });

  it("debería devolver 0 si los inputs no son válidos", () => {
    expect(calcularDistanciaEquivalente("texto", [])).toBe(0);
    expect(calcularDistanciaEquivalente(10, "texto")).toBe(0);
  });
});

import { describe, it, expect } from "vitest";
import {
  calculateConsumption,
  calculateEquivalentDistance,
  calculateDefinitiveDistance,
  selectDiameter,
  performFullCalculation,
} from "../src/logic/calculation.js";

describe("Gas Installation Calculations", () => {
  // Test para el cálculo de consumo
  it("calculates consumption correctly", () => {
    const artifacts = [{ power_kcalh: 10000 }, { power_kcalh: 14000 }];
    const expectedConsumption = (10000 + 14000) / 9300;
    expect(calculateConsumption(artifacts)).toBeCloseTo(expectedConsumption);
  });

  // Test para la distancia equivalente
  it("calculates equivalent distance correctly", () => {
    const accesorios = [
      { tipo: "codo_90", cantidad: 2 }, // 2 * 1.00 = 2.00
      { tipo: "llave_esferica", cantidad: 1 }, // 1 * 0.40 = 0.40
    ];
    expect(calculateEquivalentDistance(accesorios)).toBe(2.4);
  });

  // Test para la distancia definitiva
  it("calculates definitive distance correctly", () => {
    expect(calculateDefinitiveDistance(15.5, 4.5)).toBe(20.0);
  });

  // Test para la selección de diámetro
  describe("selectDiameter", () => {
    it('selects 1/2" for low consumption', () => {
      expect(selectDiameter(10, 1.5)).toBe('½"');
    });
    it('selects 3/4" for medium consumption', () => {
      expect(selectDiameter(20, 3.5)).toBe('¾"');
    });
    it('selects 1" for high consumption', () => {
      expect(selectDiameter(30, 5.0)).toBe('1"');
    });
  });

  // Test para el cálculo completo y acumulativo
  it("performs a full calculation with accumulated consumption", () => {
    const tramos = [
      {
        // Tramo 2 (más cercano al medidor)
        distancia_real: "10",
        accesorios: [{ tipo: "codo_90", cantidad: 1 }],
        artifacts: [{ power_kcalh: 10000 }], // Cocina
      },
      {
        // Tramo 1 (más lejano)
        distancia_real: "5",
        accesorios: [{ tipo: "codo_45", cantidad: 1 }],
        artifacts: [{ power_kcalh: 14000 }], // Termotanque
      },
    ];

    const results = performFullCalculation(tramos);

    // Verificar Tramo 1 (lejano)
    const tramo1 = results[1];
    expect(tramo1.consumo_propio_m3h).toBeCloseTo(14000 / 9300);
    expect(tramo1.consumo_acumulado_m3h).toBeCloseTo(14000 / 9300);
    expect(tramo1.distancia_equivalente).toBe(0.5);
    expect(tramo1.distancia_definitiva).toBe(5.5);
    expect(tramo1.diametro_definitivo).toBe('½"');

    // Verificar Tramo 2 (cercano)
    const tramo0 = results[0];
    const consumoTotal = (10000 + 14000) / 9300;
    expect(tramo0.consumo_propio_m3h).toBeCloseTo(10000 / 9300);
    expect(tramo0.consumo_acumulado_m3h).toBeCloseTo(consumoTotal);
    expect(tramo0.distancia_equivalente).toBe(1.0);
    expect(tramo0.distancia_definitiva).toBe(11.0);
    expect(tramo0.diametro_definitivo).toBe('¾"'); // El diámetro aumenta por el consumo acumulado
  });
});

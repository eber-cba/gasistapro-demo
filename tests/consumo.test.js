import { describe, it, expect } from "vitest";
import { calcularConsumo } from "../src/modules/calculos/formulaConsumo";

describe("calcularConsumo con redondeo", () => {
  it("debería redondear 10,000 kcal/h a 1.08", () => {
    const resultado = calcularConsumo(10000);
    expect(resultado.rounded).toBe(1.08);
  });

  it("debería redondear 3,800 kcal/h (T.B.U.) a 0.41", () => {
    const resultado = calcularConsumo(3800);
    expect(resultado.rounded).toBe(0.41);
  });

  it("debería devolver 0 para un valor negativo", () => {
    const resultado = calcularConsumo(-100);
    expect(resultado.rounded).toBe(0);
  });

  it("debería devolver 0 si el input no es un número", () => {
    const resultado = calcularConsumo("texto");
    expect(resultado.rounded).toBe(0);
  });

  it("debería devolver el valor original sin redondear", () => {
    const resultado = calcularConsumo(3800);
    expect(resultado.original).toBeCloseTo(0.4086, 4);
  });
});

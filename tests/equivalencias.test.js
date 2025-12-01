import { describe, it, expect } from "vitest";
import { tablaEquivalencias } from "../src/modules/accesorios/equivalencias";

describe("Tabla de Equivalencias de Accesorios", () => {
  it("debería devolver 0.57 para codo_90 de 3/4", () => {
    expect(tablaEquivalencias["3/4"].codo_90).toBe(0.57);
  });

  it("debería devolver 1.30 para llave_macho de 1/2", () => {
    expect(tablaEquivalencias["1/2"].llave_macho).toBe(1.30);
  });

  it("debería devolver 0.78 para te_flujo_90 de 1/2", () => {
    expect(tablaEquivalencias["1/2"].te_flujo_90).toBe(0.78);
  });

  it("no debería contener valores nulos o indefinidos para las claves principales", () => {
    Object.values(tablaEquivalencias).forEach((accesorio) => {
      Object.values(accesorio).forEach((valor) => {
        expect(valor).not.toBeNull();
        expect(valor).not.toBeUndefined();
      });
    });
  });
});

import { describe, it, expect } from "vitest";
import { tablaEquivalencias } from "../src/modules/accesorios/equivalencias";

describe("Tabla de Equivalencias de Accesorios", () => {
  it("debería devolver 0.57 para codo de 3/4", () => {
    expect(tablaEquivalencias["3/4"].codo_90).toBe(0.57);
  });

  it("debería devolver 1.30 para llave de paso de 1/2", () => {
    expect(tablaEquivalencias["1/2"].llave_paso).toBe(1.3);
  });

  it("debería devolver el valor inferido para tee de 1/2", () => {
    expect(tablaEquivalencias["1/2"].tee).toBe(0.78);
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

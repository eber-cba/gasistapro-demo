import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import { act } from "@testing-library/react";
import useStore from "../src/hooks/useStore";
import { generateUuid } from "../src/utils/uuid_wrapper";

// Mock del wrapper de UUID
vi.mock("../src/utils/uuid_wrapper", () => ({
  generateUuid: vi.fn(),
}));

describe("Zustand Store - Professional Logic", () => {
  let uuidCount;

  beforeEach(() => {
    // Resetear el store a su estado inicial antes de cada test
    act(() => useStore.getState().resetState());

    // Resetear el mock de UUID
    uuidCount = 0;
    vi.mocked(generateUuid).mockImplementation(
      () => `mock-uuid-${++uuidCount}`
    );
  });

  it("adds an artifact to a specific tramo", () => {
    const tramoId = useStore.getState().tramos[0].id;
    const artifact = { name: "Cocina", power_kcalh: 10000 };

    act(() => useStore.getState().addArtifactToTramo(tramoId, artifact));

    const tramo = useStore.getState().tramos[0];
    expect(tramo.artifacts).toHaveLength(1);
    expect(tramo.artifacts[0].name).toBe("Cocina");
  });

  it("adds and removes an accesorio from a tramo", () => {
    const tramoId = useStore.getState().tramos[0].id;

    act(() => useStore.getState().addAccesorio(tramoId));
    let tramo = useStore.getState().tramos[0];
    const accesorioId = tramo.accesorios[0].id;

    expect(tramo.accesorios).toHaveLength(1);
    expect(tramo.accesorios[0].tipo).toBe("codo_90"); // Changed from name to tipo

    act(() => useStore.getState().removeAccesorio(tramoId, accesorioId));
    tramo = useStore.getState().tramos[0];
    expect(tramo.accesorios).toHaveLength(0);
  });

  it("resets the state correctly", () => {
    const tramoId = useStore.getState().tramos[0].id;
    act(() => {
      useStore.getState().addTramo();
      useStore.getState().addArtifactToTramo(tramoId, {
        name: "Test",
        power_kcalh: 1000,
      });
    });

    act(() => useStore.getState().resetState());

    const { tramos } = useStore.getState();
    expect(tramos).toHaveLength(1);
    expect(tramos[0].artifacts).toHaveLength(0);
  });
});

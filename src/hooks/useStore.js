import { create } from "zustand";
import { persist } from "zustand/middleware";
import { generateUuid } from "../utils/uuid_wrapper";

const createNewTramo = (id, name) => ({
  id,
  name,
  distancia_real: "0",
  accesorios: [], // Formato: [{ id, tipo: 'codo_90', cantidad: 1 }]
  artifacts: [], // Formato: [{ id, tipo: 'cocina', power_kcalh: 10000 }]

  // Campos para los resultados
  distancia_equivalente: 0,
  distancia_definitiva: 0,
  consumo_propio_m3h: 0,
  consumo_acumulado_m3h: 0,
  diametro_provisorio: null,
  diametro_definitivo: null,
});

const initialState = {
  tramos: [createNewTramo(generateUuid(), "Tramo 1 (Más Lejano)")],
};

const useStore = create(
  persist(
    (set) => ({
      ...initialState,

      // Acciones para Tramos
      addTramo: () =>
        set((state) => ({
          tramos: [
            ...state.tramos,
            createNewTramo(generateUuid(), `Tramo ${state.tramos.length + 1}`),
          ],
        })),
      updateTramo: (tramoId, field, value) =>
        set((state) => ({
          tramos: state.tramos.map((t) =>
            t.id === tramoId ? { ...t, [field]: value } : t
          ),
        })),
      removeTramo: (tramoId) =>
        set((state) => ({
          tramos: state.tramos.filter((t) => t.id !== tramoId),
        })),

      // Acciones para Accesorios por Tramo
      addAccesorio: (tramoId) =>
        set((state) => ({
          tramos: state.tramos.map((t) =>
            t.id === tramoId
              ? {
                  ...t,
                  accesorios: [
                    ...t.accesorios,
                    { id: generateUuid(), tipo: "codo_90", cantidad: 1 },
                  ],
                }
              : t
          ),
        })),
      updateAccesorio: (tramoId, accId, field, value) =>
        set((state) => ({
          tramos: state.tramos.map((t) =>
            t.id === tramoId
              ? {
                  ...t,
                  accesorios: t.accesorios.map((a) =>
                    a.id === accId ? { ...a, [field]: value } : a
                  ),
                }
              : t
          ),
        })),
      removeAccesorio: (tramoId, accId) =>
        set((state) => ({
          tramos: state.tramos.map((t) =>
            t.id === tramoId
              ? {
                  ...t,
                  accesorios: t.accesorios.filter((a) => a.id !== accId),
                }
              : t
          ),
        })),

      // Acciones para Artefactos por Tramo
      addArtifactToTramo: (tramoId, artifact) =>
        set((state) => ({
          tramos: state.tramos.map((t) =>
            t.id === tramoId
              ? {
                  ...t,
                  // Replace the entire artifacts array with a single-item array
                  artifacts: [{ ...artifact, id: generateUuid() }],
                }
              : t
          ),
        })),
      removeArtifactFromTramo: (tramoId, artifactId) =>
        set((state) => ({
          tramos: state.tramos.map((t) =>
            t.id === tramoId
              ? {
                  ...t,
                  artifacts: t.artifacts.filter((a) => a.id !== artifactId),
                }
              : t
          ),
        })),

      setCalculationResults: (calculatedTramos) =>
        set({ tramos: calculatedTramos }),
      resetState: () => set(initialState),
    }),
    {
      name: "gas-calculation-storage-v6", // Nueva versión
      version: 6.0,
      migrate: (persistedState, version) => {
        if (version < 6.0) return initialState;
        return persistedState;
      },
    }
  )
);

export default useStore;

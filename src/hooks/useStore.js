import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useStore = create(
  persist(
    (set) => ({
      potenciaTotal: 0,
      longitud: 0,
      diametroSeleccionado: '3/4',
      resultadoActual: null,
      historial: [],
      setPotenciaTotal: (potencia) => set({ potenciaTotal: potencia }),
      setLongitud: (longitud) => set({ longitud: longitud }),
      setDiametroSeleccionado: (diametro) => set({ diametroSeleccionado: diametro }),
      setResultadoActual: (resultado) => set((state) => ({
        resultadoActual: resultado,
        historial: [resultado, ...state.historial].slice(0, 3),
      })),
    }),
    {
      name: 'gasistapro-storage', // name of the item in the storage (must be unique)
    }
  )
);

export default useStore;

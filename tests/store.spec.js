import { describe, it, expect } from 'vitest';
import useStore from '../src/hooks/useStore';
import { act } from '@testing-library/react';

describe('useStore', () => {
  it('should set potencia total', () => {
    act(() => {
      useStore.getState().setPotenciaTotal(10000);
    });
    expect(useStore.getState().potenciaTotal).toBe(10000);
  });

  it('should add to historial', () => {
    act(() => {
      useStore.getState().setResultadoActual({ aprobado: true });
    });
    expect(useStore.getState().historial.length).toBe(1);
    expect(useStore.getState().historial[0].aprobado).toBe(true);
  });

  it('historial should not exceed 3 items', () => {
    act(() => {
      useStore.getState().setResultadoActual({ aprobado: true });
      useStore.getState().setResultadoActual({ aprobado: false });
      useStore.getState().setResultadoActual({ aprobado: true });
      useStore.getState().setResultadoActual({ aprobado: false });
    });
    expect(useStore.getState().historial.length).toBe(3);
    expect(useStore.getState().historial[0].aprobado).toBe(false);
  });
});

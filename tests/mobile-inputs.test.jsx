import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import SelectorAccesorios from '../src/modules/ui/selectorAccesorios';
import TramoManager from '../src/components/TramoManager';
import useStore from '../src/hooks/useStore';

describe('Mobile Input Fixes', () => {
  describe('SelectorAccesorios - Accessories Input', () => {
    const mockOnAccesorioChange = vi.fn();

    beforeEach(() => {
      mockOnAccesorioChange.mockClear();
    });

    it('should render with empty input when cantidad is 0', () => {
      render(
        <SelectorAccesorios 
          accesorios={[]} 
          onAccesorioChange={mockOnAccesorioChange} 
        />
      );

      const inputs = screen.getAllByRole('spinbutton');
      // All inputs should be empty (not showing "0")
      inputs.forEach(input => {
        expect(input.value).toBe('');
      });
    });

    it('should show placeholder "0" when input is empty', () => {
      render(
        <SelectorAccesorios 
          accesorios={[]} 
          onAccesorioChange={mockOnAccesorioChange} 
        />
      );

      const inputs = screen.getAllByRole('spinbutton');
      inputs.forEach(input => {
        expect(input).toHaveAttribute('placeholder', '0');
      });
    });

    it('should not show leading zero when entering a number', async () => {
      render(
        <SelectorAccesorios 
          accesorios={[]} 
          onAccesorioChange={mockOnAccesorioChange} 
        />
      );

      const firstInput = screen.getAllByRole('spinbutton')[0];
      
      // Simulate typing "2"
      fireEvent.change(firstInput, { target: { value: '2' } });
      
      await waitFor(() => {
        expect(mockOnAccesorioChange).toHaveBeenCalled();
        const callArgs = mockOnAccesorioChange.mock.calls[0][0];
        expect(callArgs[0].cantidad).toBe(2);
      });
    });

    it('should handle empty input correctly (set to 0)', async () => {
      const accesorios = [
        { tipo: 'codo_90', diametro: '1/2', cantidad: 5 }
      ];

      render(
        <SelectorAccesorios 
          accesorios={accesorios} 
          onAccesorioChange={mockOnAccesorioChange} 
        />
      );

      const inputs = screen.getAllByRole('spinbutton');
      const inputWithValue = inputs.find(input => input.value === '5');
      
      expect(inputWithValue).toBeDefined();
      
      // Clear the input
      fireEvent.change(inputWithValue, { target: { value: '' } });
      
      await waitFor(() => {
        expect(mockOnAccesorioChange).toHaveBeenCalled();
        const callArgs = mockOnAccesorioChange.mock.calls[0][0];
        // Should remove the accessory when cantidad is 0
        expect(callArgs.length).toBe(0);
      });
    });

    it('should display actual number when cantidad > 0', () => {
      const accesorios = [
        { tipo: 'codo_90', diametro: '1/2', cantidad: 3 },
        { tipo: 'tee', diametro: '3/4', cantidad: 7 }
      ];

      render(
        <SelectorAccesorios 
          accesorios={accesorios} 
          onAccesorioChange={mockOnAccesorioChange} 
        />
      );

      const inputs = screen.getAllByRole('spinbutton');
      
      // Check that we have inputs with the expected values
      const values = inputs.map(input => input.value);
      expect(values).toContain('3');
      expect(values).toContain('7');
    });

    it('should have responsive CSS classes', () => {
      const { container } = render(
        <SelectorAccesorios 
          accesorios={[]} 
          onAccesorioChange={mockOnAccesorioChange} 
        />
      );

      const tableContainer = container.querySelector('.accesorios-table-container');
      const table = container.querySelector('.accesorios-table');
      
      expect(tableContainer).toBeInTheDocument();
      expect(table).toBeInTheDocument();
    });

    it('should have data-label attributes for mobile responsiveness', () => {
      const { container } = render(
        <SelectorAccesorios 
          accesorios={[]} 
          onAccesorioChange={mockOnAccesorioChange} 
        />
      );

      const firstRow = container.querySelector('tbody tr');
      const cells = firstRow?.querySelectorAll('td');
      
      expect(cells?.[0]).toHaveAttribute('data-label', 'Accesorio');
      expect(cells?.[1]).toHaveAttribute('data-label', 'Cantidad');
      expect(cells?.[2]).toHaveAttribute('data-label', 'Diámetro');
      expect(cells?.[3]).toHaveAttribute('data-label', 'Equivalencia');
      expect(cells?.[4]).toHaveAttribute('data-label', 'Subtotal');
    });
  });

  describe('TramoManager - Distancia Real Input', () => {
    beforeEach(() => {
      // Reset store before each test
      useStore.getState().resetState();
    });

    it('should initialize distancia_real as empty string', () => {
      const state = useStore.getState();
      const firstTramo = state.tramos[0];
      
      expect(firstTramo.distancia_real).toBe('');
    });

    it('should update distancia_real when updateTramo is called', () => {
      const state = useStore.getState();
      const firstTramo = state.tramos[0];
      
      state.updateTramo(firstTramo.id, 'distancia_real', '25.5');
      
      const updatedState = useStore.getState();
      const updatedTramo = updatedState.tramos.find(t => t.id === firstTramo.id);
      
      expect(updatedTramo.distancia_real).toBe('25.5');
    });
  });

  describe('Store - Initial State', () => {
    it('should create new tramo with empty distancia_real', () => {
      useStore.getState().resetState();
      const state = useStore.getState();
      state.addTramo();
      
      const updatedState = useStore.getState();
      const newTramo = updatedState.tramos[updatedState.tramos.length - 1];
      expect(newTramo.distancia_real).toBe('');
    });

    it('should create new tramo with empty accesorios array', () => {
      const state = useStore.getState();
      state.resetState();
      state.addTramo();
      
      const newTramo = state.tramos[state.tramos.length - 1];
      expect(newTramo.accesorios).toEqual([]);
    });
  });
});

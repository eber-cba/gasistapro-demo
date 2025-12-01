import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import SelectorAccesorios from '../src/modules/ui/selectorAccesorios';
import TramoManager from '../src/components/TramoManager';
import useStore from '../src/hooks/useStore';

describe('Mobile Input Fixes', () => {
  describe('SelectorAccesorios - New UI', () => {
    const mockOnAccesorioChange = vi.fn();

    beforeEach(() => {
      mockOnAccesorioChange.mockClear();
    });

    it('should render filters and grid container', () => {
      render(
        <SelectorAccesorios 
          accesorios={[]} 
          onAccesorioChange={mockOnAccesorioChange} 
        />
      );

      // Check for filters
      expect(screen.getByText('Filtrar por Diámetro:')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Ej: codo, te, llave...')).toBeInTheDocument();
      
      // Check for grid container
      const gridContainer = document.querySelector('.accesorios-grid-container');
      expect(gridContainer).toBeInTheDocument();
    });

    it('should display quantities correctly in cards', () => {
      const accesorios = [
        { tipo: 'codo_90', diametro: '1/2', cantidad: 3 },
        { tipo: 'te_flujo_90', diametro: '3/4', cantidad: 7 }
      ];

      render(
        <SelectorAccesorios 
          accesorios={accesorios} 
          onAccesorioChange={mockOnAccesorioChange} 
        />
      );

      // We should find the quantities displayed in the cards
      expect(screen.getByText('3')).toBeInTheDocument();
      expect(screen.getByText('7')).toBeInTheDocument();
    });

    it('should call onAccesorioChange when clicking plus button', () => {
      render(
        <SelectorAccesorios 
          accesorios={[]} 
          onAccesorioChange={mockOnAccesorioChange} 
        />
      );

      // Find all plus buttons
      const plusButtons = document.querySelectorAll('.btn-plus');
      expect(plusButtons.length).toBeGreaterThan(0);
      
      // Click the first one
      fireEvent.click(plusButtons[0]);
      
      expect(mockOnAccesorioChange).toHaveBeenCalled();
      const callArgs = mockOnAccesorioChange.mock.calls[0][0];
      expect(callArgs.length).toBe(1);
      expect(callArgs[0].cantidad).toBe(1);
    });

    it('should filter by search term', () => {
      render(
        <SelectorAccesorios 
          accesorios={[]} 
          onAccesorioChange={mockOnAccesorioChange} 
        />
      );

      const searchInput = screen.getByPlaceholderText('Ej: codo, te, llave...');
      
      // Search for something specific that should exist
      fireEvent.change(searchInput, { target: { value: 'Llave Macho' } });
      
      // Should show Llave Macho cards
      expect(screen.getAllByText('Llave Macho').length).toBeGreaterThan(0);
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

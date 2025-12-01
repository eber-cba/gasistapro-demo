import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ResultsDisplay from '../src/components/ResultsDisplay';
import useStore from '../src/hooks/useStore';

// Mock useStore
vi.mock('../src/hooks/useStore');

// Mock charts to avoid canvas/resize observer issues
vi.mock('../src/components/ConsumptionChart', () => ({ default: () => <div>ConsumptionChart</div> }));
vi.mock('../src/components/DiameterChart', () => ({ default: () => <div>DiameterChart</div> }));
vi.mock('../src/components/DistanceChart', () => ({ default: () => <div>DistanceChart</div> }));

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

describe('ResultsDisplay Component', () => {
  it('renders equivalent distance correctly', () => {
    const mockTramos = [
      {
        id: '1',
        name: 'Tramo Test',
        distancia_real: 10,
        distancia_equivalente: 3.84, // Pre-calculated value
        distancia_definitiva: 13.84,
        diametro_definitivo: '3/4"',
        accesorios: []
      }
    ];

    useStore.mockReturnValue({
      tramos: mockTramos
    });

    render(<ResultsDisplay />);
    
    // Check if 3.84 m is displayed
    expect(screen.getByText('3.84 m')).toBeTruthy();
  });
});

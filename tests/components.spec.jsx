import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';
import Home from '../src/pages/Home';
import TramoManager from '../src/components/TramoManager';

// Mock scrollIntoView since it's not implemented in jsdom
window.HTMLElement.prototype.scrollIntoView = vi.fn();

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

describe('Component Rendering Smoke Tests', () => {
  it('renders Home component without crashing', () => {
    render(<Home />);
    expect(screen.getByText(/GasistaPro/i)).toBeInTheDocument();
  });

  it('renders TramoManager and allows adding a tramo', () => {
    render(<Home />);
    const addButton = screen.getByText(/Agregar Nuevo Tramo/i);
    fireEvent.click(addButton);
    // Should have 2 tramos now (1 initial + 1 added)
    const tramoHeaders = screen.getAllByText(/Tramo/i);
    expect(tramoHeaders.length).toBeGreaterThan(1);
  });
});

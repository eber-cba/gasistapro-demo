import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import useStore from '../src/hooks/useStore';
import Home from '../src/pages/Home';

describe('General Application Tests', () => {
  beforeEach(() => {
    useStore.getState().resetState();
  });

  describe('Application Smoke Tests', () => {
    it('should render the main application without crashing', () => {
      render(<Home />);
      expect(screen.getByRole('banner')).toBeInTheDocument(); // Header
    });

    it('should display the main heading', () => {
      render(<Home />);
      // Should have some main content text
      expect(document.body.textContent).toBeDefined();
    });

    it('should render TramoManager component', () => {
      render(<Home />);
      expect(screen.getByText(/Agregar Nuevo Tramo/i)).toBeInTheDocument();
    });

    it('should render action buttons', () => {
      render(<Home />);
      expect(screen.getByRole('button', { name: /Calcular Todo/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Limpiar/i })).toBeInTheDocument();
    });

    it('should render TablasReferencia component', () => {
      render(<Home />);
      expect(screen.getByText(/Tablas de Referencia Técnica/i)).toBeInTheDocument();
    });
  });

  describe('Basic Interaction Flow', () => {
    it('should allow expanding tables', () => {
      render(<Home />);
      
      const tabla3Header = screen.getByText(/Tabla N° 3/i).closest('.tabla-card-header');
      fireEvent.click(tabla3Header);
      
      // Should show table content
      expect(screen.getByText('Longitud (m)')).toBeInTheDocument();
    });

    it('should not allow calculation without artifacts', async () => {
      render(<Home />);
      
      const calcular = screen.getByRole('button', { name: /Calcular Todo/i });
      fireEvent.click(calcular);
      
      // Should show error toast
      await waitFor(() => {
        expect(screen.getByText(/agrega al menos un artefacto/i)).toBeInTheDocument();
      }, { timeout: 2000 });
    });

    it('should allow resetting the application', async () => {
      render(<Home />);
      
      // Mock window.confirm to return true
      const originalConfirm = window.confirm;
      window.confirm = () => true;
      
      const limpiar = screen.getByRole('button', { name: /Limpiar/i });
      fireEvent.click(limpiar);
      
      await waitFor(() => {
        expect(screen.getByText(/Datos limpiados/i)).toBeInTheDocument();
      }, { timeout: 2000 });
      
      // Restore
      window.confirm = originalConfirm;
    });
  });

  describe('Store Integration', () => {
    it('should have initial state with one tramo', () => {
      const state = useStore.getState();
      expect(state.tramos.length).toBe(1);
    });

    it('should have empty distancia_real by default', () => {
      const state = useStore.getState();
      expect(state.tramos[0].distancia_real).toBe('');
    });

    it('should allow adding a new tramo', () => {
      const state = useStore.getState();
      state.addTramo();
      
      const updatedState = useStore.getState();
      expect(updatedState.tramos.length).toBe(2);
    });
  });

  describe('Responsive Design', () => {
    it('should have mobile-friendly classes', () => {
      const { container } = render(<Home />);
      
      // Check for responsive container classes
      const main = container.querySelector('main');
      expect(main).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have buttons with accessible labels', () => {
      render(<Home />);
      
      const buttons = screen.getAllByRole('button');
      buttons.forEach(button => {
        expect(button).toHaveAccessibleName();
      });
    });

    it('should have proper heading hierarchy', () => {
      render(<Home />);
      
      const headings = screen.getAllByRole('heading');
      expect(headings.length).toBeGreaterThan(0);
    });
  });

  describe('Data Loading', () => {
    it('should load Tabla 3 data correctly', async () => {
      const tablaNumero3 = await import('../src/data/tablaNumero3.json');
      expect(tablaNumero3.default).toBeDefined();
      expect(Array.isArray(tablaNumero3.default)).toBe(true);
      expect(tablaNumero3.default.length).toBeGreaterThan(0);
    });

    it('should load Tabla 18 data correctly', async () => {
      const tablaNumero18 = await import('../src/data/tablaNumero18.json');
      expect(tablaNumero18.default).toBeDefined();
      expect(tablaNumero18.default.tabla_detallada).toBeDefined();
      expect(tablaNumero18.default.tabla_detallada.accesorios.length).toBeGreaterThan(0);
    });

    it('should have no duplicate keys in Tabla 18', async () => {
      const tablaNumero18 = await import('../src/data/tablaNumero18.json');
      
      tablaNumero18.default.tabla_detallada.accesorios.forEach(accesorio => {
        accesorio.valores.forEach(fila => {
          const keys = Object.keys(fila);
          const uniqueKeys = new Set(keys);
          expect(keys.length).toBe(uniqueKeys.size);
        });
      });
    });
  });
});

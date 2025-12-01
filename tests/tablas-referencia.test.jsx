import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TablasReferencia from '../src/components/TablasReferencia';
import tablaNumero3 from '../src/data/tablaNumero3.json';
import tablaNumero18 from '../src/data/tablaNumero18.json';

describe('TablasReferencia Component', () => {
  describe('Initial Rendering', () => {
    it('should render main header and subtitle', () => {
      render(<TablasReferencia />);
      
      expect(screen.getByText(/Tablas de Referencia Técnica/i)).toBeInTheDocument();
      expect(screen.getByText(/Consulta las tablas utilizadas/i)).toBeInTheDocument();
    });

    it('should render both table cards collapsed by default', () => {
      render(<TablasReferencia />);
      
      expect(screen.getByText(/Tabla N° 3 - Gas Natural/i)).toBeInTheDocument();
      expect(screen.getByText(/Tabla N° 18 - Gas Natural/i)).toBeInTheDocument();
    });

    it('should not show table content initially', () => {
      const { container } = render(<TablasReferencia />);
      
      const tabla3Content = container.querySelector('.tabla-3');
      const tabla18Content = container.querySelector('.tabla-18');
      
      expect(tabla3Content).not.toBeInTheDocument();
      expect(tabla18Content).not.toBeInTheDocument();
    });
  });

  describe('Tabla N°3 Expansion', () => {
    it('should expand Tabla 3 when header is clicked', () => {
      const { container } = render(<TablasReferencia />);
      
      const tabla3Header = screen.getByText(/Tabla N° 3 - Gas Natural/i).closest('.tabla-card-header');
      fireEvent.click(tabla3Header);
      
      const tabla3Content = container.querySelector('.tabla-3');
      expect(tabla3Content).toBeInTheDocument();
    });

    it('should display all rows from tablaNumero3.json', () => {
      const { container } = render(<TablasReferencia />);
      
      const tabla3Header = screen.getByText(/Tabla N° 3 - Gas Natural/i).closest('.tabla-card-header');
      fireEvent.click(tabla3Header);
      
      const rows = container.querySelectorAll('.tabla-3 tbody tr');
      expect(rows.length).toBe(tablaNumero3.length);
    });

    it('should display correct column headers for Tabla 3', () => {
      render(<TablasReferencia />);
      
      const tabla3Header = screen.getByText(/Tabla N° 3 - Gas Natural/i).closest('.tabla-card-header');
      fireEvent.click(tabla3Header);
      
      expect(screen.getByText('Longitud (m)')).toBeInTheDocument();
      expect(screen.getByText(/13 \(1\/2"\)/)).toBeInTheDocument();
      expect(screen.getByText(/19 \(3\/4"\)/)).toBeInTheDocument();
    });

    it('should collapse Tabla 3 when header is clicked again', () => {
      const { container } = render(<TablasReferencia />);
      
      const tabla3Header = screen.getByText(/Tabla N° 3 - Gas Natural/i).closest('.tabla-card-header');
      
      // Expand
      fireEvent.click(tabla3Header);
      let tabla3Content = container.querySelector('.tabla-3');
      expect(tabla3Content).toBeInTheDocument();
      
      // Collapse
      fireEvent.click(tabla3Header);
      tabla3Content = container.querySelector('.tabla-3');
      expect(tabla3Content).not.toBeInTheDocument();
    });
  });

  describe('Tabla N°18 Expansion', () => {
    it('should expand Tabla 18 when header is clicked', () => {
      const { container } = render(<TablasReferencia />);
      
      const tabla18Header = screen.getByText(/Tabla N° 18 - Gas Natural/i).closest('.tabla-card-header');
      fireEvent.click(tabla18Header);
      
      const accesoriosSimples = container.querySelector('.accesorios-simples');
      expect(accesoriosSimples).toBeInTheDocument();
    });

    it('should display all accesorios simples', () => {
      const { container } = render(<TablasReferencia />);
      
      const tabla18Header = screen.getByText(/Tabla N° 18 - Gas Natural/i).closest('.tabla-card-header');
      fireEvent.click(tabla18Header);
      
      const accesoriosSimples = Object.keys(tablaNumero18.accesorios_simples);
      accesoriosSimples.forEach(accesorio => {
        expect(screen.getByText(accesorio)).toBeInTheDocument();
      });
    });

    it('should display all accessory sections with correct factor badges', () => {
      render(<TablasReferencia />);
      
      const tabla18Header = screen.getByText(/Tabla N° 18 - Gas Natural/i).closest('.tabla-card-header');
      fireEvent.click(tabla18Header);
      
      tablaNumero18.tabla_detallada.accesorios.forEach(accesorio => {
        expect(screen.getByText(accesorio.nombre)).toBeInTheDocument();
        expect(screen.getByText(`Factor: ${accesorio.factor_d}d`)).toBeInTheDocument();
      });
    });

    it('should display correct number of rows for each accessory', () => {
      const { container } = render(<TablasReferencia />);
      
      const tabla18Header = screen.getByText(/Tabla N° 18 - Gas Natural/i).closest('.tabla-card-header');
      fireEvent.click(tabla18Header);
      
      const allTables = container.querySelectorAll('.tabla-18');
      expect(allTables.length).toBe(tablaNumero18.tabla_detallada.accesorios.length);
      
      // Check first table has correct number of rows
      const firstTableRows = allTables[0].querySelectorAll('tbody tr');
      expect(firstTableRows.length).toBe(tablaNumero18.tabla_detallada.accesorios[0].valores.length);
    });
  });

  describe('Highlighted Values', () => {
    it('should not highlight any cells when highlightedValues is null', () => {
      const { container } = render(<TablasReferencia highlightedValues={null} />);
      
      const tabla3Header = screen.getByText(/Tabla N° 3 - Gas Natural/i).closest('.tabla-card-header');
      fireEvent.click(tabla3Header);
      
      const highlightedCells = container.querySelectorAll('.highlighted');
      expect(highlightedCells.length).toBe(0);
    });

    it('should highlight Tabla 3 cells when highlightedValues provided', () => {
      const highlightedValues = {
        tabla3: {
          distancia: 10,
          consumo: '25'
        }
      };
      
      const { container } = render(<TablasReferencia highlightedValues={highlightedValues} />);
      
      const tabla3Header = screen.getByText(/Tabla N° 3 - Gas Natural/i).closest('.tabla-card-header');
      fireEvent.click(tabla3Header);
      
      const highlightedCells = container.querySelectorAll('.tabla-3 .highlighted');
      // Should have at least one highlighted cell
      expect(highlightedCells.length).toBeGreaterThan(0);
    });
  });

  describe('Responsive Behavior', () => {
    it('should have responsive CSS classes', () => {
      const { container } = render(<TablasReferencia />);
      
      expect(container.querySelector('.tablas-referencia-container')).toBeInTheDocument();
    });

    it('should have scroll containers for tables', () => {
      const { container } = render(<TablasReferencia />);
      
      const tabla3Header = screen.getByText(/Tabla N° 3 - Gas Natural/i).closest('.tabla-card-header');
      fireEvent.click(tabla3Header);
      
      const scrollContainer = container.querySelector('.tabla-scroll-container');
      expect(scrollContainer).toBeInTheDocument();
    });
  });

  describe('Data Integrity', () => {
    it('should have no duplicate keys in JSON data for Tabla 18', () => {
      tablaNumero18.tabla_detallada.accesorios.forEach(accesorio => {
        accesorio.valores.forEach(fila => {
          const keys = Object.keys(fila);
          const uniqueKeys = new Set(keys);
          expect(keys.length).toBe(uniqueKeys.size);
        });
      });
    });

    it('should have consistent number of columns across all rows in Tabla 3', () => {
      const firstRow = tablaNumero3[0];
      const expectedKeys = Object.keys(firstRow);
      
      tablaNumero3.forEach(row => {
        const rowKeys = Object.keys(row);
        expect(rowKeys.length).toBe(expectedKeys.length);
      });
    });
  });
});

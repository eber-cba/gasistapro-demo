import { describe, it, expect } from 'vitest';
import { calcularDiametros } from '../src/logic/calcularDiametros';

describe('calcularDiametros', () => {
  it('should calculate diameters correctly for exact distance and consumption', () => {
    // Distancia 2m, Consumo 3.5 m3/h (3500 l/h)
    // Tabla 2m: 13mm -> 3580 l/h
    // Debería seleccionar 13
    const result = calcularDiametros(2, 3.5); 
    expect(result.diametro_provisorio).toBe('13');
    expect(result.diametro_definitivo).toBe('13');
    expect(result.isValid).toBe(true);
  });

  it('should choose larger diameter when consumption exceeds limit of smaller one', () => {
    // Distancia 2m, Consumo 4.0 m3/h (4000 l/h)
    // Tabla 2m: 13mm -> 3580 l/h (insuficiente)
    // Tabla 2m: 19mm -> 9895 l/h (suficiente)
    // Debería seleccionar 19
    const result = calcularDiametros(2, 4.0); 
    expect(result.diametro_provisorio).toBe('19');
    expect(result.diametro_definitivo).toBe('19');
    expect(result.isValid).toBe(true);
  });

  it('should use next available distance row if exact distance not found', () => {
    // Distancia 2.5m (no existe, usa 3m)
    // Consumo 2.0 m3/h (2000 l/h)
    // Tabla 3m: 13mm -> 2925 l/h
    // Debería seleccionar 13
    const result = calcularDiametros(2.5, 2.0); 
    expect(result.diametro_provisorio).toBe('13');
    expect(result.diametro_definitivo).toBe('13');
    expect(result.isValid).toBe(true);
  });

  it('should handle larger distances correctly', () => {
    // Distancia 10m, Consumo 2.0 m3/h (2000 l/h)
    // Tabla 10m: 13mm -> 1600 l/h (insuficiente)
    // Tabla 10m: 19mm -> 4420 l/h (suficiente)
    // Debería seleccionar 19
    const result = calcularDiametros(10, 2.0); 
    expect(result.diametro_provisorio).toBe('19');
    expect(result.diametro_definitivo).toBe('19');
    expect(result.isValid).toBe(true);
  });

  it('should return isValid false for out of range distance', () => {
    const result = calcularDiametros(300, 1.0); // Max distance is usually 200m or less in table
    expect(result.isValid).toBe(false);
    expect(result.mensaje).toContain('excede el máximo');
  });

  it('should return isValid false if consumption is too high for any diameter', () => {
    // Distancia 10m, Consumo 1000 m3/h (1,000,000 l/h)
    // Max en 10m es 101mm -> 287,189 l/h
    const result = calcularDiametros(10, 1000); 
    expect(result.isValid).toBe(false);
    expect(result.mensaje).toContain('No se encontró un diámetro');
  });

  it('should include steps in the result', () => {
    const result = calcularDiametros(5, 1.0);
    expect(result.steps).toBeInstanceOf(Array);
    expect(result.steps.length).toBeGreaterThan(0);
  });
});
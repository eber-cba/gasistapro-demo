import { describe, it, expect } from 'vitest';
import { calcularDiametros } from '../src/logic/calcularDiametros';

describe('calcularDiametros', () => {
  it('should calculate diameters for exact distance and consumption', () => {
    const result = calcularDiametros(5, 1.0); // dist 5m, consumo 1.0 m3/h -> ½"
    expect(result.diametro_provisorio).toBe('½"');
    expect(result.diametro_definitivo).toBe('½"');
    expect(result.isValid).toBe(true);
  });

  it('should choose the safer (larger) diameter when distance is between table values', () => {
    // Distance 7m (between 5 and 10), Consumption 1.0 m3/h
    // For 5m, 1.0 m3/h -> ½"
    // For 10m, 1.0 m3/h -> ¾"
    // Should choose ¾"
    const result = calcularDiametros(7, 1.0); 
    expect(result.diametro_provisorio).toBe('¾"');
    expect(result.diametro_definitivo).toBe('¾"');
    expect(result.isValid).toBe(true);
  });

  it('should choose the safer (larger) diameter when consumption is between table values', () => {
    // Distance 5m, Consumption 0.7 m3/h (between 0.5 and 1.0)
    // For 5m, 0.5 m3/h -> ½"
    // For 5m, 1.0 m3/h -> ½"
    // Should choose ½" (or the largest if different, but in this case they are the same)
    const result = calcularDiametros(5, 0.7); 
    expect(result.diametro_provisorio).toBe('½"');
    expect(result.diametro_definitivo).toBe('½"');
    expect(result.isValid).toBe(true);
  });

  it('should choose the safer (larger) diameter for distance 12m, consumo 1.2m3/h', () => {
    // For 10m, 1.0 m3/h -> ¾"
    // For 10m, 1.5 m3/h -> ¾"
    // For 15m, 1.0 m3/h -> ¾"
    // For 15m, 1.5 m3/h -> 1"
    // With 12m and 1.2m3/h, it should pick based on 15m and 1.5m3/h values (upper bounds for safety)
    const result = calcularDiametros(12, 1.2); 
    expect(result.diametro_provisorio).toBe('1"'); // Based on 15m, 1.5m3/h lookup
    expect(result.diametro_definitivo).toBe('1"');
    expect(result.isValid).toBe(true);
  });

  it('should return isValid false for out of range distance', () => {
    const result = calcularDiametros(100, 1.0); // Out of max distance 40
    expect(result.isValid).toBe(false);
    expect(result.mensaje).toContain('fuera del rango');
  });

  it('should return isValid false for out of range consumption', () => {
    const result = calcularDiametros(5, 10.0); // Out of max consumption 5.0
    expect(result.isValid).toBe(false);
    expect(result.mensaje).toContain('fuera del rango');
  });

  it('should include steps in the result', () => {
    const result = calcularDiametros(5, 1.0);
    expect(result.steps).toBeInstanceOf(Array);
    expect(result.steps.length).toBeGreaterThan(0);
  });
});
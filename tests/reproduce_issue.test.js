import { describe, it, expect } from 'vitest';
import { performFullCalculation } from '../src/logic/calculation';

describe('Calculation Logic Reproduction', () => {
  it('should calculate equivalent distance correctly with diameters', () => {
    const mockTramos = [
      {
        id: '1',
        name: 'Tramo Test',
        distancia_real: 10,
        artifacts: [{ power_kcalh: 10000 }],
        accesorios: [
          { tipo: 'codo_90', diametro: '3/4', cantidad: 4 }, // 4 * 0.57 = 2.28
          { tipo: 'te_flujo_90', diametro: '1/2', cantidad: 2 }  // 2 * 0.78 = 1.56
        ]
      }
    ];

    const results = performFullCalculation(mockTramos);
    const tramo = results[0];

    console.log('Distancia Equivalente:', tramo.distancia_equivalente);
    
    // Expected: 2.28 + 1.56 = 3.84
    expect(tramo.distancia_equivalente).toBeGreaterThan(0);
    expect(tramo.distancia_equivalente).toBeCloseTo(3.84, 2);
  });
});

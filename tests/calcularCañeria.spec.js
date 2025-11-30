import { describe, it, expect } from 'vitest'
import tabla from '../src/data/tablaCanos.json'
import { evaluarCañeria } from '../src/logic/calcularCañeria'

describe('evaluarCañeria', () => {
  it('aprobado cuando potencia <= maxima exacta', () => {
    const res = evaluarCañeria(tabla, 12000, 10, '3/4')
    expect(res.aprobado).toBe(true)
    expect(res.potencia_max).toBeGreaterThanOrEqual(12000)
  })

  it('no aprobado y recomienda siguiente diametro', () => {
    const res = evaluarCañeria(tabla, 25000, 10, '3/4')
expect(res.diametro_recomendado).toBe('1¼')
  })

  it('interpolacion entre longitudes', () => {
    const res = evaluarCañeria(tabla, 15000, 6, '3/4') // 6m -> between 5 and 7
    expect(res.potencia_max).toBeGreaterThan(14000)
    expect(res.potencia_max).toBeLessThan(16000)
    expect(res.aprobado).toBe(true)
  })

  it('no aprobado con interpolacion y recomienda siguiente', () => {
    const res = evaluarCañeria(tabla, 15500, 6, '3/4');
    expect(res.aprobado).toBe(false);
    expect(res.diametro_recomendado).toBe('1');
  })
})

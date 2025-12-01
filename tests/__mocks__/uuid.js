// tests/__mocks__/uuid.js
import { vi } from 'vitest';

let count = 0;

export const v4 = vi.fn(() => {
  return `mock-uuid-${++count}`;
});

export const reset = () => {
  count = 0;
  vi.mocked(v4).mockClear();
};

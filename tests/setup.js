import { vi } from 'vitest';

// Define localStorageMock globally
const localStorageMock = (function () {
  let store = {};
  return {
    getItem: vi.fn((key) => store[key] || null),
    setItem: vi.fn((key, value) => {
      store[key] = value;
    }),
    removeItem: vi.fn((key) => {
      delete store[key];
    }),
    clear: vi.fn(() => {
      store = {};
    }),
  };
})();

// Assign it to window.localStorage
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

// Optionally, expose it for individual test files if needed
// This might not be strictly necessary if tests access window.localStorage directly
// @ts-ignore
window.localStorageMock = localStorageMock; // For easier access/clearing from test files
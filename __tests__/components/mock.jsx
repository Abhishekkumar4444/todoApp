// jest.mock

// Mocks an entire module or file, replacing its methods with Jest's mock functions.
// You can control how all or specific exports of a module behave during testing.
// Best For:

// Mocking entire dependencies or modules.
// Replacing the implementation of all methods in a module for isolation during testing.

import {add, multiply} from '../../src/utils';

// Test file
jest.mock('../../src/utils', () => ({
  multiply: jest.fn(),
  add: jest.fn(),
}));

test('jest.mock example', () => {
  // Mock implementation
  multiply.mockImplementation((a, b) => 42);

  // Call the mocked function
  const result = multiply(2, 3);

  // Assertions
  expect(multiply).toHaveBeenCalled(); // Check if multiply was called
  expect(multiply).toHaveBeenCalledWith(2, 3); // Check arguments
  expect(result).toBe(42); // Custom mocked implementation

  expect(add).not.toHaveBeenCalled(); // add was not called
});

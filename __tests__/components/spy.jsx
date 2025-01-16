// jest.spyOn

// Creates a spy on an existing method of an object or module.
// Allows you to track calls to that method, control its behavior, and assert how it was used.
// The original implementation is still available unless overridden.
// Best For:

// Mocking specific methods of an object or a module without affecting other methods.
// Testing if a particular function was called and how it was called.

const utils = {
  multiply: (a, b) => a * b,
};

test('jest.spyOn example', () => {
  // Spy on the multiply method
  const spy = jest.spyOn(utils, 'multiply');

  // Call the method
  const result = utils.multiply(2, 3);

  // Assertions
  expect(spy).toHaveBeenCalled(); // Check if the method was called
  expect(spy).toHaveBeenCalledWith(2, 3); // Check arguments
  expect(result).toBe(6); // Original implementation works

  spy.mockRestore(); // Restore the original method if needed
});

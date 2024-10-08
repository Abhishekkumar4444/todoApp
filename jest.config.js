module.exports = {
  preset: '@testing-library/react-native',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  setupFilesAfterEnv: ['./jest-setup.js'], // For adding custom matchers or other setup
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': 'babel-jest', // Transform JS and TS files
  },
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|react-redux|@reduxjs/toolkit|redux-saga|@react-native|@react-native/assets)/)', // Ensure proper transformation of necessary modules
  ],
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$', // Test file regex
  testPathIgnorePatterns: ['/node_modules/', '/android/', '/ios/'], // Ignore unnecessary paths
  collectCoverage: true, // Enable coverage collection
  coverageDirectory: 'coverage', // Output directory for coverage reports
  coverageReporters: ['json', 'text', 'lcov', 'clover'], // Coverage formats
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}', // Collect coverage from source files
    '!src/**/*.d.ts', // Ignore TypeScript declaration files
    '!src/navigation/*.{js,jsx,ts,tsx}', // Exclude navigation files from coverage
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1', // Alias for imports from 'src'
    '\\.(png|jpg|jpeg|gif|svg)$': '<rootDir>/__mocks__/fileMock.js', // Mock static assets
  },
  globals: {
    'ts-jest': {
      babelConfig: true, // For transforming TypeScript with Babel
    },
  },
};

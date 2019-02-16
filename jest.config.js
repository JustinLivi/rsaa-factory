module.exports = {
  automock: false,
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['./setupJest.ts', 'jest-extended']
};

import type { Config } from "@jest/types";
// Sync object
const config: Config.InitialOptions = {
  verbose: true,
  transform: {
    "^.+\\.ts?$": "ts-jest"
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  collectCoverageFrom: [
    'src/**/*.ts',
    '!**/node_modules/**',
    '!**/tests/**',
  ],
  collectCoverage: true,
  coveragePathIgnorePatterns: ["./src/server.ts"]
};
export default config;

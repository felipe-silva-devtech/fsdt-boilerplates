import nextJest from "next/jest";

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageReporters: ["lcov"],
  collectCoverageFrom: ["./src/components/**/*.{js,jsx,ts,tsx}"],
  moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
  preset: "ts-jest",
  setupFilesAfterEnv: ["./jest.setup.ts"],
  testEnvironment: "jest-environment-jsdom",
  testMatch: ["**/*.test.(js|jsx|ts|tsx)"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
};

module.exports = createJestConfig(customJestConfig);

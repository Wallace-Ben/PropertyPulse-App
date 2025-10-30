import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  moduleNameMapper: {
    // Handle CSS imports (Next.js style)
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    // Handle @/ imports
    "^@/(.*)$": "<rootDir>/$1",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
  testMatch: ["**/tests/**/*.(test|spec).[jt]s?(x)"],
};

export default config;

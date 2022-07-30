/// <reference types="vitest" />

import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globalSetup: 'test/global-setup.ts',
    testTimeout: 30000,
  },
});

import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",

  use: {
    baseURL: "http://localhost:5173",
    headless: true,
  },

  webServer: [
    {
      command: "npm run dev",
      port: 5173,
      reuseExistingServer: !process.env.CI,
    },
    {
      command: "uvicorn main:app --reload --port 8000",
      port: 8000,
      reuseExistingServer: !process.env.CI,
    },
  ],
});

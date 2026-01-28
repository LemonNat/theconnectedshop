import { defineConfig, devices } from '@playwright/test';
import type { ReporterConfig } from './custom-reporter';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */

const reporterConfig: ReporterConfig = {
  outputDir: 'test-results/enterprise-report',
  reportTitle: 'Test Execution Report',
  companyName: 'Моя Компанія',
  projectName: 'Test Suite',
  theme: 'auto',
  primaryColor: '#667eea',
  logo: 'data:image/png;base64,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',
  showPassedTests: true,
  showSkippedTests: true,
  showEnvironmentInfo: true,
  includeScreenshots: true,
  includeVideos: true,
  includeTraces: true,
  testCategories: ['smoke', 'regression', 'integration', 'e2e'],
};

export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['./custom-reporter.ts', reporterConfig]
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    baseURL: 'https://theconnectedshop.com/',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
   {
      name: 'chromium',
      use: {
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        trace: 'retain-on-failure',
      },
    },

    
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },


    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});

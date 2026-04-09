import { test as base } from '@playwright/test';

type TestType = (props: any, page: any) => void;

export type TestDataType = {
  path: string;
  tests: TestType[];
  runforEnv: string[];
  service: string;
  contentType?: string;
  applicationType?: string;
  siteId?: string;
  pageIdentifier?: string;
};

type FunctionProps = {
  pageType: string;
  testSuites: TestDataType[];
  beforeAll?: (() => void)[];
  beforeEachFns?: (() => void)[];
  testIsolation?: boolean;
  headers?: Record<string, string>;
};

export default function runTestsForPage({
  pageType,
  testSuites,
  beforeAll = [],
  beforeEachFns = [],
  // testIsolation = false,
  // headers,
}: FunctionProps) {
  const serviceToRun = process.env.ONLY_SERVICE;

  let testSuitesToRun = testSuites;
  if (serviceToRun) {
    testSuitesToRun = testSuites.filter(
      ({ service }) => service === serviceToRun,
    );
  }

  for (const testData of testSuitesToRun) {
    const { path, tests, runforEnv, ...params } = testData;
    const appEnv = process.env.APP_ENV ?? '';

    if (
      Array.isArray(runforEnv) &&
      typeof appEnv === 'string' &&
      runforEnv.includes(appEnv)
    ) {
      base.describe(`${path}`, () => {
        base.beforeAll(async ({ page }) => {
          for (const fn of beforeAll) fn();
          await page.goto(path, { waitUntil: 'domcontentloaded' });
        });

        base.beforeEach(async () => {
          for (const fn of beforeEachFns) fn();
          // Add any Playwright-specific setup here
        });

        const testParams = {
          path,
          pageType,
          ...params,
        };

        for (const testFn of tests) {
          testFn(testParams, base);
        }
      });
    }
  }
}

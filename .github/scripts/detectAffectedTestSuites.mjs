// Reads changed file paths (one per line) from stdin and prints `<suite>=<true|false>`
// for each CI test suite. Any file not explicitly ignored by a suite triggers it.
import { readFileSync } from 'node:fs';

const DOCUMENTATION = [
  /\.md$/,
  /^docs\//,
  /^ws-nextjs-app\/docs\//,
  /^\.github\/(ISSUE_TEMPLATE|instructions|skills)\//,
  /^\.vscode\//,
  /^LICENSE$/,
];
const STORIES = [/\.stories\.[jt]sx?$/, /^\.storybook\//];
const UNIT_TESTS = [/\.test\.[jt]sx?$/, /__snapshots__\//];
const INTEGRATION_TESTS = [/^ws-nextjs-app\/integration\//];
const PUPPETEER_TESTS = [/^puppeteer\//];
const CYPRESS_TESTS = [/^ws-nextjs-app\/cypress\//];
const PLAYWRIGHT_TESTS = [/^ws-nextjs-app\/playwright\//];

const SUITES = {
  unit: {
    triggeredBy: [],
    ignoredBy: [...DOCUMENTATION, ...CYPRESS_TESTS, ...PLAYWRIGHT_TESTS],
  },
  integration: {
    triggeredBy: INTEGRATION_TESTS,
    ignoredBy: [
      ...DOCUMENTATION,
      ...STORIES,
      ...UNIT_TESTS,
      ...PUPPETEER_TESTS,
      ...CYPRESS_TESTS,
      ...PLAYWRIGHT_TESTS,
    ],
  },
  localServer: {
    triggeredBy: PUPPETEER_TESTS,
    ignoredBy: [
      ...DOCUMENTATION,
      ...STORIES,
      ...UNIT_TESTS,
      ...INTEGRATION_TESTS,
      ...CYPRESS_TESTS,
      ...PLAYWRIGHT_TESTS,
    ],
  },
  cypress: {
    triggeredBy: CYPRESS_TESTS,
    ignoredBy: [
      ...DOCUMENTATION,
      ...STORIES,
      ...UNIT_TESTS,
      ...INTEGRATION_TESTS,
      ...PUPPETEER_TESTS,
      ...PLAYWRIGHT_TESTS,
    ],
  },
  playwright: {
    triggeredBy: PLAYWRIGHT_TESTS,
    ignoredBy: [
      ...DOCUMENTATION,
      ...STORIES,
      ...UNIT_TESTS,
      ...INTEGRATION_TESTS,
      ...PUPPETEER_TESTS,
      ...CYPRESS_TESTS,
    ],
  },
};

const matchesAny = (patterns, file) =>
  patterns.some(pattern => pattern.test(file));

const isSuiteAffectedBy =
  ({ triggeredBy, ignoredBy }) =>
  file =>
    matchesAny(triggeredBy, file) || !matchesAny(ignoredBy, file);

const changedFiles = readFileSync(0, 'utf8')
  .split('\n')
  .map(line => line.trim())
  .filter(Boolean);

const runEverything = changedFiles.length === 0;

Object.entries(SUITES).forEach(([suite, rules]) => {
  const affected = runEverything || changedFiles.some(isSuiteAffectedBy(rules));
  process.stdout.write(`${suite}=${affected}\n`);
});

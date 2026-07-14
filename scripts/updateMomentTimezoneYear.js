/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');

/*
 * Keeps the `endYear` passed to MomentTimezoneInclude in sync with the
 * upcoming year so the bundled moment-timezone data always covers the year
 * ahead. Run in December (see .github/workflows/update-moment-timezone-year.yml)
 * to bump every config file, or with `--check` to assert the values are current.
 */

const CONFIG_FILES = [
  '.storybook/main.ts',
  'cypress.config.ts',
  'ws-nextjs-app/next.config.js',
  'ws-nextjs-app/cypress.config.ts',
];

const END_YEAR_PATTERN =
  /(MomentTimezoneInclude\(\{\s*startYear:\s*\d{4},\s*endYear:\s*)(\d{4})/g;

const targetYear = new Date().getFullYear() + 1;
const checkOnly = process.argv.includes('--check');
const repoRoot = path.resolve(__dirname, '..');

const updates = CONFIG_FILES.map(relativePath => {
  const filePath = path.join(repoRoot, relativePath);
  const contents = fs.readFileSync(filePath, 'utf8');

  let matched = false;
  const updatedContents = contents.replace(
    END_YEAR_PATTERN,
    (_match, prefix) => {
      matched = true;
      return `${prefix}${targetYear}`;
    },
  );

  if (!matched) {
    throw new Error(
      `Could not find a MomentTimezoneInclude endYear value in ${relativePath}`,
    );
  }

  return {
    relativePath,
    filePath,
    contents,
    updatedContents,
    changed: contents !== updatedContents,
  };
});

const changedFiles = updates.filter(({ changed }) => changed);

if (checkOnly) {
  if (changedFiles.length > 0) {
    console.error(
      `MomentTimezoneInclude endYear is out of date (expected ${targetYear}) in:`,
    );
    changedFiles.forEach(({ relativePath }) =>
      console.error(`  - ${relativePath}`),
    );
    console.error('Run `yarn update-moment-timezone-year` to fix.');
    process.exit(1);
  }
  console.log(`MomentTimezoneInclude endYear is up to date (${targetYear}).`);
  process.exit(0);
}

if (changedFiles.length === 0) {
  console.log(`MomentTimezoneInclude endYear already set to ${targetYear}.`);
  process.exit(0);
}

changedFiles.forEach(({ filePath, updatedContents, relativePath }) => {
  fs.writeFileSync(filePath, updatedContents);
  console.log(`Updated endYear to ${targetYear} in ${relativePath}`);
});

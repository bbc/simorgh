const fs = require('fs');
const path = require('path');
const pathnames = require('./pathnames');

const createTestFile = (filePath, content) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, content, (error) => {
      if (error) {
        // eslint-disable-next-line no-console
        console.info('An Error Occurred -- ', error);

        reject(error);
      } else {
        // eslint-disable-next-line no-console
        console.info(`Successfully created test file for ${filePath}`);

        resolve();
      }
    });
  });
};

const getTestFileContent = (pathname) => `/**
 * @pathname ${pathname}
 */

import { runSnapshotTests } from '../../common';

describe('Snapshot test for ${pathname}', () => {
  runSnapshotTests();
});
`;

const getFilePath = (pathname) =>
  path.join(
    __dirname,
    './tests/',
    `${pathname.substring(1).split('/').join('-')}.test.js`,
  );

const createTestFiles = (pathname) => {
  const filePath = getFilePath(pathname);

  const testFileContent = getTestFileContent(pathname);

  fs.mkdirSync(path.join(__dirname, './tests'), { recursive: true });

  return createTestFile(filePath, testFileContent);
};

Promise.all(pathnames.map(createTestFiles));

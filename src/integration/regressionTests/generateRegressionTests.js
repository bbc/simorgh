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

const metadataTests = fs.readFileSync(
  path.join(__dirname, 'metadataTests.js'),
  'utf8',
);

const headerTests = fs.readFileSync(
  path.join(__dirname, 'headerTests.js'),
  'utf8',
);

const mainContentTests = fs.readFileSync(
  path.join(__dirname, 'mainContentTests.js'),
  'utf8',
);

const footerTests = fs.readFileSync(
  path.join(__dirname, 'footerTests.js'),
  'utf8',
);

const getTestFileContent = (pathname) => `/**
 * @pathname ${pathname}
 */

${metadataTests}
${headerTests}
${mainContentTests}
${footerTests}`;

const getFilePath = (service, pageType, pathname) =>
  path.join(
    __dirname,
    'tests',
    service,
    pageType,
    `${pathname.substring(1).split('/').join('-')}.test.js`,
  );

const createTestFiles = () => {
  const services = Object.keys(pathnames);

  services.forEach((service) => {
    const pageTypes = Object.keys(pathnames[service]);

    pageTypes.forEach((pageType) => {
      const pathname = pathnames[service][pageType];
      const filePath = getFilePath(service, pageType, pathname);
      const testFileContent = getTestFileContent(pathname);

      fs.mkdirSync(path.join(__dirname, 'tests', service, pageType), {
        recursive: true,
      });

      return createTestFile(filePath, testFileContent);
    });
  });
};

createTestFiles();

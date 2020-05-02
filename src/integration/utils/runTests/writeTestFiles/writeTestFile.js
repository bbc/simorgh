/* eslint-disable no-console */

const fs = require('fs');
const path = require('path');
const prettifyContent = require('./prettifyContent');
const { SERVICES_TESTS_DIR } = require('../constants');

const getTestHead = ({ service, pathname }) => `
  /**
   * @service ${service}
   * @pathname ${pathname}
   */
`;

const getAmpTestBody = ({ service, pageType }) => `
  import runAmpTests from '../../../../pages/${pageType}/ampTests';

  describe('AMP ${service} ${pageType}', runAmpTests);
`;

const getCanonicalTestBody = ({ service, pageType }) => `
  import runCanonicalTests from '../../../../pages/${pageType}/canonicalTests';

  describe('Canonical ${service} ${pageType}', runCanonicalTests);
`;

module.exports = ({ service, pageType, pathname }) => {
  const testHead = getTestHead({ service, pathname });

  const ampTestContent = prettifyContent(`
    ${testHead}
    ${getAmpTestBody({ service, pageType })}
  `);

  const canonicalTestContent = prettifyContent(`
    ${testHead}
    ${getCanonicalTestBody({ service, pageType })}
  `);

  const testDirPath = path.join(
    __dirname,
    '../../../',
    SERVICES_TESTS_DIR,
    service,
    pageType,
    pathname.slice(1).split('/').join('-'),
  );

  fs.mkdirSync(testDirPath, {
    recursive: true,
  });

  fs.writeFileSync(
    path.join(testDirPath, 'amp.test.js'),
    ampTestContent,
    'utf8',
  );

  fs.writeFileSync(
    path.join(testDirPath, 'canonical.test.js'),
    canonicalTestContent,
    'utf8',
  );
};

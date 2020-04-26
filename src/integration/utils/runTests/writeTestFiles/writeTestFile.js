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

const getAmpTestBody = ({ service, pageType, parentDirPath }) => `
  import runAmpTests from '${parentDirPath}pages/${pageType}/ampTests';

  describe('AMP ${service} ${pageType}', runAmpTests);
`;

const getCanonicalTestBody = ({ service, pageType, parentDirPath }) => `
  import runCanonicalTests from '${parentDirPath}pages/${pageType}/canonicalTests';

  describe('Canonical ${service} ${pageType}', runCanonicalTests);
`;

module.exports = ({ service, variant = '', pageType, pathname }) => {
  const testHead = getTestHead({ service, pathname });
  const parentDirPath = variant ? '../../../../' : '../../../';

  const ampTestContent = prettifyContent(`
    ${testHead}
    ${getAmpTestBody({ service, pageType, parentDirPath })}
  `);

  const canonicalTestContent = prettifyContent(`
    ${testHead}
    ${getCanonicalTestBody({ service, pageType, parentDirPath })}
  `);

  const testDirPath = path.join(
    __dirname,
    '../../../',
    SERVICES_TESTS_DIR,
    service,
    variant,
    pageType,
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

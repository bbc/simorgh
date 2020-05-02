/* eslint-disable no-console */

const writeTestFile = require('./writeTestFile');
const { SERVICES } = require('../constants');
const { getPageTypes, getPathnames } = require('./utils');

module.exports = () => {
  SERVICES.forEach(service => {
    const pageTypes = getPageTypes(service);

    pageTypes.forEach(pageType => {
      const pathnames = getPathnames(service, pageType);

      pathnames.forEach(pathname => {
        writeTestFile({ service, pageType, pathname });
      });
    });
  });
};

import chartbeatTests from '../../../support/helpers/chartbeatTests';

export default ({ service, pageType, variant = 'default' }) => {
  describe(`testsForCanonicalOnly for ${service} ${pageType} ${variant}`, () => {
    chartbeatTests();
  });
};

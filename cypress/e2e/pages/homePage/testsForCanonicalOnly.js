import runAdsTests from '../../../support/helpers/adsTests/testsForCanonicalOnly';
import chartbeatTests from '../../../support/helpers/chartbeatTests';
import getAppEnv from '../../../support/helpers/getAppEnv';

export default ({ service }) => {
  if (getAppEnv() === 'local') {
    runAdsTests({ service });
  }

  chartbeatTests();
};

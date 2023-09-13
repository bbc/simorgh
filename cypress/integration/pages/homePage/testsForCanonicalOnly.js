import runAdsTests from '../../../support/helpers/adsTests/testsForCanonicalOnly';
import getAppEnv from '../../../support/helpers/getAppEnv';

export default ({ service }) => {
  if (getAppEnv() === 'local') {
    runAdsTests({ service });
  }
};

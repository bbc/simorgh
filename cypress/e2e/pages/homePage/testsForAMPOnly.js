import runAdsTests from '../../../support/helpers/adsTests/testsForAMPOnly';
import getAppEnv from '../../../support/helpers/getAppEnv';

export default ({ service }) => {
  if (getAppEnv() === 'local') {
    runAdsTests({ service });
  }
};

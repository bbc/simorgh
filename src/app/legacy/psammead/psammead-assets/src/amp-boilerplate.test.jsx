import { shouldMatchSnapshot } from '#psammead/psammead-test-helpers/src';
import * as boilerplate from './amp-boilerplate';

describe('AMP Boilerplate', () => {
  describe('styles', () => {
    shouldMatchSnapshot('should render AMP Script', boilerplate.AMP_SCRIPT);
    shouldMatchSnapshot(
      'should render AMP NoScript',
      boilerplate.AMP_NO_SCRIPT,
    );
  });
  describe('JavaScript', () => {
    shouldMatchSnapshot(
      'should render AMP Access JS',
      boilerplate.AMP_ACCESS_JS,
    );
    shouldMatchSnapshot(
      'should render AMP Analytics JS',
      boilerplate.AMP_ANALYTICS_JS,
    );
    shouldMatchSnapshot('should render AMP Bind JS', boilerplate.AMP_BIND_JS);
    shouldMatchSnapshot(
      'should render AMP Consent JS',
      boilerplate.AMP_CONSENT_JS,
    );
    shouldMatchSnapshot('should render AMP Geo JS', boilerplate.AMP_GEO_JS);
    shouldMatchSnapshot('should render AMP JS', boilerplate.AMP_JS);
    shouldMatchSnapshot('should render AMP List JS', boilerplate.AMP_LIST_JS);
    shouldMatchSnapshot(
      'should render AMP Mustache JS',
      boilerplate.AMP_MUSTACHE_JS,
    );
    shouldMatchSnapshot('should render AMP ads JS', boilerplate.AMP_ADS_JS);
    shouldMatchSnapshot('should render AMP AD', boilerplate.AMP_AD);
    shouldMatchSnapshot(
      'should render AMP SCRIPT JS',
      boilerplate.AMP_SCRIPT_JS,
    );
  });
});

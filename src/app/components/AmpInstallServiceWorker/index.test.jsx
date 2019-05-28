import React from 'react';
import { shouldMatchSnapshot } from '../../helpers/tests/testHelpers';
import AmpInstallServiceWorker from '.';

process.env.SIMORGH_BASE_URL = 'https://foobar.com';

describe('ConsentBanner', () => {
  shouldMatchSnapshot(
    'should correctly render',
    <AmpInstallServiceWorker service="news" />,
  );
});

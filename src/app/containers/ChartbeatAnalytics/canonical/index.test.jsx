import React from 'react';
import { shouldMatchSnapshot } from '../../../../testHelpers';
import CanonicalChartbeatAnalytics from '.';

describe('CanonicalChartbeatAnalytics', () => {
  const props = {
    domain: 'test-domain',
    type: 'article',
    sections: 'section1 section2',
    cookie: 'cookie',
    chartbeatUID: 1111,
  };
  shouldMatchSnapshot(
    'should return script snippet',
    <CanonicalChartbeatAnalytics {...props} />,
  );
});

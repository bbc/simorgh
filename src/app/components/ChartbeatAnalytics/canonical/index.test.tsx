import { render } from '@testing-library/react';
import { Helmet } from 'react-helmet';

import type { CanonicalChartbeatConfig } from '../types';
import CanonicalChartbeatAnalytics from '.';

describe('CanonicalChartbeatAnalytics', () => {
  afterEach(jest.clearAllMocks);

  const pageConfig: CanonicalChartbeatConfig = {
    domain: 'test-domain',
    sections: 'section1 section2',
    virtualReferrer: null,
    useCanonical: true,
    title: 'Page A',
    uid: 123,
  };

  it('should return the helmet wrapper with the script snippet', () => {
    render(
      <CanonicalChartbeatAnalytics
        chartbeatConfig={pageConfig}
        chartbeatSource="//chartbeat.js"
      />,
    );
    expect(Helmet.peek().scriptTags).toMatchSnapshot();
  });
});

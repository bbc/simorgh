import React from 'react';
import { Helmet } from 'react-helmet';
import { render } from '@testing-library/react';
import CanonicalChartbeatAnalytics from '.';
import { CanonicalChartbeatConfig } from '../types';

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

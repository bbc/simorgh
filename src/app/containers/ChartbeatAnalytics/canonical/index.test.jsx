import React from 'react';
import renderer from 'react-test-renderer';
import CanonicalChartbeatAnalytics from '.';

describe('CanonicalChartbeatAnalytics', () => {
  const props = {
    domain: 'test-domain',
    type: 'article',
    sections: 'section1 section2',
    cookie: 'cookie',
    chartbeatUID: 1111,
    chartbeatSource: '//chartbeat.js',
  };
  it('should return the helmet wrapper with the script snippet', () => {
    const tree = renderer
      .create(<CanonicalChartbeatAnalytics {...props} />)
      .toTree();

    expect(tree).toMatchSnapshot();
  });
});

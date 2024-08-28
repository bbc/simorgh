import React from 'react';
import { render } from '#components/react-testing-library-with-providers';
import AmpChartbeatAnalytics from '.';

describe('AmpChartbeatAnalytics', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it('renders with appropriate props', () => {
    const config = {
      domain: 'test-domain',
      contentType: 'article',
      sections: 'section1 section2',
      uid: 1111,
      referrer: '/some-path',
      title: 'This is an article',
      idSync: {
        bbc_hid: 'cookie',
      },
      virtualReferrer: 'amp',
    };

    const expectedValue = {
      vars: config,
    };

    const { container } = render(
      <AmpChartbeatAnalytics chartbeatConfig={config} />,
    );

    expect(container.querySelectorAll('amp-analytics').length).toEqual(1);
    expect(
      container.querySelectorAll(
        'amp-analytics script[type="application/json"]',
      ).length,
    ).toEqual(1);
    expect(
      container.querySelector('amp-analytics script[type="application/json"]')
        ?.innerHTML,
    ).toMatch(JSON.stringify(expectedValue));
  });

  it('renders with with appropriate props without referrer or cookie', () => {
    const config = {
      domain: 'test-domain',
      contentType: 'article',
      sections: 'section1 section2',
      uid: 1111,
      referrer: null,
      title: 'This is an article',
    };

    const expectedValue = {
      vars: config,
    };

    const { container } = render(
      // @ts-expect-error testing for missing referrer and cookie
      <AmpChartbeatAnalytics chartbeatConfig={config} />,
    );

    expect(container.querySelectorAll('amp-analytics').length).toEqual(1);
    expect(
      container.querySelectorAll(
        'amp-analytics script[type="application/json"]',
      ).length,
    ).toEqual(1);
    expect(
      container.querySelector('amp-analytics script[type="application/json"]')
        ?.innerHTML,
    ).toMatch(JSON.stringify(expectedValue));
  });
});

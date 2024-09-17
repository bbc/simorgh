import React from 'react';
import { render } from '#components/react-testing-library-with-providers';
import AmpATIAnalytics from '.';

describe('Amp ATI Analytics', () => {
  const atiBaseUrl = 'https://foobar.com?';

  beforeEach(() => {
    jest.resetModules();
  });

  it('creates an AMP analytics container with required parameters', () => {
    process.env.SIMORGH_ATI_BASE_URL = atiBaseUrl;

    const { container } = render(
      <AmpATIAnalytics pageviewParams="key1=value1&key2=value2" />,
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
    ).toMatch(atiBaseUrl);
  });
});

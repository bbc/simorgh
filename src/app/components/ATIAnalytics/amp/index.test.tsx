import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import AmpATIAnalytics from '.';

describe('Amp ATI Analytics', () => {
  const atiBaseUrl = 'https://foobar.com?';
  let container: HTMLElement;

  beforeEach(() => {
    jest.resetModules();
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  it('creates an AMP analytics container with required parameters', () => {
    process.env.SIMORGH_ATI_BASE_URL = atiBaseUrl;

    act(() => {
      ReactDOM.render(
        <AmpATIAnalytics pageviewParams="key1=value1&key2=value2" />,
        container,
      );
    });

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

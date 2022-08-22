import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import AmpChartbeatAnalytics from '.';

describe('AmpChartbeatAnalytics', () => {
  let container;

  beforeEach(() => {
    jest.resetModules();
    container = document.createElement('div');
    document.body.appendChild(container);
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
    };

    const expectedValue = {
      vars: config,
    };
    act(() => {
      ReactDOM.render(
        <AmpChartbeatAnalytics chartbeatConfig={config} />,
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
        .innerHTML,
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
    act(() => {
      ReactDOM.render(
        <AmpChartbeatAnalytics chartbeatConfig={config} />,
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
        .innerHTML,
    ).toMatch(JSON.stringify(expectedValue));
  });
});

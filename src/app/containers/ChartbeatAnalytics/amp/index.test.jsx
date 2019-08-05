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

  it('renders with with appropriate props', () => {
    const props = {
      domain: 'test-domain',
      type: 'article',
      sections: 'section1 section2',
      cookie: 'cookie',
      chartbeatUID: 1111,
      referrer: '/some-path',
      title: 'This is an article',
    };

    const expectedValue = {
      vars: {
        uid: props.chartbeatUID,
        title: props.title,
        sections: props.sections,
        domain: props.domain,
        contentType: props.type,
        virtualReferrer: props.referrer,
        idSync: {
          bbc_hid: props.cookie,
        },
      },
      triggers: { trackPageview: { on: 'visible', request: 'pageview' } },
    };
    act(() => {
      ReactDOM.render(<AmpChartbeatAnalytics {...props} />, container);
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
    const props = {
      domain: 'test-domain',
      type: 'article',
      sections: 'section1 section2',
      cookie: null,
      chartbeatUID: 1111,
      referrer: null,
      title: 'This is an article',
    };

    const expectedValue = {
      vars: {
        uid: props.chartbeatUID,
        title: props.title,
        sections: props.sections,
        domain: props.domain,
        contentType: props.type,
      },
      triggers: { trackPageview: { on: 'visible', request: 'pageview' } },
    };
    act(() => {
      ReactDOM.render(<AmpChartbeatAnalytics {...props} />, container);
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

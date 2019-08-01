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
    };

    const expectedValue = {
      vars: {
        uid: props.chartbeatUID,
        sections: props.sections,
        domain: props.domain,
        contentType: props.type,
        idSync: {
          bbc_hid: props.cookie,
        },
      },
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

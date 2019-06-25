import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import AmpATIAnalytics from '.';

describe('Amp ATI Analytics', () => {
  let container;
  beforeEach(() => {
    jest.resetModules();
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  it('should render amp-analytics with script tag', () => {
    act(() => {
      ReactDOM.render(<AmpATIAnalytics />, container);
    });

    expect(container.querySelectorAll('amp-analytics').length).toEqual(1);
    expect(
      container.querySelectorAll(
        'amp-analytics script[type="application/json"]',
      ).length,
    ).toEqual(1);
  });
});

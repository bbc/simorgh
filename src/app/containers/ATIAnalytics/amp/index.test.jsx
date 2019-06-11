import React from 'react';
import { mount } from 'enzyme';
import AmpATIAnalytics from '.';

describe('Amp ATI Analytics', () => {
  it('should render amp-analytics with JSON script', () => {
    expect(mount(<AmpATIAnalytics />).find('amp-analytics').length).toBe(1);
    expect(
      mount(<AmpATIAnalytics />).find(
        'amp-analytics script[type="application/json"]',
      ).length,
    ).toBe(1);
  });
});

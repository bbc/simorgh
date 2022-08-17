import React from 'react';
import { render } from '@testing-library/react';
import AmpComscore from '.';

describe('Assertions', () => {
  it('should render comscore amp-analytics component', () => {
    render(<AmpComscore />);

    const ampAnalyticsEl = document.querySelector('amp-analytics');
    const scriptEl = document.querySelector('script');
    const scriptContent =
      '{"vars":{"c2":"17986528"},"extraUrlParams":{"comscorekw":"amp"}}';

    expect(ampAnalyticsEl).toBeInTheDocument();
    expect(scriptEl).toBeInTheDocument();
    expect(ampAnalyticsEl).toContainElement(scriptEl);
    expect(scriptEl.textContent).toEqual(scriptContent);
  });
});

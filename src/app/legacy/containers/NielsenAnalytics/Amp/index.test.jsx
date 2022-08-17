import React from 'react';
import { render } from '@testing-library/react';
import AmpNielsenAnalytics from '.';

describe('Assertions', () => {
  it('should render Neilsen amp-analytics component', () => {
    render(
      <AmpNielsenAnalytics apid="apid" assetid="assetid" section="section" />,
    );

    const ampNeilsenEl = document.querySelector('amp-analytics');
    const scriptEl = document.querySelector('script');
    const scriptContent =
      '{"vars":{"apid":"apid","section":"section","apv":"1.0","type":"static","segC":"BBC - Google AMP"}}';

    expect(ampNeilsenEl).toBeInTheDocument();
    expect(scriptEl).toBeInTheDocument();
    expect(ampNeilsenEl).toContainElement(scriptEl);
    expect(scriptEl.textContent).toEqual(scriptContent);
  });
});

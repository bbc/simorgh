import React from 'react';
import { render } from '@testing-library/react';
import VjAmp from './VjAmp';

describe('VJ include container on Amp', () => {
  it('should render an amp-iframe', async () => {
    const { container } = render(<VjAmp />);
    expect(container.querySelectorAll('amp-iframe').length).toEqual(1);
  });
  it('amp-iframe should include a placeholder');
  // placeholder sizes
  it('amp-iframe should not exeed the width of the main content');
});

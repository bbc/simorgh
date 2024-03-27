import React from 'react';
import Footer from '#app/components/Footer';
import { render, screen } from '../react-testing-library-with-providers';

describe('Footer', () => {
  describe('AMP', () => {
    it('should render the cookie settings link as a button element', () => {
      render(<Footer />, { isAmp: true });
      expect(screen.getByText('Do not share or sell my info')).toHaveAttribute(
        'data-testid',
        'amp-cookie-settings-button',
      );
    });
  });

  describe('Canonical', () => {
    it('should render the "Do not share or sell my info" link as an anchor element when outside of UK', () => {
      render(<Footer />, { showAdsBasedOnLocation: true });
      expect(screen.getByText('Do not share or sell my info')).toHaveAttribute(
        'href',
        '#',
      );
    });
  });
});

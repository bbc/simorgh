import React from 'react';
import { render } from '../react-testing-library-with-providers';
import LiteSiteCta from '.';

describe('LiteSiteCTA', () => {
  describe('dummy code', () => {
    it('should render', () => {
      const { getByText } = render(<LiteSiteCta />);
      const ctaText = getByText('Go to main page');
      expect(ctaText).toBeInTheDocument();
    });
  });
});

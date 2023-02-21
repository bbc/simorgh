import React from 'react';
import { render } from '@testing-library/react';
import GlobalStyles from './global-styles';

/**
 * 15/10/20
 * Revisit snapshot mechanism following Emotion migration.
 */

describe('global-styles', () => {
  it('should render global styles', () => {
    render(<GlobalStyles />);
    expect(document.head).toMatchSnapshot();
  });

  it('should render global styles with @font-face rules', () => {
    render(<GlobalStyles />);
    expect(document.head).toMatchSnapshot();
  });
});

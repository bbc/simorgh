import React from 'react';
import { render } from '@testing-library/react';
import {
  F_REITH_SANS_REGULAR,
  F_REITH_SERIF_MEDIUM,
} from '@bbc/psammead-styles/fonts';
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
    render(
      <GlobalStyles fonts={[F_REITH_SANS_REGULAR(), F_REITH_SERIF_MEDIUM()]} />,
    );
    expect(document.head).toMatchSnapshot();
  });
});

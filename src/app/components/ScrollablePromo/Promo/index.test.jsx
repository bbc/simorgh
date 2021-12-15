import React from 'react';
import { render } from '@testing-library/react';
import { PromoSingleBlock } from '../helpers/fixtureData';
import Promo from '.';

describe('ScrollablePromo', () => {
  it('should render a link', () => {
    const { queryByRole } = render(<Promo block={PromoSingleBlock} />);
    expect(queryByRole('link')).toBeInTheDocument();
  });
});

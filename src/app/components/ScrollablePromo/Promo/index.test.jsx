import React from 'react';
import { render } from '@testing-library/react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import { PromoSingleBlock } from '../helpers/fixtureData';
import Promo from '.';

describe('ScrollablePromo', () => {
  it('should render a link', () => {
    const { queryByRole } = render(<Promo block={PromoSingleBlock} />);
    expect(queryByRole('link')).toBeInTheDocument();
  });

  shouldMatchSnapshot(
    'should truncate the link text if more than 3 lines',
    <Promo block={PromoSingleBlock} />,
  );
});

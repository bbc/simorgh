import React from 'react';
import { render } from '@testing-library/react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import {
  threeLinks,
  oneLinkOnly,
  moreThanThreeLinks,
  twoLinksWithNoImages,
} from './helpers/fixtureData';
import ScrollablePromo from '.';

describe('ScrollablePromo', () => {
  it('should render max 3 promo items', () => {
    const { getAllByRole } = render(
      <ScrollablePromo blocks={moreThanThreeLinks} />,
    );
    expect(getAllByRole('listitem').length).toEqual(3);
  });

  it.only('should render single promo item', () => {});
  // it('find out if this should be an unordered list', () => {});
  // it('find out about a11y requirements', () => {});
});

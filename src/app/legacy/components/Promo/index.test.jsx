import React from 'react';
import { suppressPropWarnings } from '#psammead/psammead-test-helpers/src';
import {
  render,
  screen,
} from '../../../components/react-testing-library-with-providers';
import Promo from '.';

// eslint-disable-next-line react/prop-types
const Fixture = ({ useLargeImages = false }) => (
  <Promo>
    <Promo.Image
      useLargeImages={useLargeImages}
      src="https://ichef.test.bbci.co.uk/news/{width}/cpsdevpb/3502/test/0c533a40-770b-11ed-bd83-8f15ba358e41.jpg"
      alt="Test image alt text"
      loading="lazy"
    />
    <Promo.Heading>test heading</Promo.Heading>
    <Promo.A>test link tag</Promo.A>
    <Promo.Body>test body</Promo.Body>
  </Promo>
);

describe('Promo component - Image', () => {
  suppressPropWarnings(['useLargeImages', 'undefined']);

  it('should render image using correct resolution and no large image on desktop', () => {
    render(<Fixture />);
    const imageEl = screen.getByAltText('Test image alt text');
    expect(imageEl).toHaveAttribute(
      'sizes',
      `(min-width: 63rem) 232px, (min-width: 37.5rem) 50vw, 33vw`,
    );
  });
  it('should use large image resolution and width when large image is true', () => {
    render(<Fixture useLargeImages />);
    const imageEl = screen.getByAltText('Test image alt text');
    expect(imageEl).toHaveAttribute(
      'sizes',
      `(min-width: 63rem) 660px, (min-width: 37.5rem) 50vw, 33vw`,
    );
  });
});

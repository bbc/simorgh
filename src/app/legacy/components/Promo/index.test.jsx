import React from 'react';
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
    <Promo.Timestamp>1699003658</Promo.Timestamp>
  </Promo>
);

// eslint-disable-next-line react/prop-types
const FixtureProgrammes = ({ useLargeImages = false }) => (
  <Promo>
    <Promo.Image
      useLargeImages={useLargeImages}
      src="https://ichef.bbci.co.uk/images/ic/{width}xn/p06vzdgj.jpg"
      alt="Test image alt text"
      loading="lazy"
    />
    <Promo.Heading>test heading</Promo.Heading>
    <Promo.A>test link tag</Promo.A>
    <Promo.Body>test body</Promo.Body>
  </Promo>
);

const stringTimestamp = '2023-11-03T05:17:09.393Z';
const unixTimestamp = 1698995115000;

describe('Promo component - Image', () => {
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

  it('should create src set using correct resolutions - programmes iChef recipes ', () => {
    render(<FixtureProgrammes />);

    const image = screen.getByAltText('Test image alt text');
    const srcSet = image.getAttribute('srcSet');

    const expectedResolutions = [96, 128, 176, 240, 352, 464, 672];
    expectedResolutions.forEach(resolution => {
      expect(srcSet).toContain(`${resolution}w`);
    });
  });

  it('should create src set using resolutions - all other iChef Recipes', () => {
    render(<Fixture />);

    const image = screen.getByAltText('Test image alt text');
    const srcSet = image.getAttribute('srcSet');

    const expectedResolutions = [85, 120, 170, 232, 325, 450, 660];
    expectedResolutions.forEach(resolution => {
      expect(srcSet).toContain(`${resolution}w`);
    });
  });
});

describe('Promo component - Timestamp', () => {
  it('should render timestamp in string format', () => {
    const { container } = render(<Fixture timestamp={stringTimestamp} />, {
      service: 'kyrgyz',
    });
    expect(container).toBeInTheDocument('5 саат мурда');
  });
  it('should render timestamp in epoch format', () => {
    const { container } = render(<Fixture timestamp={unixTimestamp} />, {
      service: 'serbian',
      variant: 'cyr',
    });
    expect(container).toBeInTheDocument('Пре 4 сата');
  });
});

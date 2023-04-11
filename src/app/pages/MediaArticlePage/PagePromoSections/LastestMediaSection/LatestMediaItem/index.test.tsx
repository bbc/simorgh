import React from 'react';
import {
  render,
  screen,
} from '../../../../../components/react-testing-library-with-providers';

import LatestMediaItem from '.';
import PromoContext from '../../../../../legacy/components/OptimoPromos/PromoContext';
import { LatestMedia } from '../LatestMediaTypes';

interface FixtureProps {
  mediaType?: 'audio' | 'video';
  imageAlt?: string;
}

const Fixture = ({ mediaType, imageAlt }: FixtureProps) => {
  const item = {
    id: 'cg311yd88jgo',
    type: 'video',
    duration: 'PT3M41S',
    title: 'Mene ne muhimmancin tafsiri da ake yawan yi da azumi?',
    firstPublished: '2023-03-30T04:10:35.206Z',
    link: 'https://www.bbc.com/hausa/articles/cg311yd88jgo',
    imageUrl:
      'https://ichef.bbci.co.uk/ace/standard/{width}/cpsprodpb/36D1/production/_127933041__63970643_bbc-news-world-service-logo-nc.png',
    description:
      "A wannan bidiyo, malamin ya yi bayani a kan muhimmancin tafsirin Alqur'ani mai girma wanda akan yawaita yi cikin watan azumin Ramadan.",
    imageAlt,
  };
  return (
    <PromoContext.Provider value={{ mediaType }}>
      <LatestMediaItem
        item={item as unknown as LatestMedia}
        ariaLabelledBy="promo-item"
      />
    </PromoContext.Provider>
  );
};

describe('Latest Media Indicator', () => {
  it('should format the img url correctly', () => {
    render(<Fixture />);

    const imgUrl =
      'https://ichef.bbci.co.uk/ace/standard/240/cpsprodpb/36D1/production/_127933041__63970643_bbc-news-world-service-logo-nc.png';
    const img = screen.getByRole('img');

    expect(img.getAttribute('src')).toEqual(imgUrl);
  });

  it('should render promo title as h3 element', () => {
    const { container } = render(<Fixture />);

    expect(container.querySelector('h3')).toBeTruthy();
  });

  it('should render image with default alt text, if no alt text is provided', () => {
    render(<Fixture />);

    const img = screen.getByRole('img');

    expect(img.getAttribute('alt')).toEqual('media image');
  });

  it('should render image with alt text when provided', () => {
    render(<Fixture imageAlt="test alt text" />);

    const img = screen.getByRole('img');

    expect(img.getAttribute('alt')).toEqual('test alt text');
  });

  // it('should render play icon when item is video', () => {
  //   const container = render(<Fixture duration="PT3M41S" mediaType="video" />);

  //   expect(container).toMatchSnapshot();
  // });

  // it('should render speaker icon when item is audio', () => {
  //   const container = render(<Fixture duration="PT3M41S" mediaType="audio" />);

  //   expect(container).toMatchSnapshot();
  // });

  // it('should only render icon when no duration provided', () => {
  //   const container = render(<Fixture duration="" mediaType="audio" />);

  //   expect(container).toMatchSnapshot();
  // });

  // it('should have aria-hidden attribute on time element', () => {
  //   const container = render(<Fixture duration="PT3M41S" mediaType="audio" />);

  //   const durationString = '3:41';

  //   expect(container.getByText(durationString)).toHaveAttribute('aria-hidden');
  // });
});

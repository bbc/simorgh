import React, { useMemo } from 'react';
import {
  render,
  screen,
} from '../../../../../components/react-testing-library-with-providers';

import LatestMediaItem from '.';
import PromoContext from '../../../../../legacy/components/OptimoPromos/PromoContext';
import { EventTrackingBlock } from '../../../../../models/types/eventTracking';
import { LatestMedia, Media } from '../types';

interface FixtureProps {
  mediaType?: Media;
  imageAlt?: string;
}

const Fixture = ({ mediaType, imageAlt }: FixtureProps) => {
  const item: LatestMedia = {
    id: 'cg311yd88jgo',
    type: 'video',
    duration: 'PT3M41S',
    title: 'Mene ne muhimmancin tafsiri da ake yawan yi da azumi?',
    firstPublished: '2023-03-30T04:10:35.206Z',
    link: 'https://www.bbc.com/hausa/articles/cg311yd88jgo',
    imageUrl:
      'https://ichef.bbci.co.uk/ace/ws/{width}/cpsprodpb/36D1/production/_127933041__63970643_bbc-news-world-service-logo-nc.png',
    description:
      "A wannan bidiyo, malamin ya yi bayani a kan muhimmancin tafsirin Alqur'ani mai girma wanda akan yawaita yi cikin watan azumin Ramadan.",
    imageAlt,
  };

  const memoizedValue = useMemo(() => ({ mediaType }), [mediaType]);
  return (
    <PromoContext.Provider value={memoizedValue}>
      <LatestMediaItem
        item={item}
        ariaLabelledBy="promo-item"
        ref={() => Promise.resolve()}
        eventTrackingData={{} as EventTrackingBlock}
      />
    </PromoContext.Provider>
  );
};

describe('Latest Media Item', () => {
  it('should format the img url correctly', () => {
    render(<Fixture />);

    const imgUrl =
      'https://ichef.bbci.co.uk/ace/ws/240/cpsprodpb/36D1/production/_127933041__63970643_bbc-news-world-service-logo-nc.png';
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

    expect(img.getAttribute('alt')).toEqual('Media image placeholder');
  });

  it('should render image with alt text when provided', () => {
    render(<Fixture imageAlt="test alt text" />);

    const img = screen.getByRole('img');

    expect(img.getAttribute('alt')).toEqual('test alt text');
  });
});

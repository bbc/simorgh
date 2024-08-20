import React, { useMemo } from 'react';
import { render, screen } from '@testing-library/react';
import { ServiceContextProvider } from '../../../../contexts/ServiceContext';
import LinkContents from '.';
import PromoContext from '../PromoContext';

const headlineDefault = 'this is a headline';
const mediaTypeDefault = 'video';
const mediaDurationDefault = 'PT200S';
const ariaLabelledByDefault = 'uniqueId';

const ContentFixture = ({
  id = 0,
  mediaType,
  mediaDuration,
  headline,
  isPhotoGallery,
  ariaLabelledBy,
}) => {
  const contentFixtureValue = useMemo(
    () => ({
      mediaType,
      ariaLabelledBy,
    }),
    [ariaLabelledBy, mediaType],
  );
  return (
    <ServiceContextProvider service="news">
      <PromoContext.Provider value={contentFixtureValue}>
        <LinkContents
          id={id}
          headline={headline}
          mediaDuration={mediaDuration}
          isPhotoGallery={isPhotoGallery}
        />
      </PromoContext.Provider>
    </ServiceContextProvider>
  );
};

describe('Promo Content', () => {
  it("should render a story's headline", () => {
    render(
      <ContentFixture
        headline={headlineDefault}
        ariaLabelledBy={ariaLabelledByDefault}
      />,
    );
    const heading = screen.getByText(headlineDefault);
    expect(heading).toBeInTheDocument();
  });

  it('should render with visually hidden text for media promos', () => {
    render(
      <ContentFixture
        headline={headlineDefault}
        mediaType={mediaTypeDefault}
        mediaDuration={mediaDurationDefault}
        ariaLabelledBy={ariaLabelledByDefault}
      />,
    );

    const heading = screen.getByText(headlineDefault);
    const mediaType = screen.getByText('Video,');
    const mediaDuration = screen.getByText(', Duration 3,20');

    expect(heading).toBeInTheDocument();
    expect(mediaType).toBeInTheDocument();
    expect(mediaDuration).toBeInTheDocument();
  });

  it('should render with visually hidden text for photogallery promos', () => {
    render(
      <ContentFixture
        headline={headlineDefault}
        ariaLabelledBy={ariaLabelledByDefault}
        isPhotoGallery
      />,
    );

    const heading = screen.getByText(headlineDefault);
    const photogallery = screen.getByText('Image gallery,');

    expect(heading).toBeInTheDocument();
    expect(photogallery).toBeInTheDocument();
  });
});

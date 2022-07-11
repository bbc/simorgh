/* eslint-disable react/prop-types */
import React from 'react';
import { render } from '@testing-library/react';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import LinkContents from '.';

const headlineDefault = 'this is a headline';
const mediaTypeDefault = 'video';
const mediaDurationDefault = 'PT200S';

const ContentComponent = ({
  id = 0,
  mediaType,
  mediaDuration,
  headline,
  isPhotoGallery,
}) => (
  <ServiceContextProvider service="news">
    <LinkContents
      id={id}
      headline={headline}
      mediaType={mediaType}
      mediaDuration={mediaDuration}
      isPhotoGallery={isPhotoGallery}
    />
  </ServiceContextProvider>
);

describe('Promo Content', () => {
  it("should render a story's headline", () => {
    const { getByText } = render(
      <ContentComponent headline={headlineDefault} />,
    );
    const heading = getByText(headlineDefault);
    expect(heading).toBeInTheDocument();
  });

  it('should render with visually hidden text for media promos', () => {
    const { getByText } = render(
      <ContentComponent
        headline={headlineDefault}
        mediaType={mediaTypeDefault}
        mediaDuration={mediaDurationDefault}
      />,
    );

    const heading = getByText(headlineDefault);
    const mediaType = getByText('Video,');
    const mediaDuration = getByText(', Duration 3,20');

    expect(heading).toBeInTheDocument();
    expect(mediaType).toBeInTheDocument();
    expect(mediaDuration).toBeInTheDocument();
  });

  it('should render with visually hidden text for photogallery promos', () => {
    const { getByText } = render(
      <ContentComponent headline={headlineDefault} isPhotoGallery />,
    );

    const heading = getByText(headlineDefault);
    const photogallery = getByText('Image gallery,');

    expect(heading).toBeInTheDocument();
    expect(photogallery).toBeInTheDocument();
  });
});

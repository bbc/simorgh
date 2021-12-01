import React from 'react';
import compose from 'ramda/src/compose';
import { render } from '@testing-library/react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import LinkContents from '.';
import {
  MEDIA_ASSET_PAGE,
  STORY_PAGE,
  PHOTO_GALLERY_PAGE,
} from '#app/routes/utils/pageTypes';

const defaultProps = {
  summary: 'A summary',
  timestamp: 1563266297329,
  indexImage: {
    path: '/cpsprodpb/0A06/production/image1.jpg',
    height: 1152,
    width: 2048,
    altText: 'Image Alt text 1',
    copyrightHolder: 'Image provider 1',
  },
  locators: {
    assetUri: 'https://www.bbc.co.uk',
  },
};

const item = {
  ...defaultProps,
  cpsType: STORY_PAGE,
  headlines: {
    headline: 'A headline',
  },
};

const itemWithOvertypedHeadline = {
  ...defaultProps,
  cpsType: STORY_PAGE,
  headlines: {
    headline: 'A headline',
    overtyped: 'Overtyped headline',
  },
};

const mediaItem = {
  ...defaultProps,
  cpsType: MEDIA_ASSET_PAGE,
  headlines: {
    headline: 'A headline for a media item',
  },
  media: {
    format: 'audio',
    versions: [
      {
        duration: 666,
      },
    ],
  },
};

const photogalleryItem = {
  headlines: {
    headline: 'A photo gallery item',
  },
  locators: {
    assetUri: 'https://www.bbc.co.uk',
  },
  cpsType: PHOTO_GALLERY_PAGE,
};

const mediaItemWithOvertyped = { ...mediaItem };
mediaItemWithOvertyped.headlines.overtyped =
  'An overtyped headline for a media item';

const withServiceContext = component => (
  <ServiceContextProvider service="news">{component}</ServiceContextProvider>
);

const renderWithContext = compose(render, withServiceContext);
const shouldMatchSnapshotWithContext = (title, component) =>
  shouldMatchSnapshot(title, withServiceContext(component));

describe('Story Promo Link Contents', () => {
  it("should render a story's headline as bare text", () => {
    const { container } = renderWithContext(<LinkContents item={item} />);

    expect(container.innerHTML).toEqual(item.headlines.headline);
  });

  it('should render overtyped headline if provided', () => {
    const { container } = renderWithContext(
      <LinkContents item={itemWithOvertypedHeadline} />,
    );

    expect(container.innerHTML).toEqual(
      itemWithOvertypedHeadline.headlines.overtyped,
    );
  });

  shouldMatchSnapshotWithContext(
    'should render with visually hidden text for media promos',
    <LinkContents item={mediaItem} />,
  );

  shouldMatchSnapshotWithContext(
    'should render with visually hidden text for media with overtyped headline',
    <LinkContents item={mediaItemWithOvertyped} />,
  );

  shouldMatchSnapshotWithContext(
    'should render with visually hidden text for photogallery promos',
    <LinkContents item={photogalleryItem} />,
  );
});

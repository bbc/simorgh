import React from 'react';

import { shouldShallowMatchSnapshot, isNull } from '../../../testHelpers';
import MediaIndicator from './MediaIndicator';

const item = {
  summary: 'The summary',
  timestamp: 1563266297329,
  indexImage: {
    path: '/cpsprodpb/0A06/production/image1.jpg',
    height: 1152,
    width: 2048,
    altText: 'Image Alt text 1',
    copyrightHolder: 'Image provider 1',
  },
  headlines: {
    headline: 'A video item',
  },
  locators: {
    assetUri: 'https://www.bbc.co.uk',
  },
  cpsType: 'MAP',
  media: {
    format: 'video',
    versions: [
      {
        duration: 5600,
      },
    ],
  },
};

const nonMediaItem = {
  ...item,
  cpsType: '🤔',
};

const noDurationItem = {
  ...item,
  media: {
    format: 'video',
    versions: [{}],
  },
};

const noMediaObject = {
  ...item,
  media: undefined,
};

const noMediaFormat = {
  ...item,
  media: {
    versions: [
      {
        duration: 5600,
      },
    ],
  },
};

describe('Story Promo Media Indicator', () => {
  shouldShallowMatchSnapshot(
    'should render correctly',
    <MediaIndicator item={item} service="news" />,
  );

  shouldShallowMatchSnapshot(
    'should render correctly even without duration',
    <MediaIndicator item={noDurationItem} service="news" />,
  );

  shouldShallowMatchSnapshot(
    'should not render if item media object has no format',
    <MediaIndicator item={noMediaFormat} service="news" />,
  );

  isNull(
    'should not render if item is not media',
    <MediaIndicator item={nonMediaItem} service="news" />,
  );

  isNull(
    'should not render if item media object is missing',
    <MediaIndicator item={noMediaObject} service="news" />,
  );
});

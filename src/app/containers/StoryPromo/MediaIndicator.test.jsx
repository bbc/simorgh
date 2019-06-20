import React from 'react';

import { shouldShallowMatchSnapshot, isNull } from '../../../testHelpers';
import MediaIndicator from './MediaIndicator';

const item = {
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
  cpsType: '🤔',
};

const noDurationItem = {
  headlines: {
    headline: 'A video item',
  },
  locators: {
    assetUri: 'https://www.bbc.co.uk',
  },
  cpsType: 'MAP',
  media: {
    format: 'video',
    versions: [{}],
  },
};

describe('Story Promo Media Indicator', () => {
  shouldShallowMatchSnapshot(
    'should render correctly',
    <MediaIndicator item={item} />,
  );

  shouldShallowMatchSnapshot(
    'should render correctly even without duration',
    <MediaIndicator item={noDurationItem} />,
  );

  isNull(
    'should not render if item is not media',
    <MediaIndicator item={nonMediaItem} />,
  );
});

import React from 'react';
import { shouldMatchSnapshot, isNull } from '@bbc/psammead-test-helpers';
import { latin, arabic } from '@bbc/gel-foundations/scripts';
import MediaIndicator from '.';

const audioItem = {
  headlines: {
    headline: 'An audio item',
  },
  locators: {
    assetUri: 'https://www.bbc.co.uk',
  },
  cpsType: 'MAP',
  media: {
    format: 'audio',
    versions: [
      {
        duration: 59,
      },
    ],
  },
};

const videoItem = {
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

const photogalleryItem = {
  headlines: {
    headline: 'A photo gallery item',
  },
  locators: {
    assetUri: 'https://www.bbc.co.uk',
  },
  cpsType: 'PGL',
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

const noMediaObject = {
  headlines: {
    headline: 'A video item',
  },
  locators: {
    assetUri: 'https://www.bbc.co.uk',
  },
  cpsType: 'MAP',
};

const noMediaFormat = {
  headlines: {
    headline: 'A video item',
  },
  locators: {
    assetUri: 'https://www.bbc.co.uk',
  },
  cpsType: 'MAP',
  media: {
    versions: [
      {
        duration: 5600,
      },
    ],
  },
};

describe('Story Promo Media Indicator', () => {
  shouldMatchSnapshot(
    'should render an audio item correctly',
    <MediaIndicator item={audioItem} script={latin} service="news" />,
  );

  shouldMatchSnapshot(
    'should render a video item correctly',
    <MediaIndicator item={videoItem} script={latin} service="news" />,
  );

  shouldMatchSnapshot(
    'should render video indicator correctly when inline',
    <MediaIndicator item={videoItem} script={latin} service="news" isInline />,
  );

  shouldMatchSnapshot(
    'should render video indicator correctly when inline on RTL',
    <MediaIndicator
      item={videoItem}
      script={arabic}
      service="persian"
      isInline
    />,
  );
  shouldMatchSnapshot(
    'should render a photo gallery item correctly',
    <MediaIndicator item={photogalleryItem} script={latin} service="news" />,
  );

  shouldMatchSnapshot(
    'should render correctly even without duration',
    <MediaIndicator item={noDurationItem} script={latin} service="news" />,
  );

  isNull(
    'should not render if item media object has no format',
    <MediaIndicator item={noMediaFormat} script={latin} service="news" />,
  );

  isNull(
    'should not render if item is not media',
    <MediaIndicator item={nonMediaItem} script={latin} service="news" />,
  );

  isNull(
    'should not render if item media object is missing',
    <MediaIndicator item={noMediaObject} script={latin} service="news" />,
  );
});

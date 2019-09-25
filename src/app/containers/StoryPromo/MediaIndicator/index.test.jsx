import React from 'react';
import { render } from '@testing-library/react';
import { shouldMatchSnapshot, isNull } from '@bbc/psammead-test-helpers';
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
    <MediaIndicator item={audioItem} service="news" />,
  );

  shouldMatchSnapshot(
    'should render a video item correctly',
    <MediaIndicator item={videoItem} service="news" />,
  );

  shouldMatchSnapshot(
    'should render a photo gallery item correctly',
    <MediaIndicator item={photogalleryItem} service="news" />,
  );

  shouldMatchSnapshot(
    'should render correctly even without duration',
    <MediaIndicator item={noDurationItem} service="news" />,
  );

  isNull(
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

  describe('with Index Alsos', () => {
    shouldMatchSnapshot(
      'should render a video indicator correctly',
      <MediaIndicator item={noDurationItem} service="news" indexAlsos />,
    );

    it('should render ', () => {
      const { container } = render(
        <MediaIndicator item={noDurationItem} service="news" indexAlsos />,
      );

      const span = container.getElementsByTagName('span')[0];
      expect(span.getAttribute('aria-hidden')).toBeDefined();
      expect(span.getAttribute('aria-hidden')).toEqual('true');
    });
  });
});

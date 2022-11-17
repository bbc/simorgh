import React from 'react';
import { render } from '@testing-library/react';
import {
  MEDIA_ASSET_PAGE,
  PHOTO_GALLERY_PAGE,
} from '#app/routes/utils/pageTypes';
import {
  shouldMatchSnapshot,
  isNull,
} from '#psammead/psammead-test-helpers/src';
import latin from '../../../../components/ThemeProvider/fontScripts/latin';
import arabic from '../../../../components/ThemeProvider/fontScripts/arabic';
import MediaIndicator from '.';

const audioItem = {
  headlines: {
    headline: 'An audio item',
  },
  locators: {
    assetUri: 'https://www.bbc.co.uk',
  },
  cpsType: MEDIA_ASSET_PAGE,
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
  cpsType: MEDIA_ASSET_PAGE,
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
  cpsType: PHOTO_GALLERY_PAGE,
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
  cpsType: MEDIA_ASSET_PAGE,
  media: {
    format: 'video',
    versions: [{}],
  },
};

const externalVpidNoCpsTypeItem = {
  headlines: {
    headline: 'A video item',
  },
  locators: {
    assetUri: 'https://www.bbc.co.uk',
  },
  media: {
    format: 'video',
    type: 'external_vpid',
  },
};

const noMediaObject = {
  headlines: {
    headline: 'A video item',
  },
  locators: {
    assetUri: 'https://www.bbc.co.uk',
  },
  cpsType: MEDIA_ASSET_PAGE,
};

const noMediaFormat = {
  headlines: {
    headline: 'A video item',
  },
  locators: {
    assetUri: 'https://www.bbc.co.uk',
  },
  cpsType: MEDIA_ASSET_PAGE,
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
    <MediaIndicator dir="ltr" item={audioItem} script={latin} service="news" />,
  );

  shouldMatchSnapshot(
    'should render a video item correctly',
    <MediaIndicator dir="ltr" item={videoItem} script={latin} service="news" />,
  );

  shouldMatchSnapshot(
    'should render video indicator correctly when inline',
    <MediaIndicator
      dir="ltr"
      item={videoItem}
      script={latin}
      service="news"
      isInline
    />,
  );

  shouldMatchSnapshot(
    'should render video indicator correctly when inline on RTL',
    <MediaIndicator
      dir="rtl"
      item={videoItem}
      script={arabic}
      service="persian"
      isInline
    />,
  );
  shouldMatchSnapshot(
    'should render a photo gallery item correctly',
    <MediaIndicator
      dir="ltr"
      item={photogalleryItem}
      script={latin}
      service="news"
    />,
  );

  shouldMatchSnapshot(
    'should render correctly even without duration',
    <MediaIndicator
      dir="ltr"
      item={noDurationItem}
      script={latin}
      service="news"
    />,
  );

  it('should render correctly even without duration and cps type', () => {
    const { container } = render(
      <MediaIndicator
        dir="ltr"
        item={externalVpidNoCpsTypeItem}
        script={latin}
        service="news"
      />,
    );
    expect(container.querySelector('div')).toBeInTheDocument();
  });

  isNull(
    'should not render if item media object has no format',
    <MediaIndicator
      dir="ltr"
      item={noMediaFormat}
      script={latin}
      service="news"
    />,
  );

  isNull(
    'should not render if item is not media',
    <MediaIndicator
      dir="ltr"
      item={nonMediaItem}
      script={latin}
      service="news"
    />,
  );

  isNull(
    'should not render if item media object is missing',
    <MediaIndicator
      dir="ltr"
      item={noMediaObject}
      script={latin}
      service="news"
    />,
  );
});

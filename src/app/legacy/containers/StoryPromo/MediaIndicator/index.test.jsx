import React from 'react';
import {
  MEDIA_ASSET_PAGE,
  PHOTO_GALLERY_PAGE,
} from '#app/routes/utils/pageTypes';
import { isNull } from '#psammead/psammead-test-helpers/src';
import { render } from '../../../../components/react-testing-library-with-providers';
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
  it('should render an audio item correctly', () => {
    const { container } = render(<MediaIndicator dir="ltr" item={audioItem} />);
    expect(container).toMatchSnapshot();
  });

  it('should render a video item correctly', () => {
    const { container } = render(<MediaIndicator dir="ltr" item={videoItem} />);
    expect(container).toMatchSnapshot();
  });

  it('should render video indicator correctly when inline', () => {
    const { container } = render(
      <MediaIndicator dir="ltr" item={videoItem} isInline />,
    );
    expect(container).toMatchSnapshot();
  });

  it('should render video indicator correctly when inline on RTL', () => {
    const { container } = render(
      <MediaIndicator dir="rtl" item={videoItem} isInline />,
      { service: 'persian' },
    );
    expect(container).toMatchSnapshot();
  });

  it('should render a photo gallery item correctly', () => {
    const { container } = render(
      <MediaIndicator dir="ltr" item={photogalleryItem} />,
    );
    expect(container).toMatchSnapshot();
  });

  it('should render correctly even without duration', () => {
    const { container } = render(
      <MediaIndicator dir="ltr" item={noDurationItem} />,
    );
    expect(container).toMatchSnapshot();
  });

  it('should render correctly even without duration and cps type', () => {
    const { container } = render(
      <MediaIndicator dir="ltr" item={externalVpidNoCpsTypeItem} />,
    );
    expect(container.querySelector('div')).toBeInTheDocument();
  });

  isNull(
    'should not render if item media object has no format',
    <MediaIndicator dir="ltr" item={noMediaFormat} />,
  );

  isNull(
    'should not render if item is not media',
    <MediaIndicator dir="ltr" item={nonMediaItem} />,
  );

  isNull(
    'should not render if item media object is missing',
    <MediaIndicator dir="ltr" item={noMediaObject} />,
  );
});

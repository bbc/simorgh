import React from 'react';
import { render } from '@testing-library/react';
import deepClone from 'ramda/src/clone';

import { shouldMatchSnapshot } from '../../../testHelpers';
import { RequestContextProvider } from '../../contexts/RequestContext';
import { ServiceContextProvider } from '../../contexts/ServiceContext';

import StoryPromo from '.';

const completeItem = {
  headlines: {
    headline: 'A headline',
  },
  locators: {
    assetUri: 'https://www.bbc.co.uk',
  },
  summary: 'Summary text',
  timestamp: 1556795033,
  indexImage: {
    path: '/cpsprodpb/0A06/production/image.jpg',
    height: 1152,
    width: 2048,
    altText: 'Image Alt text',
    copyrightHolder: 'Image provider',
  },
};

const audioItem = {
  headlines: {
    headline: 'An audio item',
  },
  locators: {
    assetUri: 'https://www.bbc.co.uk',
  },
  summary: 'Summary text',
  timestamp: 1556795033,
  indexImage: {
    path: '/cpsprodpb/0A06/production/image.jpg',
    height: 1152,
    width: 2048,
    altText: 'Image Alt text',
    copyrightHolder: 'Image provider',
  },
  cpsType: 'MAP',
  media: {
    format: 'audio',
    versions: [
      {
        duration: 192,
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
  summary: 'Summary text',
  timestamp: 1556795033,
  indexImage: {
    path: '/cpsprodpb/0A06/production/image.jpg',
    height: 1152,
    width: 2048,
    altText: 'Image Alt text',
    copyrightHolder: 'Image provider',
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

const audioItemNoDuration = {
  headlines: {
    headline: 'An audio item',
  },
  locators: {
    assetUri: 'https://www.bbc.co.uk',
  },
  summary: 'Summary text',
  timestamp: 1556795033,
  indexImage: {
    path: '/cpsprodpb/0A06/production/image.jpg',
    height: 1152,
    width: 2048,
    altText: 'Image Alt text',
    copyrightHolder: 'Image provider',
  },
  cpsType: 'MAP',
  media: {
    format: 'audio',
    versions: [{}],
  },
};

const fixtures = {
  standard: completeItem,
  video: videoItem,
  audio: audioItem,
  'audio with no duration': audioItemNoDuration,
};

// eslint-disable-next-line react/prop-types
const WrappedStoryPromo = ({ service, platform, ...props }) => (
  <ServiceContextProvider service={service || 'igbo'}>
    <RequestContextProvider
      bbcOrigin="https://www.test.bbc.co.uk"
      id="c0000000000o"
      isAmp={platform === 'amp'}
      pageType="article"
      service={service}
    >
      <StoryPromo {...props} />
    </RequestContextProvider>
  </ServiceContextProvider>
);

describe('StoryPromo Container', () => {
  Object.entries(fixtures).forEach(([name, data]) => {
    shouldMatchSnapshot(
      `should render ${name} correctly for canonical`,
      <WrappedStoryPromo platform="canonical" item={data} />,
    );

    shouldMatchSnapshot(
      `should render ${name} correctly for amp`,
      <WrappedStoryPromo platform="amp" item={data} />,
    );
  });

  describe('assertion tests', () => {
    let item;
    beforeEach(() => {
      item = deepClone(completeItem);
    });

    it('should render h3, a, p, time', () => {
      const { container } = render(<WrappedStoryPromo item={item} />);
      const newsContainer = render(
        <WrappedStoryPromo service="news" item={item} />,
      ).container;
      const yorubaContainer = render(
        <WrappedStoryPromo service="yoruba" item={item} />,
      ).container;

      expect(container.querySelectorAll('h3 a')[0].innerHTML).toEqual(
        item.headlines.headline,
      );
      expect(container.getElementsByTagName('p')[0].innerHTML).toEqual(
        item.summary,
      );
      expect(container.getElementsByTagName('time')[0].innerHTML).toEqual(
        '2 Mee 2019',
      );
      expect(newsContainer.getElementsByTagName('time')[0].innerHTML).toEqual(
        '2 May 2019',
      );
      expect(yorubaContainer.getElementsByTagName('time')[0].innerHTML).toEqual(
        '2 Èbibi 2019',
      );
    });

    it('should render img with src & alt when platform is canonical', () => {
      const { container } = render(
        <WrappedStoryPromo item={item} lazyLoadImage={false} />,
      );

      expect(container.getElementsByTagName('img').length).toEqual(1);
      expect(container.getElementsByTagName('amp-img').length).toEqual(0);
      expect(
        container.getElementsByTagName('img')[0].getAttribute('src'),
      ).toEqual(`https://ichef.bbci.co.uk/news/660${item.indexImage.path}`);
      expect(
        container.getElementsByTagName('img')[0].getAttribute('alt'),
      ).toEqual(item.indexImage.altText);
    });

    it('should render amp-img with src & alt when platform is amp', () => {
      const { container } = render(
        <WrappedStoryPromo platform="amp" item={item} />,
      );

      expect(container.getElementsByTagName('amp-img').length).toEqual(1);
      expect(container.getElementsByTagName('img').length).toEqual(0);
      expect(
        container.getElementsByTagName('amp-img')[0].getAttribute('src'),
      ).toEqual(`https://ichef.bbci.co.uk/news/660${item.indexImage.path}`);
      expect(
        container.getElementsByTagName('amp-img')[0].getAttribute('alt'),
      ).toEqual(item.indexImage.altText);
    });

    describe('With no headline provided', () => {
      beforeEach(() => {
        delete item.headlines;
      });

      it('should not include a headline element', () => {
        const { container } = render(<WrappedStoryPromo item={item} />);

        expect(container.getElementsByTagName('h3').length).toEqual(0);
      });
    });

    describe('With no summary provided', () => {
      beforeEach(() => {
        delete item.summary;
        delete item.indexImage.copyrightHolder;
      });

      it('should not include any paragraph element', () => {
        const { container } = render(<WrappedStoryPromo item={item} />);
        expect(container.getElementsByTagName('p').length).toEqual(0);
      });
    });

    describe('With no timestamp provided', () => {
      beforeEach(() => {
        delete item.timestamp;
      });

      it('should not include a time element', () => {
        const { container } = render(<WrappedStoryPromo item={item} />);

        expect(container.getElementsByTagName('time').length).toEqual(0);
      });
    });

    describe('With no indexImage provided', () => {
      beforeEach(() => {
        delete item.indexImage;
      });

      it('should not include an img element', () => {
        const { container } = render(<WrappedStoryPromo item={item} />);

        expect(container.getElementsByTagName('img').length).toEqual(0);
      });
    });
  });
});

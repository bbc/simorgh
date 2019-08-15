import React from 'react';
import { render, cleanup } from '@testing-library/react';
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
  timestamp: 1556795033000,
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
  timestamp: 1556795033000,
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
  timestamp: 1556795033000,
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

const liveItem = {
  headlines: {
    headline: 'A live item',
  },
  locators: {
    assetUri: 'https://www.bbc.co.uk',
  },
  summary: 'Summary text',
  timestamp: 1556795033000,
  indexImage: {
    path: '/cpsprodpb/0A06/production/image.jpg',
    height: 1152,
    width: 2048,
    altText: 'Image Alt text',
    copyrightHolder: 'Image provider',
  },
  cpsType: 'LIV',
};

const audioItemNoDuration = {
  headlines: {
    headline: 'An audio item',
  },
  locators: {
    assetUri: 'https://www.bbc.co.uk',
  },
  summary: 'Summary text',
  timestamp: 1556795033000,
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

const standardLinkItem = {
  name: 'Standard promo with summary',
  summary: 'Summary text',
  indexImage: {
    id: 63692548,
    subType: 'index',
    href: 'http://b.files.bbci.co.uk/14A31/test/_63692548_000327537-1.jpg',
    path: '/cpsdevpb/14A31/test/_63692548_000327537-1.jpg',
    height: 549,
    width: 976,
    altText: 'A lone Koala perches in a eucalyptus tree',
    caption: 'Koalas are from Australia',
    copyrightHolder: 'BBC',
  },
  uri: 'http://www.bbc.com/azeri',
  contentType: 'Text',
  assetTypeCode: 'PRO',
  timestamp: 1565186015000,
  type: 'link',
};

const fixtures = {
  standard: completeItem,
  video: videoItem,
  audio: audioItem,
  live: liveItem,
  'audio with no duration': audioItemNoDuration,
  standardLink: standardLinkItem,
};

// eslint-disable-next-line react/prop-types
const WrappedStoryPromo = ({ service = 'igbo', platform, ...props }) => (
  <ServiceContextProvider service={service}>
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

WrappedStoryPromo.defaultProps = {
  service: 'igbo',
};

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
    let cpsItem;
    let assetTypeCodeItem;
    let cpsContainer;
    let assetTypeCodeContainer;

    afterEach(() => cleanup);

    beforeEach(() => {
      cpsItem = deepClone(completeItem);
      assetTypeCodeItem = deepClone(standardLinkItem);
      cpsContainer = render(<WrappedStoryPromo item={cpsItem} />).container;
      assetTypeCodeContainer = render(<WrappedStoryPromo item={assetTypeCodeItem} />).container
    });

    it('should render h3, a, p, time', () => {
      const cpsContainer = render(<WrappedStoryPromo item={cpsItem} />).container;
      const assetTypeCodeContainer = render(<WrappedStoryPromo item={assetTypeCodeItem} />).container;

      expect(cpsContainer.querySelectorAll('h3 a')[0].innerHTML).toEqual(
        cpsItem.headlines.headline,
      );
      expect(cpsContainer.getElementsByTagName('p')[0].innerHTML).toEqual(
        cpsItem.summary,
      );
      expect(cpsContainer.getElementsByTagName('time')[0].innerHTML).toEqual(
        '2 Mee 2019',
      );

      expect(assetTypeCodeContainer.querySelectorAll('h3 a')[0].innerHTML).toEqual(
        assetTypeCodeItem.name,
      );
      expect(assetTypeCodeContainer.getElementsByTagName('p')[0].innerHTML).toEqual(
        assetTypeCodeItem.summary,
      );
      expect(assetTypeCodeContainer.getElementsByTagName('time')[0].innerHTML).toEqual(
        '7 Ọgọọst 2019',
      );

      const newsContainer = render(
        <WrappedStoryPromo service="news" item={cpsItem} />,
      ).container;
      expect(newsContainer.getElementsByTagName('time')[0].innerHTML).toEqual(
        '2 May 2019',
      );

      const yorubaContainer = render(
        <WrappedStoryPromo service="yoruba" item={cpsItem} />,
      ).container;
      expect(yorubaContainer.getElementsByTagName('time')[0].innerHTML).toEqual(
        '2 Èbibi 2019',
      );
    });

    it('should render relative time if timestamp < 10 hours', () => {
      const oneMinuteAgo = Date.now() - 60 * 1000;
      const newItem = {
        ...cpsItem,
        timestamp: oneMinuteAgo,
      };

      const newsContainer = render(
        <WrappedStoryPromo service="news" item={newItem} />,
      ).container;
      expect(newsContainer.getElementsByTagName('time')[0].innerHTML).toEqual(
        'a minute ago',
      );

      const yorubaContainer = render(
        <WrappedStoryPromo service="yoruba" item={newItem} />,
      ).container;
      expect(yorubaContainer.getElementsByTagName('time')[0].innerHTML).toEqual(
        'ìsẹjú kan kọjá',
      );
    });

    it('should render img with src & alt when platform is canonical', () => {
      const { container } = render(
        <WrappedStoryPromo item={cpsItem} lazyLoadImage={false} />,
      );

      expect(container.getElementsByTagName('img').length).toEqual(1);
      expect(container.getElementsByTagName('amp-img').length).toEqual(0);
      expect(
        container.getElementsByTagName('img')[0].getAttribute('src'),
      ).toEqual(`https://ichef.bbci.co.uk/news/660${cpsItem.indexImage.path}`);
      expect(
        container.getElementsByTagName('img')[0].getAttribute('alt'),
      ).toEqual(cpsItem.indexImage.altText);
    });

    it('should render amp-img with src & alt when platform is amp', () => {
      const { container } = render(
        <WrappedStoryPromo platform="amp" item={cpsItem} />,
      );

      expect(container.getElementsByTagName('amp-img').length).toEqual(1);
      expect(container.getElementsByTagName('img').length).toEqual(0);
      expect(
        container.getElementsByTagName('amp-img')[0].getAttribute('src'),
      ).toEqual(`https://ichef.bbci.co.uk/news/660${cpsItem.indexImage.path}`);
      expect(
        container.getElementsByTagName('amp-img')[0].getAttribute('alt'),
      ).toEqual(cpsItem.indexImage.altText);
    });

    describe('With no headline provided', () => {
      beforeEach(() => {
        delete cpsItem.headlines;
        delete assetTypeCodeItem.name;
      });

      it('should not include a headline element', () => {
        expect(cpsContainer.getElementsByTagName('h3').length).toEqual(0);
        expect(assetTypeCodeContainer.getElementsByTagName('h3').length).toEqual(0);
      });
    });

    describe('With no summary provided', () => {
      beforeEach(() => {
        delete cpsItem.summary;
        delete cpsItem.indexImage.copyrightHolder;
        delete assetTypeCodeItem.summary;
      });

      it('should not include any paragraph element', () => {
       expect(cpsContainer.getElementsByTagName('p').length).toEqual(0);
        expect(assetTypeCodeContainer.getElementsByTagName('p').length).toEqual(0);
      });
    });

    describe('With no timestamp provided', () => {
      beforeEach(() => {
        delete cpsItem.timestamp;
        delete assetTypeCodeItem.timestamp;
      });

      it('should not include a time element', () => {
        expect(cpsContainer.getElementsByTagName('time').length).toEqual(0);
        expect(assetTypeCodeContainer.getElementsByTagName('time').length).toEqual(0);
      });
    });

    describe('With no indexImage provided', () => {
      beforeEach(() => {
        delete cpsItem.indexImage;
        delete assetTypeCodeItem.indexImage;
      });

      it('should not include an img element', () => {
        expect(cpsContainer.getElementsByTagName('img').length).toEqual(0);
        expect(assetTypeCodeContainer.getElementsByTagName('img').length).toEqual(0);
      });
    });

    describe('With different timezones', () => {
      beforeEach(() => {
        cpsItem.timestamp = 1565035200000;
      });

      it('should show the correct local date', () => {
        const { container: newsContainer } = render(
          <WrappedStoryPromo item={cpsItem} service="news" />,
        );
        const {
          textContent: newsTime,
          dateTime: newsDate,
        } = newsContainer.querySelector('time');

        expect(newsTime).toEqual('5 August 2019');
        expect(newsDate).toEqual('2019-08-05');

        const { container: bengaliContainer } = render(
          <WrappedStoryPromo item={cpsItem} service="bengali" />,
        );
        const {
          textContent: bengaliTime,
          dateTime: bengaliDate,
        } = bengaliContainer.querySelector('time');
        expect(bengaliTime).toEqual('৬ আগস্ট ২০১৯');
        expect(bengaliDate).toEqual('2019-08-06');
      });
    });
  });
});

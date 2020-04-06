import React from 'react';
import { render, cleanup } from '@testing-library/react';
import deepClone from 'ramda/src/clone';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import '@testing-library/jest-dom/extend-expect';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import relItems from './IndexAlsos/relatedItems';
import StoryPromoContainer from '.';

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

const featureLinkItem = {
  name: 'Feature promo with summary',
  summary: 'Summary text for feature Promo',
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
  contentType: 'Feature',
  assetTypeCode: 'PRO',
  timestamp: 1565186015000,
  type: 'link',
};

const podcastLinkItem = {
  name: 'Test indonesian podcast',
  summary: 'BBC Indonesia',
  uri: 'https://www.bbc.com/indonesia/media-45640737',
  contentType: 'Podcast',
  assetTypeCode: 'PRO',
  timestamp: 1537952309000,
  type: 'link',
};

const itemWithoutImage = {
  headlines: {
    headline: 'A headline',
  },
  locators: {
    assetUri: 'https://www.bbc.co.uk',
  },
  summary: 'Summary text',
  timestamp: 1556795033000,
};

const indexAlsosItem = {
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
  cpsType: 'STY',
  relatedItems: relItems,
};

const onlyOneRelatedItem = {
  ...indexAlsosItem,
  relatedItems: [indexAlsosItem.relatedItems[0]],
};

const fixtures = {
  standard: completeItem,
  video: videoItem,
  audio: audioItem,
  live: liveItem,
  'audio with no duration': audioItemNoDuration,
  standardLink: standardLinkItem,
  featureLink: featureLinkItem,
  'item without an image': itemWithoutImage,
  podcastLink: podcastLinkItem,
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
      statusCode={200}
      pathname="/pathname"
    >
      <StoryPromoContainer {...props} />
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

    shouldMatchSnapshot(
      `should render ${name} promoType top on amp`,
      <WrappedStoryPromo platform="amp" item={data} promoType="top" />,
    );
    shouldMatchSnapshot(
      `should render ${name} promoType leading on amp`,
      <WrappedStoryPromo platform="amp" item={data} promoType="leading" />,
    );
  });

  shouldMatchSnapshot(
    `should render multiple Index Alsos correctly for canonical`,
    <WrappedStoryPromo
      platform="canonical"
      item={indexAlsosItem}
      promoType="top"
    />,
  );

  describe('assertion tests', () => {
    let cpsItem;
    let assetTypeItem;
    let cpsContainer;
    let assetTypeContainer;

    beforeEach(() => {
      cpsItem = deepClone(completeItem);
      cpsContainer = render(<WrappedStoryPromo item={cpsItem} />).container;

      assetTypeItem = deepClone(standardLinkItem);
      assetTypeContainer = render(<WrappedStoryPromo item={assetTypeItem} />)
        .container;
    });

    afterEach(cleanup);

    it('should render h3, a, p, time', () => {
      expect(cpsContainer.querySelectorAll('h3 a')[0].innerHTML).toEqual(
        cpsItem.headlines.headline,
      );
      expect(cpsContainer.getElementsByTagName('p')[0].innerHTML).toEqual(
        cpsItem.summary,
      );
      expect(cpsContainer.getElementsByTagName('time')[0].innerHTML).toEqual(
        '2 Mee 2019',
      );

      expect(assetTypeContainer.querySelectorAll('h3 a')[0].innerHTML).toEqual(
        assetTypeItem.name,
      );
      expect(assetTypeContainer.getElementsByTagName('p')[0].innerHTML).toEqual(
        assetTypeItem.summary,
      );
      expect(
        assetTypeContainer.getElementsByTagName('time')[0].innerHTML,
      ).toEqual('7 Ọgọọst 2019');

      [
        { service: 'news', expectedTimeString: '2 May 2019' },
        { service: 'yoruba', expectedTimeString: '2 Èbibi 2019' },
      ].forEach(({ service, expectedTimeString }) => {
        const { container } = render(
          <WrappedStoryPromo service={service} item={cpsItem} />,
        );
        expect(container.getElementsByTagName('time')[0].innerHTML).toEqual(
          expectedTimeString,
        );
      });
    });

    it('should render relative time if timestamp < 10 hours', () => {
      const oneMinuteAgo = Date.now() - 60 * 1000;
      const newItem = {
        ...cpsItem,
        timestamp: oneMinuteAgo,
      };

      [
        { service: 'news', expectedTimeString: '1 minute ago' },
        { service: 'yoruba', expectedTimeString: 'ìṣẹ́jú kan sẹ́yìn' },
      ].forEach(({ service, expectedTimeString }) => {
        const { container } = render(
          <WrappedStoryPromo service={service} item={newItem} />,
        );
        expect(container.getElementsByTagName('time')[0].innerHTML).toEqual(
          expectedTimeString,
        );
      });
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
        delete assetTypeItem.name;
      });

      it('should not include a headline element', () => {
        [{ item: cpsItem }, { item: assetTypeItem }].forEach(({ item }) => {
          const { container } = render(<WrappedStoryPromo item={item} />);

          expect(container.getElementsByTagName('h3').length).toEqual(0);
        });
      });
    });

    describe('With no summary provided', () => {
      beforeEach(() => {
        delete cpsItem.summary;
        delete cpsItem.indexImage.copyrightHolder;
        delete assetTypeItem.summary;
      });
      it('should not include any paragraph element', () => {
        [{ item: cpsItem }, { item: assetTypeItem }].forEach(({ item }) => {
          const { container } = render(<WrappedStoryPromo item={item} />);

          expect(container.getElementsByTagName('p').length).toEqual(0);
        });
      });
    });

    describe('With no timestamp provided', () => {
      beforeEach(() => {
        delete cpsItem.timestamp;
        delete assetTypeItem.timestamp;
      });
      it('should not include a time element', () => {
        [{ item: cpsItem }, { item: assetTypeItem }].forEach(({ item }) => {
          const { container } = render(<WrappedStoryPromo item={item} />);
          expect(container.getElementsByTagName('time').length).toEqual(0);
        });
      });
    });

    describe('With no indexImage provided', () => {
      beforeEach(() => {
        delete cpsItem.indexImage;
        delete assetTypeItem.indexImage;
      });
      it('should not include an img element', () => {
        [{ item: cpsItem }, { item: assetTypeItem }].forEach(({ item }) => {
          const { container } = render(<WrappedStoryPromo item={item} />);
          expect(container.getElementsByTagName('img').length).toEqual(0);
        });
      });
    });

    describe('With different timezones', () => {
      beforeEach(() => {
        cpsItem.timestamp = 1565035200000;
      });

      it('should show the correct local date', () => {
        [
          {
            service: 'bengali',
            expectedDateTime: '2019-08-06',
            expectedTime: '৬ অগাস্ট ২০১৯',
          },
          {
            service: 'news',
            expectedDateTime: '2019-08-05',
            expectedTime: '5 August 2019',
          },
        ].forEach(({ service, expectedDateTime, expectedTime }) => {
          const { container } = render(
            <WrappedStoryPromo item={cpsItem} service={service} />,
          );
          const { textContent: time, dateTime } = container.querySelector(
            'time',
          );

          expect(time).toEqual(expectedTime);
          expect(dateTime).toEqual(expectedDateTime);
        });
      });
    });

    describe('With Index Alsos', () => {
      [
        {
          description: 'should render a list with two related items',
          expectedNumUls: 1,
          expectedNumLis: 2,
          item: indexAlsosItem,
        },
        {
          description:
            'should render a related item not contained within a list',
          expectedNumUls: 0,
          expectedNumLis: 0,
          item: onlyOneRelatedItem,
        },
      ].forEach(({ description, item, expectedNumLis, expectedNumUls }) => {
        it(description, () => {
          const { container } = render(
            <WrappedStoryPromo item={item} promoType="top" />,
          );

          expect(container.getElementsByTagName('ul')).toHaveLength(
            expectedNumUls,
          );
          expect(container.getElementsByTagName('li')).toHaveLength(
            expectedNumLis,
          );
        });
      });
    });

    describe('Live Story Promo', () => {
      it('should render a live story promo with live text', () => {
        const { getByText } = render(<WrappedStoryPromo item={liveItem} />);
        const label = getByText('NA EME UGBU A');
        expect(label).toBeInTheDocument();
        expect(label).not.toHaveAttribute('aria-hidden', 'true');
      });

      it('should render a live story promo as aria-hidden, with visually hidden text if the label is in english', () => {
        const { getByText } = render(
          <WrappedStoryPromo item={liveItem} service="news" />,
        );

        const label = getByText('LIVE');
        expect(label).toBeInTheDocument();
        expect(label).toHaveAttribute('aria-hidden', 'true');
      });

      it('should render a live story promo without a timestamp', () => {
        const { container } = render(<WrappedStoryPromo item={liveItem} />);
        const time = container.querySelector('time');
        expect(time).toEqual(null);
      });
    });
  });
});

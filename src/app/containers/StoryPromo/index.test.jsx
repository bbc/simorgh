import React from 'react';
import { render, cleanup } from '@testing-library/react';
import deepClone from 'ramda/src/clone';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import '@testing-library/jest-dom/extend-expect';
import loggerMock from '#testHelpers/loggerMock';
import { MEDIA_MISSING_FIELD } from '#lib/logger.const';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import {
  completeItem,
  itemWithOvertypedSummary,
  audioItem,
  videoItem,
  liveItem,
  audioItemNoDuration,
  standardLinkItem,
  featureLinkItem,
  podcastLinkItem,
  itemWithoutImage,
  indexAlsosItem,
  mapWithMediaError,
} from './helpers/fixtureData';
import StoryPromoContainer from '.';

const onlyOneRelatedItem = {
  ...indexAlsosItem,
  relatedItems: [indexAlsosItem.relatedItems[0]],
};

const fixtures = {
  standard: completeItem,
  standardOvertypedSummary: itemWithOvertypedSummary,
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
    let overtypedSummaryItem;
    let assetTypeItem;
    let cpsContainer;
    let overtypedSummaryContainer;
    let assetTypeContainer;

    beforeEach(() => {
      cpsItem = deepClone(completeItem);
      cpsContainer = render(<WrappedStoryPromo item={cpsItem} />).container;

      overtypedSummaryItem = deepClone(itemWithOvertypedSummary);
      overtypedSummaryContainer = render(
        <WrappedStoryPromo item={overtypedSummaryItem} />,
      ).container;

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

      expect(
        overtypedSummaryContainer.getElementsByTagName('p')[0].innerHTML,
      ).toEqual(itemWithOvertypedSummary.overtypedSummary);

      expect(assetTypeContainer.querySelectorAll('h3 a')[0].innerHTML).toEqual(
        assetTypeItem.name,
      );
      expect(assetTypeContainer.getElementsByTagName('p')[0].innerHTML).toEqual(
        assetTypeItem.summary,
      );
      expect(
        assetTypeContainer.getElementsByTagName('time')[0].innerHTML,
      ).toEqual('7 Ọgọọst 2019');

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
        '1 minute ago',
      );

      const yorubaContainer = render(
        <WrappedStoryPromo service="yoruba" item={newItem} />,
      ).container;

      expect(yorubaContainer.getElementsByTagName('time')[0].innerHTML).toEqual(
        'ìṣẹ́jú kan sẹ́yìn',
      );
    });

    [
      {
        service: 'pashto',
        expectationFirstJan2020: '۱۱ مرغومی ۱۳۹۸ - ۱ جنوري ۲۰۲۰',
      },
      {
        service: 'persian',
        expectationFirstJan2020: '۱۱ دی ۱۳۹۸ - ۱ ژانویه ۲۰۲۰',
      },
    ].forEach(({ service, expectationFirstJan2020 }) => {
      it(`should render time element with multiple calendars for ${service} Story Promo`, () => {
        const firstJan2020 = 1577836800000;
        const newItem = {
          ...cpsItem,
          timestamp: firstJan2020,
        };
        const { container } = render(
          <WrappedStoryPromo service={service} item={newItem} />,
        );
        expect(container.getElementsByTagName('time')[0].innerHTML).toEqual(
          expectationFirstJan2020,
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
        cpsContainer = render(<WrappedStoryPromo item={cpsItem} />).container;
        assetTypeContainer = render(<WrappedStoryPromo item={assetTypeItem} />)
          .container;

        expect(cpsContainer.getElementsByTagName('h3').length).toEqual(0);
        expect(assetTypeContainer.getElementsByTagName('h3').length).toEqual(0);
      });
    });

    describe('With no summary provided', () => {
      beforeEach(() => {
        delete cpsItem.summary;
        delete cpsItem.indexImage.copyrightHolder;
        delete assetTypeItem.summary;
      });

      it('should not include any paragraph element', () => {
        cpsContainer = render(<WrappedStoryPromo item={cpsItem} />).container;
        assetTypeContainer = render(<WrappedStoryPromo item={assetTypeItem} />)
          .container;

        expect(cpsContainer.getElementsByTagName('p').length).toEqual(0);
        expect(assetTypeContainer.getElementsByTagName('p').length).toEqual(0);
      });
    });

    describe('With no timestamp provided', () => {
      beforeEach(() => {
        delete cpsItem.timestamp;
        delete assetTypeItem.timestamp;
      });

      it('should not include a time element', () => {
        cpsContainer = render(<WrappedStoryPromo item={cpsItem} />).container;
        assetTypeContainer = render(<WrappedStoryPromo item={assetTypeItem} />)
          .container;

        expect(cpsContainer.getElementsByTagName('time').length).toEqual(0);
        expect(assetTypeContainer.getElementsByTagName('time').length).toEqual(
          0,
        );
      });
    });

    describe('With no indexImage provided', () => {
      beforeEach(() => {
        delete cpsItem.indexImage;
        delete assetTypeItem.indexImage;
      });
      it('should not include an img element', () => {
        expect(cpsContainer.getElementsByTagName('img').length).toEqual(0);
        expect(assetTypeContainer.getElementsByTagName('img').length).toEqual(
          0,
        );
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
        expect(bengaliTime).toEqual('৬ অগাস্ট ২০১৯');
        expect(bengaliDate).toEqual('2019-08-06');
      });
    });

    describe('With Index Alsos', () => {
      it('should render a list with two related items', () => {
        const { container } = render(
          <WrappedStoryPromo item={indexAlsosItem} promoType="top" />,
        );

        expect(container.getElementsByTagName('ul')).toHaveLength(1);
        expect(container.getElementsByTagName('li')).toHaveLength(2);
      });

      it('should render a related item not contained within a list', () => {
        const { container } = render(
          <WrappedStoryPromo item={onlyOneRelatedItem} promoType="top" />,
        );
        expect(container.getElementsByTagName('ul')).toHaveLength(0);
        expect(container.getElementsByTagName('li')).toHaveLength(0);
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

  describe('given we have data that has an error', () => {
    describe('when there is a media block without duration', () => {
      [
        {
          item: mapWithMediaError,
          platform: 'amp',
        },
        {
          item: mapWithMediaError,
          platform: 'canonical',
        },
      ].forEach(({ item, platform }) => {
        it('should log a warning', () => {
          render(<WrappedStoryPromo item={item} platform={platform} />);
          expect(loggerMock.warn).toHaveBeenCalledWith(MEDIA_MISSING_FIELD, {
            url: '/pashto',
            missingField: 'duration',
            item: mapWithMediaError,
          });
        });
      });
    });
  });
});

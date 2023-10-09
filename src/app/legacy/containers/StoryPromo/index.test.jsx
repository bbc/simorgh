import React from 'react';
import { render, cleanup } from '@testing-library/react';
import deepClone from 'ramda/src/clone';
import loggerMock from '#testHelpers/loggerMock';
import { MEDIA_MISSING } from '#lib/logger.const';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ToggleContextProvider } from '#contexts/ToggleContext';
import { ARTICLE_PAGE } from '#app/routes/utils/pageTypes';
import {
  shouldMatchSnapshot,
  suppressPropWarnings,
} from '#psammead/psammead-test-helpers/src';
import { ServiceContextProvider } from '../../../contexts/ServiceContext';
import ThemeProvider from '../../../components/ThemeProvider';
import {
  completeItem,
  itemWithOvertypedSummary,
  audioItem,
  videoItem,
  liveItem,
  guideLinkItem,
  audioItemNoDuration,
  standardLinkItem,
  featureLinkItem,
  podcastLinkItem,
  itemWithoutImage,
  indexAlsosItem,
  mapWithMediaError,
  mapWithoutMediaError,
} from './helpers/fixtureData';
import StoryPromoContainer from '.';
import { buildUniquePromoId } from './utilities';

jest.mock('../../../components/ThemeProvider');

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
const WrappedStoryPromo = ({ service, platform, ...props }) => (
  <ThemeProvider service={service} variant="default">
    <ServiceContextProvider service={service}>
      <RequestContextProvider
        bbcOrigin="https://www.test.bbc.co.uk"
        id="c0000000000o"
        isAmp={platform === 'amp'}
        pageType={ARTICLE_PAGE}
        service={service}
        statusCode={200}
        pathname="/pathname"
      >
        <ToggleContextProvider
          toggles={{
            eventTracking: {
              enabled: true,
            },
          }}
        >
          <StoryPromoContainer {...props} />
        </ToggleContextProvider>
      </RequestContextProvider>
    </ServiceContextProvider>
  </ThemeProvider>
);

WrappedStoryPromo.defaultProps = {
  service: 'igbo',
};

describe('StoryPromo Container', () => {
  suppressPropWarnings(['alsoItems', 'IndexAlsosContainer']);
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

  shouldMatchSnapshot(
    `should render full width promos correctly for canonical`,
    <WrappedStoryPromo
      platform="canonical"
      item={completeItem}
      promoType="top"
      isSingleColumnLayout
    />,
  );

  shouldMatchSnapshot(
    `should render full width promos correctly for amp`,
    <WrappedStoryPromo
      platform="amp"
      item={completeItem}
      promoType="top"
      isSingleColumnLayout
    />,
  );

  describe('assertion tests', () => {
    let cpsItem;
    let overtypedSummaryItem;
    let assetTypeItem;
    let cpsContainer;
    let overtypedSummaryContainer;
    let assetTypeContainer;
    const labelId = `test-group-id`;

    beforeEach(() => {
      cpsItem = deepClone(completeItem);
      cpsContainer = render(
        <WrappedStoryPromo item={cpsItem} labelId={labelId} />,
      ).container;

      overtypedSummaryItem = deepClone(itemWithOvertypedSummary);
      overtypedSummaryContainer = render(
        <WrappedStoryPromo item={overtypedSummaryItem} labelId={labelId} />,
      ).container;

      assetTypeItem = deepClone(standardLinkItem);
      assetTypeContainer = render(
        <WrappedStoryPromo item={assetTypeItem} labelId={labelId} />,
      ).container;
    });

    afterEach(cleanup);

    it('should render h3, a, p, time', () => {
      const uriLabelId = buildUniquePromoId({
        promoGroupId: labelId,
        promoItem: assetTypeItem,
      });
      const assetUriId = buildUniquePromoId({
        promoGroupId: labelId,
        promoItem: cpsItem,
      });

      expect(cpsContainer.querySelectorAll('h3 a')[0].innerHTML).toEqual(
        `<span id="${assetUriId}">${cpsItem.headlines.headline}</span>`,
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
        `<span id="${uriLabelId}">${assetTypeItem.name}</span>`,
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

    it('should render amp-img with src & alt and amp-img fallback when platform is amp', () => {
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
        assetTypeContainer = render(
          <WrappedStoryPromo item={assetTypeItem} />,
        ).container;

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
        assetTypeContainer = render(
          <WrappedStoryPromo item={assetTypeItem} />,
        ).container;

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
        assetTypeContainer = render(
          <WrappedStoryPromo item={assetTypeItem} />,
        ).container;

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
        cpsContainer = render(
          <WrappedStoryPromo item={cpsItem} labelId={labelId} />,
        ).container;
        assetTypeContainer = render(
          <WrappedStoryPromo item={assetTypeItem} labelId={labelId} />,
        ).container;

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

      it('should show the correct local date without an overriden datetime locale', () => {
        const { container: newsContainer } = render(
          <WrappedStoryPromo item={cpsItem} service="news" />,
        );
        const { textContent: newsTime, dateTime: newsDate } =
          newsContainer.querySelector('time');

        expect(newsTime).toEqual('5 August 2019');
        expect(newsDate).toEqual('2019-08-05');

        const { container: bengaliContainer } = render(
          <WrappedStoryPromo item={cpsItem} service="bengali" />,
        );
        const { textContent: bengaliTime, dateTime: bengaliDate } =
          bengaliContainer.querySelector('time');
        expect(bengaliTime).toEqual('৬ অগাস্ট ২০১৯');
        expect(bengaliDate).toEqual('2019-08-06');
      });
      it('should show the correct local date with an overidden datetime locale', () => {
        const { container: newsContainer } = render(
          <WrappedStoryPromo
            item={cpsItem}
            service="news"
            serviceDatetimeLocale="fa"
          />,
        );
        const { textContent: newsTime, dateTime: newsDate } =
          newsContainer.querySelector('time');

        expect(newsTime).toEqual('۵ اوت ۲۰۱۹');
        expect(newsDate).toEqual('2019-08-05');

        const { container: bengaliContainer } = render(
          <WrappedStoryPromo
            item={cpsItem}
            service="bengali"
            serviceDatetimeLocale="uk"
          />,
        );
        const { textContent: bengaliTime, dateTime: bengaliDate } =
          bengaliContainer.querySelector('time');
        expect(bengaliTime).toEqual('6 серпня 2019');
        expect(bengaliDate).toEqual('2019-08-06');
      });
    });

    describe('With Index Alsos', () => {
      it('should render a list with three related items', () => {
        const { container } = render(
          <WrappedStoryPromo item={indexAlsosItem} promoType="top" />,
        );

        expect(container.getElementsByTagName('ul')).toHaveLength(1);
        expect(container.getElementsByTagName('li')).toHaveLength(3);
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

    describe('Story Promo of type Guide', () => {
      it('should not render a timestamp', () => {
        const { container } = render(
          <WrappedStoryPromo item={guideLinkItem} />,
        );

        expect(container.getElementsByTagName('time').length).toEqual(0);
      });

      it('should not render a heading tag', () => {
        const { container } = render(
          <WrappedStoryPromo item={guideLinkItem} />,
        );

        expect(container.getElementsByTagName('h3').length).toEqual(0);
      });
    });
  });

  describe('given there is a CPS MAP block with a media error', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
    afterEach(() => {
      jest.clearAllMocks();
    });

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
      it(`when we render for ${platform}, it should log a warning`, () => {
        render(<WrappedStoryPromo item={item} platform={platform} />);
        expect(loggerMock.warn).toHaveBeenCalledWith(MEDIA_MISSING, {
          url: '/pashto/front_page',
          mediaStatuscode: 404,
          mediaBlock: mapWithMediaError.media,
        });
      });
    });
  });

  describe('given there is a CPS MAP block without a media error', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
    afterEach(() => {
      jest.clearAllMocks();
    });
    [
      {
        item: mapWithoutMediaError,
        platform: 'amp',
      },
      {
        item: mapWithoutMediaError,
        platform: 'canonical',
      },
    ].forEach(({ item, platform }) => {
      it(`when we render for ${platform}, it should *not* log a warning`, () => {
        render(<WrappedStoryPromo item={item} platform={platform} />);
        expect(loggerMock.warn).not.toHaveBeenCalled();
      });
    });
  });
});

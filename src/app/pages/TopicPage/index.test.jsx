import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { TOPIC_PAGE } from '#app/routes/utils/pageTypes';
import { data as kyrgyzTopicWithMessageBanners } from '#data/kyrgyz/topics/cvpv9djp9qqt.json';
import { data as mundoBannerVariations } from '#data/mundo/topics/cw90edn9kw4t.json';
import {
  VISUAL_PROMINENCE,
  VISUAL_STYLE,
} from '#app/models/types/curationData';
import { render } from '../../components/react-testing-library-with-providers';
import TopicPage from './TopicPage';
import {
  pidginMultipleItems,
  amharicSingleItem,
  mundoWithBadgeAndDescr,
  mundoMultipleCurations,
  amharicOnlyTitle,
} from './fixtures';

jest.mock('../../components/ThemeProvider');
jest.mock('../../legacy/containers/ChartbeatAnalytics', () => {
  const ChartbeatAnalytics = () => <div>chartbeat</div>;
  return ChartbeatAnalytics;
});

const getOptionParams = ({
  showAdsBasedOnLocation = false,
  service = 'pidgin',
  lang = 'pcm',
  adsToggledOn = false,
} = {}) => ({
  isAmp: false,
  showAdsBasedOnLocation,
  pageType: TOPIC_PAGE,
  service,
  lang,
  toggles: {
    ads: {
      enabled: adsToggledOn,
    },
  },
});

describe('Topic Page', () => {
  it('should not render an unordered list when there is only one promo', () => {
    const { queryByRole } = render(
      <TopicPage pageData={amharicSingleItem} />,
      getOptionParams({ service: 'amharic', lang: 'am' }),
    );
    expect(queryByRole('list')).not.toBeInTheDocument();
  });

  it('should render an unordered list when there is more than one promo', () => {
    const { container, queryByRole } = render(
      <TopicPage pageData={pidginMultipleItems} />,
      getOptionParams(),
    );
    expect(queryByRole('list')).toBeInTheDocument();
    expect(container.getElementsByTagName('li').length).toEqual(4);
  });

  it('should render multiple curations', () => {
    const { getAllByRole } = render(
      <TopicPage pageData={mundoMultipleCurations} />,
      getOptionParams({ service: 'mundo', lang: 'es' }),
    );
    expect(getAllByRole('list').length).toEqual(2);
    expect(getAllByRole('listitem').length).toEqual(4);
  });

  it('should render a section around each curation when more than one exists', () => {
    const { container } = render(
      <TopicPage pageData={mundoMultipleCurations} />,
      getOptionParams({ service: 'mundo', lang: 'es' }),
    );
    expect(container.getElementsByTagName('section').length).toEqual(2);
  });

  it('should not render a section when one or less exists', () => {
    const { container } = render(
      <TopicPage pageData={amharicSingleItem} />,
      getOptionParams({ service: 'amharic', lang: 'am' }),
    );
    expect(container.getElementsByTagName('section').length).toEqual(0);
  });

  it('should render curation subheading when curation title exists', () => {
    const { container } = render(
      <TopicPage pageData={mundoMultipleCurations} />,
      getOptionParams({ service: 'mundo', lang: 'es' }),
    );
    expect(container.querySelector('h2').textContent).toEqual('Analysis');
  });

  it('should render promo headings as h3 when curation subheading exists', () => {
    const { container } = render(
      <TopicPage pageData={mundoMultipleCurations} />,
      getOptionParams({ service: 'mundo', lang: 'es' }),
    );

    expect(container.getElementsByTagName('h3').length).toEqual(4);
    expect(container.getElementsByTagName('h2').length).toEqual(2);
  });

  it('should render promo headings as h2 when there is no curation subheading', () => {
    const { container } = render(
      <TopicPage pageData={pidginMultipleItems} service="pidgin" />,
      getOptionParams(),
    );

    expect(container.getElementsByTagName('h3').length).toEqual(0);
    expect(container.getElementsByTagName('h2').length).toEqual(4);
  });

  it('should render badge and description when they exist in data', () => {
    const { container, queryByTestId } = render(
      <TopicPage pageData={mundoWithBadgeAndDescr} />,
      getOptionParams({ service: 'mundo', lang: 'es' }),
    );

    expect(queryByTestId('topic-badge')).toBeInTheDocument();
    expect(container.getElementsByTagName('p').length).toEqual(1);
  });

  it('should render description without badge', () => {
    const { container, queryByTestId } = render(
      <TopicPage pageData={pidginMultipleItems} service="pidgin" />,
      getOptionParams(),
    );

    expect(queryByTestId('topic-badge')).not.toBeInTheDocument();
    expect(container.getElementsByTagName('p').length).toEqual(1);
  });

  it('should render only topic title without badge or description', () => {
    const { container, queryByTestId } = render(
      <TopicPage pageData={amharicOnlyTitle} />,
      getOptionParams({ service: 'amharic', lang: 'am' }),
    );

    expect(queryByTestId('topic-badge')).not.toBeInTheDocument();
    expect(container.getElementsByTagName('p').length).toEqual(0);
  });

  it('should show ads when enabled', () => {
    [
      [true, true],
      [true, false],
      [false, true],
      [false, false],
    ].forEach(([adsToggledOn, showAdsBasedOnLocation]) => {
      const { container } = render(
        <BrowserRouter>
          <TopicPage pageData={pidginMultipleItems} />
        </BrowserRouter>,
        getOptionParams({ adsToggledOn, showAdsBasedOnLocation }),
      );

      const shouldShowAds = adsToggledOn && showAdsBasedOnLocation;
      const adElement = container.querySelector('[data-e2e="advertisement"]');
      if (shouldShowAds) {
        expect(adElement).toBeInTheDocument();
      } else {
        expect(adElement).not.toBeInTheDocument();
      }
    });
  });

  describe('Message Banner', () => {
    it('should only render when visual style is banner and visual prominence is normal', () => {
      const messageBannerCuration =
        kyrgyzTopicWithMessageBanners.curations.find(
          ({ visualStyle, visualProminence }) =>
            visualProminence === VISUAL_PROMINENCE.NORMAL &&
            visualStyle === VISUAL_STYLE.BANNER,
        );

      const { getByRole } = render(
        <TopicPage pageData={kyrgyzTopicWithMessageBanners} />,
        getOptionParams({ service: 'kyrgyz', lang: 'ky' }),
      );

      const messageBanner = getByRole('region', {
        name: messageBannerCuration.title,
      });

      expect(messageBanner).toBeInTheDocument();
    });

    it('should render multiple message banners with unique ids', () => {
      render(
        <TopicPage pageData={mundoBannerVariations} />,
        getOptionParams({ service: 'mundo', lang: 'es' }),
      );
      expect(document.querySelectorAll("[id^='message-banner']")).toHaveLength(
        3,
      );
      expect(document.querySelectorAll("[id='message-banner']")).toHaveLength(
        0,
      );
    });

    it('should not render when visual style is banner and visual prominence is high', () => {
      const { queryByRole } = render(
        <TopicPage pageData={kyrgyzTopicWithMessageBanners} />,
        getOptionParams({ service: 'kyrgyz', lang: 'ky' }),
      );
      const highProminenceBanner = kyrgyzTopicWithMessageBanners.curations.find(
        curation =>
          curation.visualStyle === VISUAL_STYLE.BANNER &&
          curation.visualProminence === VISUAL_PROMINENCE.HIGH,
      );
      expect(
        queryByRole('region', { name: highProminenceBanner.title }),
      ).not.toBeInTheDocument();
    });

    it('should not render when visual style is not banner', () => {
      render(
        <TopicPage pageData={amharicSingleItem} />,
        getOptionParams({ service: 'amharic', lang: 'am' }),
      );

      expect(document.querySelectorAll("[id^='message-banner']")).toHaveLength(
        0,
      );
    });

    it('should only render the first summary if there is more than one summary in the curation', () => {
      const messageBannerCuration =
        kyrgyzTopicWithMessageBanners.curations.find(
          ({ visualStyle, visualProminence, summaries }) =>
            visualProminence === VISUAL_PROMINENCE.NORMAL &&
            visualStyle === VISUAL_STYLE.BANNER &&
            summaries.length > 1,
        );
      const { queryAllByRole } = render(
        <TopicPage pageData={kyrgyzTopicWithMessageBanners} />,
        getOptionParams({ service: 'kyrgyz', lang: 'ky' }),
      );
      const messageBanners = queryAllByRole('region', {
        name: messageBannerCuration.title,
      });
      expect(messageBanners).toHaveLength(1);
    });
  });
});

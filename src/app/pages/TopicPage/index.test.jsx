import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { TOPIC_PAGE } from '#app/routes/utils/pageTypes';
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
});

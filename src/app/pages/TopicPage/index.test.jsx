import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ToggleContext } from '#contexts/ToggleContext';
import TopicPage from './TopicPage';
import {
  pidginMultipleItems,
  amharicSingleItem,
  mundoWithBadgeAndDescr,
  mundoMultipleCurations,
  amharicOnlyTitle,
} from './fixtures';

jest.mock('../../legacy/containers/ChartbeatAnalytics', () => {
  const ChartbeatAnalytics = () => <div>chartbeat</div>;
  return ChartbeatAnalytics;
});

/* eslint-disable react/prop-types */
const TopicPageWithContext = ({
  pageData = pidginMultipleItems,
  lang = 'pcm',
  service = 'pidgin',
  adsToggledOn = false,
  showAdsBasedOnLocation = false,
} = {}) => (
  <BrowserRouter>
    <ToggleContext.Provider
      value={{
        toggleState: {
          ads: {
            enabled: adsToggledOn,
          },
        },
      }}
    >
      <RequestContextProvider showAdsBasedOnLocation={showAdsBasedOnLocation}>
        <ServiceContextProvider service={service} lang={lang}>
          <TopicPage pageData={pageData} />
        </ServiceContextProvider>
      </RequestContextProvider>
    </ToggleContext.Provider>
  </BrowserRouter>
);

describe('Topic Page', () => {
  it('should not render an unordered list when there is only one promo', () => {
    const { queryByRole } = render(
      <TopicPageWithContext
        pageData={amharicSingleItem}
        lang="am"
        service="amharic"
      />,
    );
    expect(queryByRole('list')).not.toBeInTheDocument();
  });

  it('should render an unordered list when there is more than one promo', () => {
    const { container, queryByRole } = render(<TopicPageWithContext />);
    expect(queryByRole('list')).toBeInTheDocument();
    expect(container.getElementsByTagName('li').length).toEqual(4);
  });

  it('should render multiple curations', () => {
    const { getAllByRole } = render(
      <TopicPageWithContext
        pageData={mundoMultipleCurations}
        service="mundo"
      />,
    );
    expect(getAllByRole('list').length).toEqual(2);
    expect(getAllByRole('listitem').length).toEqual(4);
  });

  it('should render badge and description when they exist in data', () => {
    const { container, queryByTestId } = render(
      <TopicPageWithContext
        pageData={mundoWithBadgeAndDescr}
        service="mundo"
      />,
    );

    expect(queryByTestId('topic-badge')).toBeInTheDocument();
    expect(container.getElementsByTagName('p').length).toEqual(1);
  });

  it('should render description without badge', () => {
    const { container, queryByTestId } = render(
      <TopicPageWithContext pageData={pidginMultipleItems} service="pidgin" />,
    );

    expect(queryByTestId('topic-badge')).not.toBeInTheDocument();
    expect(container.getElementsByTagName('p').length).toEqual(1);
  });

  it('should render only topic title without badge or description', () => {
    const { container, queryByTestId } = render(
      <TopicPageWithContext pageData={amharicOnlyTitle} service="amharic" />,
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
        <TopicPageWithContext
          adsToggledOn={adsToggledOn}
          showAdsBasedOnLocation={showAdsBasedOnLocation}
        />,
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

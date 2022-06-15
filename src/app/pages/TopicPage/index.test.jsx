import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ToggleContext } from '#contexts/ToggleContext';
import TopicPage from './TopicPage';
import { pidginMultipleItems, amharicSingleItem } from './fixtures';

jest.mock('../../containers/ChartbeatAnalytics', () => {
  const ChartbeatAnalytics = () => <div>chartbeat</div>;
  return ChartbeatAnalytics;
});

/* eslint-disable react/prop-types */
const TopicPageWithContext = ({
  pageData = pidginMultipleItems,
  lang = 'pcm',
  service = 'pidgin',
  showAds = false,
} = {}) => (
  <BrowserRouter>
    <ToggleContext.Provider
      value={{
        toggleState: {
          ads: {
            enabled: showAds,
          },
        },
      }}
    >
      <RequestContextProvider showAdsBasedOnLocation={showAds}>
        <ServiceContextProvider service={service} lang={lang}>
          <TopicPage pageData={pageData} />
        </ServiceContextProvider>
      </RequestContextProvider>
    </ToggleContext.Provider>
  </BrowserRouter>
);

describe('A11y', () => {
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

  it('should show ads when enabled', () => {
    const { container } = render(<TopicPageWithContext showAds />);
    expect(
      container.querySelector('[data-e2e="advertisement"]'),
    ).toBeInTheDocument();
  });
});

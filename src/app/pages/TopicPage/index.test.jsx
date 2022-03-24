import React from 'react';
import { render } from '@testing-library/react';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import { ToggleContextProvider } from '#app/contexts/ToggleContext';
import TopicPage from './TopicPage';
import { pidginMultipleItems, amharicSingleItem } from './fixtures';

jest.mock('../../containers/ChartbeatAnalytics', () => {
  const ChartbeatAnalytics = () => <div>chartbeat</div>;
  return ChartbeatAnalytics;
});

const TopicPageWithContext = ({ pageData, lang, service }) => (
  <ToggleContextProvider>
    <ServiceContextProvider service={service} lang={lang}>
      <TopicPage pageData={pageData} />
    </ServiceContextProvider>
  </ToggleContextProvider>
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
    const { container, queryByRole } = render(
      <TopicPageWithContext
        pageData={pidginMultipleItems}
        lang="pcm"
        service="pidgin"
      />,
    );
    expect(queryByRole('list')).toBeInTheDocument();
    expect(container.getElementsByTagName('li').length).toEqual(4);
  });
});

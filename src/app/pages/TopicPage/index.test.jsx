import React from 'react';
import { render } from '@testing-library/react';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import { ToggleContextProvider } from '#app/contexts/ToggleContext';
import TopicPage from './TopicPage';
import {
  pidginMultipleItems,
  amharicSingleItem,
  amharicMultipleItems,
} from './fixtures';

jest.mock('../../containers/ChartbeatAnalytics', () => {
  const ChartbeatAnalytics = () => <div>chartbeat</div>;
  return ChartbeatAnalytics;
});

/* eslint-disable react/prop-types */
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
    const { queryAllByRole } = render(
      <TopicPageWithContext
        pageData={pidginMultipleItems}
        lang="pcm"
        service="pidgin"
      />,
    );

    const promoEls = queryAllByRole('list')[0];

    expect(promoEls).toBeInTheDocument();
    expect(promoEls.getElementsByTagName('li').length).toEqual(4);
  });

  it('should render the correct page information for screen readers', () => {
    const { getByTestId } = render(
      <TopicPageWithContext
        pageData={pidginMultipleItems}
        lang="pcm"
        service="pidgin"
      />,
    );

    expect(getByTestId('topic-pagination-summary').textContent).toEqual(
      'Page 1 of 4',
    );
  });

  it('should render a max page of 40', () => {
    const { getAllByRole } = render(
      <TopicPageWithContext
        pageData={amharicMultipleItems}
        lang="am"
        service="amharic"
      />,
    );

    const pageNumbersEl = getAllByRole('list')[1];

    expect(pageNumbersEl.lastChild.textContent).toEqual('40');
  });
});

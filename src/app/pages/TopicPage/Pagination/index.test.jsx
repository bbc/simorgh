import React from 'react';
import { render } from '@testing-library/react';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import PaginationComponent from '.';

// eslint-disable-next-line react/prop-types
const renderComponent = ({
  service = 'news',
  activePage = 1,
  pageCount = 2,
} = {}) =>
  render(
    <ServiceContextProvider service={service}>
      <PaginationComponent activePage={activePage} pageCount={pageCount} />
    </ServiceContextProvider>,
  );

describe('Topic Pagination', () => {
  it('does not render if there is only one page', async () => {
    const { queryByTestId } = renderComponent({ activePage: 1, pageCount: 1 });

    expect(queryByTestId('topic-pagination')).not.toBeInTheDocument();
  });

  it('should render links to page 2 when on page 1', async () => {
    const { queryByTestId } = renderComponent({ activePage: 1, pageCount: 2 });

    // Both the "next" arrow and the "2" button link to page 2
    expect(document.querySelectorAll('a[href*="page=2"]').length).toBe(2);

    expect(queryByTestId('topic-pagination-ellipsis')).not.toBeInTheDocument();
    expect(document.querySelector('a[href*="page=1"]')).not.toBeInTheDocument();
  });

  it('should render links to page 1 when on page 2', async () => {
    const { queryByTestId } = renderComponent({ activePage: 2, pageCount: 2 });

    // Both the "previous" arrow and the "1" button link to page 1
    expect(document.querySelectorAll('a[href*="page=1"]').length).toBe(2);

    expect(queryByTestId('topic-pagination-ellipsis')).not.toBeInTheDocument();
    expect(document.querySelector('a[href*="page=2"]')).not.toBeInTheDocument();
  });

  it('renders a limited number of page links', async () => {
    const { queryByTestId } = renderComponent({ activePage: 1, pageCount: 50 });

    expect(document.querySelectorAll('a').length).toBeLessThan(20);
    expect(queryByTestId('topic-pagination-ellipsis')).toBeInTheDocument();
  });
});

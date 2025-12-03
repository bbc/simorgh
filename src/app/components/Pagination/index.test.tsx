import React from 'react';
import { render } from '../react-testing-library-with-providers';
import PaginationComponent from '.';

const renderComponent = ({
  activePage = 1,
  pageCount = 2,
  pageXOfY = 'Page {x} of {y}',
} = {}) =>
  render(
    <PaginationComponent
      activePage={activePage}
      pageCount={pageCount}
      pageXOfY={pageXOfY}
      nextPage="Next Page"
      previousPage="Previous Page"
      page="Page"
    />,
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

    // The "previous" arrow should be hidden when user is on page 1
    expect(document.querySelectorAll('a[href*="page=1"]').length).toBe(1);

    expect(queryByTestId('topic-pagination-ellipsis')).not.toBeInTheDocument();
  });

  it('should render links to page 1 when on page 2', async () => {
    const { queryByTestId } = renderComponent({ activePage: 2, pageCount: 2 });

    // Both the "previous" arrow and the "1" button link to page 1
    expect(document.querySelectorAll('a[href*="page=1"]').length).toBe(2);

    // The "previous" arrow should be hidden when user is on the last page
    expect(document.querySelectorAll('a[href*="page=2"]').length).toBe(1);

    expect(queryByTestId('topic-pagination-ellipsis')).not.toBeInTheDocument();
  });

  it('should render links to the active page', async () => {
    renderComponent({ activePage: 2, pageCount: 2 });

    const currentPageLink = document.querySelector('a[href*="page=2"]');
    expect(currentPageLink).toBeInTheDocument();
    expect(currentPageLink?.getAttribute('aria-current')).toBe('page');
  });

  it('renders a limited number of page links', async () => {
    renderComponent({ activePage: 1, pageCount: 50 });

    expect(document.querySelectorAll('a').length).toBeLessThan(20);
    expect(
      document.querySelector('[data-testid="topic-pagination-ellipsis"]'),
    ).toBeInTheDocument();
    expect(
      document
        .querySelector('[data-testid="topic-pagination-ellipsis"]')
        ?.getAttribute('role'),
    ).toBe('separator');
  });

  it('should render a summary element for small devices', async () => {
    const { getByTestId } = renderComponent({ activePage: 1, pageCount: 2 });

    expect(getByTestId('topic-pagination-summary').textContent).toBe(
      'Page 1 of 2',
    );
  });
});

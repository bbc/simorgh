import React from 'react';
import { render } from '@testing-library/react';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import TopicTitle from '.';

// eslint-disable-next-line react/prop-types
const renderComponent = ({
  service = 'news',
  activePage = 1,
  pageCount = 2,
} = {}) =>
  render(
    <ServiceContextProvider service={service}>
      <TopicTitle
        title="test title"
        activePage={activePage}
        pageCount={pageCount}
      />
    </ServiceContextProvider>,
  );

describe('Topic Header', () => {
  it('should include page x of y when more than one page exists', () => {
    const { queryByRole } = renderComponent({ activePage: 1, pageCount: 3 });

    expect(queryByRole('heading').textContent).toContain('Page 1 of 3');
  });
  it('should change active page in header when on another page', () => {
    const { queryByRole } = renderComponent({ activePage: 2, pageCount: 3 });

    expect(queryByRole('heading').textContent).toContain('Page 2 of 3');
  });
  it('should not include page number if only one page exists', () => {
    const { queryByRole } = renderComponent({ activePage: 1, pageCount: 1 });

    expect(queryByRole('heading').textContent).not.toContain('Page 1 of');
  });
});

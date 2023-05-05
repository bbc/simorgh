import React from 'react';
import {
  render,
  screen,
  act,
} from '#app/components/react-testing-library-with-providers';
import Live from './LivePageLayout';

const mockPageData = {
  pageCount: 10,
  activePage: 1,
  someResponse: {
    block: 'Its a block',
  },
};

describe('Live Page', () => {
  it('renders the live page', async () => {
    await act(async () => {
      render(<Live pageData={mockPageData} />);
    });

    expect(screen.getByText('Test Next.JS Page')).toBeInTheDocument();
  });

  it('creates snapshot of the live page', async () => {
    let container;
    await act(async () => {
      container = render(<Live pageData={mockPageData} />).container;
    });

    expect(container).toMatchSnapshot();
  });
});

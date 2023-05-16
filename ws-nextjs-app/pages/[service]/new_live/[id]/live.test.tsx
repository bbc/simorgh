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
  title: 'Test Next.JS Page',
  description: 'Test Next.JS Page Description',
  someResponse: {
    block: 'Its a block',
  },
};

describe('Live Page', () => {
  it('should render the live page title', async () => {
    await act(async () => {
      render(<Live pageData={mockPageData} />);
    });

    expect(screen.getByText('Test Next.JS Page')).toBeInTheDocument();
  });

  it('should render the live page description', async () => {
    await act(async () => {
      render(<Live pageData={mockPageData} />);
    });

    expect(
      screen.getByText('Test Next.JS Page Description'),
    ).toBeInTheDocument();
  });

  it('creates snapshot of the live page', async () => {
    let container;

    await act(
      // eslint-disable-next-line no-return-assign
      async () => ({ container } = render(<Live pageData={mockPageData} />)),
    );

    expect(container).toMatchSnapshot();
  });
});

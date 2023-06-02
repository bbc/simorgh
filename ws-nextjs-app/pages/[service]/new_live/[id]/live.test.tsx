import React from 'react';
import {
  render,
  screen,
  act,
} from '#app/components/react-testing-library-with-providers';
import postFixture from '#data/pidgin/posts/postFixture.json';
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

const mockPageDataWithPosts = {
  pageCount: 10,
  activePage: 1,
  title: 'Test Next.JS Page',
  description: 'Test Next.JS Page Description',
  someResponse: {
    block: 'Its a block',
  },
  posts: postFixture,
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

  it('should render a live page with posts', async () => {
    await act(async () => {
      render(<Live pageData={mockPageDataWithPosts} />);
    });

    expect(screen.getAllByText('Breaking news')[0]).toBeInTheDocument();
    expect(screen.getByText('Published 6.07pm Tues 9th')).toBeInTheDocument();
    expect(screen.getByText('Timestamp test')).toBeInTheDocument();
    expect(screen.getByText('Another post')).toBeInTheDocument();
    expect(screen.getByText('Another post sub headline')).toBeInTheDocument();
  });

  it('creates snapshot of the live page', async () => {
    let container;

    await act(
      // eslint-disable-next-line no-return-assign
      async () =>
        ({ container } = render(<Live pageData={mockPageDataWithPosts} />)),
    );

    expect(container).toMatchSnapshot();
  });
});

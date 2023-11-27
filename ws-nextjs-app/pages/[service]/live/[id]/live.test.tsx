import React from 'react';
import { Helmet } from 'react-helmet';

import {
  render,
  screen,
  act,
} from '#app/components/react-testing-library-with-providers';
import liveFixture from '#data/pidgin/livePage/c7p765ynk9qt.json';
import postFixture from '#data/pidgin/posts/postFixture.json';
import Live from './LivePageLayout';

const mockPageData = {
  ...liveFixture.data,
  someResponse: {
    block: 'Its a block',
  },
  liveTextStream: {
    content: {
      data: {
        results: [],
        page: {
          index: 1,
          total: 3,
        },
      },
    },
    contributors: 'Not a random dude',
  },
};

const mockPageDataWithPosts = {
  ...liveFixture.data,
  someResponse: {
    block: 'Its a block',
  },
  liveTextStream: {
    content: postFixture,
    contributors: 'Not a random dude',
  },
};

const mockPageDataWithoutKeyPoints = {
  ...liveFixture.data,
  someResponse: {
    block: 'Its a block',
  },
  summaryPoints: {
    id: null,
    content: null,
  },
  liveTextStream: {
    content: postFixture,
    contributors: 'Not a random dude',
  },
};

describe('Live Page', () => {
  it('should render the live page title', async () => {
    await act(async () => {
      render(<Live pageData={mockPageData} />);
    });

    expect(screen.getByText('Pidgin test 2')).toBeInTheDocument();
  });

  it('should use the title value from the data response as the page title', async () => {
    await act(async () => {
      render(<Live pageData={mockPageData} />, { service: 'pidgin' });
    });

    const { title: helmetTitle } = Helmet.peek();

    expect(helmetTitle).toEqual(`${mockPageData.title} - BBC News Pidgin`);
  });

  it('should use the title value combined with the pagination value as the page title', async () => {
    const paginatedData = {
      ...mockPageData,
      liveTextStream: {
        content: {
          data: {
            results: [],
            page: {
              index: 2,
              total: 3,
            },
          },
        },
        contributors: 'Not a random dude',
      },
    };

    await act(async () => {
      render(<Live pageData={paginatedData} />, { service: 'pidgin' });
    });

    const { title: helmetTitle } = Helmet.peek();

    expect(helmetTitle).toEqual(
      `${mockPageData.title}, Page 2 of 3 - BBC News Pidgin`,
    );
  });

  it('should render the live page description', async () => {
    await act(async () => {
      render(<Live pageData={mockPageData} />);
    });

    expect(
      screen.getByText('Pidgin test 2 - the description'),
    ).toBeInTheDocument();
  });

  it('should render the key points section', async () => {
    const { container } = await act(async () => {
      return render(<Live pageData={mockPageData} />);
    });

    expect(container.querySelector('[data-e2e="key-points"]')).toBeTruthy();
  });

  it('should not render the key points section when no content is provided', async () => {
    const { container } = await act(async () => {
      return render(<Live pageData={mockPageDataWithoutKeyPoints} />);
    });

    expect(container.querySelector('[data-e2e="key-points"]')).toBeFalsy();
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
    expect(screen.getByTestId('breaking-news-label')).toBeInTheDocument();
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

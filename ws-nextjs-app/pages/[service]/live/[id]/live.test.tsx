import React from 'react';
import { Helmet } from 'react-helmet';

import {
  render,
  screen,
  act,
} from '#app/components/react-testing-library-with-providers';
import liveFixture from '#data/pidgin/live/c7p765ynk9qt.json';
import postFixture from '#data/pidgin/posts/postFixture.json';
import { GetServerSidePropsContext } from 'next';
import Live from './LivePageLayout';
import { getServerSideProps } from './[[...variant]].page';

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
  headerImage: {
    url: 'https://ichef.bbci.co.uk/ace/standard/480/cpsdevpb/1d5b/test/5f969ec0-c4d8-11ed-8319-9b394d8ed0dd.jpg',
    urlTemplate:
      'https://ichef.bbci.co.uk/ace/standard/{width}/cpsdevpb/1d5b/test/5f969ec0-c4d8-11ed-8319-9b394d8ed0dd.jpg',
    height: 371,
    width: 660,
    altText: 'Man',
    copyright: 'BBC',
  },
  metadata: { atiAnalytics: {} },
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
  metadata: { atiAnalytics: {} },
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
  metadata: { atiAnalytics: {} },
};

const mockPageDataWithMetadata = ({
  title,
  description,
  seoTitle,
  seoDescription,
  datePublished,
  dateModified,
  startDateTime,
  endDateTime,
}: {
  title: string;
  description?: string;
  startDateTime?: string;
  endDateTime?: string;
  seoTitle?: string;
  seoDescription?: string;
  datePublished?: string;
  dateModified?: string;
}) => {
  return {
    ...mockPageData,
    title,
    description,
    startDateTime,
    endDateTime,
    seo: {
      seoTitle,
      seoDescription,
      datePublished,
      dateModified,
    },
  };
};

describe('Live Page', () => {
  it('Should set Cache-Control header to correct values', async () => {
    const context = {
      query: {
        service: 'pidgin',
        id: 'c7p765ynk9qt',
      },
      req: { headers: {} },
      res: {
        setHeader: jest.fn(),
        on: jest.fn(),
      },
    } as unknown as GetServerSidePropsContext;

    await getServerSideProps(context);
    expect(context.res.setHeader).toHaveBeenCalledWith(
      'Cache-Control',
      'public, stale-if-error=300, stale-while-revalidate=120, max-age=30',
    );
  });

  it.each`
    title             | seoTitle             | info                      | expected
    ${'I am a Title'} | ${'I am a seoTitle'} | ${'seoTitle'}             | ${'I am a seoTitle - BBC News Pidgin'}
    ${'I am a Title'} | ${undefined}         | ${'title if no seoTitle'} | ${'I am a Title - BBC News Pidgin'}
  `(
    'should use $info as the meta title',
    async ({ title, seoTitle, expected }) => {
      await act(async () => {
        render(
          <Live pageData={mockPageDataWithMetadata({ title, seoTitle })} />,
          { service: 'pidgin' },
        );
      });

      const { title: helmetTitle } = Helmet.peek();
      expect(helmetTitle).toEqual(expected);
    },
  );

  it.each`
    description             | seoDescription             | info                                  | expected
    ${'I am a Description'} | ${'I am a seoDescription'} | ${'seoDescription'}                   | ${'I am a seoDescription'}
    ${'I am a Description'} | ${undefined}               | ${'description if no seoDescription'} | ${'I am a Description'}
    ${undefined}            | ${undefined}               | ${'title as a fallback'}              | ${'title'}
  `(
    'should use $info as the meta description',
    async ({ description, seoDescription, expected }) => {
      await act(async () => {
        render(
          <Live
            pageData={mockPageDataWithMetadata({
              title: 'title',
              description,
              seoDescription,
            })}
          />,
        );
      });

      const helmetContent = Helmet.peek();
      const findDescription = helmetContent.metaTags.find(
        ({ name }) => name === 'description',
      );
      expect(findDescription?.content).toEqual(expected);
    },
  );

  it.each`
    title             | seoTitle             | info                      | expected
    ${'I am a Title'} | ${'I am a seoTitle'} | ${'seoTitle'}             | ${'I am a seoTitle'}
    ${'I am a Title'} | ${undefined}         | ${'title if no seoTitle'} | ${'I am a Title'}
  `(
    'should use $info as the schema headline',
    async ({ title, seoTitle, expected }) => {
      await act(async () => {
        render(
          <Live pageData={mockPageDataWithMetadata({ title, seoTitle })} />,
        );
      });

      const schemaHeadline = Helmet.peek().scriptTags.find(({ innerHTML }) =>
        innerHTML?.includes(`"headline":"${expected}"`),
      );

      expect(schemaHeadline).toBeTruthy();
    },
  );

  it('SEO should use datePublished and dateModified when present', async () => {
    const datePublished = '2018-09-28T22:59:02.448804522Z';
    const dateModified = '2020-09-28T22:59:02.448804522Z';

    await act(async () => {
      render(
        <Live
          pageData={mockPageDataWithMetadata({
            title: 'Title',
            datePublished,
            dateModified,
          })}
        />,
      );
    });

    const SEODatePublished = Helmet.peek().scriptTags.find(({ innerHTML }) =>
      innerHTML?.includes(`"datePublished":"${datePublished}"`),
    );

    const SEODateModified = Helmet.peek().scriptTags.find(({ innerHTML }) =>
      innerHTML?.includes(`"dateModified":"${dateModified}"`),
    );

    expect(SEODatePublished).toBeTruthy();
    expect(SEODateModified).toBeTruthy();
  });

  it('SEO should NOT contain datePublished and dateModified when absent', async () => {
    await act(async () => {
      render(
        <Live
          pageData={mockPageDataWithMetadata({
            title: 'Title',
          })}
        />,
      );
    });

    const SEODatePublished = Helmet.peek().scriptTags.find(({ innerHTML }) =>
      innerHTML?.includes(`"datePublished": null"`),
    );

    const SEODateModified = Helmet.peek().scriptTags.find(({ innerHTML }) =>
      innerHTML?.includes(`"dateModified": null"`),
    );

    expect(SEODatePublished).toBeFalsy();
    expect(SEODateModified).toBeFalsy();
  });

  it('SEO should use coverageStartTime and coverageEndTime when present', async () => {
    const startDateTime = '2023-04-05T10:22:00.000Z';
    const endDateTime = '2024-04-05T10:21:00.000Z';

    await act(async () => {
      render(
        <Live
          pageData={mockPageDataWithMetadata({
            title: 'Title',
            startDateTime,
            endDateTime,
          })}
        />,
      );
    });

    const CoverageStartTime = Helmet.peek().scriptTags.find(({ innerHTML }) =>
      innerHTML?.includes(`"coverageStartTime":"${startDateTime}"`),
    );

    const CoverageEndTime = Helmet.peek().scriptTags.find(({ innerHTML }) =>
      innerHTML?.includes(`"coverageEndTime":"${endDateTime}"`),
    );

    expect(CoverageStartTime).toBeTruthy();
    expect(CoverageEndTime).toBeTruthy();
  });

  it('SEO should NOT contain coverageStartTime and coverageEndTime when absent', async () => {
    await act(async () => {
      render(
        <Live
          pageData={mockPageDataWithMetadata({
            title: 'Title',
          })}
        />,
      );
    });

    const CoverageStartTime = Helmet.peek().scriptTags.find(({ innerHTML }) =>
      innerHTML?.includes(`"coverageStartTime":null`),
    );

    const CoverageEndTime = Helmet.peek().scriptTags.find(({ innerHTML }) =>
      innerHTML?.includes(`"coverageEndTime":null`),
    );

    expect(CoverageStartTime).toBeFalsy();
    expect(CoverageEndTime).toBeFalsy();
  });

  it('should use the seoTitle value combined with the pagination value as the page title', async () => {
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
      `${mockPageData.seo.seoTitle}, Page 2 of 3 - BBC News Pidgin`,
    );
  });

  it('should use the title value combined with the pagination value as the page title', async () => {
    const paginatedData = {
      ...mockPageData,
      seo: {
        seoDescription: 'Pidgin test 2 - SEO Description',
        datePublished: '2023-04-05T10:22:00.000Z',
        dateModified: '2024-03-12T11:00:52+00:00',
      },
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

  it('should render the live page title', async () => {
    await act(async () => {
      render(<Live pageData={mockPageData} />);
    });

    expect(
      screen.getByText(
        'Israeli tanks shell Jabalia camp as heavy fighting continues in north Gaza',
      ),
    ).toBeInTheDocument();
  });

  it('should render the live page description', async () => {
    await act(async () => {
      render(<Live pageData={mockPageData} />);
    });

    expect(
      screen.getByText(
        'The refugee camp has been hit by hundreds of shells, where Hamas says 100,000 people are still sheltering',
      ),
    ).toBeInTheDocument();
  });

  it('should render the live page header image if provided', async () => {
    await act(async () => {
      render(<Live pageData={mockPageData} />);
    });

    const headerImage = screen.getByRole('presentation');
    expect(headerImage).toHaveAttribute(
      'src',
      'https://ichef.bbci.co.uk/ace/standard/480/cpsdevpb/1d5b/test/5f969ec0-c4d8-11ed-8319-9b394d8ed0dd.jpg',
    );
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
        ({ container } = render(<Live pageData={mockPageDataWithPosts} />, {
          service: 'pidgin',
        })),
    );

    expect(container).toMatchSnapshot();
  });
});

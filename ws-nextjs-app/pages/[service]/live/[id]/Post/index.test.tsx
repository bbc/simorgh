import {
  render,
  screen,
  act,
  within,
} from '#app/components/react-testing-library-with-providers';
import postFixture from '#data/pidgin/posts/postFixtureCleaned.json';
import { LIVE_PAGE } from '#src/app/routes/utils/pageTypes';
import Post from '.';
import {
  audioSamplePost,
  samplePost,
  twitterSamplePost,
  videoSamplePost,
  bylineSamplePost,
} from './fixture';

const singlePostWithTitle = postFixture.data.results[0];

const singlePostWithTitleAndSubtitle = postFixture.data.results[2];

describe('Post', () => {
  beforeEach(() => {
    // @ts-expect-error Mocking require to prevent race condition.
    window.require = jest.fn();
  });

  afterEach(() => {
    delete process.env.SIMORGH_APP_ENV;
    jest.useRealTimers();
  });

  describe('Timestamp', () => {
    it.each`
      service        | expectedTime
      ${'pidgin'}    | ${'28 April 2023'}
      ${'zhongwen'}  | ${'2023年4月28日'}
      ${'ukrainian'} | ${'28 квітня 2023'}
    `(
      'Shows timestamp in the expected format for $service for articles over 10 hours old.',
      async ({ service, expectedTime }) => {
        const { container } = await act(async () => {
          const postData = {
            ...samplePost,
            dates: {
              firstPublished: '2023-04-28T10:33:09+00:00',
              lastPublished: '2023-04-28T10:33:09+00:00',
              time: null,
              curated: '2023-04-28T10:33:10.293Z',
            },
          };

          return render(<Post post={postData} />, {
            service,
          });
        });

        const time = container.querySelector('time');
        expect(time?.textContent).toEqual(expectedTime);
      },
    );

    it.each`
      service        | expectedTime
      ${'pidgin'}    | ${'2 minutes wey don pass'}
      ${'zhongwen'}  | ${'2 分钟前'}
      ${'ukrainian'} | ${'2 хвилин(и) тому'}
    `(
      'Shows timestamp as a relative time for $service articles under 10 hours old.',
      async ({ service, expectedTime }) => {
        jest
          .useFakeTimers()
          .setSystemTime(new Date('2023-04-28T10:35:10.293Z'));
        const { container } = await act(async () => {
          const postData = {
            ...samplePost,
            dates: {
              firstPublished: '2023-04-28T10:33:09+00:00',
              lastPublished: '2023-04-28T10:33:09+00:00',
              time: null,
              curated: '2023-04-28T10:33:10.293Z',
            },
          };

          return render(<Post post={postData} />, {
            service,
          });
        });
        const time = container.querySelector('time');
        expect(time?.textContent).toEqual(expectedTime);
      },
    );
  });

  describe('Header', () => {
    it('should render h3 title when provided', async () => {
      await act(async () => {
        render(<Post post={singlePostWithTitle} />);
      });

      expect(screen.getByText('Breaking news headline')).toBeInTheDocument();
      expect(screen.getByRole('heading', { level: 3 })).toBeTruthy();
    });

    it('should render h3 with title and subtitle when provided', async () => {
      await act(async () => {
        render(<Post post={singlePostWithTitleAndSubtitle} />);
      });

      expect(screen.getByText('Another post')).toBeInTheDocument();
      expect(screen.getByText('Another post sub headline')).toBeInTheDocument();
      expect(screen.getAllByRole('heading', { level: 3 })).toBeTruthy();
      expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(1);
    });

    it('should not crash when the first headline text block is missing', async () => {
      const postWithMissingFirstHeadlineBlock = {
        ...samplePost,
        header: {
          ...samplePost.header,
          model: {
            ...samplePost.header.model,
            blocks: [
              {
                ...samplePost.header.model.blocks[0],
                model: {
                  ...samplePost.header.model.blocks[0].model,
                  blocks: [undefined],
                },
              },
              ...samplePost.header.model.blocks.slice(1),
            ],
          },
        },
      };

      await act(async () => {
        render(<Post post={postWithMissingFirstHeadlineBlock as never} />);
      });

      expect(screen.getByRole('heading', { level: 3 })).toBeInTheDocument();
    });

    it('should render a span with role=text to avoid text splitting in screenreaders', async () => {
      await act(async () => {
        render(<Post post={singlePostWithTitle} />);
      });

      expect(screen.getAllByRole('text')[0].closest('h3')).toBeInTheDocument();
    });

    it('should render a byline when contributor data is provided', async () => {
      await act(async () => {
        render(<Post post={bylineSamplePost} />, { pageType: 'live' });
      });

      const byline = screen.getByTestId('byline');

      const authorName = within(byline).getByText('Gahuza contributor');
      const authorRole = within(byline).getByText('gahuza contributor');
      const authorImage = within(byline).getByRole('presentation');

      expect(byline).toBeInTheDocument();

      expect(authorName).toBeInTheDocument();
      expect(authorRole).toBeInTheDocument();
      expect(authorImage).toBeInTheDocument();

      expect(authorImage).toHaveAttribute(
        'src',
        'https://ichef.bbci.co.uk/ace/ws/160/cpsdevpb/vivo/test/images/2016/12/12/977af52a-6eaf-481f-9a06-094860d56760.jpg.webp',
      );
    });

    it('should render a byline with the requisite off screen text for screen readers', async () => {
      await act(async () => {
        render(<Post post={bylineSamplePost} />, { pageType: 'live' });
      });

      const byline = screen.getByTestId('byline');

      const author = within(byline).getByText('Author,');
      const role = within(byline).getByText('Role,');

      expect(byline).toBeInTheDocument();

      expect(author).toBeInTheDocument();
      expect(role).toBeInTheDocument();
    });
  });
  describe('Content', () => {
    it('should render paragraphs when provided', async () => {
      await act(async () => {
        render(<Post post={singlePostWithTitle} />);
      });

      expect(screen.getByText('Breaking news')).toBeInTheDocument();
      expect(
        screen.getByText(
          'Bharat na name wey most pipo dey call India for Hindi language. Wen e come to official communication for English, dem dey always use India.',
        ),
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          'Narendra Modi goment don dey change dis practice wey dem don dey do for long time.',
        ),
      ).toBeInTheDocument();
    });

    it('should render a list when provided', async () => {
      await act(async () => {
        render(<Post post={singlePostWithTitleAndSubtitle} />);
      });

      expect(screen.getByRole('list')).toBeTruthy();
      expect(screen.getAllByRole('listitem')).toHaveLength(4);
    });

    it('should render a twitter embed when provided', async () => {
      const { container } = await act(async () =>
        render(<Post post={twitterSamplePost} />),
      );

      expect(
        container.querySelector(
          '[data-e2e="twitter-embed-https://twitter.com/bbcnewspidgin/status/1700039661874282772"]',
        ),
      ).toBeTruthy();
    });

    it('should render the new media player in a post containing video', async () => {
      const { container } = await act(async () =>
        render(<Post post={videoSamplePost} />, {
          id: 'c7p765ynk9qt',
          service: 'pidgin',
          pageType: LIVE_PAGE,
          pathname: '/pidgin/live/c7p765ynk9qt',
        }),
      );

      expect(
        container.querySelector('[data-e2e="media-player"]'),
      ).toBeInTheDocument();
    });

    it('should render the new media player in a post containing audio', async () => {
      const { container } = await act(async () =>
        render(<Post post={audioSamplePost} />, {
          id: 'c7p765ynk9qt',
          service: 'pidgin',
          pageType: LIVE_PAGE,
          pathname: '/pidgin/live/c7p765ynk9qt',
        }),
      );

      expect(
        container.querySelector('[data-e2e="media-loader__container"]'),
      ).toBeInTheDocument();
    });

    it('should not render share button by default', async () => {
      await act(async () => {
        render(<Post post={singlePostWithTitle} />);
      });

      expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });

    it('should not render share button when first heading text is missing', async () => {
      const postWithMissingFirstHeadingText = {
        ...samplePost,
        header: {
          ...samplePost.header,
          model: {
            ...samplePost.header.model,
            blocks: [
              {
                ...samplePost.header.model.blocks[0],
                model: {
                  ...samplePost.header.model.blocks[0].model,
                  blocks: [undefined],
                },
              },
              ...samplePost.header.model.blocks.slice(1),
            ],
          },
        },
      };

      await act(async () => {
        render(
          <Post post={postWithMissingFirstHeadingText as never} hasShareApi />,
        );
      });

      expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });
  });
});

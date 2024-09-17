import React from 'react';
import {
  render,
  screen,
  act,
} from '#components/react-testing-library-with-providers';
import postFixture from '#data/pidgin/posts/postFixtureCleaned.json';
import { LIVE_PAGE } from '#app/routes/utils/pageTypes';
import Post from '.';
import { samplePost, twitterSamplePost, videoSamplePost } from './fixture';

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
    it('Shows timestamp as a stamp for articles over 10 hours old.', async () => {
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
          service: 'pidgin',
        });
      });

      const time = container.querySelector('time');
      expect(time?.textContent).toEqual('28 April 2023');
    });

    it('Shows timestamp as a relative time for articles under 10 hours old.', async () => {
      jest.useFakeTimers().setSystemTime(new Date('2023-04-28T10:35:10.293Z'));
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
          service: 'pidgin',
        });
      });
      const time = container.querySelector('time');
      expect(time?.textContent).toEqual('2 minutes wey don pass');
    });
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

    it('should render a span with role=text to avoid text splitting in screenreaders', async () => {
      await act(async () => {
        render(<Post post={singlePostWithTitle} />);
      });

      expect(screen.getAllByRole('text')[0].closest('h3')).toBeInTheDocument();
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
      const { container } = await act(async () => {
        return render(<Post post={twitterSamplePost} />);
      });

      expect(
        container.querySelector(
          '[data-e2e="twitter-embed-https://twitter.com/bbcnewspidgin/status/1700039661874282772"]',
        ),
      ).toBeTruthy();
    });

    it('should render the new media player in a post containing video', async () => {
      const { container } = await act(async () => {
        return render(<Post post={videoSamplePost} />, {
          id: 'c7p765ynk9qt',
          service: 'pidgin',
          pageType: LIVE_PAGE,
          pathname: '/pidgin/live/c7p765ynk9qt',
        });
      });

      expect(
        container.querySelector('[data-e2e="media-loader__placeholder"]'),
      ).toBeInTheDocument();
    });

    it('should not render share button by default', async () => {
      await act(async () => {
        render(<Post post={singlePostWithTitle} />);
      });

      expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });
  });
});

import { useEffect, useState } from 'react';
import {
  act,
  render,
  waitFor,
} from '#app/components/react-testing-library-with-providers';
import { Article } from '#app/models/types/optimo';
import { ARTICLE_PAGE } from '#app/routes/utils/pageTypes';
import { RequestContextProvider } from '../RequestContext';
import {
  ArticleOnwardJourneysProvider,
  ONWARD_JOURNEYS,
  OnwardJourney,
  useArticleOnwardJourneys,
  useOnwardJourneyRequest,
} from '.';

jest.mock('#app/lib/utilities/getEnvConfig', () => ({
  getEnvConfig: jest.fn(() => ({
    WEB_CDN_URL: 'https://www.test.bbc.com',
  })),
}));

const article = {
  content: { model: { blocks: [] } },
  metadata: {
    consumableAsSFV: true,
    lastPublished: 0,
    topics: [{ topicId: 'country-topic', topicName: 'Country topic' }],
  },
  mostRead: null,
  promo: { headlines: { seoHeadline: '' } },
} as unknown as Article;

const ArticleData = ({ pageData }: { pageData: Article }) => {
  const currentArticle = useArticleOnwardJourneys(pageData);

  return (
    <>
      <output data-testid="top-stories">
        {currentArticle.secondaryColumn?.topStories?.length ?? 0}
      </output>
      <output data-testid="most-read">
        {currentArticle.mostRead?.items?.length ?? 0}
      </output>
      <output data-testid="latest-media">
        {currentArticle.secondaryColumn?.latestMedia?.length ?? 0}
      </output>
      <output data-testid="country-topic">
        {currentArticle.countryTopicIdToReorder ?? ''}
      </output>
    </>
  );
};

const RequestOnwardJourneys = ({
  onwardJourneys,
}: {
  onwardJourneys: OnwardJourney[];
}) => {
  const context = useOnwardJourneyRequest();

  useEffect(() => {
    onwardJourneys.forEach(onwardJourney => {
      context?.requestOnwardJourney(onwardJourney);
    });
  }, [context, onwardJourneys]);

  return null;
};

const TestApp = ({
  country,
  onwardJourneys = [],
  pageData = article,
  children,
}: {
  country?: string;
  onwardJourneys?: OnwardJourney[];
  pageData?: Article;
  children?: React.ReactNode;
}) => (
  <RequestContextProvider
    service="pidgin"
    pageType={ARTICLE_PAGE}
    pathname="/pidgin/articles/cvpde7nqj92o"
    country={country}
  >
    <ArticleOnwardJourneysProvider pageData={pageData} pageType={ARTICLE_PAGE}>
      <RequestOnwardJourneys onwardJourneys={onwardJourneys} />
      <ArticleData pageData={pageData} />
      {children}
    </ArticleOnwardJourneysProvider>
  </RequestContextProvider>
);

const mockFetch = jest.fn();

const PendingMostRead = () => {
  const context = useOnwardJourneyRequest();
  const [isResolved, setIsResolved] = useState(false);

  useEffect(() => {
    context?.requestOnwardJourney('mostRead').then(() => setIsResolved(true));
  }, [context]);

  return (
    <output data-testid="request-status">
      {isResolved ? 'resolved' : 'pending'}
    </output>
  );
};

describe('ArticleOnwardJourneysProvider', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    global.fetch = mockFetch;
  });

  it('fetches and combines canonical article onward journey data', async () => {
    mockFetch.mockImplementation((input: string) => {
      const onwardJourney = new URL(input).searchParams.get('onwardJourney');
      const responseData: Record<string, unknown> = {
        topStoriesAndFeatures: {
          topStories: [{ id: 'top-story' }],
          features: [{ id: 'feature' }],
        },
        mostRead: { items: [{ id: 'most-read' }] },
        portraitVideo: null,
        videoCuration: null,
        countryCuration: {
          topicId: 'country-topic',
          summaries: [],
        },
        latestMedia: [{ id: 'latest-media' }],
      };

      return Promise.resolve({
        ok: true,
        json: async () => ({ data: responseData[onwardJourney ?? ''] }),
      });
    });

    const { getByTestId } = render(
      <TestApp country="ng" onwardJourneys={[...ONWARD_JOURNEYS]} />,
    );

    await waitFor(() => {
      expect(getByTestId('top-stories')).toHaveTextContent('1');
    });

    expect(getByTestId('most-read')).toHaveTextContent('1');
    expect(getByTestId('latest-media')).toHaveTextContent('1');
    expect(getByTestId('country-topic')).toHaveTextContent('country-topic');

    const onwardJourneys = mockFetch.mock.calls.map(([input]) =>
      new URL(input as string).searchParams.get('onwardJourney'),
    );

    expect(onwardJourneys).toEqual(
      expect.arrayContaining([
        'topStoriesAndFeatures',
        'mostRead',
        'portraitVideo',
        'videoCuration',
        'countryCuration',
        'latestMedia',
      ]),
    );
  });

  it('does not request country curation without a country', async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => ({ data: null }),
    });

    render(<TestApp onwardJourneys={[...ONWARD_JOURNEYS]} />);

    await waitFor(() => expect(mockFetch).toHaveBeenCalled());

    const onwardJourneys = mockFetch.mock.calls.map(([input]) =>
      new URL(input as string).searchParams.get('onwardJourney'),
    );

    expect(onwardJourneys).not.toContain('countryCuration');
  });

  it('does not request onward journeys before their placeholders trigger them', () => {
    render(<TestApp country="ng" />);

    expect(mockFetch).not.toHaveBeenCalled();
  });

  it.each(['null', 'non-OK'])(
    'handles %s country curation when the article has no topics',
    async responseType => {
      mockFetch.mockResolvedValue({
        ok: responseType !== 'non-OK',
        json: async () => ({ data: null }),
      });
      const { getByTestId } = render(
        <TestApp
          country="ng"
          onwardJourneys={['countryCuration']}
          pageData={{
            ...article,
            metadata: { ...article.metadata, topics: [] },
          }}
        />,
      );

      await waitFor(() => expect(mockFetch).toHaveBeenCalledTimes(1));
      expect(getByTestId('country-topic')).toBeEmptyDOMElement();
    },
  );

  it('preserves fetched Top Stories when video curation resolves first', async () => {
    let resolveTopStories!: (response: unknown) => void;
    mockFetch.mockImplementation((input: string) => {
      if (
        new URL(input).searchParams.get('onwardJourney') ===
        'topStoriesAndFeatures'
      ) {
        return new Promise(resolve => {
          resolveTopStories = resolve;
        });
      }
      return Promise.resolve({
        ok: true,
        json: async () => ({ data: { summaries: [] } }),
      });
    });
    const { getByTestId } = render(
      <TestApp onwardJourneys={['videoCuration', 'topStoriesAndFeatures']} />,
    );

    await waitFor(() => expect(mockFetch).toHaveBeenCalledTimes(2));
    await act(async () => {
      resolveTopStories({
        ok: true,
        json: async () => ({
          data: {
            topStories: [{ id: 'top-story' }],
            features: [{ id: 'feature' }],
          },
        }),
      });
    });

    expect(getByTestId('top-stories')).toHaveTextContent('1');
  });

  it('keeps duplicate Most Read requests pending across another journey update', async () => {
    let resolveMostRead!: (response: unknown) => void;
    mockFetch.mockImplementation((input: string) => {
      if (new URL(input).searchParams.get('onwardJourney') === 'mostRead') {
        return new Promise(resolve => {
          resolveMostRead = resolve;
        });
      }
      return Promise.resolve({
        ok: true,
        json: async () => ({ data: { topStories: [{ id: 'top-story' }] } }),
      });
    });
    const { getByTestId } = render(
      <TestApp onwardJourneys={['mostRead', 'topStoriesAndFeatures']}>
        <PendingMostRead />
      </TestApp>,
    );

    await waitFor(() =>
      expect(getByTestId('top-stories')).toHaveTextContent('1'),
    );
    expect(getByTestId('request-status')).toHaveTextContent('pending');
    expect(mockFetch).toHaveBeenCalledTimes(2);

    await act(async () => {
      resolveMostRead({
        ok: true,
        json: async () => ({ data: { items: [{ id: 'most-read' }] } }),
      });
    });

    expect(getByTestId('request-status')).toHaveTextContent('resolved');
    expect(getByTestId('most-read')).toHaveTextContent('1');
    expect(mockFetch).toHaveBeenCalledTimes(2);
  });
});

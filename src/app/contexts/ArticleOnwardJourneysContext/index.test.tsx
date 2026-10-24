import { ReactNode } from 'react';
import {
  render,
  waitFor,
} from '#app/components/react-testing-library-with-providers';
import { Article } from '#app/models/types/optimo';
import { ARTICLE_PAGE } from '#app/routes/utils/pageTypes';
import { RequestContextProvider } from '../RequestContext';
import { ArticleOnwardJourneysProvider, useArticleOnwardJourneys } from '.';

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

const Wrapper = ({
  children,
  country,
}: {
  children: ReactNode;
  country?: string;
}) => (
  <RequestContextProvider
    service="pidgin"
    pageType={ARTICLE_PAGE}
    pathname="/pidgin/articles/cvpde7nqj92o"
    country={country}
  >
    <ArticleOnwardJourneysProvider pageData={article} pageType={ARTICLE_PAGE}>
      {children}
    </ArticleOnwardJourneysProvider>
  </RequestContextProvider>
);

const mockFetch = jest.fn();

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
        json: async () => ({ data: responseData[onwardJourney!] }),
      });
    });

    const { getByTestId } = render(<ArticleData pageData={article} />, {
      wrapper: ({ children }) => <Wrapper country="ng">{children}</Wrapper>,
    });

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

    render(<ArticleData pageData={article} />, { wrapper: Wrapper });

    await waitFor(() => expect(mockFetch).toHaveBeenCalled());

    const onwardJourneys = mockFetch.mock.calls.map(([input]) =>
      new URL(input as string).searchParams.get('onwardJourney'),
    );

    expect(onwardJourneys).not.toContain('countryCuration');
  });
});

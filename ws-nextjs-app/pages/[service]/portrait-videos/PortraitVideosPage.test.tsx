import {
  act,
  render,
  screen,
} from '#app/components/react-testing-library-with-providers';
import {
  PortraitVideoPageData,
  PortraitVideoArticle,
} from '#app/lib/config/portraitVideoPages';
import hausaPageData from '#app/lib/config/portraitVideoPages/hausa';
import mockMatchMedia from '#testHelpers/mockMatchMedia';
import PortraitVideosPage, { TOP_TOPICS_LIMIT } from './PortraitVideosPage';

jest.mock('#app/components/ATIAnalytics', () => ({
  __esModule: true,
  default: () => null,
}));
jest.mock('#app/components/Metadata', () => ({
  __esModule: true,
  default: () => null,
}));

const createArticle = (index: number): PortraitVideoArticle => ({
  url: `https://www.bbc.com/hausa/articles/article-${index}`,
  title: `Article ${index}`,
  duration: 'PT1M',
  published: '2026-01-01',
  imgSrc: `https://ichef.bbci.co.uk/ace/ws/240/image-${index}.jpg.webp`,
  imgAlt: `Image ${index}`,
});

const createTopics = (count: number): PortraitVideoPageData => ({
  pageTitle: 'Portrait videos',
  topicTitles: Object.fromEntries(
    Array.from({ length: count }, (_, index) => [
      `topic-${index}`,
      `Topic ${index}`,
    ]),
  ),
  topics: Object.fromEntries(
    Array.from({ length: count }, (_, index) => [
      `topic-${index}`,
      [createArticle(index)],
    ]),
  ),
});

describe('PortraitVideosPage', () => {
  beforeEach(() => {
    mockMatchMedia();
  });

  it('renders Hausa article records as links rather than playable modal buttons', async () => {
    await act(async () => {
      render(<PortraitVideosPage pageData={hausaPageData} />, {
        service: 'hausa',
        pageType: 'static',
      });
    });

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: hausaPageData.pageTitle,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 2, name: 'Kano' }),
    ).toBeInTheDocument();
    expect(screen.getAllByTestId('promo-link')).toHaveLength(10);
    expect(screen.queryByTestId('promo-button')).not.toBeInTheDocument();
    expect(screen.getAllByTestId('promo-link')[0]).toHaveAttribute(
      'href',
      hausaPageData.topics.c2dwqj031y7t[0].url,
    );
  });

  it('only renders the configured number of top topics', async () => {
    await act(async () => {
      render(
        <PortraitVideosPage pageData={createTopics(TOP_TOPICS_LIMIT + 1)} />,
        {
          service: 'hausa',
          pageType: 'static',
        },
      );
    });

    expect(screen.getAllByRole('heading', { level: 2 })).toHaveLength(
      TOP_TOPICS_LIMIT,
    );
    expect(
      screen.queryByRole('heading', { name: `Topic ${TOP_TOPICS_LIMIT}` }),
    ).not.toBeInTheDocument();
  });
});

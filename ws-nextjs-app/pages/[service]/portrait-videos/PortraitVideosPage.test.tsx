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
import PortraitVideosPage, {
  getUniqueArticles,
  TOP_SLICES_LIMIT,
  toCarouselBlock,
} from './PortraitVideosPage';

jest.mock('#app/components/ATIAnalytics', () => ({
  __esModule: true,
  default: () => null,
}));
jest.mock('#app/components/Metadata', () => ({
  __esModule: true,
  default: () => null,
}));
jest.mock('#app/components/MediaLoader', () => ({
  __esModule: true,
  default: () => null,
  BumpLoader: () => <div data-testid="bump-loader" />,
}));

const createArticle = (index: number): PortraitVideoArticle => ({
  url: `https://www.bbc.com/hausa/articles/article-${index}`,
  title: `Article ${index}`,
  duration: 'PT1M',
  published: '2026-01-01',
  imgSrc: `https://ichef.bbci.co.uk/ace/ws/240/image-${index}.jpg.webp`,
  imgAlt: `Image ${index}`,
});

const createSlices = (count: number): PortraitVideoPageData => ({
  pageTitle: 'Portrait videos',
  slices: Array.from({ length: count }, (_, index) => ({
    topicId: `topic-${index}`,
    title: `Topic ${index}`,
    articles: [createArticle(index)],
  })),
});

const playableArticle: PortraitVideoArticle = {
  ...createArticle(0),
  videoId: 'p0123456',
  versionId: 'p0654321',
};

describe('getUniqueArticles', () => {
  it('removes repeated media from a slice while keeping its first article', () => {
    const duplicateArticle = {
      ...playableArticle,
      url: 'https://www.bbc.com/hausa/articles/duplicate',
    };

    expect(
      getUniqueArticles([playableArticle, duplicateArticle, createArticle(1)]),
    ).toEqual([playableArticle, createArticle(1)]);
  });
});

describe('toCarouselBlock', () => {
  it('only creates a playable block when both media IDs are provided', () => {
    expect(toCarouselBlock(playableArticle)).toMatchObject({
      model: {
        video: {
          id: playableArticle.videoId,
          version: {
            id: playableArticle.versionId,
          },
        },
      },
    });

    [createArticle(1), { ...createArticle(2), videoId: 'p0123456' }].forEach(
      article => {
        expect(toCarouselBlock(article)).toMatchObject({
          model: {
            video: {
              articleUrl: article.url,
            },
          },
        });
      },
    );
  });
});

describe('Hausa portrait video data', () => {
  it('provides complete playable data for every configured slice', () => {
    expect(hausaPageData.slices.map(({ title }) => title)).toEqual([
      'Siyasa',
      'Siyasar Najeriya',
      'Mata',
      'Kano',
    ]);

    hausaPageData.slices.forEach(({ articles }) => {
      articles.forEach(article => {
        expect(article).toEqual(
          expect.objectContaining({
            videoId: expect.any(String),
            versionId: expect.any(String),
          }),
        );
        expect(article.title).not.toMatch(/^Bidiyo,/);
        expect(article.title).not.toMatch(/,\s*Tsawon lokaci \d+,\d+$/);
      });
    });
  });
});

describe('PortraitVideosPage', () => {
  beforeEach(() => {
    mockMatchMedia();
  });

  it('renders the Hausa topics as playable carousels on a dark page', async () => {
    await act(async () => {
      render(<PortraitVideosPage pageData={hausaPageData} />, {
        service: 'hausa',
        pageType: 'static',
      });
    });

    expect(screen.getByRole('main')).toHaveAttribute('data-is-dark-ui', 'true');
    expect(
      screen.getByRole('heading', {
        level: 1,
        name: hausaPageData.pageTitle,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 2, name: 'Mata' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 2, name: 'Kano' }),
    ).toBeInTheDocument();
    expect(screen.getAllByTestId('promo-button')).toHaveLength(
      hausaPageData.slices.reduce(
        (articleCount, { articles }) => articleCount + articles.length,
        0,
      ),
    );
    expect(screen.queryByTestId('promo-link')).not.toBeInTheDocument();
    expect(screen.getAllByTestId('bump-loader')).toHaveLength(1);
  });

  it('only renders the configured number of top slices', async () => {
    await act(async () => {
      render(
        <PortraitVideosPage pageData={createSlices(TOP_SLICES_LIMIT + 1)} />,
        {
          service: 'hausa',
          pageType: 'static',
        },
      );
    });

    expect(screen.getAllByRole('heading', { level: 2 })).toHaveLength(
      TOP_SLICES_LIMIT,
    );
    expect(
      screen.queryByRole('heading', { name: `Topic ${TOP_SLICES_LIMIT}` }),
    ).not.toBeInTheDocument();
  });
});

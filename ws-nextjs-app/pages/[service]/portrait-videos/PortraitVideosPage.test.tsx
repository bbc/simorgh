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
  BumpLoader: () => null,
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
  it('provides complete playable data for the Mata and Kano slices', () => {
    expect(
      hausaPageData.slices.map(({ title, articles }) => ({
        title,
        articleCount: articles.length,
      })),
    ).toEqual([
      { title: 'Mata', articleCount: 9 },
      { title: 'Kano', articleCount: 10 },
    ]);
    expect(hausaPageData.slices[0].articles[0].title).toBe(
      'Mai shekara 15 da ta ƙware a zane',
    );

    hausaPageData.slices.forEach(({ articles }) => {
      articles.forEach(article => {
        expect(article).toEqual(
          expect.objectContaining({
            videoId: expect.any(String),
            versionId: expect.any(String),
          }),
        );
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
    expect(screen.getAllByTestId('promo-button')).toHaveLength(19);
    expect(screen.queryByTestId('promo-link')).not.toBeInTheDocument();
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

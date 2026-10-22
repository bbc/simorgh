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
  media: {
    id: 'urn:bbc:optimo:asset:playable',
    versionId: 'p0123456',
    holdingImageURL: 'https://ichef.test.bbci.co.uk/holding-image.jpg',
    isEmbeddingAllowed: false,
    territories: ['uk', 'nonuk'],
  },
};

describe('toCarouselBlock', () => {
  it('only creates a playable block when explicit media IDs are provided', () => {
    expect(toCarouselBlock(playableArticle)).toMatchObject({
      model: {
        video: {
          id: playableArticle.media?.id,
          version: {
            id: playableArticle.media?.versionId,
          },
        },
      },
    });

    expect(toCarouselBlock(createArticle(1))).toMatchObject({
      model: {
        video: {
          articleUrl: 'https://www.bbc.com/hausa/articles/article-1',
        },
      },
    });
  });
});

describe('PortraitVideosPage', () => {
  beforeEach(() => {
    mockMatchMedia();
  });

  it('renders Hausa article records as links on a dark page', async () => {
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
      screen.getByRole('heading', { level: 2, name: 'Kano' }),
    ).toBeInTheDocument();
    expect(screen.getAllByTestId('promo-link')).toHaveLength(10);
    expect(screen.queryByTestId('promo-button')).not.toBeInTheDocument();
    expect(screen.getAllByTestId('promo-link')[0]).toHaveAttribute(
      'href',
      hausaPageData.slices[0].articles[0].url,
    );
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

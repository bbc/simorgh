import {
  render,
  screen,
} from '#app/components/react-testing-library-with-providers';
import mockIdctaConfig from '#app/contexts/AccountContext/mocks';
import useOptimizelyVariation from '#app/hooks/useOptimizelyVariation';
import type { Article } from '#app/models/types/optimo';
import MediaArticlePage from '#app/pages/MediaArticlePage/MediaArticlePage';
import { pidginPageData } from '#app/pages/MediaArticlePage/fixtureData';
import { DISPLAY_ACCOUNT_PROMOTIONAL_BANNER_CSS_CLASS } from '../AccountPromotionalBanner/utilities';
import MapRegistrationBannerExperiment, { EXPERIMENT_NAME } from '.';

jest.mock('#app/hooks/useOptimizelyVariation', () => ({
  __esModule: true,
  default: jest.fn(),
  ExperimentType: { CLIENT_SIDE: 'client side experiment' },
}));

const brand = {
  predicate: 'http://www.bbc.co.uk/ontologies/bbc/brand',
  value: 'http://www.bbc.co.uk/things/71cb5f8b-3151-4871-bb15-417304ae9293#id',
};
const expectedBannerTitle = 'बाद में पढ़ने के लिए सेव करने हेतु साइन इन करें';
const options = {
  service: 'hindi' as const,
  pageType: 'mediaArticle' as const,
  toggles: { account: { enabled: true } },
  idctaConfig: mockIdctaConfig,
};

describe('MapRegistrationBannerExperiment', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
    document.documentElement.classList.remove(
      DISPLAY_ACCOUNT_PROMOTIONAL_BANNER_CSS_CLASS,
    );
    (useOptimizelyVariation as jest.Mock).mockReturnValue(EXPERIMENT_NAME);
  });

  it('renders the treatment with the supplied copy and account links', () => {
    render(<MapRegistrationBannerExperiment taggings={[brand]} />, options);

    expect(
      screen.getByRole('heading', {
        name: expectedBannerTitle,
      }),
    ).toBeVisible();
    expect(
      screen.getByText('अपने मुफ़्त BBC अकाउंट से जब चाहें, वापस आकर पढ़ें।'),
    ).toBeVisible();
    expect(screen.getByRole('link', { name: 'साइन इन' })).toHaveAttribute(
      'href',
      expect.stringContaining('/signin'),
    );
    expect(screen.getByRole('link', { name: 'रजिस्टर' })).toHaveAttribute(
      'href',
      expect.stringContaining('/register'),
    );
    expect(document.documentElement).toHaveClass(
      DISPLAY_ACCOUNT_PROMOTIONAL_BANNER_CSS_CLASS,
    );
  });

  it('renders on a tagged media article without replacing its content', () => {
    const pageData = {
      ...pidginPageData,
      metadata: {
        ...pidginPageData.metadata,
        passport: { ...pidginPageData.metadata.passport, taggings: [brand] },
      },
    } as unknown as Article;
    render(<MediaArticlePage pageData={pageData} />, options);
    expect(
      screen.getByRole('heading', {
        name: expectedBannerTitle,
      }),
    ).toBeVisible();
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });

  it.each(['control', 'off', null])(
    'does not render for decision %s',
    variation => {
      (useOptimizelyVariation as jest.Mock).mockReturnValue(variation);
      render(<MapRegistrationBannerExperiment taggings={[brand]} />, options);
      expect(
        screen.queryByRole('heading', {
          name: expectedBannerTitle,
        }),
      ).not.toBeInTheDocument();
    },
  );

  it.each([
    ['different service', { ...options, service: 'mundo' as const }, [brand]],
    ['article', { ...options, pageType: 'article' as const }, [brand]],
    ['AMP', { ...options, isAmp: true }, [brand]],
    ['Lite', { ...options, isLite: true }, [brand]],
    ['app', { ...options, isApp: true }, [brand]],
    [
      'signed in',
      {
        ...options,
        idctaConfig: { ...mockIdctaConfig, initialIsSignedIn: true },
      },
      [brand],
    ],
    [
      'account disabled',
      { ...options, toggles: { account: { enabled: false } } },
      [brand],
    ],
    ['different brand', options, [{ ...brand, value: `${brand.value}-other` }]],
    ['different predicate', options, [{ ...brand, predicate: 'other' }]],
    ['missing brand', options, []],
  ])('does not activate for %s', (_description, renderOptions, taggings) => {
    render(
      <MapRegistrationBannerExperiment taggings={taggings} />,
      renderOptions,
    );
    expect(useOptimizelyVariation).not.toHaveBeenCalledWith(
      expect.objectContaining({
        experimentName: EXPERIMENT_NAME,
      }),
    );
  });

  it('honours the existing dismissal frequency cap', () => {
    localStorage.setItem(
      'account_promotional_banner_last_dismissed',
      `${Date.now()}`,
    );
    document.documentElement.classList.add(
      DISPLAY_ACCOUNT_PROMOTIONAL_BANNER_CSS_CLASS,
    );
    render(<MapRegistrationBannerExperiment taggings={[brand]} />, options);
    expect(document.documentElement).not.toHaveClass(
      DISPLAY_ACCOUNT_PROMOTIONAL_BANNER_CSS_CLASS,
    );
  });
});

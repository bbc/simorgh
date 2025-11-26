import pidginMediaArticleFixtureData from '#data/pidgin/articles/cvpde7nqj92o.json';
import { GetServerSidePropsContext } from 'next';
import * as fetchPageData from '#app/routes/utils/fetchPageData';
import * as shouldRender from '#app/legacy/containers/PageHandlers/withData/shouldRender';
import defaultToggles from '#app/lib/config/toggles';
import handleArticleRoute from './handleArticleRoute';

describe('handleArticleRoute', () => {
  const mockSetHeader = jest.fn();
  const mockGetServerSidePropsContext = {
    req: {
      headers: {},
    } as unknown as GetServerSidePropsContext['req'],
    res: {
      setHeader: mockSetHeader,
      removeHeader: jest.fn(),
    } as unknown as GetServerSidePropsContext['res'],
    resolvedUrl: '/pidgin/articles/cvpde7nqj92o',
    query: { service: 'pidgin' },
  } satisfies GetServerSidePropsContext;
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(fetchPageData, 'default').mockResolvedValue({
      status: 200,
      json: pidginMediaArticleFixtureData,
    });
  });
  const toggles = defaultToggles.local;

  it('returns correct page type if consumableAsSFV is true', async () => {
    const result = await handleArticleRoute(mockGetServerSidePropsContext);
    expect(result.props.pageType).toEqual('mediaArticle');
  });

  it('returns expected props if shouldRender succeeds', async () => {
    jest.spyOn(Date, 'now').mockImplementation(() => 1234567890000);

    const result = await handleArticleRoute(mockGetServerSidePropsContext);

    expect(result.props.status).toEqual(200);
  });

  it('returns correct cache-control header if article is older than six hours', async () => {
    jest.spyOn(Date, 'now').mockImplementation(() => 2673964957894);

    await handleArticleRoute(mockGetServerSidePropsContext);

    expect(mockSetHeader).toHaveBeenCalledWith(
      'Cache-Control',
      expect.stringContaining('max-age=90'),
    );
  });

  it('returns correct cache-control header if article is not older than six hours', async () => {
    jest.spyOn(Date, 'now').mockImplementation(() => 1673964987894);

    await handleArticleRoute(mockGetServerSidePropsContext);

    expect(mockSetHeader).toHaveBeenCalledWith(
      'Cache-Control',
      expect.stringContaining('max-age=45'),
    );
  });

  it('returns error props if shouldRender fails - 500', async () => {
    jest.spyOn(shouldRender, 'default').mockReturnValue({
      hasRequestSucceeded: false,
      status: 500,
    });

    jest.spyOn(Date, 'now').mockImplementation(() => 1234567890000);

    const result = await handleArticleRoute(mockGetServerSidePropsContext);

    expect(result).toEqual({
      props: {
        bbcOrigin: null,
        isAmp: false,
        isApp: false,
        isLite: false,
        isNextJs: true,
        status: 500,
        isUK: false,
        pageType: 'article',
        pathname: '/pidgin/articles/cvpde7nqj92o',
        service: 'pidgin',
        showAdsBasedOnLocation: false,
        showCookieBannerBasedOnCountry: true,
        timeOnServer: 1234567890000,
        toggles,
        variant: null,
      },
    });
  });

  it('returns error props if shouldRender fails - 404', async () => {
    jest.spyOn(shouldRender, 'default').mockReturnValue({
      hasRequestSucceeded: false,
      status: 404,
    });

    jest.spyOn(Date, 'now').mockImplementation(() => 1234567890000);

    const result = await handleArticleRoute(mockGetServerSidePropsContext);

    expect(result).toEqual({
      props: {
        bbcOrigin: null,
        isAmp: false,
        isApp: false,
        isLite: false,
        isNextJs: true,
        status: 404,
        isUK: false,
        pageType: 'article',
        pathname: '/pidgin/articles/cvpde7nqj92o',
        service: 'pidgin',
        showAdsBasedOnLocation: false,
        showCookieBannerBasedOnCountry: true,
        timeOnServer: 1234567890000,
        toggles,
        variant: null,
      },
    });
  });
});

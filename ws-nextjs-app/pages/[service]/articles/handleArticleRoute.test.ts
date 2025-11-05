import pidginMediaArticleFixtureData from '#data/pidgin/articles/cvpde7nqj92o.json';
import { GetServerSidePropsContext } from 'next';
import * as fetchPageData from '#app/routes/utils/fetchPageData';
import * as shouldRender from '#app/legacy/containers/PageHandlers/withData/shouldRender';
import handleArticleRoute from './handleArticleRoute';

describe('handleArticleRoute', () => {
  const mockGetServerSidePropsContext = {
    req: {
      headers: {},
    } as unknown as GetServerSidePropsContext['req'],
    res: {
      setHeader: jest.fn(),
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

  it('returns correct page type if consumableAsSFV is true', async () => {
    const result = await handleArticleRoute(mockGetServerSidePropsContext);
    expect(result.props.pageType).toEqual('mediaArticle');
  });

  it('returns expected props if shouldRender succeeds', async () => {
    jest.spyOn(Date, 'now').mockImplementation(() => 1234567890000);

    const result = await handleArticleRoute(mockGetServerSidePropsContext);

    expect(result.props.status).toEqual(200);
  });

  it('returns error props if shouldRender fails', async () => {
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
        isUK: null,
        service: 'pidgin',
        showAdsBasedOnLocation: false,
        showCookieBannerBasedOnCountry: true,
        timeOnServer: 1234567890000,
        variant: null,
      },
    });
  });
});

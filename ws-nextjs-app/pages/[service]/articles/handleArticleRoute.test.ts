import pidginMediaArticleFixtureData from '#data/pidgin/articles/cvpde7nqj92o.json';
import { GetServerSidePropsContext } from 'next';
import defaultToggles from '#app/lib/config/toggles';
import * as shouldRender from './shouldRender';
import * as getPageDataModule from '../../../utilities/pageRequests/getPageData';
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
    jest.restoreAllMocks();
    jest.clearAllMocks();
    jest.spyOn(getPageDataModule, 'default').mockResolvedValue({
      data: {
        pageData: pidginMediaArticleFixtureData.data,
        status: 200,
      },
      toggles,
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

  describe('EXPERIMENT - personalised topic rail', () => {
    const mundoContext = {
      ...mockGetServerSidePropsContext,
      resolvedUrl: '/mundo/articles/cp8y1k4nj70o',
      query: { service: 'mundo' },
      req: {
        headers: { 'x-country': 'es' },
      } as unknown as GetServerSidePropsContext['req'],
    } satisfies GetServerSidePropsContext;

    const articleResponse = {
      data: {
        pageData: {
          article: {
            metadata: {
              type: 'article',
              consumableAsSFV: false,
              lastPublished: 0,
            },
          },
          secondaryData: {},
          mostRead: {},
        },
        status: 200,
      },
      toggles,
    };

    beforeEach(() => {
      jest
        .spyOn(getPageDataModule, 'default')
        .mockResolvedValue(articleResponse);
    });

    it('injects personalised content when country matches a topic', async () => {
      jest
        .spyOn(getPageDataModule, 'default')
        .mockResolvedValueOnce(articleResponse)
        .mockResolvedValueOnce({
          data: {
            pageData: {
              title: 'Topic title',
              description: 'Topic description',
              curations: [
                {
                  summaries: [
                    { id: '1' },
                    { id: '2' },
                    { id: '3' },
                    { id: '4' },
                    { id: '5' },
                  ],
                },
              ],
            },
            status: 200,
          },
          toggles,
        });

      const result = await handleArticleRoute(mundoContext);

      expect(
        // @ts-expect-error pageData is present in successful responses
        result.props.pageData.secondaryColumn?.personalisedContent,
      ).toEqual([
        {
          title: 'Topic title',
          description: 'Topic description',
          link: '/mundo/topics/c6vzy3wd189t',
          summaries: [{ id: '1' }, { id: '2' }, { id: '3' }, { id: '4' }],
          topicId: 'c6vzy3wd189t',
        },
      ]);
    });

    it('does not inject personalised content when topic fetch fails', async () => {
      jest
        .spyOn(getPageDataModule, 'default')
        .mockResolvedValueOnce(articleResponse)
        .mockRejectedValueOnce(new Error('topic fetch failed'));

      const result = await handleArticleRoute(mundoContext);

      expect(
        // @ts-expect-error pageData is present in successful responses
        result.props.pageData.secondaryColumn?.personalisedContent,
      ).toBeUndefined();
    });
  });
});

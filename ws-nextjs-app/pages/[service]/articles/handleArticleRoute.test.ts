import pidginMediaArticleFixtureData from '#data/pidgin/articles/cvpde7nqj92o.json';
import { GetServerSidePropsContext } from 'next';
import * as fetchPageData from '#app/routes/utils/fetchPageData';
import shouldRender from '#app/legacy/containers/PageHandlers/withData/shouldRender';
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

  it('returns MEDIA_ARTICLE_PAGE if consumableAsSFV is true', async () => {
    const result = await handleArticleRoute(mockGetServerSidePropsContext);
    // @ts-expect-error temp
    expect(result.props.pageType).toEqual('mediaArticle');
  });

  // it('returns error props if shouldRender fails', async () => {
  //   jest.spyOn(shouldRender, 'default').mockReturnValue({
  //     hasRequestSucceeded: false,
  //     status: 500,
  //   });

  //   const result = await handleArticleRoute(mockGetServerSidePropsContext);

  //   expect(result).toEqual({
  //     props: {
  //       isAmp: false,
  //       isApp: false,
  //       isLite: false,
  //       isNextJs: true,
  //       pageType: 'ERROR_PAGE',
  //       status: 500,
  //     },
  //   });
  });

  it('throws error if article data is missing', async () => {});
});

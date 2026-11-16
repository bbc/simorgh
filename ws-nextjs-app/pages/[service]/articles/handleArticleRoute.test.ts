import pidginMediaArticleFixtureData from '#data/pidgin/articles/cvpde7nqj92o.json';
import { GetServerSidePropsContext } from 'next';
import { IncomingMessage } from 'node:http';
import { Socket } from 'node:net';
import * as shouldRender from '../../../utilities/shouldRender';
import * as getPageDataModule from '../../../utilities/pageRequests/getPageData';
import handleArticleRoute from './handleArticleRoute';

jest.mock('../../../utilities/pageRequests/getPageData');
jest.mock('../../../utilities/shouldRender', () => {
  const originalModule = jest.requireActual('../../../utilities/shouldRender');
  return {
    __esModule: true,
    ...originalModule,
  };
});

describe('handleArticleRoute', () => {
  const mostReadItem = {
    id: 'urn:bbc:optimo:asset:c1234567890o',
    rank: 1,
    title: 'Most Read story',
    href: 'https://www.bbc.com/pidgin/articles/c1234567890o',
    timestamp: '2026-11-16T00:00:00.000Z',
  };
  const generatedWsoj = {
    type: 'wsoj',
    model: {
      type: 'recommendations',
      data: [
        {
          id: mostReadItem.id,
          title: mostReadItem.title,
          href: mostReadItem.href,
        },
      ],
    },
  };
  const pageDataWithGeneratedWsoj = {
    ...pidginMediaArticleFixtureData.data,
    article: {
      ...pidginMediaArticleFixtureData.data.article,
      content: {
        ...pidginMediaArticleFixtureData.data.article.content,
        model: {
          ...pidginMediaArticleFixtureData.data.article.content.model,
          blocks: [
            ...pidginMediaArticleFixtureData.data.article.content.model.blocks,
            generatedWsoj,
          ],
        },
      },
    },
    secondaryData: {
      ...pidginMediaArticleFixtureData.data.secondaryData,
      mostRead: {
        items: [mostReadItem],
        lastRecordTimeStamp: '2026-11-16T00:00:00.000Z',
      },
    },
  };
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
        pageData: pageDataWithGeneratedWsoj,
        status: 200,
      },
    });
  });

  it('returns correct page type if consumableAsSFV is true', async () => {
    const result = await handleArticleRoute(mockGetServerSidePropsContext);
    expect(result.props.pageType).toEqual('mediaArticle');
  });

  it('leaves onward journey data to the client on canonical pages', async () => {
    const result = await handleArticleRoute(mockGetServerSidePropsContext);
    const { pageData } = result.props;

    if (!pageData) throw new Error('Expected article page data');

    expect(pageData.secondaryColumn).toBeUndefined();
    expect(pageData.mostRead).toBeUndefined();
    const wsojBlocks = pageData.content.model.blocks.filter(
      block => block.type === 'wsoj',
    );
    const wsojModel = wsojBlocks[wsojBlocks.length - 1]?.model;

    expect(wsojModel).toEqual(
      expect.objectContaining({
        onwardJourney: 'mostRead',
      }),
    );
    expect(wsojModel).not.toHaveProperty('data');
  });

  it('keeps onward journey data in the response for AMP pages', async () => {
    const ampRequest = {
      ...mockGetServerSidePropsContext,
      resolvedUrl: '/pidgin/articles/cvpde7nqj92o.amp',
    } satisfies GetServerSidePropsContext;

    const result = await handleArticleRoute(ampRequest);
    const { pageData } = result.props;

    if (!pageData) throw new Error('Expected article page data');

    expect(pageData.secondaryColumn).toEqual(
      expect.objectContaining({
        topStories: expect.anything(),
      }),
    );
    expect(pageData.mostRead).toBeDefined();
    const wsojBlocks = pageData.content.model.blocks.filter(
      block => block.type === 'wsoj',
    );
    expect(wsojBlocks[wsojBlocks.length - 1]?.model).toHaveProperty('data');
  });

  it('keeps article-link WSOJs in the canonical response', async () => {
    const articleLinkWsoj = {
      ...generatedWsoj,
      model: {
        ...generatedWsoj.model,
        data: [
          {
            id: 'article-link',
            title: 'Article link',
            href: 'https://www.bbc.com/pidgin/articles/c9876543210o',
          },
        ],
      },
    };
    const articleLinkData = {
      ...pageDataWithGeneratedWsoj,
      article: {
        ...pageDataWithGeneratedWsoj.article,
        content: {
          ...pageDataWithGeneratedWsoj.article.content,
          model: {
            ...pageDataWithGeneratedWsoj.article.content.model,
            blocks: [
              ...pageDataWithGeneratedWsoj.article.content.model.blocks.slice(
                0,
                -1,
              ),
              articleLinkWsoj,
            ],
          },
        },
      },
    };

    jest.spyOn(getPageDataModule, 'default').mockResolvedValue({
      data: {
        pageData: articleLinkData,
        status: 200,
      },
    });

    const result = await handleArticleRoute(mockGetServerSidePropsContext);
    const { pageData } = result.props;

    if (!pageData) throw new Error('Expected article page data');

    const wsojBlocks = pageData.content.model.blocks.filter(
      block => block.type === 'wsoj',
    );
    const wsojModel = wsojBlocks[wsojBlocks.length - 1]?.model;

    expect(wsojModel).toHaveProperty('data');
    expect(wsojModel).not.toHaveProperty('onwardJourney');
  });

  it('keeps empty WSOJs in the canonical response', async () => {
    const emptyWsojData = {
      ...pageDataWithGeneratedWsoj,
      article: {
        ...pageDataWithGeneratedWsoj.article,
        content: {
          ...pageDataWithGeneratedWsoj.article.content,
          model: {
            ...pageDataWithGeneratedWsoj.article.content.model,
            blocks: [
              ...pageDataWithGeneratedWsoj.article.content.model.blocks.slice(
                0,
                -1,
              ),
              {
                ...generatedWsoj,
                model: {
                  ...generatedWsoj.model,
                  data: [],
                },
              },
            ],
          },
        },
      },
    };

    jest.spyOn(getPageDataModule, 'default').mockResolvedValue({
      data: {
        pageData: emptyWsojData,
        status: 200,
      },
    });

    const result = await handleArticleRoute(mockGetServerSidePropsContext);
    const { pageData } = result.props;

    if (!pageData) throw new Error('Expected article page data');

    const wsojBlocks = pageData.content.model.blocks.filter(
      block => block.type === 'wsoj',
    );
    const wsojModel = wsojBlocks[wsojBlocks.length - 1]?.model;

    expect(wsojModel).toHaveProperty('data', []);
    expect(wsojModel).not.toHaveProperty('onwardJourney');
  });

  it('returns expected props if shouldRender succeeds', async () => {
    jest.spyOn(Date, 'now').mockImplementation(() => 1234567890000);

    const result = await handleArticleRoute(mockGetServerSidePropsContext);

    expect(result.props.status).toEqual(200);
  });

  it('uses the public watch path for canonical metadata after rewriting', async () => {
    const requestUrl = '/gujarati/watch/cr5el5kw591o';
    const resolvedUrl = '/gujarati/articles/cr5el5kw591o';
    const rewrittenRequest = {
      ...mockGetServerSidePropsContext,
      req: {
        headers: {},
        url: requestUrl,
      } as unknown as GetServerSidePropsContext['req'],
      resolvedUrl,
      query: { service: 'gujarati' },
    } satisfies GetServerSidePropsContext;

    const result = await handleArticleRoute(rewrittenRequest);

    expect(result.props.pathname).toEqual(requestUrl);
  });

  it('returns correct cache-control header if article is older than six hours', async () => {
    jest.spyOn(Date, 'now').mockImplementation(() => 2673964957894);

    await handleArticleRoute(mockGetServerSidePropsContext);

    expect(mockSetHeader).toHaveBeenCalledWith(
      'Cache-Control',
      expect.stringContaining('max-age=90'),
    );
  });

  it.each([200, 404])(
    'uses the public page path for data requests returning %s',
    async status => {
      jest.spyOn(shouldRender, 'default').mockReturnValue({
        hasRequestSucceeded: status === 200,
        status,
      });
      const resolvedUrl = '/pidgin/watch/cvpde7nqj92o?renderer_env=test';
      const result = await handleArticleRoute({
        ...mockGetServerSidePropsContext,
        req: Object.assign(new IncomingMessage(new Socket()), {
          cookies: {},
          url: '/_next/data/build/pidgin/watch/cvpde7nqj92o.json?renderer_env=test',
        }),
        resolvedUrl,
      });

      expect(result.props.pathname).toBe('/pidgin/watch/cvpde7nqj92o');
    },
  );

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
        status: 500,
        pageType: 'article',
        pathname: '/pidgin/articles/cvpde7nqj92o',
        service: 'pidgin',
        timeOnServer: 1234567890000,
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
        status: 404,
        pageType: 'article',
        pathname: '/pidgin/articles/cvpde7nqj92o',
        service: 'pidgin',
        timeOnServer: 1234567890000,
        variant: null,
      },
    });
  });

  it('uses x-bbc-edge-country header when x-country is not set', async () => {
    const mockCountryHeaderRequest = {
      ...mockGetServerSidePropsContext,
      req: {
        headers: {
          'x-bbc-edge-country': 'NG',
        },
      } as unknown as GetServerSidePropsContext['req'],
    };

    const result = await handleArticleRoute(mockCountryHeaderRequest);

    expect(result.props.country).toEqual('ng');
  });
});

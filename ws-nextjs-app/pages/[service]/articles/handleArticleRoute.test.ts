import pidginMediaArticleFixtureData from '#data/pidgin/articles/cvpde7nqj92o.json';
import { GetServerSidePropsContext } from 'next';
import { IncomingMessage, ServerResponse } from 'node:http';
import { Socket } from 'node:net';
import { ToggleDefinition } from '#app/models/types/global';
import articleToMarkdown from '#app/utilities/articleToMarkdown';
import localToggles from '#app/lib/config/toggles/localConfig';
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
    });
  });

  describe('Markdown requests', () => {
    const createContext = (path = '/pidgin/articles/cvpde7nqj92o.md') => {
      const req = Object.assign(new IncomingMessage(new Socket()), {
        cookies: {},
        url: path,
      });
      const res = new ServerResponse(req);
      res.setHeader('Link', '<https://ichef.bbci.co.uk>; rel="preconnect"');
      jest.spyOn(res, 'end').mockReturnValue(res);

      return {
        ...mockGetServerSidePropsContext,
        req,
        res,
        resolvedUrl: path,
      };
    };

    it('serves Markdown and appends the canonical link without losing resource hints', async () => {
      const context = createContext(
        '/pidgin/articles/cvpde7nqj92o.md?renderer_env=test',
      );
      const markdown = articleToMarkdown({
        article: pidginMediaArticleFixtureData.data.article,
        canonicalUrl: 'https://www.bbc.com/pidgin/articles/cvpde7nqj92o',
      });

      await handleArticleRoute(context, {
        toggles: { renderMarkDown: { enabled: true } },
      });

      expect(context.res.statusCode).toBe(200);
      expect(context.res.getHeader('Content-Type')).toBe(
        'text/markdown; charset=utf-8',
      );
      expect(context.res.getHeader('Link')).toEqual([
        '<https://ichef.bbci.co.uk>; rel="preconnect"',
        '<https://www.bbc.com/pidgin/articles/cvpde7nqj92o>; rel="canonical"',
      ]);
      expect(context.res.getHeader('Cache-Control')).toContain('public');
      expect(context.res.getHeader('x-markdown-tokens')).toBe(
        Math.floor(markdown.length / 3),
      );
      expect(context.res.end).toHaveBeenCalledWith(markdown);
      expect(markdown).toMatch(/^---\ntitle: /);
      expect(markdown).toContain(
        'canonical: "https://www.bbc.com/pidgin/articles/cvpde7nqj92o"',
      );
      expect(getPageDataModule.default).toHaveBeenCalledWith(
        expect.objectContaining({ id: '/pidgin/articles/cvpde7nqj92o' }),
      );
    });

    it.each<{
      description: string;
      toggles: Record<string, ToggleDefinition>;
    }>([
      { description: 'missing', toggles: {} },
      {
        description: 'disabled',
        toggles: { renderMarkDown: { enabled: false } },
      },
    ])('returns 404 when the toggle is $description', async ({ toggles }) => {
      const context = createContext();

      const result = await handleArticleRoute(context, { toggles });

      expect(context.res.statusCode).toBe(404);
      expect(result.props.status).toBe(404);
      expect(getPageDataModule.default).not.toHaveBeenCalled();
      expect(context.res.end).not.toHaveBeenCalled();
      expect(context.res.getHeader('Content-Type')).toBeUndefined();
    });

    it.each(['russian', 'pidgin'] as const)(
      'enables %s using the local stub toggle',
      async service => {
        const context = {
          ...createContext(`/${service}/articles/cvpde7nqj92o.md`),
          query: { service },
        };
        jest.spyOn(shouldRender, 'default').mockReturnValue({
          hasRequestSucceeded: true,
          status: 200,
        });

        await handleArticleRoute(context, {
          toggles: { renderMarkDown: localToggles.renderMarkDown },
        });

        expect(context.res.end).toHaveBeenCalledWith(expect.any(String));
      },
    );

    it('preserves script variants in data requests and canonical links', async () => {
      const context = {
        ...createContext('/serbian/articles/cvpde7nqj92o/lat.md'),
        query: { service: 'serbian' },
      };
      jest.spyOn(shouldRender, 'default').mockReturnValue({
        hasRequestSucceeded: true,
        status: 200,
      });

      await handleArticleRoute(context, {
        toggles: { renderMarkDown: { enabled: true } },
      });

      expect(context.res.getHeader('Link')).toContain(
        '<https://www.bbc.com/serbian/articles/cvpde7nqj92o/lat>; rel="canonical"',
      );
      expect(getPageDataModule.default).toHaveBeenCalledWith(
        expect.objectContaining({
          id: '/serbian/articles/cvpde7nqj92o/lat',
          variant: 'lat',
        }),
      );
    });

    it.each([404, 500])(
      'does not render Markdown for an article error (%s)',
      async status => {
        jest.spyOn(shouldRender, 'default').mockReturnValue({
          hasRequestSucceeded: false,
          status,
        });
        const context = createContext();

        const result = await handleArticleRoute(context, {
          toggles: { renderMarkDown: { enabled: true } },
        });

        expect(result.props.status).toBe(status);
        expect(context.res.end).not.toHaveBeenCalled();
        expect(context.res.getHeader('Content-Type')).toBeUndefined();
      },
    );

    it('does not render Markdown for an ordinary article even when enabled', async () => {
      const context = createContext('/pidgin/articles/cvpde7nqj92o');

      const result = await handleArticleRoute(context, {
        toggles: { renderMarkDown: { enabled: true } },
      });

      expect(result.props.pageType).toBe('mediaArticle');
      expect(context.res.end).not.toHaveBeenCalled();
      expect(context.res.getHeader('Link')).toBe(
        '<https://ichef.bbci.co.uk>; rel="preconnect"',
      );
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

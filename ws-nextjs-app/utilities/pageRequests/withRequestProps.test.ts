import { GetServerSidePropsContext } from 'next';
import { IncomingMessage, ServerResponse } from 'node:http';
import { Socket } from 'node:net';
import nodeLogger from '#lib/logger.node';
import fetchPageData from '#app/routes/utils/fetchPageData';
import getPageData from './getPageData';
import getRequestProps from './getRequestProps';
import withRequestProps from './withRequestProps';

jest.mock('./getRequestProps');
jest.mock('#lib/logger.node', () => {
  const logger = { warn: jest.fn(), error: jest.fn(), debug: jest.fn() };
  return () => logger;
});
jest.mock('#app/routes/utils/fetchPageData');
jest.mock('#utilities/getAgent', () => jest.fn());

const mockGetRequestProps = jest.mocked(getRequestProps);
const requestProps = {
  toggles: { account: { enabled: false } },
  nonce: 'request-nonce',
  country: 'gb',
};
const req = Object.assign(new IncomingMessage(new Socket()), {
  url: '/_next/data/build/pidgin/articles/c0000000000o.json',
  cookies: {},
});
const context = {
  req,
  res: new ServerResponse(req),
  query: { service: 'pidgin' },
  resolvedUrl: '/pidgin/articles/c0000000000o?renderer_env=test',
} satisfies GetServerSidePropsContext;

describe('withRequestProps', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.replaceProperty(process, 'env', {
      ...process.env,
      SIMORGH_APP_ENV: 'local',
      BFF_PATH: 'https://mock-bff-path/',
    });
    mockGetRequestProps.mockResolvedValue({
      bbcOrigin: null,
      cspHeader: null,
      isApp: false,
      isAmp: false,
      isLite: false,
      isNextJs: true,
      serverSideExperiments: [],
      idctaConfig: null,
      navItems: null,
      service: 'pidgin',
      variant: null,
      pageType: 'article',
      pathname: '/pidgin/articles/c0000000000o',
      isUK: true,
      showAdsBasedOnLocation: false,
      showCookieBannerBasedOnCountry: true,
      ...requestProps,
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('sets up the resolved page URL before calling the handler', async () => {
    const handler = jest.fn().mockResolvedValue({ props: { status: 200 } });
    const result = await withRequestProps(handler)(context);

    expect(mockGetRequestProps).toHaveBeenCalledWith({
      ...context,
      asPath: context.resolvedUrl,
      pathname: '/pidgin/articles/c0000000000o',
    });
    expect(handler).toHaveBeenCalledWith(
      context,
      expect.objectContaining(requestProps),
    );
    expect(mockGetRequestProps.mock.invocationCallOrder[0]).toBeLessThan(
      handler.mock.invocationCallOrder[0],
    );
    expect(result).toEqual({
      props: expect.objectContaining({ ...requestProps, status: 200 }),
    });
  });

  it('gives page props precedence and resolves promised props', async () => {
    const result = await withRequestProps(async () => ({
      props: Promise.resolve({ country: 'ng', status: 404 }),
    }))(context);

    expect(result.props).toMatchObject({
      country: 'ng',
      status: 404,
      nonce: requestProps.nonce,
    });
  });

  it.each(['watch', 'listen'])(
    'preserves the requested /%s/ URL when Next.js rewrites to /articles/',
    async route => {
      const asPath = `/pidgin/${route}/c0000000000o?renderer_env=test`;
      const request = Object.assign(new IncomingMessage(new Socket()), {
        url: asPath,
        cookies: {},
      });
      const handler = jest.fn().mockResolvedValue({ props: { status: 200 } });

      await withRequestProps(handler)({
        ...context,
        req: request,
      });

      expect(mockGetRequestProps).toHaveBeenCalledWith(
        expect.objectContaining({
          asPath,
          pathname: `/pidgin/${route}/c0000000000o`,
        }),
      );
    },
  );

  it('uses the resolved URL when the request URL is unavailable', async () => {
    const request = Object.assign(new IncomingMessage(new Socket()), {
      cookies: {},
    });
    const handler = jest.fn().mockResolvedValue({ props: { status: 200 } });

    await withRequestProps(handler)({ ...context, req: request });

    expect(mockGetRequestProps).toHaveBeenCalledWith(
      expect.objectContaining({
        asPath: context.resolvedUrl,
        pathname: '/pidgin/articles/c0000000000o',
      }),
    );
  });

  it('preserves redirects', async () => {
    const redirect = { destination: '/pidgin', permanent: false };
    const result = await withRequestProps(async () => ({ redirect }))(context);

    expect(result).toEqual({ redirect });
  });

  it('preserves notFound responses', async () => {
    const result = await withRequestProps(async () => ({
      notFound: true as const,
    }))(context);

    expect(result).toEqual({ notFound: true });
  });

  it('propagates handler failures', async () => {
    const error = new Error('Page data is malformed');
    const handler = jest.fn().mockRejectedValue(error);

    await expect(withRequestProps(handler)(context)).rejects.toThrow(error);
  });

  it.each(['local', 'test'])(
    'uses the header on %s without changing request URLs or the original query',
    async environment => {
      process.env.SIMORGH_APP_ENV = environment;
      const request = Object.assign(new IncomingMessage(new Socket()), {
        url: '/serbian/articles/c0000000000o/lat?foo=bar',
        headers: { 'x-renderer-env': 'live' },
        cookies: {},
      });
      const requestContext = {
        ...context,
        req: request,
        resolvedUrl: request.url,
        query: { service: 'serbian', variant: ['lat'], foo: 'bar' },
      };
      const handler = jest.fn().mockResolvedValue({ props: { status: 200 } });

      await withRequestProps(handler)(requestContext);

      expect(handler).toHaveBeenCalledWith(
        expect.objectContaining({
          req: request,
          resolvedUrl: request.url,
          query: {
            ...requestContext.query,
            renderer_env: 'live',
          },
        }),
        expect.any(Object),
      );
      expect(mockGetRequestProps).toHaveBeenCalledWith(
        expect.objectContaining({ asPath: request.url, rendererEnv: 'live' }),
      );
      expect(requestContext.query).not.toHaveProperty('renderer_env');
    },
  );

  it.each(['live', 'test', '', 'unsupported', ['live', 'test']])(
    'preserves an explicit query override %j over the header',
    async queryValue => {
      const handler = jest.fn().mockResolvedValue({ props: {} });
      const requestContext = {
        ...context,
        req: Object.assign(new IncomingMessage(new Socket()), {
          cookies: {},
          headers: { 'x-renderer-env': 'live' },
        }),
        query: { ...context.query, renderer_env: queryValue },
      };

      await withRequestProps(handler)(requestContext);

      expect(handler.mock.calls[0][0]).toBe(requestContext);
      expect(mockGetRequestProps.mock.calls[0][0]).not.toHaveProperty(
        'rendererEnv',
      );
    },
  );

  it.each(['live', 'preview'])(
    'ignores the header in %s',
    async environment => {
      process.env.SIMORGH_APP_ENV = environment;
      const handler = jest.fn().mockResolvedValue({ props: {} });
      const requestContext = {
        ...context,
        req: Object.assign(new IncomingMessage(new Socket()), {
          cookies: {},
          headers: { 'x-renderer-env': 'test' },
        }),
      };

      await withRequestProps(handler)(requestContext);

      expect(handler.mock.calls[0][0]).toBe(requestContext);
    },
  );

  it.each(['', 'LIVE', 'local', 'live&extra=value', ['live', 'test']])(
    'logs and ignores unsupported header value %j',
    async header => {
      const handler = jest.fn().mockResolvedValue({ props: {} });
      const requestContext = {
        ...context,
        req: Object.assign(new IncomingMessage(new Socket()), {
          cookies: {},
          headers: { 'x-renderer-env': header },
        }),
      };

      await withRequestProps(handler)(requestContext);

      expect(handler.mock.calls[0][0]).toBe(requestContext);
      expect(nodeLogger(__filename).warn).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          message: expect.stringContaining('unsupported X-Renderer-Env'),
        }),
      );
    },
  );

  it.each(['live', 'test'])(
    'selects %s BFF data for an article and its onward Next.js data request',
    async rendererEnv => {
      jest.mocked(fetchPageData).mockResolvedValue({
        status: 200,
        json: { data: {} },
      });
      const handler = withRequestProps(async pageContext => {
        const { data } = await getPageData({
          id: pageContext.resolvedUrl,
          service: 'pidgin',
          rendererEnv: String(pageContext.query.renderer_env),
          resolvedUrl: pageContext.resolvedUrl,
          pageType: 'article',
        });
        return { props: data };
      });
      const articlePath = '/pidgin/articles/c0000000000o';
      const onwardPath = '/pidgin/articles/c0000000001o';
      const firstRequest = Object.assign(new IncomingMessage(new Socket()), {
        url: articlePath,
        headers: { 'x-renderer-env': rendererEnv },
        cookies: {},
      });
      const onwardRequest = Object.assign(new IncomingMessage(new Socket()), {
        url: `/_next/data/build${onwardPath}.json`,
        headers: { 'x-renderer-env': rendererEnv },
        cookies: {},
      });

      await handler({
        ...context,
        req: firstRequest,
        resolvedUrl: articlePath,
      });
      await handler({
        ...context,
        req: onwardRequest,
        resolvedUrl: onwardPath,
      });

      expect(fetchPageData).toHaveBeenCalledTimes(2);
      expect(fetchPageData).toHaveBeenNthCalledWith(
        1,
        expect.objectContaining({
          path: expect.stringContaining('id=c0000000000o'),
          optHeaders: { 'ctx-service-env': rendererEnv },
        }),
      );
      expect(fetchPageData).toHaveBeenNthCalledWith(
        2,
        expect.objectContaining({
          path: expect.stringContaining('id=c0000000001o'),
          optHeaders: { 'ctx-service-env': rendererEnv },
        }),
      );
      expect(mockGetRequestProps).toHaveBeenLastCalledWith(
        expect.objectContaining({ asPath: onwardPath, rendererEnv }),
      );
    },
  );
});

import { GetServerSidePropsContext } from 'next';
import { IncomingMessage, ServerResponse } from 'node:http';
import { Socket } from 'node:net';
import getRequestProps from './getRequestProps';
import withRequestProps from './withRequestProps';

jest.mock('./getRequestProps');

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
});

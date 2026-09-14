import { GetServerSidePropsContext } from 'next';
import handleOfflineRoute from './handleOfflineRoute';

describe('handleOfflineRoute', () => {
  const mockSetHeader = jest.fn();
  const buildContext = (resolvedUrl: string) =>
    ({
      req: {
        headers: {},
      } as unknown as GetServerSidePropsContext['req'],
      res: {
        setHeader: mockSetHeader,
        removeHeader: jest.fn(),
        on: jest.fn(),
      } as unknown as GetServerSidePropsContext['res'],
      resolvedUrl,
      query: {},
    }) satisfies GetServerSidePropsContext;

  beforeEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
    jest.spyOn(Date, 'now').mockImplementation(() => 1234567890000);
  });

  it('returns offline page props with no variant for a non-variant service', async () => {
    const result = await handleOfflineRoute(buildContext('/mundo/offline'));

    expect(result).toEqual({
      props: expect.objectContaining({
        service: 'mundo',
        variant: null,
        pageType: 'offline',
        status: 200,
        pathname: '/mundo/offline',
      }),
    });
  });

  it('returns offline page props with the variant when explicitly provided in the URL', async () => {
    const result = await handleOfflineRoute(
      buildContext('/zhongwen/trad/offline'),
    );

    expect(result).toEqual({
      props: expect.objectContaining({
        service: 'zhongwen',
        variant: 'trad',
        pageType: 'offline',
        status: 200,
        pathname: '/zhongwen/trad/offline',
      }),
    });
  });

  it('returns offline page props with a null variant when no variant is present in the URL', async () => {
    const result = await handleOfflineRoute(buildContext('/zhongwen/offline'));

    expect(result).toEqual({
      props: expect.objectContaining({
        service: 'zhongwen',
        variant: null,
        pageType: 'offline',
        status: 200,
        pathname: '/zhongwen/offline',
      }),
    });
  });

  it('falls back to a null variant for an unrecognised variant value', async () => {
    const result = await handleOfflineRoute(
      buildContext('/zhongwen/xyz/offline'),
    );

    expect(result).toEqual({
      props: expect.objectContaining({
        service: 'zhongwen',
        variant: null,
        pageType: 'offline',
        status: 200,
      }),
    });
  });

  it('sets the correct Cache-Control header', async () => {
    await handleOfflineRoute(buildContext('/mundo/offline'));

    expect(mockSetHeader).toHaveBeenCalledWith(
      'Cache-Control',
      'public, max-age=300, stale-while-revalidate=600, stale-if-error=3600',
    );
  });
});

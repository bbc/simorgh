import { GetServerSidePropsContext } from 'next';
import handleAvRoute from './handleAvRoute';

const mockGetServerSidePropsContext = {
  req: {
    headers: {},
  } as unknown as GetServerSidePropsContext['req'],
  res: {
    setHeader: jest.fn(),
  } as unknown as GetServerSidePropsContext['res'],
  resolvedUrl: '',
  query: {},
} satisfies GetServerSidePropsContext;

describe('Handle AV Route', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should set the cache control header correctly for a Syndication route', async () => {
    mockGetServerSidePropsContext.resolvedUrl = '/news/av-embeds/123';
    mockGetServerSidePropsContext.query = { service: 'news' };

    const { req, res, resolvedUrl, query } = mockGetServerSidePropsContext;

    await handleAvRoute({
      req,
      res,
      resolvedUrl,
      query,
    });

    expect(mockGetServerSidePropsContext.res.setHeader).toHaveBeenCalledWith(
      'Cache-Control',
      'private, stale-if-error=90, stale-while-revalidate=30, max-age=0, must-revalidate',
    );
  });

  it('should set the cache control header correctly for a non-Syndication route', async () => {
    mockGetServerSidePropsContext.resolvedUrl = '/ws/av-embeds/123';

    const { req, res, resolvedUrl, query } = mockGetServerSidePropsContext;

    await handleAvRoute({
      req,
      res,
      resolvedUrl,
      query,
    });

    expect(mockGetServerSidePropsContext.res.setHeader).toHaveBeenCalledWith(
      'Cache-Control',
      'public, stale-if-error=90, stale-while-revalidate=30, max-age=30',
    );
  });
});

import { GetServerSidePropsContext } from 'next';
import handleAvRoute from './handleAvRoute';

const mockGetServerSidePropsContext = {
  req: {
    headers: {},
  },
  res: {
    setHeader: jest.fn(),
  },
} as unknown as GetServerSidePropsContext;

describe('Handle AV Route', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should set the cache control header correctly for a Syndication route', async () => {
    const { req, res } = mockGetServerSidePropsContext;

    await handleAvRoute({
      req,
      res,
      resolvedUrl: '/news/av-embeds/123',
      query: { service: 'news' },
    });

    expect(mockGetServerSidePropsContext.res.setHeader).toHaveBeenCalledWith(
      'Cache-Control',
      'private, stale-if-error=90, stale-while-revalidate=30, max-age=0, must-revalidate',
    );
  });

  it('should set the cache control header correctly for a non-Syndication route', async () => {
    const { req, res } = mockGetServerSidePropsContext;

    await handleAvRoute({
      req,
      res,
      resolvedUrl: '/ws/av-embeds/123',
      query: {},
    });

    expect(mockGetServerSidePropsContext.res.setHeader).toHaveBeenCalledWith(
      'Cache-Control',
      'public, stale-if-error=90, stale-while-revalidate=30, max-age=30',
    );
  });
});

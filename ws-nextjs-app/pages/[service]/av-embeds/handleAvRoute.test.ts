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

  it('should set the cache control header correctly for a non-WS route', async () => {
    mockGetServerSidePropsContext.resolvedUrl = '/news/av-embeds/123';

    await handleAvRoute(mockGetServerSidePropsContext);

    expect(mockGetServerSidePropsContext.res.setHeader).toHaveBeenCalledWith(
      'Cache-Control',
      'private, stale-if-error=90, stale-while-revalidate=30, max-age=0, must-revalidate',
    );
  });

  it('should set the cache control header correctly for a WS route', async () => {
    mockGetServerSidePropsContext.resolvedUrl = '/ws/av-embeds/123';

    await handleAvRoute(mockGetServerSidePropsContext);

    expect(mockGetServerSidePropsContext.res.setHeader).toHaveBeenCalledWith(
      'Cache-Control',
      'public, stale-if-error=90, stale-while-revalidate=30, max-age=30',
    );
  });
});

import { GetServerSidePropsContext } from 'next';

import * as getTogglesModule from '#app/lib/utilities/getToggles/withCache';
import { MY_NEWS_PAGE } from '#app/routes/utils/pageTypes';
import { getServerSideProps } from './index.page';

jest.mock('#app/lib/utilities/getToggles/withCache');
jest.mock('#server/utilities/logResponseTime', () => jest.fn());

const mockGetToggles = getTogglesModule.default as jest.MockedFunction<
  typeof getTogglesModule.default
>;

type MockContext = GetServerSidePropsContext & {
  res: { statusCode: number; setHeader: jest.Mock };
};

const createMockContext = (): MockContext =>
  ({
    query: { service: 'hindi', variant: null },
    res: { statusCode: 200, setHeader: jest.fn() },
    resolvedUrl: '/hindi/my-news',
  }) as unknown as MockContext;

describe('My News - getServerSideProps', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return 404 when UAS personalization toggle is disabled', async () => {
    const context = createMockContext();
    mockGetToggles.mockResolvedValueOnce({
      uasPersonalization: { enabled: false },
    } as unknown as Record<string, unknown>);

    const result = await getServerSideProps(context);

    expect((result as Record<string, unknown>).props).toMatchObject({
      service: 'hindi',
      status: 404,
      pathname: '/hindi/my-news',
    });
    expect(context.res.statusCode).toBe(404);
  });

  it('should return minimal props when toggle is enabled', async () => {
    const context = createMockContext();
    mockGetToggles.mockResolvedValueOnce({
      uasPersonalization: { enabled: true },
    } as unknown as Record<string, unknown>);

    const result = await getServerSideProps(context);
    const props = (result as Record<string, unknown>).props as Record<
      string,
      unknown
    >;

    expect(props.service).toBe('hindi');
    expect(props.pageType).toBe(MY_NEWS_PAGE);
    expect(props.status).toBe(200);
    expect(props.pathname).toBe('/hindi/my-news');
    expect(props.pageData).toBeDefined();
    expect((props.pageData as Record<string, unknown>).metadata).toBeDefined();
  });
});

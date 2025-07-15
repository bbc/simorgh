import { GetServerSidePropsContext } from 'next';
import { getServerSideProps } from './[id].page';
import { MEDIA_ARTICLE_PAGE } from '#app/routes/utils/pageTypes';

// Mock the dependencies
jest.mock('#lib/logger.node', () => jest.fn().mockReturnValue({
  debug: jest.fn(),
  error: jest.fn(),
}));

jest.mock('#server/utilities/logResponseTime', () => jest.fn());
jest.mock('#app/routes/utils/isAppPath', () => jest.fn().mockReturnValue(false));
jest.mock('#app/lib/statusCodes.const', () => ({
  OK: 200,
}));
jest.mock('#server/utilities/customMetrics');
jest.mock('#app/routes/utils/isLitePath', () => jest.fn().mockReturnValue(false));
jest.mock('#nextjs/utilities/deriveVariant', () => jest.fn().mockReturnValue(null));
jest.mock('../../../../src/server/utilities/extractHeaders', () => 
  jest.fn().mockReturnValue({})
);
jest.mock('../../../utilities/pageRequests/getPageData', () => 
  jest.fn().mockResolvedValue({
    data: {
      status: 200,
      pageData: {
        metadata: {
          type: 'article',
        },
      },
    },
    toggles: {},
  })
);

describe('[service]/articles/[id].page getServerSideProps', () => {
  const mockContext = {
    resolvedUrl: '/mundo/articles/c1ep2gnx45qo',
    req: {
      headers: {},
    },
    res: {
      setHeader: jest.fn(),
      statusCode: 200,
    },
    query: {
      id: 'c1ep2gnx45qo',
      service: 'mundo',
    },
  } as unknown as GetServerSidePropsContext;

  it('should return props for a valid article', async () => {
    const result = await getServerSideProps(mockContext);

    expect(result).toEqual({
      props: {
        error: null,
        id: 'articles/c1ep2gnx45qo',
        isApp: false,
        isLite: false,
        isAmp: false,
        isNextJs: true,
        pageData: {
          metadata: {
            type: MEDIA_ARTICLE_PAGE,
          },
        },
        pageType: MEDIA_ARTICLE_PAGE,
        pathname: '/mundo/articles/c1ep2gnx45qo',
        service: 'mundo',
        status: 200,
        timeOnServer: expect.any(Number),
        toggles: {},
        variant: null,
      },
    });
  });

  it('should set cache headers', async () => {
    await getServerSideProps(mockContext);

    expect(mockContext.res.setHeader).toHaveBeenCalledWith(
      'Cache-Control',
      'public, stale-if-error=300, stale-while-revalidate=120, max-age=30'
    );
  });
});
import { GetServerSidePropsContext } from 'next';
import * as getPageDataModule from '#utilities/pageRequests/getPageData';
import handleLiveTvRoute from './handleLiveTvRoute';

jest.mock('#utilities/pageRequests/getPageData');
jest.mock('#utilities/logResponseTime');

jest.mock('#app/lib/utilities/isTest', () => {
  const originalModule = jest.requireActual('#app/lib/utilities/isTest');
  return {
    __esModule: true,
    ...originalModule,
  };
});

const hindiLiveTvPageData = {
  title: 'बीबीसी हिन्दी पर देखें देश-दुनिया की बड़ी ख़बरें और विश्लेषण',
  description:
    'देश और दुनिया की हर बड़ी ख़बर और उसका विश्लेषण. राजनीति, विज्ञान, मनोरंजन, इतिहास, खेल और भी बहुत कुछ.',
  curations: [],
  metadata: { atiAnalytics: [] },
};

describe('handleLiveTvRoute', () => {
  const mockSetHeader = jest.fn();
  const mockGetServerSidePropsContext = {
    req: {
      headers: {},
    } as unknown as GetServerSidePropsContext['req'],
    res: {
      setHeader: mockSetHeader,
      removeHeader: jest.fn(),
    } as unknown as GetServerSidePropsContext['res'],
    resolvedUrl: '/hindi/watch/bbc_hindi_tv/live',
    query: { service: 'hindi' },
  } satisfies GetServerSidePropsContext;

  beforeEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
    jest.spyOn(getPageDataModule, 'default').mockResolvedValue({
      data: {
        pageData: hindiLiveTvPageData,
        status: 200,
      },
    });
  });

  it('returns expected props if data fetch succeeds', async () => {
    const result = await handleLiveTvRoute(mockGetServerSidePropsContext);

    expect(result.props.status).toEqual(200);
    expect(result.props.pageType).toEqual('liveTV');
  });

  it('returns error props if data fetch returns 500', async () => {
    jest.spyOn(getPageDataModule, 'default').mockResolvedValue({
      data: {
        pageData: {},
        status: 500,
      },
    });

    const result = await handleLiveTvRoute(mockGetServerSidePropsContext);

    expect(result).toEqual({
      props: expect.objectContaining({
        status: 500,
        pageType: 'liveTV',
        pathname: '/hindi/watch/bbc_hindi_tv/live',
      }),
    });
  });

  it('returns error props if data fetch returns 404', async () => {
    jest.spyOn(getPageDataModule, 'default').mockResolvedValue({
      data: {
        pageData: {},
        status: 404,
      },
    });

    const result = await handleLiveTvRoute(mockGetServerSidePropsContext);

    expect(result).toEqual({
      props: expect.objectContaining({
        status: 404,
        pageType: 'liveTV',
        pathname: '/hindi/watch/bbc_hindi_tv/live',
      }),
    });
  });

  it('throws if pageData is missing', async () => {
    jest.spyOn(getPageDataModule, 'default').mockResolvedValue({
      data: { pageData: null, status: 200 },
    });

    await expect(
      handleLiveTvRoute(mockGetServerSidePropsContext),
    ).rejects.toThrow('AudioPage data is malformed');
  });

  it('sets correct cache-control header', async () => {
    await handleLiveTvRoute(mockGetServerSidePropsContext);

    expect(mockSetHeader).toHaveBeenCalledWith(
      'Cache-Control',
      expect.stringContaining('max-age=30'),
    );
  });
});

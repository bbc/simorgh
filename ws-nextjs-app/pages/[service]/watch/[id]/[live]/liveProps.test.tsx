import { GetServerSidePropsContext } from 'next';
import * as getPageDataModule from '#utilities/pageRequests/getPageData';
import { getServerSideProps } from './[[...variant]].page';

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

describe('liveTvRoute getServerSideProps', () => {
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

  it('returns expected props on valid extensions ', async () => {
    const resolvedUrl = `/hindi/watch/bbc_hindi_tv/live`;

    const result = await getServerSideProps({
      ...mockGetServerSidePropsContext,
      resolvedUrl,
    });

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

    const result = await getServerSideProps(mockGetServerSidePropsContext);

    expect(result).toEqual({
      props: expect.objectContaining({
        status: 500,
        pageType: 'liveTV',
        pathname: '/hindi/watch/bbc_hindi_tv/live',
      }),
    });
  });

  it('sets correct cache-control header', async () => {
    await getServerSideProps(mockGetServerSidePropsContext);

    expect(mockSetHeader).toHaveBeenCalledWith(
      'Cache-Control',
      expect.stringContaining('max-age=30'),
    );
  });
});

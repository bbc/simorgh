import { GetServerSidePropsContext } from 'next';
import gahuzaOnDemandAudio from '#data/gahuza/bbc_gahuza_radio/p02pcb5c.json';
import * as isTest from '#app/lib/utilities/isTest';
import * as getPageDataModule from '../../../utilities/pageRequests/getPageData';
import handleOnDemandAudioRoute from './handleOnDemandAudioRoute';

jest.mock('../../../utilities/pageRequests/getPageData');

jest.mock('#app/lib/utilities/isTest', () => {
  const originalModule = jest.requireActual('#app/lib/utilities/isTest');
  return {
    __esModule: true,
    ...originalModule,
  };
});

describe('handleOnDemandAudioRoute', () => {
  const mockSetHeader = jest.fn();
  const mockGetServerSidePropsContext = {
    req: {
      headers: {},
    } as unknown as GetServerSidePropsContext['req'],
    res: {
      setHeader: mockSetHeader,
      removeHeader: jest.fn(),
    } as unknown as GetServerSidePropsContext['res'],
    resolvedUrl: '/gahuza/bbc_gahuza_radio/podcasts/programmes/p02pcb5c',
    query: { service: 'gahuza' },
  } satisfies GetServerSidePropsContext;

  beforeEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
    jest.spyOn(getPageDataModule, 'default').mockResolvedValue({
      data: {
        pageData: gahuzaOnDemandAudio,
        status: 200,
      },
    });
  });

  it('returns expected props if data fetch succeeds', async () => {
    jest.spyOn(Date, 'now').mockImplementation(() => 1234567890000);

    const result = await handleOnDemandAudioRoute(
      mockGetServerSidePropsContext,
    );

    expect(result.props.status).toEqual(200);
    expect(result.props.pageType).toEqual('audio');
  });

  it('returns error props if data fetch returns 500', async () => {
    jest.spyOn(getPageDataModule, 'default').mockResolvedValue({
      data: {
        pageData: gahuzaOnDemandAudio,
        status: 500,
      },
    });

    jest.spyOn(Date, 'now').mockImplementation(() => 1234567890000);

    const result = await handleOnDemandAudioRoute(
      mockGetServerSidePropsContext,
    );

    expect(result).toEqual({
      props: expect.objectContaining({
        status: 500,
        pageType: 'audio',
        pathname: '/gahuza/bbc_gahuza_radio/podcasts/programmes/p02pcb5c',
      }),
    });
  });

  it('returns error props if data fetch returns 404', async () => {
    jest.spyOn(getPageDataModule, 'default').mockResolvedValue({
      data: {
        pageData: gahuzaOnDemandAudio,
        status: 404,
      },
    });

    jest.spyOn(Date, 'now').mockImplementation(() => 1234567890000);

    const result = await handleOnDemandAudioRoute(
      mockGetServerSidePropsContext,
    );

    expect(result).toEqual({
      props: expect.objectContaining({
        status: 404,
        pageType: 'audio',
        pathname: '/gahuza/bbc_gahuza_radio/podcasts/programmes/p02pcb5c',
      }),
    });
  });

  it('throws if pageData is missing', async () => {
    jest.spyOn(getPageDataModule, 'default').mockResolvedValue({
      data: { pageData: null, status: 200 },
    });

    await expect(
      handleOnDemandAudioRoute(mockGetServerSidePropsContext),
    ).rejects.toThrow('AudioPage data is malformed');
  });

  it('sets correct cache-control header', async () => {
    await handleOnDemandAudioRoute(mockGetServerSidePropsContext);

    expect(mockSetHeader).toHaveBeenCalledWith(
      'Cache-Control',
      expect.stringContaining('max-age=180'),
    );
  });

  it('returns not found props when service is invalid', async () => {
    const result = await handleOnDemandAudioRoute({
      ...mockGetServerSidePropsContext,
      resolvedUrl: '/fakeservice',
    });

    expect(result).toEqual({
      props: expect.objectContaining({ status: 404 }),
    });
  });

  it('should render live assets on test environments', async () => {
    jest.spyOn(Date, 'now').mockImplementation(() => 1234567890000);
    jest.spyOn(isTest, 'default').mockReturnValueOnce(true);
    const pageDataSpy = jest.spyOn(getPageDataModule, 'default');

    await handleOnDemandAudioRoute(mockGetServerSidePropsContext);

    expect(pageDataSpy).toHaveBeenCalledWith(
      expect.objectContaining({ rendererEnv: 'live' }),
    );
  });
});

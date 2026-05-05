import { GetServerSidePropsContext } from 'next';
import onDemandTvJson from '#data/pashto/bbc_pashto_tv/tv_programmes/w13xttn4.json';
import { Toggles } from '#app/models/types/global';
import * as isTest from '#app/lib/utilities/isTest';
import * as getTogglesModule from '#app/lib/utilities/getToggles/withCache';
import * as getPageDataModule from '../../../utilities/pageRequests/getPageData';
import handleOnDemandTvRoute from './handleOnDemandTvRoute';

jest.mock('../../../utilities/pageRequests/getPageData');
jest.mock('#app/lib/utilities/getToggles/withCache');

jest.mock('#app/lib/utilities/isTest', () => {
  const originalModule = jest.requireActual('#app/lib/utilities/isTest');
  return {
    __esModule: true,
    ...originalModule,
  };
});

describe('handleOnDemandTvRoute', () => {
  const mockSetHeader = jest.fn();
  const mockGetServerSidePropsContext = {
    req: {
      headers: {},
    } as unknown as GetServerSidePropsContext['req'],
    res: {
      setHeader: mockSetHeader,
      removeHeader: jest.fn(),
    } as unknown as GetServerSidePropsContext['res'],
    resolvedUrl: '/pashto/bbc_pashto_tv/tv_programmes/w13xttn4',
    query: { service: 'pashto' },
  } satisfies GetServerSidePropsContext;

  beforeEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();

    jest.spyOn(getPageDataModule, 'default').mockResolvedValue({
      data: {
        pageData: onDemandTvJson.data,
        status: 200,
      },
    });

    jest.spyOn(getTogglesModule, 'default').mockResolvedValue({
      recentVideoEpisodes: { enabled: true, value: 4 },
    } as Toggles);
  });

  it('returns expected props if data fetch succeeds', async () => {
    jest.spyOn(Date, 'now').mockImplementation(() => 1234567890000);

    const result = await handleOnDemandTvRoute(mockGetServerSidePropsContext);

    expect(result.props.status).toEqual(200);
    expect(result.props.pageType).toEqual('tv');
  });

  it('returns recent episodes using the toggle limit', async () => {
    jest.spyOn(getTogglesModule, 'default').mockResolvedValue({
      recentVideoEpisodes: { enabled: true, value: 3 },
    } as Toggles);

    const result = await handleOnDemandTvRoute(mockGetServerSidePropsContext);

    expect(result.props.pageData.recentEpisodes).toHaveLength(3);
    expect(result.props.pageData.recentEpisodes[0].id).toEqual(
      'w172zmspxm02pfr',
    );
  });

  it('returns no recent episodes when the toggle is null', async () => {
    jest.spyOn(getTogglesModule, 'default').mockResolvedValue({
      recentVideoEpisodes: null,
    } as unknown as Toggles);

    const result = await handleOnDemandTvRoute(mockGetServerSidePropsContext);

    expect(result.props.pageData.recentEpisodes).toBeNull();
  });

  it('returns no recent episodes when the toggle is disabled', async () => {
    jest.spyOn(getTogglesModule, 'default').mockResolvedValue({
      recentVideoEpisodes: { enabled: false, value: 4 },
    } as Toggles);

    const result = await handleOnDemandTvRoute(mockGetServerSidePropsContext);

    expect(result.props.pageData.recentEpisodes).toBeNull();
  });

  it('returns error props if data fetch returns 500', async () => {
    jest.spyOn(getPageDataModule, 'default').mockResolvedValue({
      data: {
        pageData: onDemandTvJson.data,
        status: 500,
      },
    });

    jest.spyOn(Date, 'now').mockImplementation(() => 1234567890000);

    const result = await handleOnDemandTvRoute(mockGetServerSidePropsContext);

    expect(result).toEqual({
      props: expect.objectContaining({
        status: 500,
        pageType: 'tv',
        pathname: '/pashto/bbc_pashto_tv/tv_programmes/w13xttn4',
      }),
    });
  });

  it('returns error props if data fetch returns 404', async () => {
    jest.spyOn(getPageDataModule, 'default').mockResolvedValue({
      data: {
        pageData: onDemandTvJson.data,
        status: 404,
      },
    });

    jest.spyOn(Date, 'now').mockImplementation(() => 1234567890000);

    const result = await handleOnDemandTvRoute(mockGetServerSidePropsContext);

    expect(result).toEqual({
      props: expect.objectContaining({
        status: 404,
        pageType: 'tv',
        pathname: '/pashto/bbc_pashto_tv/tv_programmes/w13xttn4',
      }),
    });
  });

  it('throws if pageData is missing', async () => {
    jest.spyOn(getPageDataModule, 'default').mockResolvedValue({
      data: { pageData: null, status: 200 },
    });

    await expect(
      handleOnDemandTvRoute(mockGetServerSidePropsContext),
    ).rejects.toThrow('On Demand TV data is malformed');
  });

  it('sets correct cache-control header', async () => {
    await handleOnDemandTvRoute(mockGetServerSidePropsContext);

    expect(mockSetHeader).toHaveBeenCalledWith(
      'Cache-Control',
      expect.stringContaining('max-age=180'),
    );
  });

  it('returns not found props when service is invalid', async () => {
    const result = await handleOnDemandTvRoute({
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

    await handleOnDemandTvRoute(mockGetServerSidePropsContext);

    expect(pageDataSpy).toHaveBeenCalledWith(
      expect.objectContaining({ rendererEnv: 'live' }),
    );
  });
});

import { GetServerSidePropsContext } from 'next';
import gahuzaOnDemandAudio from '#data/gahuza/bbc_gahuza_radio/p02pcb5c.json';
import * as shouldRender from '../../../utilities/shouldRender';
import * as getPageDataModule from '../../../utilities/pageRequests/getPageData';
import handleOnDemandAudioRoute from './handleOnDemandAudioRoute';

jest.mock('../../../utilities/pageRequests/getPageData');
jest.mock('../../../utilities/shouldRender', () => {
  const originalModule = jest.requireActual('../../../utilities/shouldRender');
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

  it('returns expected props if shouldRender succeeds', async () => {
    jest.spyOn(Date, 'now').mockImplementation(() => 1234567890000);

    const result = await handleOnDemandAudioRoute(
      mockGetServerSidePropsContext,
    );

    expect(result.props.status).toEqual(200);
    expect(result.props.pageType).toEqual('audio');
  });

  it('returns error props if shouldRender fails - 500', async () => {
    jest.spyOn(shouldRender, 'default').mockReturnValue({
      hasRequestSucceeded: false,
      status: 500,
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

  it('returns error props if shouldRender fails - 404', async () => {
    jest.spyOn(shouldRender, 'default').mockReturnValue({
      hasRequestSucceeded: false,
      status: 404,
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
      expect.stringContaining('max-age=30'),
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
});

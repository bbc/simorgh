import { GetServerSidePropsContext } from 'next';
import liveRadioJson from '#data/korean/bbc_korean_radio/liveradio.json';
import { LIVE_RADIO_PAGE } from '#app/routes/utils/pageTypes';
import { Toggles } from '#app/models/types/global';
import * as getTogglesModule from '#app/lib/utilities/getToggles/withCache';
import * as getPageDataModule from '../../../utilities/pageRequests/getPageData';
import handleLiveRadioRoute from './handleLiveRadioRoute';

jest.mock('../../../utilities/pageRequests/getPageData');
jest.mock('#app/lib/utilities/getToggles/withCache');

describe('handleLiveRadioRoute', () => {
  const mockSetHeader = jest.fn();
  const mockGetServerSidePropsContext = {
    req: {
      headers: {},
    } as unknown as GetServerSidePropsContext['req'],
    res: {
      setHeader: mockSetHeader,
      removeHeader: jest.fn(),
    } as unknown as GetServerSidePropsContext['res'],
    resolvedUrl: '/korean/bbc_korean_radio/liveradio',
    query: { service: 'korean' },
  } satisfies GetServerSidePropsContext;

  let getPageDataSpy: jest.SpyInstance;

  beforeEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
    getPageDataSpy = jest
      .spyOn(getPageDataModule, 'default')
      .mockResolvedValue({
        data: {
          pageData: liveRadioJson.data,
          status: 200,
        },
      });

    jest.spyOn(getTogglesModule, 'default').mockResolvedValue({
      liveRadioSchedule: { enabled: true },
    } as Toggles);
  });

  it('returns expected props if data fetch succeeds', async () => {
    const { props } = await handleLiveRadioRoute(mockGetServerSidePropsContext);
    expect(props.status).toEqual(200);
    expect(props.pageType).toEqual('liveRadio');
    expect(props.pageData).toEqual(liveRadioJson.data);
  });

  it('should return essential data for a page to render', async () => {
    const {
      props: { pageData },
    } = await handleLiveRadioRoute(mockGetServerSidePropsContext);

    expect(pageData.name).toEqual('BBC 코리아 라디오');
    expect(pageData.language).toEqual('ko');
    expect(pageData.metadata.type).toEqual('Live Radio');
    expect(pageData.summary).toEqual(
      '세계와 한반도 뉴스를 공정하고 객관적으로 전달해 드립니다',
    );
    expect(pageData.heading).toEqual('BBC 코리아 라디오');
    expect(pageData.bodySummary).toEqual(
      '세계와 한반도 뉴스를 공정하고 객관적으로 전달해 드립니다',
    );
    expect(pageData.masterBrand).toEqual('bbc_korean_radio');
  });

  it('should call getPageData with the correct arguments', async () => {
    await handleLiveRadioRoute(mockGetServerSidePropsContext);

    expect(getPageDataSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        id: '/korean/bbc_korean_radio/liveradio',
        service: 'korean',
        pageType: LIVE_RADIO_PAGE,
        resolvedUrl: '/korean/bbc_korean_radio/liveradio',
      }),
    );
  });

  it('should pass disableRadioSchedule as true when toggle is disabled', async () => {
    jest.spyOn(getTogglesModule, 'default').mockResolvedValue({
      liveRadioSchedule: { enabled: false },
    } as Toggles);

    await handleLiveRadioRoute(mockGetServerSidePropsContext);

    expect(getPageDataSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        disableRadioSchedule: true,
      }),
    );
  });

  it('should pass disableRadioSchedule as false when toggle is enabled', async () => {
    await handleLiveRadioRoute(mockGetServerSidePropsContext);

    expect(getPageDataSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        disableRadioSchedule: false,
      }),
    );
  });

  it('returns error props if data fetch returns 500', async () => {
    jest.spyOn(getPageDataModule, 'default').mockResolvedValue({
      data: {
        pageData: liveRadioJson.data,
        status: 500,
      },
    });

    const result = await handleLiveRadioRoute(mockGetServerSidePropsContext);

    expect(result).toEqual({
      props: expect.objectContaining({
        status: 500,
        pageType: 'liveRadio',
        pathname: '/korean/bbc_korean_radio/liveradio',
      }),
    });
  });

  it('returns error props if data fetch returns 404', async () => {
    jest.spyOn(getPageDataModule, 'default').mockResolvedValue({
      data: {
        pageData: liveRadioJson.data,
        status: 404,
      },
    });

    const result = await handleLiveRadioRoute(mockGetServerSidePropsContext);

    expect(result).toEqual({
      props: expect.objectContaining({
        status: 404,
        pageType: 'liveRadio',
        pathname: '/korean/bbc_korean_radio/liveradio',
      }),
    });
  });

  it('throws if pageData is missing', async () => {
    jest.spyOn(getPageDataModule, 'default').mockResolvedValue({
      data: { pageData: null, status: 200 },
    });

    await expect(
      handleLiveRadioRoute(mockGetServerSidePropsContext),
    ).rejects.toThrow('LiveRadioPage data is malformed');
  });

  it('sets correct cache-control header', async () => {
    await handleLiveRadioRoute(mockGetServerSidePropsContext);

    expect(mockSetHeader).toHaveBeenCalledWith(
      'Cache-Control',
      expect.stringContaining('max-age=120'),
    );
  });

  it('returns not found props when service is invalid', async () => {
    const result = await handleLiveRadioRoute({
      ...mockGetServerSidePropsContext,
      resolvedUrl: '/fakeservice',
    });

    expect(result).toEqual({
      props: expect.objectContaining({ status: 404 }),
    });
  });
});

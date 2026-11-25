import { GetServerSidePropsContext } from 'next';

import gahuzaOnDemandAudio from '#data/gahuza/bbc_gahuza_radio/p02pcb5c.json';
import gahuzaPodcastPage from '#data/gahuza/podcasts/p07yh8hb.json';
import * as isTest from '#app/lib/utilities/isTest';
import * as fetchTogglesModule from '#app/lib/utilities/fetchToggles';

import * as getPageDataModule from '../../../utilities/pageRequests/getPageData';
import handleOnDemandAudioRoute from './handleOnDemandAudioRoute';

jest.mock('../../../utilities/pageRequests/getPageData');
jest.mock('#app/lib/utilities/fetchToggles');

jest.mock('#app/lib/utilities/isTest', () => {
  const originalModule = jest.requireActual('#app/lib/utilities/isTest');

  return {
    __esModule: true,
    ...originalModule,
  };
});

const mockRadioPageData = () => {
  jest.spyOn(getPageDataModule, 'default').mockResolvedValue({
    data: {
      pageData: gahuzaOnDemandAudio.data,
      status: 200,
    },
  });
};

const mockPodcastPageData = () => {
  jest.spyOn(getPageDataModule, 'default').mockResolvedValue({
    data: {
      pageData: gahuzaPodcastPage.data,
      status: 200,
    },
  });
};

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
    resolvedUrl: '/gahuza/bbc_gahuza_radio/p02pcb5c',
    query: {
      service: 'gahuza',
    },
  } satisfies GetServerSidePropsContext;

  beforeEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();

    jest.spyOn(Date, 'now').mockImplementation(() => 1234567890000);

    jest.spyOn(fetchTogglesModule, 'default').mockResolvedValue({
      onDemandRadioSchedule: {
        enabled: true,
      },
      recentAudioEpisodes: {
        enabled: false,
        value: 4,
      },
      recentPodcastEpisodes: {
        enabled: true,
        value: 1,
      },
    } as never);
  });

  describe('when handling an on-demand radio page', () => {
    beforeEach(() => {
      mockRadioPageData();
    });

    it('returns expected props if data fetch succeeds', async () => {
      const result = await handleOnDemandAudioRoute(
        mockGetServerSidePropsContext,
      );

      expect(result.props.status).toEqual(200);
      expect(result.props.pageType).toEqual('audio');
    });

    it('sets correct cache-control header', async () => {
      await handleOnDemandAudioRoute(mockGetServerSidePropsContext);

      expect(mockSetHeader).toHaveBeenCalledWith(
        'Cache-Control',
        expect.stringContaining('max-age=30'),
      );
    });

    it('renders live assets on test environments', async () => {
      jest.spyOn(isTest, 'default').mockReturnValueOnce(true);

      const pageDataSpy = jest.spyOn(getPageDataModule, 'default');

      await handleOnDemandAudioRoute(mockGetServerSidePropsContext);

      expect(pageDataSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          rendererEnv: 'live',
        }),
      );
    });

    it('nulls recentEpisodes when the recentAudioEpisodes toggle is disabled', async () => {
      jest.spyOn(fetchTogglesModule, 'default').mockResolvedValue({
        onDemandRadioSchedule: {
          enabled: true,
        },
        recentAudioEpisodes: {
          enabled: false,
          value: 4,
        },
        recentPodcastEpisodes: {
          enabled: true,
          value: 1,
        },
      } as never);

      const result = await handleOnDemandAudioRoute(
        mockGetServerSidePropsContext,
      );

      expect(result.props.pageData.recentEpisodes).toBeNull();
    });

    it('nulls radioScheduleData when the onDemandRadioSchedule toggle is disabled', async () => {
      jest.spyOn(fetchTogglesModule, 'default').mockResolvedValue({
        onDemandRadioSchedule: {
          enabled: false,
        },
        recentAudioEpisodes: {
          enabled: false,
          value: 4,
        },
        recentPodcastEpisodes: {
          enabled: true,
          value: 1,
        },
      } as never);

      const result = await handleOnDemandAudioRoute(
        mockGetServerSidePropsContext,
      );

      expect(result.props.pageData.radioScheduleData).toBeNull();
    });

    it('returns no external links for a genuine on-demand radio page', async () => {
      const result = await handleOnDemandAudioRoute(
        mockGetServerSidePropsContext,
      );

      expect(result.props.pageData.externalLinks).toEqual([]);
    });
  });

  describe('when handling a podcast page', () => {
    beforeEach(() => {
      mockPodcastPageData();
    });

    it('includes recent podcast episodes when the toggle is enabled', async () => {
      const result = await handleOnDemandAudioRoute({
        ...mockGetServerSidePropsContext,
        resolvedUrl: '/gahuza/podcasts/p07yh8hb',
      });

      expect(result.props.pageData.recentEpisodes).toHaveLength(1);

      expect(result.props.pageData.recentEpisodes?.[0]).toEqual(
        expect.objectContaining({
          id: 'p0k6cby1',
        }),
      );
    });

    it('nulls recentEpisodes when the recentPodcastEpisodes toggle is disabled', async () => {
      jest.spyOn(fetchTogglesModule, 'default').mockResolvedValue({
        onDemandRadioSchedule: {
          enabled: true,
        },
        recentAudioEpisodes: {
          enabled: false,
          value: 4,
        },
        recentPodcastEpisodes: {
          enabled: false,
          value: 1,
        },
      } as never);

      const result = await handleOnDemandAudioRoute({
        ...mockGetServerSidePropsContext,
        resolvedUrl: '/gahuza/podcasts/p07yh8hb',
      });

      expect(result.props.pageData.recentEpisodes).toBeNull();
    });
  });

  describe('when the page-data request fails', () => {
    it('returns error props if data fetch returns 500', async () => {
      jest.spyOn(getPageDataModule, 'default').mockResolvedValue({
        data: {
          pageData: gahuzaOnDemandAudio.data,
          status: 500,
        },
      });

      const result = await handleOnDemandAudioRoute(
        mockGetServerSidePropsContext,
      );

      expect(result).toEqual({
        props: expect.objectContaining({
          status: 500,
          pageType: 'audio',
          pathname: '/gahuza/bbc_gahuza_radio/p02pcb5c',
        }),
      });
    });

    it('returns error props if data fetch returns 404', async () => {
      jest.spyOn(getPageDataModule, 'default').mockResolvedValue({
        data: {
          pageData: gahuzaOnDemandAudio.data,
          status: 404,
        },
      });

      const result = await handleOnDemandAudioRoute(
        mockGetServerSidePropsContext,
      );

      expect(result).toEqual({
        props: expect.objectContaining({
          status: 404,
          pageType: 'audio',
          pathname: '/gahuza/bbc_gahuza_radio/p02pcb5c',
        }),
      });
    });

    it('throws if pageData is missing', async () => {
      jest.spyOn(getPageDataModule, 'default').mockResolvedValue({
        data: {
          pageData: null,
          status: 200,
        },
      });

      await expect(
        handleOnDemandAudioRoute(mockGetServerSidePropsContext),
      ).rejects.toThrow('AudioPage data is malformed');
    });
  });

  describe('when the service is invalid', () => {
    it('returns not found props', async () => {
      const result = await handleOnDemandAudioRoute({
        ...mockGetServerSidePropsContext,
        resolvedUrl: '/fakeservice',
      });

      expect(result).toEqual({
        props: expect.objectContaining({
          status: 404,
        }),
      });
    });
  });
});

import onDemandTvJson from '#data/pashto/bbc_pashto_tv/tv_programmes/w13xttn4.json';
import { FetchMock } from 'jest-fetch-mock';
import { TV_PAGE } from '#app/routes/utils/pageTypes';
import isTest from '#app/lib/utilities/isTest';
import * as fetchBFF from '#app/routes/utils/fetchDataFromBFF';

import getInitialData from '.';

const { env } = process;
const fetchMock = fetch as FetchMock;

jest.mock('#app/lib/utilities/isTest', () =>
  jest.fn().mockImplementation(() => false),
);

const pageType = TV_PAGE;

describe('Get initial data for on demand tv', () => {
  beforeEach(() => {
    fetchMock.mockResponse(JSON.stringify(onDemandTvJson));
  });

  afterEach(() => {
    process.env = { ...env };
    jest.clearAllMocks();
  });

  it('should return essential data for a page to render', async () => {
    const { pageData } = await getInitialData({
      path: 'mock-on-demand-tv-path',
      service: 'pashto',
      pageType,
      toggles: {
        recentVideoEpisodes: { enabled: false, value: 4 },
      },
    });

    expect(pageData.language).toEqual('ps');
    expect(pageData.releaseDateTimeStamp).toEqual('2024-11-21T00:00:00.000Z');
    expect(pageData.brandTitle).toEqual(' د بي بي سي خبرونه ');
    expect(pageData.headline).toEqual(' د بي بي سي خبرونه ');
    expect(pageData.shortSynopsis).toEqual(
      'نړۍ دا وخت، د نړۍ او سیمې وروستۍ پرمختیاوې یادوي\n',
    );
    expect(pageData.promoBrandTitle).toEqual(' د بي بي سي خبرونه ');
    expect(pageData.durationISO8601).toEqual('PT28M');
    expect(pageData.thumbnailImageUrl).toEqual(
      'https://ichef.bbci.co.uk/images/ic/1024x576/p0k5s1yz.png',
    );
  });

  it('should return no recent episode data when the recent episode toggle is null', async () => {
    const { pageData } = await getInitialData({
      path: 'mock-on-demand-tv-path',
      pageType,
      toggles: {
        // @ts-expect-error allow toggle value to be null for testing purposes
        recentVideoEpisodes: null,
      },
    });

    expect(pageData.recentEpisodes).toBeNull();
  });

  it('should return no recent episode data when recentEpisode toggle is disabled and value is greater than zero', async () => {
    const { pageData } = await getInitialData({
      path: 'mock-on-demand-tv-path',
      service: 'pashto',
      pageType,
      toggles: {
        recentVideoEpisodes: { enabled: false, value: 3 },
      },
    });

    expect(pageData.recentEpisodes).toBeNull();
  });

  it('should return recent episode data when recentEpisode toggle is enabled', async () => {
    const { pageData } = await getInitialData({
      path: 'mock-on-demand-tv-path',
      service: 'pashto',
      pageType,
      toggles: {
        recentVideoEpisodes: { enabled: true, value: 3 },
      },
    });

    expect(pageData.recentEpisodes).toHaveLength(3);
    expect(pageData.recentEpisodes[0].id).toEqual('w172zmspxm02pfr');
  });

  it.each`
    isTestEnvironment | expectedPathname
    ${true}           | ${'mock-on-demand-tv-path?renderer_env=live'}
    ${false}          | ${'mock-on-demand-tv-path'}
  `(
    'should fetch from $expectedPathname when test environment is $isTestEnvironment',
    async ({ isTestEnvironment, expectedPathname }) => {
      (isTest as jest.Mock).mockImplementationOnce(() => isTestEnvironment);
      const fetchBFFSpy = jest.spyOn(fetchBFF, 'default');

      await getInitialData({
        path: 'mock-on-demand-tv-path',
        pageType: TV_PAGE,
        service: 'gahuza',
      });

      expect(fetchBFFSpy).toHaveBeenCalledWith(
        expect.objectContaining({ pathname: expectedPathname }),
      );
    },
  );
});

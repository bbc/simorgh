import liveRadioJson from '#data/korean/bbc_korean_radio/liveradio.json';
import { LIVE_RADIO_PAGE } from '#app/routes/utils/pageTypes';
import * as fetchPageData from '#app/routes/utils/fetchPageData';
import defaultToggles from '#app/lib/config/toggles';
import getInitialData from '.';

fetch.mockResponse(JSON.stringify(liveRadioJson));

const { env } = process;
const spy = jest.spyOn(fetchPageData, 'default');
jest.mock('../../utils/getConfig', () => jest.fn());

process.env.BFF_PATH = 'https://mock-bff-path';

const agent = {
  connect: { cert: 'cert', ca: 'ca', key: 'key' },
};
const mockGetAgent = () => Promise.resolve(agent);
jest.mock('../../../../server/utilities/getAgent', () => jest.fn(mockGetAgent));

const toggles = defaultToggles.local;

describe('Get initial data for live radio', () => {
  afterEach(() => {
    process.env = { ...env };
    jest.clearAllMocks();
  });

  it('should return essential data for a page to render', async () => {
    const { pageData } = await getInitialData({
      path: '/korean/bbc_korean_radio/liveradio',
      service: 'korean',
      pageType: LIVE_RADIO_PAGE,
      getAgent: mockGetAgent,
      toggles,
    });

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

  describe.each(['test', 'live'])('on %s environment', environment => {
    beforeEach(() => {
      process.env.SIMORGH_APP_ENV = environment;
    });

    it('should override renderer', async () => {
      await getInitialData({
        path: '/korean/bbc_korean_radio/liveradio',
        pageType: LIVE_RADIO_PAGE,
        toggles,
      });
      expect(spy).toHaveBeenCalledWith({
        optHeaders: { 'ctx-service-env': environment },
        path: `https://mock-bff-path/?id=bbc_korean_radio&pageType=liveRadio&serviceEnv=${environment}`,
        pageType: LIVE_RADIO_PAGE,
      });
    });

    it('should disable radio schedule if toggle disabled', async () => {
      await getInitialData({
        path: '/korean/bbc_korean_radio/liveradio',
        pageType: LIVE_RADIO_PAGE,
        toggles: {
          ...toggles,
          liveRadioSchedule: { enabled: false },
        },
      });
      expect(spy).toHaveBeenCalledWith({
        optHeaders: { 'ctx-service-env': environment },
        path: `https://mock-bff-path/?id=bbc_korean_radio&pageType=liveRadio&disableRadioSchedule=true&serviceEnv=${environment}`,
        pageType: LIVE_RADIO_PAGE,
      });
    });
  });
});

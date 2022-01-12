import liveRadioJson from '#data/korean/bbc_korean_radio/liveradio.json';
import { MEDIA_PAGE } from '#app/routes/utils/pageTypes';
import getInitialData from '.';
import * as fetchPageData from '../../utils/fetchPageData';

fetch.mockResponse(JSON.stringify(liveRadioJson));
const { env } = process;
const spy = jest.spyOn(fetchPageData, 'default');
jest.mock('../../utils/getConfig', () => jest.fn());

describe('Get initial data for live radio', () => {
  afterEach(() => {
    process.env = { ...env };
    jest.clearAllMocks();
  });

  it('should return essential data for a page to render', async () => {
    const { pageData } = await getInitialData({
      path: 'mock-live-radio-path',
      service: 'korean',
      pageType: MEDIA_PAGE,
      toggles: {
        liveRadioSchedule: { enabled: true },
      },
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

  it('should override renderer on test', async () => {
    process.env.SIMORGH_APP_ENV = 'test';
    await getInitialData({
      path: 'mock-live-radio-path',
      pageType: MEDIA_PAGE,
    });
    expect(spy).toHaveBeenCalledWith({
      path: 'mock-live-radio-path?renderer_env=live',
      pageType: MEDIA_PAGE,
    });
  });

  it('should not override renderer on live', async () => {
    process.env.SIMORGH_APP_ENV = 'live';
    await getInitialData({
      path: 'mock-live-radio-path',
      pageType: MEDIA_PAGE,
    });
    expect(spy).toHaveBeenCalledWith({
      path: 'mock-live-radio-path',
      pageType: MEDIA_PAGE,
    });
  });
});

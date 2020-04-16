import getInitialData from '.';
import * as fetchPageData from '../../utils/fetchPageData';
import liveRadioJson from '#data/korean/bbc_korean_radio/liveradio.json';

fetch.mockResponse(JSON.stringify(liveRadioJson));
const { env } = process;
const spy = jest.spyOn(fetchPageData, 'default');

describe('LiveRadioGetInitialData', () => {
  afterEach(() => {
    process.env = { ...env };
    jest.clearAllMocks();
  });

  it('should return essential data for a page to render', async () => {
    const { pageData } = await getInitialData({ path: 'mock-live-radio-path' });
    expect(pageData.promo.name).toEqual('BBC 코리아 라디오');
    expect(pageData.metadata.language).toEqual('ko');
    expect(pageData.promo.summary).toEqual(
      '세계와 한반도 뉴스를 공정하고 객관적으로 전달해 드립니다',
    );
    expect(pageData.content.blocks.length).toBeTruthy();
  });

  it('should override renderer on test', async () => {
    process.env.SIMORGH_APP_ENV = 'test';
    await getInitialData({ path: 'mock-live-radio-path' });
    expect(spy).toHaveBeenCalledWith('mock-live-radio-path?renderer_env=live');
  });

  it('should not override renderer on live', async () => {
    process.env.SIMORGH_APP_ENV = 'live';
    await getInitialData({ path: 'mock-live-radio-path' });
    expect(spy).toHaveBeenCalledWith('mock-live-radio-path');
  });
});

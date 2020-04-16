import getInitialData from '.';
import * as fetchPageData from '../../utils/fetchPageData';
import onDemandRadioJson from '#data/pashto/bbc_pashto_radio/w172x8nvf4bchz5.json';

fetch.mockResponse(JSON.stringify(onDemandRadioJson));
const { env } = process;
const spy = jest.spyOn(fetchPageData, 'default');

describe('ODRadioGetInitialData', () => {
  afterEach(() => {
    process.env = { ...env };
    jest.clearAllMocks();
  });

  it('should return essential data for a page to render', async () => {
    const { pageData } = await getInitialData({
      path: 'mock-on-demand-radio-path',
    });

    expect(pageData.headline).toEqual('وروستي خبرونه');
    expect(pageData.episodeTitle).toEqual('04/02/2020 GMT');
    expect(pageData.summary).toEqual('د نړۍ وروستي خبرونه');
    expect(pageData.language).toEqual('ps');
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

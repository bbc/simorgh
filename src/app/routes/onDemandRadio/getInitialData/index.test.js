import getInitialData from '.';
import * as fetchPageData from '../../utils/fetchPageData';
import onDemandRadioJson from '#data/pashto/bbc_pashto_radio/w3ct0lz1';

fetch.mockResponse(JSON.stringify(onDemandRadioJson));
const { env } = process;
const spy = jest.spyOn(fetchPageData, 'default');

describe('Get initial data for on demand radio', () => {
  afterEach(() => {
    process.env = { ...env };
    jest.clearAllMocks();
  });

  it('should return essential data for a page to render', async () => {
    const { pageData } = await getInitialData({
      path: 'mock-on-demand-radio-path',
    });

    expect(pageData.headline).toEqual('ماښامنۍ خپرونه');
    expect(pageData.releaseDateTimeStamp).toEqual(1588291200000);
    expect(pageData.summary).toEqual('د بي بي سي ورلډ سروس څخه پروګرام کول');
    expect(pageData.language).toEqual('ps');
    expect(pageData.metadata.type).toEqual('On Demand Radio');
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

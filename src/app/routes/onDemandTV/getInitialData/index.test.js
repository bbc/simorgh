import getInitialData from '.';
import * as fetchPageData from '../../utils/fetchPageData';
import onDemandTvJson from '#data/pashto/bbc_pashto_tv/w13xttn4';

fetch.mockResponse(JSON.stringify(onDemandTvJson));
const { env } = process;
const spy = jest.spyOn(fetchPageData, 'default');

describe('Get initial data for on demand tv', () => {
  afterEach(() => {
    process.env = { ...env };
    jest.clearAllMocks();
  });

  it('should return essential data for a page to render', async () => {
    const { pageData } = await getInitialData({
      path: 'mock-on-demand-tv-path',
    });

    expect(pageData.language).toEqual('ps');
    expect(pageData.brandTitle).toEqual('نړۍ دا وخت');
    expect(pageData.headline).toEqual('نړۍ دا وخت');
    expect(pageData.shortSynopsis).toEqual(
      'د بي بي سي پښتو ټلویزیوني خپرونه چې هره ورځ د افغانستان په شپږ بجو په ژوندۍ بڼه خپرېږي. دلته یې لیدلی شئ.',
    );
  });

  it('should override renderer on test', async () => {
    process.env.SIMORGH_APP_ENV = 'test';
    await getInitialData({ path: 'mock-live-tv-path' });
    expect(spy).toHaveBeenCalledWith('mock-live-tv-path?renderer_env=live');
  });

  it('should not override renderer on live', async () => {
    process.env.SIMORGH_APP_ENV = 'live';
    await getInitialData({ path: 'mock-live-tv-path' });
    expect(spy).toHaveBeenCalledWith('mock-live-tv-path');
  });
});

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

    expect(pageData.headline).toEqual('نړۍ دا وخت');
    expect(pageData.releaseDateTimeStamp).toEqual(1589328000000);
    expect(pageData.summary).toEqual(
      'د بي بي سي پښتو ټلویزیوني خپرونه چې هره ورځ د افغانستان په شپږ بجو په ژوندۍ بڼه خپرېږي. دلته یې لیدلی شئ.',
    );
    expect(pageData.language).toEqual('ps');
    expect(pageData.metadata.type).toEqual('On Demand TV');
    expect(pageData.imageUrl).toEqual(
      'ichef.bbci.co.uk/images/ic/$recipe/p06cy5rd.png',
    );
    expect(pageData.promoBrandTitle).toEqual('نړۍ دا وخت');
    expect(pageData.durationISO8601).toEqual('PT24M');
    expect(pageData.thumbnailImageUrl).toEqual(
      'https://ichef.bbci.co.uk/images/ic/1024x576/p06cy5rd.png',
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

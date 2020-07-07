import assocPath from 'ramda/src/assocPath';
import getInitialData from '.';
import * as fetchPageData from '../../utils/fetchPageData';
import onDemandTvJson from '#data/pashto/bbc_pashto_tv/tv_programmes/w13xttn4';

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
    expect(pageData.releaseDateTimeStamp).toEqual(1590537600000);
    expect(pageData.brandTitle).toEqual('نړۍ دا وخت');
    expect(pageData.headline).toEqual('نړۍ دا وخت');
    expect(pageData.shortSynopsis).toEqual(
      'د بي بي سي پښتو ټلویزیوني خپرونه چې هره ورځ د افغانستان په شپږ بجو په ژوندۍ بڼه خپرېږي. دلته یې لیدلی شئ.',
    );
    expect(pageData.promoBrandTitle).toEqual('نړۍ دا وخت');
    expect(pageData.durationISO8601).toEqual('PT24M');
    expect(pageData.thumbnailImageUrl).toEqual(
      'https://ichef.bbci.co.uk/images/ic/1024x576/p08b23c8.png',
    );
    expect(pageData.metadata.type).toEqual('onDemandTV');
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

  it('should return episodeIsAvailable as true if episode is available to watch', async () => {
    const { pageData } = await getInitialData('some-ondemand-tv-path');
    expect(pageData.episodeIsAvailable).toEqual(true);
  });

  it('should return episodeIsAvailable as false if episode is not available to watch', async () => {
    const pageDataWithoutVersions = assocPath(
      ['content', 'blocks', 0, 'versions'],
      [],
      onDemandTvJson,
    );
    fetch.mockResponse(JSON.stringify(pageDataWithoutVersions));
    const { pageData } = await getInitialData('some-ondemand-tv-path');
    expect(pageData.episodeIsAvailable).toEqual(false);
  });
});

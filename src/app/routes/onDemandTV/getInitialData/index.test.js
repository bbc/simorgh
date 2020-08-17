import pipe from 'ramda/src/pipe';
import dissocPath from 'ramda/src/dissocPath';
import map from 'ramda/src/map';
import loggerMock from '#testHelpers/loggerMock';
import getInitialData from '.';
import * as fetchPageData from '../../utils/fetchPageData';
import onDemandTvJson from '#data/pashto/bbc_pashto_tv/tv_programmes/w13xttn4';
import { TV_MISSING_FIELD } from '#lib/logger.const';

fetch.mockResponse(JSON.stringify(onDemandTvJson));
const { env } = process;
const spy = jest.spyOn(fetchPageData, 'default');

const pageType = 'media';

describe('Get initial data for on demand tv', () => {
  afterEach(() => {
    process.env = { ...env };
    jest.clearAllMocks();
  });

  it('should return essential data for a page to render', async () => {
    const { pageData } = await getInitialData({
      path: 'mock-on-demand-tv-path',
      pageType,
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
  });

  it('should override renderer on test', async () => {
    process.env.SIMORGH_APP_ENV = 'test';
    await getInitialData({ path: 'mock-live-tv-path', pageType });
    expect(spy).toHaveBeenCalledWith({
      path: 'mock-live-tv-path?renderer_env=live',
      pageType,
    });
  });

  it('should not override renderer on live', async () => {
    process.env.SIMORGH_APP_ENV = 'live';
    await getInitialData({ path: 'mock-live-tv-path', pageType });
    expect(spy).toHaveBeenCalledWith({ path: 'mock-live-tv-path', pageType });
  });

  it('invokes logging when expected data is missing in fetchData response', async () => {
    const errorFields = [
      ['metadata', 'id'],
      ['metadata', 'createdBy'],
      ['content', 'blocks', 0, 'id'],
    ];

    const warnFields = [
      ['promo', 'headlines', 'headline'],
      ['metadata', 'releaseDateTimeStamp'],
    ];

    const infoFields = [
      ['metadata', 'language'],
      ['metadata', 'title'],
      ['promo', 'media', 'synopses', 'short'],
      ['metadata', 'analyticsLabels', 'contentType'],
      ['metadata', 'analyticsLabels', 'pageTitle'],
      ['metadata', 'analyticsLabels', 'pageIdentifier'],
      ['promo', 'media', 'versions', 0, 'durationISO8601'],
      ['promo', 'media', 'imageUrl'],
      ['promo', 'brand', 'title'],
      ['content', 'blocks', 0, 'imageUrl'],
    ];

    const pageDataWithMissingFields = pipe(
      ...map(dissocPath, [...errorFields, ...warnFields, ...infoFields]),
      JSON.stringify,
    )(onDemandTvJson);

    fetch.mockResponse(pageDataWithMissingFields);

    await getInitialData({
      path: 'mock-on-demand-tv-path',
      pageType,
    });

    const countMissingFieldCalls = mockedFunction =>
      mockedFunction.mock.calls.filter(
        ([logCategory]) => logCategory === TV_MISSING_FIELD,
      ).length;

    expect(countMissingFieldCalls(loggerMock.error)).toBe(errorFields.length);
    expect(countMissingFieldCalls(loggerMock.warn)).toBe(warnFields.length);
    expect(countMissingFieldCalls(loggerMock.info)).toBe(infoFields.length);
  });
});

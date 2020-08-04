import getInitialData, { hasRadioSchedule, getRadioService } from '.';
import * as fetchPageData from '../../utils/fetchPageData';
import liveRadioJson from '#data/korean/bbc_korean_radio/liveradio.json';
import getConfig from '../../utils/getConfig';

fetch.mockResponse(JSON.stringify(liveRadioJson));
const { env } = process;
const spy = jest.spyOn(fetchPageData, 'default');
jest.mock('../../utils/getConfig', () => jest.fn());

const pageType = 'media';

describe('Get initial data for live radio', () => {
  afterEach(() => {
    process.env = { ...env };
    jest.clearAllMocks();
  });

  it('should return essential data for a page to render', async () => {
    const { pageData } = await getInitialData({
      path: 'mock-live-radio-path',
      service: 'korean',
      pageType,
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
    await getInitialData({ path: 'mock-live-radio-path', pageType });
    expect(spy).toHaveBeenCalledWith({
      path: 'mock-live-radio-path?renderer_env=live',
      pageType,
    });
  });

  it('should not override renderer on live', async () => {
    process.env.SIMORGH_APP_ENV = 'live';
    await getInitialData({ path: 'mock-live-radio-path', pageType });
    expect(spy).toHaveBeenCalledWith({
      path: 'mock-live-radio-path',
      pageType,
    });
  });
});

describe('hasRadioSchedule', () => {
  it('should return true if the service has the radio schedule on the live radio page', async () => {
    getConfig.mockImplementationOnce(() => ({
      radioSchedule: {
        hasRadioSchedule: true,
        onLiveRadioPage: true,
      },
    }));

    expect(await hasRadioSchedule('mock-service')).toBe(true);
  });

  it('should return false if the service does not have the radio schedule on the live radio page', async () => {
    getConfig.mockImplementationOnce(() => ({
      radioSchedule: {
        hasRadioSchedule: true,
        onLiveRadioPage: false,
      },
    }));

    expect(await hasRadioSchedule('mock-service')).toBe(false);
  });

  it('should return false if the service does not have the radio schedule enabled on any page', async () => {
    getConfig.mockImplementationOnce(() => ({
      radioSchedule: {
        hasRadioSchedule: false,
        onLiveRadioPage: false,
      },
    }));

    expect(await hasRadioSchedule('mock-service')).toBe(false);
  });
});

describe('getRadioService', () => {
  it('should return persian for Persian Live Radio', async () => {
    const service = 'persian';
    const pathname = 'bbc_persian_radio';
    expect(getRadioService({ service, pathname })).toEqual('persian');
  });

  it('should return dari for Persian Dari Live Radio', async () => {
    const service = 'persian';
    const pathname = 'bbc_dari_radio';
    expect(getRadioService({ service, pathname })).toEqual('dari');
  });

  it('should return bangla for Bengali Live Radio', async () => {
    const service = 'bengali';
    const pathname = 'bengali/bbc_bangla_radio';
    expect(getRadioService({ service, pathname })).toEqual('bangla');
  });

  it('should return oromo for Afaanoromoo Live Radio', async () => {
    const service = 'afaanoromoo';
    const pathname = 'afaanoromoo/bbc_afaanoromoo_radio';
    expect(getRadioService({ service, pathname })).toEqual('oromo');
  });

  it('should return indonesian for Indonesia Live Radio', async () => {
    const service = 'indonesia';
    const pathname = 'indonesia/bbc_indonesian_radio';
    expect(getRadioService({ service, pathname })).toEqual('indonesian');
  });
});

import mergeDeepLeft from 'ramda/src/mergeDeepLeft';
import loggerMock from '#testHelpers/loggerMock';
import getInitialData from '.';
import * as fetchPageData from '../../utils/fetchPageData';
import onDemandRadioJson from '#data/pashto/bbc_pashto_radio/w3ct0lz1';
import { RADIO_MISSING_FIELD } from '#lib/logger.const';

fetch.mockResponse(JSON.stringify(onDemandRadioJson));
const { env } = process;
const spy = jest.spyOn(fetchPageData, 'default');

const pageType = 'media';

describe('Get initial data for on demand radio', () => {
  afterEach(() => {
    process.env = { ...env };
    jest.clearAllMocks();
  });

  it('should return essential data for a page to render', async () => {
    const { pageData } = await getInitialData({
      path: 'mock-on-demand-radio-path',
      pageType,
    });

    expect(pageData.headline).toEqual('ماښامنۍ خپرونه');
    expect(pageData.releaseDateTimeStamp).toEqual(1588291200000);
    expect(pageData.summary).toEqual('د بي بي سي ورلډ سروس څخه پروګرام کول');
    expect(pageData.language).toEqual('ps');
    expect(pageData.metadata.type).toEqual('On Demand Radio');
    expect(pageData.imageUrl).toEqual(
      'ichef.bbci.co.uk/images/ic/$recipe/p08b23c8.png',
    );
    expect(pageData.promoBrandTitle).toEqual('ماښامنۍ خپرونه');
    expect(pageData.durationISO8601).toEqual('PT29M30S');
    expect(pageData.thumbnailImageUrl).toEqual(
      'https://ichef.bbci.co.uk/images/ic/1024x576/p08b23c8.png',
    );
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

  it('invokes logging when expected data is missing in ARES response', async () => {
    const pageDataWithMissingFields = mergeDeepLeft(
      {
        metadata: {
          title: null, // info
          language: null, // info
          createdBy: null, // error
          releaseDateTimeStamp: null, // warn
          analyticsLabels: {
            contentType: null, // info
          },
        },
        promo: {
          headlines: {
            headline: null, // warn
          },
          media: {
            imageUrl: null, // info
            versions: [
              {
                durationISO8601: null, // info
              },
            ],
          },
        },
        content: {
          blocks: [
            {
              id: null, // error
              imageUrl: null, // info
              synopses: {
                short: null, // info
              },
            },
          ],
        },
      },
      onDemandRadioJson,
    );
    fetch.mockResponse(JSON.stringify(pageDataWithMissingFields));

    await getInitialData({
      path: 'mock-on-demand-radio-path',
      pageType,
    });

    const countMissingFieldCalls = mockedFunction => {
      return mockedFunction.mock.calls.filter(([logCategory]) => {
        return logCategory === RADIO_MISSING_FIELD;
      }).length;
    };

    expect(countMissingFieldCalls(loggerMock.info)).toBe(7);
    expect(countMissingFieldCalls(loggerMock.warn)).toBe(2);
    expect(countMissingFieldCalls(loggerMock.error)).toBe(2);
  });
});

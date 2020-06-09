import assocPath from 'ramda/src/assocPath';
import mergeDeepLeft from 'ramda/src/mergeDeepLeft';
import loggerMock from '#testHelpers/loggerMock';
import getInitialData from '.';
import * as fetchPageData from '../../utils/fetchPageData';
import onDemandRadioJson from '#data/pashto/bbc_pashto_radio/w3ct0lz1';
import { RADIO_MISSING_FIELD } from '#lib/logger.const';

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
    expect(pageData.imageUrl).toEqual(
      'ichef.bbci.co.uk/images/ic/$recipe/p08b23c8.png',
    );
    expect(pageData.promoBrandTitle).toEqual('ماښامنۍ خپرونه');
    expect(pageData.durationISO8601).toEqual('PT29M30S');
    expect(pageData.thumbnailImageUrl).toEqual(
      'https://ichef.bbci.co.uk/images/ic/1024x576/p08b23c8.png',
    );
  });

  it('should return episodeIsAvailable as true if current time is after when episode is availableFrom', async () => {
    const oneMinuteAgo = Date.now() - 60 * 1000;
    const responseWithEpisodeAvailableOneMinuteAgo = assocPath(
      ['content', 'blocks', '0', 'versions', '0', 'availableFrom'],
      oneMinuteAgo,
      onDemandRadioJson,
    );
    fetch.mockResponse(
      JSON.stringify(responseWithEpisodeAvailableOneMinuteAgo),
    );

    const { pageData } = await getInitialData({
      path: 'mock-on-demand-radio-path',
    });
    expect(pageData.episodeIsAvailable).toEqual(true);
  });

  it('should return episodeIsAvailable as false if current time is before when episode is availableFrom', async () => {
    const oneMinuteFromNow = Date.now() + 60 * 1000;
    const responseWithEpisodeAvailableInOneMinute = assocPath(
      ['content', 'blocks', '0', 'versions', '0', 'availableFrom'],
      oneMinuteFromNow,
      onDemandRadioJson,
    );
    fetch.mockResponse(JSON.stringify(responseWithEpisodeAvailableInOneMinute));
    const { pageData } = await getInitialData('mock-on-demand-radio-path');
    expect(pageData.episodeIsAvailable).toEqual(false);
  });

  it('should return episodeIsAvailable as false if there is no availableUntil data', async () => {
    const responseWithoutVersions = assocPath(
      ['content', 'blocks', 0, 'versions'],
      [],
      onDemandRadioJson,
    );
    fetch.mockResponse(JSON.stringify(responseWithoutVersions));
    const { pageData } = await getInitialData('mock-on-demand-radio-path');
    expect(pageData.episodeIsAvailable).toEqual(false);
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
    });

    const countMissingFieldCalls = mockedFunction =>
      mockedFunction.mock.calls.filter(
        ([logCategory]) => logCategory === RADIO_MISSING_FIELD,
      ).length;

    expect(countMissingFieldCalls(loggerMock.info)).toBe(7);
    expect(countMissingFieldCalls(loggerMock.warn)).toBe(2);
    expect(countMissingFieldCalls(loggerMock.error)).toBe(2);
  });
});

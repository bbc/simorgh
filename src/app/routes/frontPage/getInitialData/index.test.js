import fetchMock from 'fetch-mock';

// Fixture Data
import frontPageJsonSerbian from '#data/serbian/frontpage/lat.json';
import radioScheduleJson from '#data/hausa/bbc_hausa_radio/schedule.json';

import { FRONT_PAGE as pageType } from '#app/routes/utils/pageTypes';
import getInitialData from '.';

jest.mock('../../utils/getConfig', () => jest.fn());

describe('Get initial data from front page', () => {
  beforeEach(() => {
    process.env.SIMORGH_BASE_URL = 'http://localhost';
    fetchMock.restore();
  });

  it('should return data for a page without radio schedules to render', async () => {
    fetchMock.mock('begin:http://localhost/serbian/lat/', frontPageJsonSerbian);

    const { pageData } = await getInitialData({
      path: '/serbian/lat',
      service: 'serbian',
      variant: 'lat',
      pageType,
    });

    expect(pageData.metadata.language).toEqual('sr-Latn');
    expect(pageData.metadata.summary).toEqual(
      'BBC na srpskom nudi ekskluzivan sadržaj - analitičko, istraživačko i nepristrasno izveštavanje u tekstovima i video prilozima prilagođenim i društvenim mrežama.',
    );
    expect(pageData.promo.name).toEqual('Početna strana');
    expect(pageData.content.groups.length).toBeTruthy();
  });

  it('should return data to render a front page with radio schedules', async () => {
    fetchMock.mock('begin:http://localhost/serbian/lat/', frontPageJsonSerbian);
    fetchMock.mock(
      'http://localhost/serbian/bbc_serbian_radio/schedule.json',
      radioScheduleJson,
    );

    const { pageData } = await getInitialData({
      path: '/serbian/lat',
      service: 'serbian',
      variant: 'lat',
      pageType,
      toggles: {
        frontPageRadioSchedule: {
          enabled: true,
          value: 'Features',
        },
      },
    });

    expect(pageData.metadata.language).toEqual('sr-Latn');
    expect(pageData.metadata.summary).toEqual(
      'BBC na srpskom nudi ekskluzivan sadržaj - analitičko, istraživačko i nepristrasno izveštavanje u tekstovima i video prilozima prilagođenim i društvenim mrežama.',
    );
    expect(pageData.promo.name).toEqual('Početna strana');
    expect(pageData.content.groups.length).toBeTruthy();

    expect(pageData.radioScheduleData.length).toBe(4);
  });

  it('should return data for service with radio schedules, but without radio schedules on front page', async () => {
    fetchMock.mock('begin:http://localhost/serbian/lat/', frontPageJsonSerbian);
    fetchMock.mock(
      'http://localhost/serbian/bbc_serbian_radio/schedule.json',
      radioScheduleJson,
    );

    const { pageData } = await getInitialData({
      path: '/serbian/lat',
      service: 'serbian',
      variant: 'lat',
      pageType,
      toggles: {
        frontPageRadioSchedule: {
          enabled: false,
        },
      },
    });

    expect(pageData.metadata.language).toEqual('sr-Latn');
    expect(pageData.metadata.summary).toEqual(
      'BBC na srpskom nudi ekskluzivan sadržaj - analitičko, istraživačko i nepristrasno izveštavanje u tekstovima i video prilozima prilagođenim i društvenim mrežama.',
    );
    expect(pageData.promo.name).toEqual('Početna strana');
    expect(pageData.content.groups.length).toBeTruthy();

    expect(pageData.radioScheduleData).not.toBeTruthy();
  });

  it('should return page data for misconfigured service without radio schedules, but with radio schedules on front page', async () => {
    fetchMock.mock('begin:http://localhost/serbian/lat/', frontPageJsonSerbian);
    fetchMock.mock(
      'http://localhost/serbian/bbc_serbian_radio/schedule.json',
      null,
    );

    const { pageData } = await getInitialData({
      path: '/serbian/lat',
      service: 'serbian',
      variant: 'lat',
      pageType,
      toggles: {
        frontPageRadioSchedule: {
          enabled: true,
        },
      },
    });

    expect(pageData.metadata.language).toEqual('sr-Latn');
    expect(pageData.metadata.summary).toEqual(
      'BBC na srpskom nudi ekskluzivan sadržaj - analitičko, istraživačko i nepristrasno izveštavanje u tekstovima i video prilozima prilagođenim i društvenim mrežama.',
    );
    expect(pageData.promo.name).toEqual('Početna strana');
    expect(pageData.content.groups.length).toBeTruthy();

    expect(pageData.radioScheduleData).not.toBeTruthy();
  });
});

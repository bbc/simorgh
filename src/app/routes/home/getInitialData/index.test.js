import fetchMock from 'fetch-mock';
import getInitialData, { hasRadioSchedule } from '.';
import frontPageJson from '#data/hausa/frontpage/index.json';
import radioScheduleJson from '#data/hausa/bbc_hausa_radio/schedule.json';
import getConfig from '#lib/config/services/getConfig';

jest.mock('#lib/config/services/getConfig', () => jest.fn());

describe('Get initial data from front page', () => {
  beforeEach(() => {
    process.env.SIMORGH_BASE_URL = 'http://localhost';
    fetchMock.restore();
  });

  it('should return data for a page without radio schedules to render', async () => {
    getConfig.mockImplementationOnce(() => ({
      radioSchedule: {
        hasRadioSchedule: false,
        onFrontPage: false,
      },
    }));

    fetchMock.mock('http://localhost/mock-frontpage-path.json', frontPageJson);
    const { pageData } = await getInitialData({
      path: 'mock-frontpage-path',
      service: 'hausa',
    });

    expect(pageData.metadata.language).toEqual('ha');
    expect(pageData.metadata.summary).toEqual(
      'Ziyarci shafin BBC Hausa domin samun rahotannin bidiyo da hotuna kan labarun Najeriya da Nijar da ma sauran sassan duniya baki daya.',
    );
    expect(pageData.promo.name).toEqual('Labaran Duniya');
    expect(pageData.content.groups.length).toBeTruthy();
  });

  it('should return data to render a front page with radio schedules', async () => {
    getConfig.mockImplementationOnce(() => ({
      radioSchedule: {
        hasRadioSchedule: true,
        onFrontPage: true,
      },
    }));

    fetchMock.mock('http://localhost/mock-frontpage-path.json', frontPageJson);
    fetchMock.mock(
      'http://localhost/hausa/bbc_hausa_radio/schedule.json',
      radioScheduleJson,
    );
    const { pageData } = await getInitialData({
      path: 'mock-frontpage-path',
      service: 'hausa',
    });

    expect(pageData.metadata.language).toEqual('ha');
    expect(pageData.metadata.summary).toEqual(
      'Ziyarci shafin BBC Hausa domin samun rahotannin bidiyo da hotuna kan labarun Najeriya da Nijar da ma sauran sassan duniya baki daya.',
    );
    expect(pageData.promo.name).toEqual('Labaran Duniya');
    expect(pageData.content.groups.length).toBeTruthy();

    expect(pageData.radioScheduleData.length).toBe(4);
  });

  it('should return data for service with radio schedules, but without radio schedules on front page', async () => {
    getConfig.mockImplementationOnce(() => ({
      radioSchedule: {
        hasRadioSchedule: true,
        onFrontPage: false,
      },
    }));

    fetchMock.mock('http://localhost/mock-frontpage-path.json', frontPageJson);
    fetchMock.mock(
      'http://localhost/hausa/bbc_hausa_radio/schedule.json',
      radioScheduleJson,
    );
    const { pageData } = await getInitialData({
      path: 'mock-frontpage-path',
      service: 'hausa',
    });

    expect(pageData.metadata.language).toEqual('ha');
    expect(pageData.metadata.summary).toEqual(
      'Ziyarci shafin BBC Hausa domin samun rahotannin bidiyo da hotuna kan labarun Najeriya da Nijar da ma sauran sassan duniya baki daya.',
    );
    expect(pageData.promo.name).toEqual('Labaran Duniya');
    expect(pageData.content.groups.length).toBeTruthy();

    expect(pageData.radioScheduleData).not.toBeTruthy();
  });

  it('should return page data for misconfigured service without radio schedules, but with radio schedules on front page', async () => {
    getConfig.mockImplementationOnce(() => ({
      radioSchedule: {
        hasRadioSchedule: false,
        onFrontPage: true,
      },
    }));

    fetchMock.mock('http://localhost/mock-frontpage-path.json', frontPageJson);
    fetchMock.mock(
      'http://localhost/hausa/bbc_hausa_radio/schedule.json',
      radioScheduleJson,
    );
    const { pageData } = await getInitialData({
      path: 'mock-frontpage-path',
      service: 'hausa',
    });

    expect(pageData.metadata.language).toEqual('ha');
    expect(pageData.metadata.summary).toEqual(
      'Ziyarci shafin BBC Hausa domin samun rahotannin bidiyo da hotuna kan labarun Najeriya da Nijar da ma sauran sassan duniya baki daya.',
    );
    expect(pageData.promo.name).toEqual('Labaran Duniya');
    expect(pageData.content.groups.length).toBeTruthy();

    expect(pageData.radioScheduleData).not.toBeTruthy();
  });

  describe('hasRadioSchedule', () => {
    it('returns true if service and front page has radio schedule', async () => {
      getConfig.mockImplementationOnce(() => ({
        radioSchedule: {
          hasRadioSchedule: true,
          onFrontPage: true,
        },
      }));

      expect(await hasRadioSchedule('mock-service')).toBe(true);
    });

    it('returns false if service has radio schedule but front page does not', async () => {
      getConfig.mockImplementationOnce(() => ({
        radioSchedule: {
          hasRadioSchedule: true,
          onFrontPage: false,
        },
      }));

      expect(await hasRadioSchedule('mock-service')).toBe(false);
    });

    it('returns false if neither service or front page has radio schedule', async () => {
      getConfig.mockImplementationOnce(() => ({
        radioSchedule: {
          hasRadioSchedule: false,
          onFrontPage: false,
        },
      }));

      expect(await hasRadioSchedule('mock-service')).toBe(false);
    });

    it('returns false if neither service is misconfigured to not have radio schedule, but service has', async () => {
      getConfig.mockImplementationOnce(() => ({
        radioSchedule: {
          hasRadioSchedule: false,
          onFrontPage: true,
        },
      }));

      expect(await hasRadioSchedule('mock-service')).toBe(false);
    });
  });
});

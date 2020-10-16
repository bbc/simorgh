import fetchMock from 'fetch-mock';
import getInitialData from '.';
import frontPageJson from '#data/hausa/frontpage/index.json';
import radioScheduleJson from '#data/hausa/bbc_hausa_radio/schedule.json';

const pageType = 'frontPage';

describe('Get initial data from front page', () => {
  beforeEach(() => {
    process.env.SIMORGH_BASE_URL = 'http://localhost';
    fetchMock.restore();
  });

  it('should return data for a page without radio schedules to render', async () => {
    fetchMock.mock('http://localhost/mock-frontpage-path.json', frontPageJson);

    const { pageData } = await getInitialData({
      path: 'mock-frontpage-path',
      service: 'hausa',
      pageType,
    });

    expect(pageData.metadata.language).toEqual('ha');
    expect(pageData.metadata.summary).toEqual(
      'Ziyarci shafin BBC Hausa domin samun rahotannin bidiyo da hotuna kan labarun Najeriya da Nijar da ma sauran sassan duniya baki daya.',
    );
    expect(pageData.promo.name).toEqual('Labaran Duniya');
    expect(pageData.content.groups.length).toBeTruthy();
  });

  it('should return data to render a front page with radio schedules', async () => {
    fetchMock.mock('http://localhost/mock-frontpage-path.json', frontPageJson);
    fetchMock.mock(
      'http://localhost/hausa/bbc_hausa_radio/schedule.json',
      radioScheduleJson,
    );

    const { pageData } = await getInitialData({
      path: 'mock-frontpage-path',
      service: 'hausa',
      pageType,
      toggles: {
        frontPageRadioSchedule: {
          enabled: true,
          value: 'Features',
        },
      },
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
    fetchMock.mock('http://localhost/mock-frontpage-path.json', frontPageJson);
    fetchMock.mock(
      'http://localhost/hausa/bbc_hausa_radio/schedule.json',
      radioScheduleJson,
    );

    const { pageData } = await getInitialData({
      path: 'mock-frontpage-path',
      service: 'hausa',
      pageType,
      toggles: {
        frontPageRadioSchedule: {
          enabled: false,
        },
      },
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
    fetchMock.mock('http://localhost/mock-frontpage-path.json', frontPageJson);
    fetchMock.mock(
      'http://localhost/hausa/bbc_hausa_radio/schedule.json',
      null,
    );
    const { pageData } = await getInitialData({
      path: 'mock-frontpage-path',
      service: 'hausa',
      pageType,
      toggles: {
        frontPageRadioSchedule: {
          enabled: true,
        },
      },
    });

    expect(pageData.metadata.language).toEqual('ha');
    expect(pageData.metadata.summary).toEqual(
      'Ziyarci shafin BBC Hausa domin samun rahotannin bidiyo da hotuna kan labarun Najeriya da Nijar da ma sauran sassan duniya baki daya.',
    );
    expect(pageData.promo.name).toEqual('Labaran Duniya');
    expect(pageData.content.groups.length).toBeTruthy();

    expect(pageData.radioScheduleData).not.toBeTruthy();
  });
});

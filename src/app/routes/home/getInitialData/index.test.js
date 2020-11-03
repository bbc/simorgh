import fetchMock from 'fetch-mock';
import getInitialData from '.';

// Fixture Data
import frontPageJsonHausa from '#data/hausa/frontpage/index.json';
import frontPageJsonMundo from '#data/mundo/frontpage/index.json';
import radioScheduleJson from '#data/hausa/bbc_hausa_radio/schedule.json';
import usEelectionOembedMundo from '#data/mundo/election/us2020/results/oembed.json';

jest.mock('../../utils/getConfig', () => jest.fn());

const pageType = 'frontPage';

describe('Get initial data from front page', () => {
  beforeEach(() => {
    process.env.SIMORGH_BASE_URL = 'http://localhost';
    fetchMock.restore();
  });

  it('should return data for a page without radio schedules to render', async () => {
    fetchMock.mock(
      'http://localhost/mock-frontpage-path.json',
      frontPageJsonHausa,
    );

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
    fetchMock.mock(
      'http://localhost/mock-frontpage-path.json',
      frontPageJsonHausa,
    );
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
    fetchMock.mock(
      'http://localhost/mock-frontpage-path.json',
      frontPageJsonHausa,
    );
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
    fetchMock.mock(
      'http://localhost/mock-frontpage-path.json',
      frontPageJsonHausa,
    );
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

  describe('Has US Election Banner', () => {
    beforeEach(() => {
      fetchMock.restore();
    });

    it('Should fetch US Election oEmbed data', async () => {
      fetchMock.mock(
        'http://localhost/mock-frontpage-path.json',
        frontPageJsonMundo,
      );
      fetchMock.mock(
        'http://localhost/mundo/election/us2020/results/oembed.json',
        usEelectionOembedMundo,
      );

      const toggles = {
        us2020ElectionBanner: { enabled: true },
      };

      const { pageData } = await getInitialData({
        path: 'mock-frontpage-path',
        service: 'mundo',
        pageType,
        toggles,
      });

      expect(pageData.usElectionOembed).toEqual(usEelectionOembedMundo);
    });

    describe('when oEmbed response 404s', () => {
      beforeEach(() => {
        fetchMock.restore();
      });

      it('should not add oEmbed data to the pageData object', async () => {
        fetchMock.mock(
          'http://localhost/mock-frontpage-path.json',
          frontPageJsonMundo,
        );
        fetchMock.mock(
          'http://localhost/mundo/election/us2020/results/oembed.json',
          404,
        );

        const toggles = {
          us2020ElectionBanner: { enabled: true },
        };

        const { pageData } = await getInitialData({
          path: 'mock-frontpage-path',
          service: 'mundo',
          pageType,
          toggles,
        });

        expect(pageData.usElectionOembed).toBeFalsy();
      });
    });
  });
});

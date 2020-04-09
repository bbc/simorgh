import fetchMock from 'fetch-mock';
import getInitialData from '.';
import frontPageJson from '#data/pidgin/frontpage/index.json';
import radioScheduleJson from '#data/hausa/bbc_hausa_radio/schedule.json';

describe('Get initial data from front page', () => {
  beforeEach(() => {
    process.env.SIMORGH_BASE_URL = 'http://localhost';
    fetchMock.restore();
  });

  it('should return essential data for a page to render', async () => {
    fetchMock.mock('http://localhost/mock-frontpage-path.json', frontPageJson);
    const { pageData } = await getInitialData({
      path: 'mock-frontpage-path',
      service: 'pidgin',
    });

    expect(pageData.metadata.language).toEqual('pcm');
    expect(pageData.metadata.summary).toEqual(
      'We dey give una latest tori on top politics, environment, business, sports, entertainment, health, fashion and all di oda things wey dey happen for West and Central Africa come add di rest of di world join. For better informate plus explanation of all di ogbonge tori wey pipo never hear about for inside West and Central Africa, BBC Pidgin dey serve am with video, audio, maps and oda graphics join.',
    );
    expect(pageData.promo.name).toEqual('Domot');
    expect(pageData.content.groups.length).toBeTruthy();
  });

  it('should return data to render a page with radio schedules', async () => {
    fetchMock.mock('http://localhost/mock-frontpage-path.json', frontPageJson);
    fetchMock.mock(
      'http://localhost/hausa/bbc_hausa_radio/schedule.json',
      radioScheduleJson,
    );
    const { pageData } = await getInitialData({
      path: 'mock-frontpage-path',
      service: 'hausa',
    });

    expect(pageData.metadata.language).toEqual('pcm');
    expect(pageData.metadata.summary).toEqual(
      'We dey give una latest tori on top politics, environment, business, sports, entertainment, health, fashion and all di oda things wey dey happen for West and Central Africa come add di rest of di world join. For better informate plus explanation of all di ogbonge tori wey pipo never hear about for inside West and Central Africa, BBC Pidgin dey serve am with video, audio, maps and oda graphics join.',
    );
    expect(pageData.promo.name).toEqual('Domot');
    expect(pageData.content.groups.length).toBeTruthy();

    expect(pageData.radioScheduleData.length).toBeTruthy();
  });
});

// Things to test
//   - Service without radio schedules
//   - Service with radio schedules but radioScheduleOnFrontPage is false
//   -- Via mock import for config ** DYNAMIC IMPORT STUFF NOT WORKING **

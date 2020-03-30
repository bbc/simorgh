import getInitialData from '.';
import frontPageJson from '#data/pidgin/frontpage/index.json';

fetch.mockResponse(JSON.stringify(frontPageJson));

it('should return essential data for a page to render', async () => {
  const { pageData, ssrData } = await getInitialData(
    'mock-frontpage-path',
    'pidgin',
  );

  expect(pageData.metadata.language).toEqual('pcm');
  expect(pageData.metadata.summary).toEqual(
    'We dey give una latest tori on top politics, environment, business, sports, entertainment, health, fashion and all di oda things wey dey happen for West and Central Africa come add di rest of di world join. For better informate plus explanation of all di ogbonge tori wey pipo never hear about for inside West and Central Africa, BBC Pidgin dey serve am with video, audio, maps and oda graphics join.',
  );
  expect(pageData.promo.name).toEqual('Domot');
  expect(pageData.content.groups.length).toBeTruthy();

  expect(ssrData).toBeUndefined();
});

it('should return essential data for a page to render and radio schedule data if a service has radio schedules', async () => {
  const envVariables = process.env;

  process.env = {
    ...envVariables,
    SIMORGH_BASE_URL: 'http://test.com',
    SIMORGH_APP_ENV: 'test',
  };

  const { pageData, ssrData } = await getInitialData(
    'mock-frontpage-path',
    'hausa',
  );

  expect(pageData.metadata.language).toEqual('pcm');
  expect(pageData.metadata.summary).toEqual(
    'We dey give una latest tori on top politics, environment, business, sports, entertainment, health, fashion and all di oda things wey dey happen for West and Central Africa come add di rest of di world join. For better informate plus explanation of all di ogbonge tori wey pipo never hear about for inside West and Central Africa, BBC Pidgin dey serve am with video, audio, maps and oda graphics join.',
  );
  expect(pageData.promo.name).toEqual('Domot');
  expect(pageData.content.groups.length).toBeTruthy();

  expect(
    ssrData['http://test.com/hausa/bbc_hausa_radio/schedule.json'],
  ).toBeTruthy();
  process.env = envVariables;
});

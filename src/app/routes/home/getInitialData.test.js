import getInitialData from './getInitialData';
import frontPageJson from '../../../../data/pidgin/frontpage/index.json';
import fetchPageData from '../fetchPageData';

jest.mock('../fetchPageData');

fetchPageData.mockImplementation(() => ({
  status: 200,
  json: frontPageJson,
}));

it('should fetch page data, process the data and return it', async () => {
  const { json } = getInitialData('mock-frontpage-path');
  const isProcessedPageData = json !== frontPageJson;

  expect(isProcessedPageData).toBeTruthy();
});

it('should return essential data for a page to render', async () => {
  const { json } = getInitialData('mock-frontpage-path');

  expect(json.metadata.language).toEqual('pcm');
  expect(json.metadata.summary).toEqual(
    'We dey give una latest tori on top politics, environment, business, sports, entertainment, health, fashion and all di oda things wey dey happen for West and Central Africa come add di rest of di world join. For better informate plus explanation of all di ogbonge tori wey pipo never hear about for inside West and Central Africa, BBC Pidgin dey serve am with video, audio, maps and oda graphics join.',
  );
  expect(json.promo.name).toEqual('Domot');
  expect(json.content.groups.length).toBeTruthy();
});

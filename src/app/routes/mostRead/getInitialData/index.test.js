import { MOST_READ_PAGE } from '#app/routes/utils/pageTypes';
import { data as mostReadJson } from '../../../../../data/pidgin/mostRead/index.json';
import getInitialData from '.';

fetch.mockResponse(JSON.stringify(mostReadJson));

it('should return essential data for a page to render', async () => {
  const { pageData } = await getInitialData({
    path: 'mock-frontpage-path',
    service: 'pidgin',
    pageType: MOST_READ_PAGE,
  });

  expect(pageData.lastRecordTimeStamp).toEqual('2023-06-19T15:03:00Z');
  expect(pageData.metadata.type).toEqual('mostRead');
  expect(pageData.items[0].timestamp).toEqual(1687171616901);
  expect(pageData.items[0].title).toEqual(
    'Teams wey qualify for Afcon 2023 and how things stand for each group',
  );
  expect(pageData.items[0].href).toEqual(
    'https://www.bbc.com/pidgin/articles/cz5kkgv41v0o',
  );
});

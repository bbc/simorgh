import getInitialData from './getInitialData';
import articleJson from '../../../../data/pidgin/articles/cwl08rd38l6o.json';
import fetchPageData from '../fetchPageData';

jest.mock('../fetchPageData');

fetchPageData.mockImplementation(() => ({
  status: 200,
  json: articleJson,
}));

it('should fetch page data, process the data and return it', async () => {
  const { json } = getInitialData('mock-article-path');
  const isProcessedPageData = json !== articleJson;

  expect(isProcessedPageData).toBeTruthy();
});

it('should return essential data for a page to render', async () => {
  const { json } = getInitialData('mock-article-path');

  expect(json.metadata.id).toEqual('urn:bbc:ares::article:cwl08rd38l6o');
  expect(json.promo.headlines.seoHeadline).toEqual(
    'This is the SEO headline of this test article',
  );
  expect(json.metadata.passport.language).toEqual('pcm');
  expect(json.content.model.blocks.length).toBeTruthy();
});

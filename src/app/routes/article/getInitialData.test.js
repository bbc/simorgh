import getInitialData from './getInitialData';
import rawArticleData from '../../../../data/pidgin/articles/cwl08rd38l6o.json';
import fetchPageData from '../fetchPageData';

jest.mock('../fetchPageData');

fetchPageData.mockImplementation(() => ({
  pageData: rawArticleData,
}));

it('should fetch page data, process the data and return it', async () => {
  const { pageData } = await getInitialData('mock-article-path');
  const isProcessedPageData = pageData !== rawArticleData;

  expect(isProcessedPageData).toBeTruthy();
  expect(pageData).toHaveProperty('metadata');
  expect(pageData).toHaveProperty('relatedContent');
  expect(pageData).toHaveProperty('promo');
});

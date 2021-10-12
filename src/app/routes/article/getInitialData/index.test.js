import fetchMock from 'fetch-mock';
import getInitialData from '.';
import articleJson from '#data/pidgin/articles/cwl08rd38l6o.json';
import secondaryColumnJson from '#data/pidgin/secondaryColumn/index.json';
import { ARTICLE_PAGE } from '#app/routes/utils/pageTypes';

it('should return essential data for a page to render', async () => {
  fetchMock.mock(
    'http://localhost/pidgin/articles/mock-article-path.json',
    articleJson,
  );
  const { pageData } = await getInitialData({
    path: '/pidgin/articles/mock-article-path',
    service: 'pidgin',
    pageType: ARTICLE_PAGE,
  });

  expect(pageData.metadata.id).toEqual('urn:bbc:ares::article:cwl08rd38l6o');
  expect(pageData.promo.headlines.seoHeadline).toEqual(
    'This is the SEO headline of this test article',
  );
  expect(pageData.metadata.passport.language).toEqual('pcm');
  expect(pageData.content.model.blocks.length).toBeTruthy();
});

it('should include secondary column data', async () => {
  fetchMock.mock(
    'http://localhost/pidgin/sty-secondary-column.json',
    secondaryColumnJson,
  );

  const { pageData } = await getInitialData({
    path: '/pidgin/articles/mock-article-path',
    service: 'pidgin',
    pageType: ARTICLE_PAGE,
  });

  expect(pageData.secondaryColumn).toEqual(secondaryColumnJson);
});

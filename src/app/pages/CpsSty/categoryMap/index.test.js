import categoryMap from './index';

test('should return the correct mapping when category recognised', () => {
  expect(categoryMap('Analysis')).toEqual('AnalysisNewsArticle');
});

test('should return NewsArticle when category is null', () => {
  expect(categoryMap()).toEqual('NewsArticle');
});

test('should return NewsArticle when category is not recognised', () => {
  expect(categoryMap('Random Category')).toEqual('NewsArticle');
});

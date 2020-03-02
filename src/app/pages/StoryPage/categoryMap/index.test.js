import categoryMap from './index';

test('should return the correct mapping when the category is recognised', () => {
  expect(categoryMap('Analysis')).toEqual('AnalysisNewsArticle');
});

test('should return NewsArticle when the category is null', () => {
  expect(categoryMap()).toEqual('NewsArticle');
});

test('should return NewsArticle when the category is not recognised', () => {
  expect(categoryMap('Random Category')).toEqual('NewsArticle');
});

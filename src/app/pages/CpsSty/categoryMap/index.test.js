import categoryMap from './index';

test('should assign the correct value', () => {
  expect(categoryMap('Analysis')).toEqual('AnalysisNewsArticle');
});

test('should assign NewsArticle when category is null', () => {
  expect(categoryMap('')).toEqual('NewsArticle');
});

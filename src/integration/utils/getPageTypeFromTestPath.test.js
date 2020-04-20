import getPageTypeFromTestPath from './getPageTypeFromTestPath';

it('should get the page type from integration test paths for amp', () => {
  const actual = getPageTypeFromTestPath(
    'src/integration/pages/articles/pidgin/amp.test.js',
  );
  const expected = 'articles';

  expect(actual).toEqual(expected);
});

it('should get the page type from integration test paths for canonical', () => {
  const actual = getPageTypeFromTestPath(
    'src/integration/pages/liveRadio/pidgin/canonical.test.js',
  );
  const expected = 'liveRadio';

  expect(actual).toEqual(expected);
});

it('should get the page type from full service integration test paths for amp', () => {
  const actual = getPageTypeFromTestPath(
    'src/integration/__full_service_regression_tests__/__GENERATED_TEST_FILES__/afaanoromoo/frontPage/canonical.test.js',
  );
  const expected = 'frontPage';

  expect(actual).toEqual(expected);
});

it('should get the page type from full service integration test paths for canonical', () => {
  const actual = getPageTypeFromTestPath(
    'src/integration/__full_service_regression_tests__/__GENERATED_TEST_FILES__/afaanoromoo/storyPage/canonical.test.js',
  );
  const expected = 'storyPage';

  expect(actual).toEqual(expected);
});

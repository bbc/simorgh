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

it('should get the page type from integration test paths for lite', () => {
  const actual = getPageTypeFromTestPath(
    'src/integration/pages/articles/pidgin/canonical.test.js',
  );
  const expected = 'articles';

  expect(actual).toEqual(expected);
});

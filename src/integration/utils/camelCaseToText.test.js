import camelCaseToText from './camelCaseToText';

it('should convert camel case to text with spaces between words', () => {
  const actual = camelCaseToText('someCamelCaseExample');
  const expected = 'Some Camel Case Example';

  expect(actual).toEqual(expected);
});

it('should return an empty string if given an empty string', () => {
  const actual = camelCaseToText('');
  const expected = '';

  expect(actual).toEqual(expected);
});

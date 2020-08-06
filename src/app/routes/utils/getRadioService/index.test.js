import getRadioService from '.';

it('should return "indonesian" for the indonesia service', () => {
  const actual = getRadioService('indonesia');
  const expected = 'indonesian';

  expect(actual).toEqual(expected);
});

it('should return "dari" for the persian service', () => {
  const actual = getRadioService('persian');
  const expected = 'dari';

  expect(actual).toEqual(expected);
});

it('should return "oromo" for the afaanoromoo service', () => {
  const actual = getRadioService('afaanoromoo');
  const expected = 'oromo';

  expect(actual).toEqual(expected);
});

it('should return "bangla" for the bengali service', () => {
  const actual = getRadioService('bengali');
  const expected = 'bangla';

  expect(actual).toEqual(expected);
});

it('should return undefined when a service is not included', () => {
  const actual = getRadioService('pidgin');

  expect(actual).toBeUndefined();
});

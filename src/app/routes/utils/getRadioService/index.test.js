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

it('should return service passed in when there is no mapping', () => {
  const actual = getRadioService('pidgin');

  expect(actual).toEqual('pidgin');
});

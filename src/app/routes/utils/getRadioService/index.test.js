import getRadioService from '.';

it('should return "indonesian" for the indonesia service', () => {
  const actual = getRadioService({
    service: 'indonesia',
    pathname: 'bbc_indonesian_radio',
  });
  const expected = 'indonesian';

  expect(actual).toEqual(expected);
});

it('should return "dari" for the persian service', () => {
  const actual = getRadioService({
    service: 'persian',
    pathname: 'bbc_dari_radio',
  });
  const expected = 'dari';

  expect(actual).toEqual(expected);
});

it('should return "persian" for the persian service when pathname includes bbc_persian_radio', () => {
  const actual = getRadioService({
    service: 'persian',
    pathname: 'bbc_persian_radio',
  });
  const expected = 'persian';

  expect(actual).toEqual(expected);
});

it('should return "oromo" for the afaanoromoo service', () => {
  const actual = getRadioService({
    service: 'afaanoromoo',
    pathname: 'bbc_afaanoromoo_radio',
  });
  const expected = 'oromo';

  expect(actual).toEqual(expected);
});

it('should return "bangla" for the bengali service', () => {
  const actual = getRadioService({
    service: 'bengali',
    pathname: 'bbc_bangla_radio',
  });
  const expected = 'bangla';

  expect(actual).toEqual(expected);
});

it('should return service passed in when there is no mapping', () => {
  const actual = getRadioService({
    service: 'pidgin',
    pathname: 'mock-pathname',
  });

  expect(actual).toEqual('pidgin');
});

it('should return persian for podcast when there is no bbc_persian_radio masterbrand', () => {
  const actual = getRadioService({
    service: 'persian',
    pathname: '/persian/podcasts/example',
  });

  expect(actual).toEqual('persian');
});

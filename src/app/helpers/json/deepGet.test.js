import deepGet from './deepGet';

const fixtureData = {
  foo: 123,
  bar: {
    baz: 456,
  },
};

describe('deepGet', () => {
  it('should retrieve items one level deep', () => {
    expect(deepGet(['foo'], fixtureData)).toEqual(123);
  });

  it('should retrieve items two levels deep', () => {
    expect(deepGet(['bar', 'baz'], fixtureData)).toEqual(456);
  });

  it('should return null for missing properties', () => {
    expect(deepGet(['badKeyName'], fixtureData)).toEqual(null);
    expect(deepGet(['badKeyName', 'baz'], fixtureData)).toEqual(null);
    expect(deepGet(['bar', 'baz', 'madeUpName'], fixtureData)).toEqual(null);
  });
});

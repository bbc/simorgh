import deepGet from '.';

const fixtureData = {
  foo: 123,
  bar: {
    baz: 456,
  },
  nothing: {
    nada: false,
    thingsJonSnowKnows: 0,
    foobar: {
      barfoo: {
        zilch: '',
      },
    },
  },
};

const fixtureDataWithArrays = {
  meh: 123,
  blah: [{ owen: 456 }, { wilson: 'WOW' }],
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
    expect(deepGet(['blah', '45', 'owen'], fixtureDataWithArrays)).toEqual(
      null,
    );
  });

  it('should handle object and array access via the path passed', () => {
    expect(deepGet(['blah', '0', 'owen'], fixtureDataWithArrays)).toEqual(456);
    expect(deepGet(['blah', '1', 'wilson'], fixtureDataWithArrays)).toEqual(
      'WOW',
    );
  });

  it('should gracefully return null if passed a non-object as the object param', () => {
    expect(deepGet(['foo', 'bar'], undefined)).toEqual(null);
    expect(deepGet(['foo', 'bar'], 'string')).toEqual(null);
    expect(deepGet(['foo', 'bar'], 23)).toEqual(null);
  });

  it('should not clobber falsy, defined, non-null values', () => {
    expect(deepGet(['nothing', 'nada'], fixtureData)).toEqual(false);
    expect(deepGet(['nothing', 'thingsJonSnowKnows'], fixtureData)).toEqual(0);
    expect(
      deepGet(['nothing', 'foobar', 'barfoo', 'zilch'], fixtureData),
    ).toEqual('');
  });
});

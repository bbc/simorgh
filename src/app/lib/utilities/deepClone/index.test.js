import deepClone from '.';

const fixtureData = {
  foo: 123,
  bar: {
    baz: 456,
  },
};

describe('deepClone', () => {
  it('should return an identical object', () => {
    expect(deepClone(fixtureData).bar.baz).toEqual(456);
  });

  it('should respect nulls', () => {
    expect(deepClone({ nullProperty: null }).nullProperty).toBe(null);
  });

  it('should return a NEW object', () => {
    const newObj = deepClone(fixtureData);
    newObj.foo = 'overridden value';
    expect(fixtureData.foo).toEqual(123);
  });
});

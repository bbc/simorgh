import isToggleEnabled from './toggleUtils';

const fixtureData = {
  foo: {
    enabled: true,
  },
  bar: {
    enabled: false,
  },
};

describe('isToggleEnabled', () => {
  describe('should return the value for a valid toggle name', () => {
    test('toggle `foo` should return a value of true', () => {
      expect(isToggleEnabled('foo', fixtureData)).toEqual({ enabled: true });
    });

    test('toggle `bar` should return a value of false', () => {
      expect(isToggleEnabled('bar', fixtureData)).toEqual({ enabled: false });
    });
  });

  describe('should return a default of false if the toggle does not exist', () => {
    test('toggle `fooBar` should return false', () => {
      expect(isToggleEnabled('fooBar', fixtureData)).toEqual(false);
    });
  });
});

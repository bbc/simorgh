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
  it('should return the value for a valid toggle name', () => {
    describe('toggle `foo` should return a value of true', () => {
      expect(isToggleEnabled('foo', fixtureData)).toEqual({ enabled: true });
    });

    describe('toggle `bar` should return a value of false', () => {
      expect(isToggleEnabled('bar', fixtureData)).toEqual({ enabled: false });
    });
  });

  describe('should return a default of false if the toggle does not exist', () => {
    it('toggle `fooBar` should return false', () => {
      expect(isToggleEnabled('fooBar', fixtureData)).toEqual(false);
    });
  });
});

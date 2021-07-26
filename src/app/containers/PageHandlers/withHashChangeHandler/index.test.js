import isHashChange from './isHashChange';

describe('isHashChange', () => {
  describe('prevent a rerender', () => {
    it('should return true if only the location.hash prop changes', () => {
      const prevProps = {
        foo: 'bar',
        location: {
          bar: 'foo',
          hash: '#section-1',
        },
      };
      const nextProps = {
        foo: 'bar',
        location: {
          bar: 'foo',
          hash: '#section-2',
        },
      };
      const actual = isHashChange(prevProps, nextProps);
      const expected = true;

      expect(actual).toEqual(expected);
    });
  });

  describe('allow a rerender', () => {
    it('should return false if any props other than location.hash changes', () => {
      const prevProps = {
        foo: 'bar',
        location: {
          bar: 'foo',
          hash: '#section-1',
        },
      };
      const nextProps = {
        foo: 'baz',
        location: {
          bar: 'foo',
          hash: '#section-2',
        },
      };
      const actual = isHashChange(prevProps, nextProps);
      const expected = false;

      expect(actual).toEqual(expected);
    });
  });
});

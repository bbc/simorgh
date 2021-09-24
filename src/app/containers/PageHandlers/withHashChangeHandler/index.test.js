import isHashChange from './isHashChange';

describe('isHashChange', () => {
  describe('prevent a rerender', () => {
    it('should return true if the location.hash prop changes, preventing a re-render', () => {
      const prevProps = {
        location: {
          hash: '#section-1',
        },
      };
      const nextProps = {
        location: {
          hash: '#section-2',
        },
      };
      const actual = isHashChange(prevProps, nextProps);
      const expected = true;

      expect(actual).toEqual(expected);
    });
  });

  describe('allow a rerender', () => {
    it('should return false if the location.hash does not change, allowing a re-render', () => {
      const prevProps = {
        location: {
          hash: '#section-2',
        },
      };
      const nextProps = {
        location: {
          hash: '#section-2',
        },
      };
      const actual = isHashChange(prevProps, nextProps);
      const expected = false;

      expect(actual).toEqual(expected);
    });
  });
});

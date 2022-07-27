import isHashChangeOnSamePath from './isHashChangeOnSamePath';

describe('isHashChange', () => {
  describe('prevent a rerender', () => {
    it('should return true if the only location.hash prop changes, preventing a re-render', () => {
      const prevProps = {
        location: {
          hash: '#section-1',
          pathname: '/path/one',
        },
      };
      const nextProps = {
        location: {
          hash: '#section-2',
          pathname: '/path/one',
        },
      };
      const actual = isHashChangeOnSamePath(prevProps, nextProps);
      const expected = true;

      expect(actual).toEqual(expected);
    });
  });

  describe('allow a rerender', () => {
    it('should return false if the location.hash does not change, allowing a re-render', () => {
      const prevProps = {
        location: {
          hash: '#section-2',
          pathname: '/path/one',
        },
      };
      const nextProps = {
        location: {
          hash: '#section-2',
          pathname: '/path/one',
        },
      };
      const actual = isHashChangeOnSamePath(prevProps, nextProps);
      const expected = false;

      expect(actual).toEqual(expected);
    });
  });

  describe('allow a rerender', () => {
    it('should return false if the location.pathname changes, allowing a re-render', () => {
      const prevProps = {
        location: {
          hash: '#section-1',
          pathname: '/path/one',
        },
      };
      const nextProps = {
        location: {
          hash: '#section-1',
          pathname: '/path/two',
        },
      };
      const actual = isHashChangeOnSamePath(prevProps, nextProps);
      const expected = false;

      expect(actual).toEqual(expected);
    });
  });

  describe('allow a rerender', () => {
    it('should return false if the location.hash and location.pathname change, allowing a re-render', () => {
      const prevProps = {
        location: {
          hash: '#section-1',
          pathname: '/path/one',
        },
      };
      const nextProps = {
        location: {
          hash: '',
          pathname: '/path/two',
        },
      };
      const actual = isHashChangeOnSamePath(prevProps, nextProps);
      const expected = false;

      expect(actual).toEqual(expected);
    });
  });
});

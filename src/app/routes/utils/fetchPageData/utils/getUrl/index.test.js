import getUrl from '.';

describe('getUrl', () => {
  it('should return empty string when pathname empty', () => {
    expect(getUrl('')).toEqual('');
  });

  it('should return empty string when pathname null', () => {
    expect(getUrl(null)).toEqual('');
  });

  it('should return empty string when pathname undefined', () => {
    expect(getUrl(undefined)).toEqual('');
  });

  it('should return url', () => {
    expect(getUrl('/test/article')).toEqual(
      'http://localhost/test/article.json',
    );
  });

  it('should remove .amp from url', () => {
    expect(getUrl('/test/article.amp')).toEqual(
      'http://localhost/test/article.json',
    );
  });

  it('should return correct url when path ends in amp', () => {
    expect(getUrl('/test/article_ending_in_amp')).toEqual(
      'http://localhost/test/article_ending_in_amp.json',
    );
  });

  it('should return correct url when path ends in *amp.amp', () => {
    expect(getUrl('/test/article_ending_in_camp.amp')).toEqual(
      'http://localhost/test/article_ending_in_camp.json',
    );
  });

  describe('where application environment', () => {
    describe('is not live', () => {
      beforeEach(() => {
        process.env.SIMORGH_APP_ENV = 'not-live';
      });

      it('should append single query string parameter', () => {
        expect(getUrl('/test/article?param=test')).toEqual(
          'http://localhost/test/article.json?param=test',
        );
      });

      it('should append multiple query string parameters', () => {
        expect(getUrl('/test/article?first=1&second=2')).toEqual(
          'http://localhost/test/article.json?first=1&second=2',
        );
      });

      it('should remove .amp from url with params', () => {});
      expect(getUrl('/test/article.amp?param=test')).toEqual(
        'http://localhost/test/article.json?param=test',
      );
    });

    describe('is live', () => {
      beforeEach(() => {
        process.env.SIMORGH_APP_ENV = 'live';
      });

      it('should remove single query string parameter from url', () => {
        expect(getUrl('/test/article?param=test')).toEqual(
          'http://localhost/test/article.json',
        );
      });

      it('should remove multiple query string parameter from url', () => {
        expect(getUrl('/test/article?first=1&second=2')).toEqual(
          'http://localhost/test/article.json',
        );
      });

      it('should remove .amp and single query string parameter from url', () => {
        expect(getUrl('/test/article.amp?param=test')).toEqual(
          'http://localhost/test/article.json',
        );
      });

      it('should remove .amp and multiple query string parameters from url', () => {
        expect(getUrl('/test/article.amp?first=1&second=2')).toEqual(
          'http://localhost/test/article.json',
        );
      });
    });

    afterAll(() => {
      delete process.env.SIMORGH_APP_ENV;
    });
  });
});

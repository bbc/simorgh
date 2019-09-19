import { buildATIUrl, buildATIClickParams } from '.';

jest.mock('./article/buildParams', () => ({
  buildArticleATIUrl: jest.fn(),
  buildArticleATIParams: jest.fn(),
}));
const { buildArticleATIUrl, buildArticleATIParams } = jest.requireMock(
  './article/buildParams',
);

jest.mock('./media/buildParams', () => ({
  buildMediaATIUrl: jest.fn(),
  buildMediaATIParams: jest.fn(),
}));
const { buildMediaATIUrl, buildMediaATIParams } = jest.requireMock(
  './media/buildParams',
);

jest.mock('./frontpage/buildParams', () => ({
  buildFrontPageATIUrl: jest.fn(),
  buildFrontPageATIParams: jest.fn(),
}));
const { buildFrontPageATIUrl, buildFrontPageATIParams } = jest.requireMock(
  './frontpage/buildParams',
);

describe('ATIAnalytics params', () => {
  describe('buildATIUrl', () => {
    it('should call buildArticleATIUrl function', () => {
      buildATIUrl({}, { pageType: 'article' }, {});
      expect(buildArticleATIUrl).toHaveBeenCalledTimes(1);
      expect(buildArticleATIUrl).toHaveBeenCalledWith(
        {},
        { pageType: 'article' },
        {},
      );
    });

    it('should call buildFrontPageATIUrl function', () => {
      buildATIUrl({}, { pageType: 'frontPage' }, {});
      expect(buildFrontPageATIUrl).toHaveBeenCalledTimes(1);
      expect(buildFrontPageATIUrl).toHaveBeenCalledWith(
        {},
        { pageType: 'frontPage' },
        {},
      );
    });

    it('should call buildMediaATIUrl function', () => {
      buildATIUrl({}, { pageType: 'media' }, {});
      expect(buildMediaATIUrl).toHaveBeenCalledTimes(1);
      expect(buildMediaATIUrl).toHaveBeenCalledWith(
        {},
        { pageType: 'media' },
        {},
      );
    });
  });

  describe('buildATIClickParams', () => {
    it('should call buildArticleATIParams function', () => {
      buildATIClickParams({}, { pageType: 'article' }, {});
      expect(buildArticleATIParams).toHaveBeenCalledTimes(1);
    });

    it('should call buildFrontPageATIParams function', () => {
      buildATIClickParams({}, { pageType: 'frontPage' }, {});
      expect(buildFrontPageATIParams).toHaveBeenCalledTimes(1);
    });

    it('should call buildMediaATIParams function', () => {
      buildATIClickParams({}, { pageType: 'media' }, {});
      expect(buildMediaATIParams).toHaveBeenCalledTimes(1);
    });
  });
});

import litePageTransform from '.';

describe('litePageTransform', () => {
  it('should return the correct object', () => {
    const html = '<html><head></head><body><style></style></body></html>';
    const helmetMetaTags = [];
    const helmetScriptTags = [];
    const helmetLinkTags = [];
    const result = litePageTransform({
      html,
      helmetMetaTags,
      helmetScriptTags,
      helmetLinkTags,
    });
    expect(result).toEqual({
      liteHtml: '<html><head></head><body></body></html>',
      liteHelmetLinkTags: [],
      liteHelmetMetaTags: [],
      liteHelmetScriptTags: [],
    });
  });
});

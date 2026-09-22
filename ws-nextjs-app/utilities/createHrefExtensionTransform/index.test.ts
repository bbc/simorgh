import createHrefExtensionTransform from '.';

describe('createHrefExtensionTransform', () => {
  it('should append the given extension to eligible hrefs by default', () => {
    const transform = createHrefExtensionTransform({
      extension: 'lite',
    });

    const html = '<a href="/news">News</a>';

    expect(transform(html)).toEqual('<a href="/news.lite">News</a>');
  });

  it('should only append the extension when isEligiblePath returns true', () => {
    const transform = createHrefExtensionTransform({
      extension: 'app',
      isEligiblePath: pathname => pathname.includes('/articles/'),
    });

    const html = `
      <a href="/pidgin/articles/c0000000000o">Article</a>
      <a href="/pidgin/live/c0000000000o">Live</a>
    `;

    expect(transform(html)).toEqual(`
      <a href="/pidgin/articles/c0000000000o.app">Article</a>
      <a href="/pidgin/live/c0000000000o">Live</a>
    `);
  });

  it('should not append the extension when the derived ignore attribute is present', () => {
    const transform = createHrefExtensionTransform({
      extension: 'lite',
    });

    const html = '<a href="/news" data-ignore-lite="true">News</a>';

    expect(transform(html)).toEqual(html);
  });
});

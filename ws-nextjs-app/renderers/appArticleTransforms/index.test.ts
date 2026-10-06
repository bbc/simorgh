import appArticleTransforms from '.';

describe('appArticleTransforms', () => {
  describe('anchor tags', () => {
    it('should append .app suffix to article hrefs', () => {
      const html = `
        <a href="https://www.bbc.com/pidgin/articles/c0000000000o">Article</a>
        <a href="https://www.bbc.com/serbian/lat/articles/c0000000000o">Article</a>
        <a href="https://www.bbc.com/mundo/articles/c0000000000o?something=value&another=one#content">Article</a>
        <a href="https://www.bbcrussian.com/pidgin/institutional-1234567">Article</a>
        <a href="/pidgin/articles/c0000000000o">Article</a>
        <a href="/pidgin/articles/c0000000000o?something=value&another=one#content">Article</a>
      `;

      const modifiedHtml = appArticleTransforms(html);

      expect(modifiedHtml).toEqual(`
        <a href="https://www.bbc.com/pidgin/articles/c0000000000o.app">Article</a>
        <a href="https://www.bbc.com/serbian/lat/articles/c0000000000o.app">Article</a>
        <a href="https://www.bbc.com/mundo/articles/c0000000000o.app?something=value&another=one#content">Article</a>
        <a href="https://www.bbcrussian.com/pidgin/institutional-1234567.app">Article</a>
        <a href="/pidgin/articles/c0000000000o.app">Article</a>
        <a href="/pidgin/articles/c0000000000o.app?something=value&another=one#content">Article</a>
      `);
    });

    it('should not append .app suffix to non-article page types', () => {
      const originalHtml = `
        <a href="https://www.bbc.com/pidgin">Home</a>
        <a href="https://www.bbc.com/pidgin/live/cew7pxl4p4xt">Live</a>
        <a href="https://www.bbc.com/pidgin/popular/read">Most Read</a>
      `;

      const modifiedHtml = appArticleTransforms(originalHtml);

      expect(modifiedHtml).toEqual(originalHtml);
    });

    it('should not append .app suffix to invalid hrefs', () => {
      const originalHtml = `
        <a href="https://www.bbc.co.uk/pidgin/articles/c0000000000o">Article</a>
        <a href="https://www.bbc.com/pidgin/articles/c0000000000o.app">Article</a>
        <a href="https://www.bbc.com/pidgin/articles/c0000000000o.amp">Article</a>
        <a href="#article">Article</a>
        <a href="mailto:test@gmail.com">Article</a>
      `;

      const modifiedHtml = appArticleTransforms(originalHtml);

      expect(modifiedHtml).toEqual(originalHtml);
    });

    it('should not append .app suffix to an invalid service', () => {
      const originalHtml = `
        <a href="https://www.bbc.com/food/articles/c0000000000o">Food</a>
        <a href="https://www.bbc.com/weather/articles/c0000000000o">Weather</a>
      `;

      const modifiedHtml = appArticleTransforms(originalHtml);

      expect(modifiedHtml).toEqual(originalHtml);
    });

    it('should not append .app suffix when the attribute "data-ignore-app" is present', () => {
      const originalHtml = `
        <a href="https://www.bbc.com/pidgin/articles/c0000000000o" data-ignore-app="true">Article</a>
        <a href="/pidgin/articles/c0000000000o" data-ignore-app="true">Article</a>
      `;

      const modifiedHtml = appArticleTransforms(originalHtml);

      expect(modifiedHtml).toEqual(originalHtml);
    });

    it('should not append .app suffix when no anchor tags are present', () => {
      const originalHtml = '<p>I am a paragraph</p>';

      const modifiedHtml = appArticleTransforms(originalHtml);

      expect(modifiedHtml).toEqual(originalHtml);
    });

    it('should not append .app suffix when href is not present or is empty', () => {
      const originalHtml = `
        <a>Article</a>
        <a href="">Article</a>
      `;

      const modifiedHtml = appArticleTransforms(originalHtml);

      expect(modifiedHtml).toEqual(originalHtml);
    });

    it('should not append .app suffix when href is restricted on soft launch', () => {
      const originalHtml = `
        <a href="https://www.bbc.com/ws/languages">Other Languages</a>
        <a href="https://www.bbc.com/ws/languages?xtor=CS1-13-[wsgahuza~N~A39~MBC]-[Owned]&utm_source=mktg">Other Languages</a>
      `;

      const modifiedHtml = appArticleTransforms(originalHtml);

      expect(modifiedHtml).toEqual(originalHtml);
    });
  });
});

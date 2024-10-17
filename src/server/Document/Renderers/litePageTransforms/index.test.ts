import litePageTransforms from '.';

describe('litePageTransforms', () => {
  describe('anchor tags', () => {
    it('should append .lite suffix to valid hrefs', () => {
      const html = `
        <a href="https://www.bbc.com/news">News</a>
        <a href="https://www.bbc.com/serbian/lat">News</a>
        <a href="https://www.bbc.com/mundo">News</a>
        <a href="https://www.bbcrussian.com/news">News</a>
        <a href="/news">News</a>
      `;

      const modifiedHtml = litePageTransforms(html);

      expect(modifiedHtml).toEqual(`
        <a href="https://www.bbc.com/news.lite">News</a>
        <a href="https://www.bbc.com/serbian/lat.lite">News</a>
        <a href="https://www.bbc.com/mundo.lite">News</a>
        <a href="https://www.bbcrussian.com/news.lite">News</a>
        <a href="/news.lite">News</a>
      `);
    });

    it('should not append .lite suffix to invalid hrefs', () => {
      const html = `
        <a href="https://www.bbc.co.uk/news">News</a>
        <a href="https://www.bbc.com/news.lite">News</a>
        <a href="https://www.bbc.com/news.amp">News</a>
        <a href="#news">News</a>
        <a href="mailto:test@gmail.com">News</a>
      `;

      const modifiedHtml = litePageTransforms(html);

      expect(modifiedHtml).toEqual(html);
    });

    it('should not append .lite suffix to an invalid "service"', () => {
      const html = `
        <a href="https://www.bbc.co.uk/future">Future</a>
        <a href="https://www.bbc.com/food">Food</a>
        <a href="https://www.bbc.com/weather">Weather</a>
      `;

      const modifiedHtml = litePageTransforms(html);

      expect(modifiedHtml).toEqual(html);
    });

    it('should not append .lite suffix when no anchor tags are present', () => {
      const html = '<p>I am a paragraph</p>';

      const modifiedHtml = litePageTransforms(html);

      expect(modifiedHtml).toEqual(html);
    });
  });
});

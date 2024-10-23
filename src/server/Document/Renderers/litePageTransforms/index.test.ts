import litePageTransforms from '.';

describe('litePageTransforms', () => {
  describe('anchor tags', () => {
    it('should append .lite suffix to valid hrefs', () => {
      const html = `
        <a href="https://www.bbc.com/news">News</a>
        <a href="https://www.bbc.com/serbian/lat">News</a>
        <a href="https://www.bbc.com/mundo">News</a>
        <a href="https://www.bbcrussian.com/news">News</a>
        <a href="https://www.bbc.com/mundo?something=value&another=one#content">News</a>
        <a href="/news">News</a>
        <a href="/news?something=value&another=one#content">News</a>
      `;

      const modifiedHtml = litePageTransforms(html);

      expect(modifiedHtml).toEqual(`
        <a href="https://www.bbc.com/news.lite">News</a>
        <a href="https://www.bbc.com/serbian/lat.lite">News</a>
        <a href="https://www.bbc.com/mundo.lite">News</a>
        <a href="https://www.bbcrussian.com/news.lite">News</a>
        <a href="https://www.bbc.com/mundo.lite?something=value&another=one#content">News</a>
        <a href="/news.lite">News</a>
        <a href="/news.lite?something=value&another=one#content">News</a>
      `);
    });

    it('should not append .lite suffix to invalid hrefs', () => {
      const originalHtml = `
        <a href="https://www.bbc.co.uk/news">News</a>
        <a href="https://www.bbc.com/news.lite">News</a>
        <a href="https://www.bbc.com/news.amp">News</a>
        <a href="#news">News</a>
        <a href="mailto:test@gmail.com">News</a>
      `;

      const modifiedHtml = litePageTransforms(originalHtml);

      expect(modifiedHtml).toEqual(originalHtml);
    });

    it('should not append .lite suffix to an invalid "service"', () => {
      const originalHtml = `
        <a href="https://www.bbc.co.uk/future">Future</a>
        <a href="https://www.bbc.com/food">Food</a>
        <a href="https://www.bbc.com/weather">Weather</a>
      `;

      const modifiedHtml = litePageTransforms(originalHtml);

      expect(modifiedHtml).toEqual(originalHtml);
    });

    it('should not append .lite suffix when the attribute "data-ignore-lite" is present', () => {
      const originalHtml = `
        <a href="https://www.bbc.com/news" data-ignore-lite="true">News</a>
        <a href="https://www.bbc.com/serbian/lat" data-ignore-lite="true">News</a>
        <a href="https://www.bbc.com/mundo" data-ignore-lite="true">News</a>
        <a href="https://www.bbcrussian.com/news" data-ignore-lite="true">News</a>
        <a href="/news" data-ignore-lite="true">News</a>
      `;

      const modifiedHtml = litePageTransforms(originalHtml);

      expect(modifiedHtml).toEqual(originalHtml);
    });

    it('should not append .lite suffix when no anchor tags are present', () => {
      const originalHtml = '<p>I am a paragraph</p>';

      const modifiedHtml = litePageTransforms(originalHtml);

      expect(modifiedHtml).toEqual(originalHtml);
    });

    it('should not append .lite suffix when href is not present or is empty', () => {
      const originalHtml = `
        <a>News</a>
        <a href="">News</a>
      `;

      const modifiedHtml = litePageTransforms(originalHtml);

      expect(modifiedHtml).toEqual(originalHtml);
    });
  });
});

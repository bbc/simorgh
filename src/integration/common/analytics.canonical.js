/* eslint-disable no-restricted-syntax */
export default () => {
  describe('Analytics', () => {
    const noscriptImage = document.querySelector('noscript#analytics-noscript');

    const src = noscriptImage.innerHTML.match(/src="([^"]+)"/)?.[1];
    const srcUrl = new URL(src.replaceAll('&amp;', '&'));

    describe('ATI', () => {
      describe('tracking pixel', () => {
        it('exists', () => {
          expect(noscriptImage).toBeInTheDocument();
        });

        it('excluding src', () => {
          const img = noscriptImage.innerHTML.replaceAll(`src="${src}"`, '');
          expect(img).toMatchSnapshot();
        });

        it('hostname', () => {
          expect(`${srcUrl.origin}${srcUrl.pathname}`).toMatchSnapshot();
        });

        it('search params', () => {
          const searchParams = [];
          for (const [key, value] of srcUrl.searchParams.entries()) {
            searchParams.push({ [key]: value });
          }

          expect(searchParams).toMatchSnapshot();
        });
      });
    });
  });
};

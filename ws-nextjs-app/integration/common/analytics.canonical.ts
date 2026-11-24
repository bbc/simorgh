/* eslint-disable no-restricted-syntax */
export default () => {
  describe('Analytics', () => {
    const noscriptImage = document.querySelector('noscript#analytics-noscript');

    describe('ATI', () => {
      describe('tracking pixel', () => {
        it('exists', () => {
          expect(noscriptImage).toBeInTheDocument();
        });

        it('has a valid src', () => {
          expect(noscriptImage).toBeInTheDocument();
          const src = noscriptImage?.innerHTML.match(/src="([^"]+)"/)?.[1];
          expect(src).toBeTruthy();
        });

        if (!noscriptImage) return;
        const src = noscriptImage.innerHTML.match(/src="([^"]+)"/)?.[1];
        if (!src) return;
        const srcUrl = new URL(src.replaceAll('&amp;', '&'));

        it('excluding src', () => {
          const img = noscriptImage.innerHTML.replaceAll(`src="${src}"`, '');
          expect(img).toMatchSnapshot();
        });

        it('hostname', () => {
          expect(`${srcUrl.origin}${srcUrl.pathname}`).toMatchSnapshot();
        });

        it('search params', () => {
          const searchParams: Record<string, string>[] = Array.from(
            srcUrl.searchParams.entries(),
            ([key, value]) => ({ [key]: value }),
          );
          expect(searchParams).toMatchSnapshot();
        });
      });
    });
  });
};

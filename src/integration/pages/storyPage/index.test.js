/**
 * @service mundo
 * @pathname /mundo/noticias-internacional-51266689
 */

import runA11yTests from '../../common/a11y';
import runHeaderTests from '../../common/header';
import runFootertests from '../../common/footer';
import runSEOtests from '../../common/SEO';
import runPerformanceTests from '../../common/performance';

runA11yTests();
runHeaderTests();
runFootertests();
runSEOtests();
runPerformanceTests();

it('Headline', () => {
  const h1El = document.querySelector('h1[id="content"]');

  expect(h1El).toBeInTheDocument();
  expect(h1El).toBeTruthy();
  expect(h1El.textContent).toMatchInlineSnapshot(
    `"Brexit: qué cambiará para visitar, trabajar y estudiar en Reino Unido tras la salida del país de la Unión Europea"`,
  );
});

it('Timestamp', () => {
  const timestampEl = document.querySelector('time');

  expect(timestampEl).toBeInTheDocument();
  expect(timestampEl.textContent).toBeTruthy();
  expect(timestampEl.textContent).toMatchInlineSnapshot(`"30 enero 2020"`);
});

it('Image with caption', () => {
  const imageEl = document.querySelector(
    'main figure img, main figure amp-img',
  );
  const imageCaptionEl = document.querySelector('main figure figcaption');

  if (imageEl && imageCaptionEl) {
    expect(imageEl).toBeInTheDocument();
    expect(imageEl).toBeTruthy();
    expect(imageEl.getAttribute('src')).toMatchInlineSnapshot(
      `"https://ichef.bbci.co.uk/news/640/cpsprodpb/17D42/production/_110620679_gettyimages-542984918.jpg"`,
    );

    expect(imageCaptionEl).toBeInTheDocument();
    expect(imageCaptionEl.textContent).toBeTruthy();
    expect(imageCaptionEl.textContent).toMatchInlineSnapshot(
      `"Pie de foto, Llegó el día de la salida de Reino Unido de la UE."`,
    );
  }
});

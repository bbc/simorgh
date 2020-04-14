/**
 * @service korean
 * @pathname /korean/bbc_korean_radio/liveradio
 */

import runA11yTests from '../../../common/a11y';
import runHeaderTests from '../../../common/header';
import runFootertests from '../../../common/footer';
import runSEOtests from '../../../common/SEO';
import runPerformanceTests from '../../../common/performance';

runA11yTests();
runHeaderTests();
runFootertests();
runSEOtests();
runPerformanceTests();

it('Headline', () => {
  const h1El = document.querySelector('h1');

  expect(h1El).toBeInTheDocument();
  expect(h1El).toBeTruthy();
  expect(h1El.textContent).toMatchInlineSnapshot(`"BBC 코리아 라디오"`);
});

it('Summary', () => {
  const summaryEl = document.querySelector('main p');

  expect(summaryEl).toBeInTheDocument();
  expect(summaryEl).toBeTruthy();
  expect(summaryEl.textContent).toMatchInlineSnapshot(
    `"세계와 한반도 뉴스를 공정하고 객관적으로 전달해 드립니다"`,
  );
});

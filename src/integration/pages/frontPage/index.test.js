/**
 * @service arabic
 * @pathname /arabic
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

it('I can see at least one section', () => {
  const sect = document.querySelector('section');
  expect(sect).toBeInTheDocument();
});

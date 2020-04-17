/**
 * @service pidgin
 * @pathname /pidgin/23248703
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
    `"Simorgh: Media Pod Build First CPS Media Asset Page in Simorgh with the Help of Drew & < >"`,
  );
});

it('Timestamp', () => {
  const timestampEl = document.querySelector('time');

  expect(timestampEl).toBeInTheDocument();
  expect(timestampEl.textContent).toBeTruthy();
  expect(timestampEl.textContent).toMatchInlineSnapshot(`"13 September 2019"`);
});

it('Bulleted List Item', () => {
  const bulletedListEl = document.querySelector('main li');

  if (bulletedListEl) {
    expect(bulletedListEl).toBeInTheDocument();
    expect(bulletedListEl.textContent).toBeTruthy();
    expect(bulletedListEl.textContent).toMatchInlineSnapshot(`
      <Media asset
             page
      >
      </Media>
    `);
  }
});

it('Related Content', () => {
  const relatedContentListEl = document.querySelector('section li');

  if (relatedContentListEl) {
    expect(relatedContentListEl).toBeInTheDocument();
    expect(relatedContentListEl.textContent).toBeTruthy();
    expect(relatedContentListEl.textContent).toMatchInlineSnapshot(
      `"Police Arrest 3 ontop Anambra Church AttackGovernor Willie Obiano of Anambra State bin don promise say government go handle the matter sharp, sharp8th August 2017"`,
    );
  }
});

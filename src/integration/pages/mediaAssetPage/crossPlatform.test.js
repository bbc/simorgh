/**
 * @service persian
 * @pathname /persian/iran-23231114
 */

import { runCommonCrossPlatformTests, runMediaPlayerTests } from '../../common';

describe('Media Asset Page', () => {
  runCommonCrossPlatformTests();
  runMediaPlayerTests();

  it('I can see the headline', () => {
    const headlineEl = document.querySelector('h1[id="content"]');

    expect(headlineEl).toBeInTheDocument();
    expect(headlineEl.textContent).toBeTruthy();
    expect(headlineEl.textContent).toMatchInlineSnapshot(
      `"Trump long headline"`,
    );
  });

  it('I can see the timestamp', () => {
    const timestampEl = document.querySelector('time');

    expect(timestampEl).toBeInTheDocument();
    expect(timestampEl.textContent).toBeTruthy();
    expect(timestampEl.textContent).toMatchInlineSnapshot(
      `"۲۶ بهمن ۱۳۹۷ - ۱۵ فوریه ۲۰۱۹"`,
    );
  });

  const bulletedListEl = document.querySelector('main ul[role="list"]');

  if (bulletedListEl) {
    it('I can see the bulleted list item', () => {
      expect(bulletedListEl).toBeInTheDocument();
      expect(bulletedListEl.textContent).toBeTruthy();
      expect(bulletedListEl.textContent).toMatchInlineSnapshot();
    });
  }

  const releatedContentEl = document.querySelector('section [role="list"]');

  if (releatedContentEl) {
    it('I can see the related content', () => {
      expect(releatedContentEl).toBeInTheDocument();
      expect(releatedContentEl.textContent).toBeTruthy();
      expect(releatedContentEl.textContent).toMatchInlineSnapshot();
    });
  }
});

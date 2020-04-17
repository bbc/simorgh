/**
 * @service pidgin
 * @pathname /pidgin
 */

import { runCommonCrossPlatformTests } from '../../common';

describe('Front page', () => {
  runCommonCrossPlatformTests();

  it('I can see at least one section', () => {
    const sect = document.querySelector('section');

    expect(sect).toBeInTheDocument();
  });
});

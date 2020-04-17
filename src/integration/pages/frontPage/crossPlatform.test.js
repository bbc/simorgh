/**
 * @service pidgin
 * @pathname /pidgin
 */

import { runCommonCrossPlatformTests } from '../../common';

runCommonCrossPlatformTests();

it('I can see at least one section', () => {
  const sect = document.querySelector('section');
  expect(sect).toBeInTheDocument();
});

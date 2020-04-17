/**
 * @service pidgin
 * @pathname /pidgin/23248703
 */

import runCoreTests from '../../common/core.canonical';
import runAnalyticsTests from '../../common/analytics.canonical';

runCoreTests();
runAnalyticsTests();

it('Media Player Title', () => {
  const mediaPlayerIFrame = document.querySelector(`iframe`);

  expect(mediaPlayerIFrame).toBeInTheDocument();
  expect(mediaPlayerIFrame.getAttribute('title')).toMatchInlineSnapshot(
    `"Media player"`,
  );
});

it('Media Player Embed URL', () => {
  const mediaPlayerIFrame = document.querySelector(`iframe`);

  expect(mediaPlayerIFrame).toBeInTheDocument();
  expect(mediaPlayerIFrame.getAttribute('src')).toMatchInlineSnapshot(
    `"https://polling.test.bbc.co.uk/ws/av-embeds/cps/pidgin/23248703/p01kx42v/pcm"`,
  );
});

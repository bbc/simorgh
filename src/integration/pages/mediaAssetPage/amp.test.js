/**
 * @service pidgin
 * @pathname /pidgin/23248703
 */

import runCoreTests from '../../common/core.amp';
import runAnalyticsTests from '../../common/analytics.amp';

runCoreTests();
runAnalyticsTests();

it('Media Player Placeholder Image', () => {
  const placeholderImage = document.querySelector(`amp-img`);

  expect(placeholderImage).toBeInTheDocument();
  expect(placeholderImage.getAttribute('src')).toMatchInlineSnapshot(
    `"https://ichef.test.bbci.co.uk/images/ic/1024x576/p01kx435.jpg"`,
  );
});

it('Media Player Title', () => {
  const mediaPlayerIFrame = document.querySelector(`amp-iframe`);

  expect(mediaPlayerIFrame).toBeInTheDocument();
  expect(mediaPlayerIFrame.getAttribute('title')).toMatchInlineSnapshot(
    `"Media player"`,
  );
});

it('Media Player Embed URL', () => {
  const mediaPlayerIFrame = document.querySelector(`amp-iframe`);

  expect(mediaPlayerIFrame).toBeInTheDocument();
  expect(mediaPlayerIFrame.getAttribute('src')).toMatchInlineSnapshot(
    `"https://polling.test.bbc.co.uk/ws/av-embeds/cps/pidgin/23248703/p01kx42v/pcm/amp"`,
  );
});

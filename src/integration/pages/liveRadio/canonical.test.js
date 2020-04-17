/**
 * @service korean
 * @pathname /korean/bbc_korean_radio/liveradio
 */

import runCoreTests from '../../common/core.canonical';
import runAnalyticsTests from '../../common/analytics.canonical';

runCoreTests();
runAnalyticsTests();

it('Audio Player Title', () => {
  const audioPlayerIframe = document.querySelector('iframe');

  expect(audioPlayerIframe).toBeInTheDocument();
  expect(audioPlayerIframe.getAttribute('title')).toMatchInlineSnapshot(
    `"오디오 플레이어"`,
  );
});

it('Audio Player Embed URL', () => {
  const audioPlayerIframe = document.querySelector('iframe');

  expect(audioPlayerIframe).toBeInTheDocument();
  expect(audioPlayerIframe.getAttribute('src')).toMatchInlineSnapshot(
    `"https://polling.test.bbc.co.uk/ws/av-embeds/media/bbc_korean_radio/liveradio/ko"`,
  );
});

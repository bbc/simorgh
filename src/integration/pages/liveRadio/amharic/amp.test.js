/**
 * @service amharic
 * @pathname /amharic/bbc_amharic_radio/liveradio
 */

import runCoreTests from '../../../common/core.amp';
import runAnalyticsTests from '../../../common/analytics.amp';

runCoreTests();
runAnalyticsTests();

it('Audio player image placeholder', () => {
  const audioPlaceholderImage = document.querySelector(
    'amp-img[src="http://localhost:7080/images/amp_audio_placeholder.png"]',
  );

  expect(audioPlaceholderImage).toBeInTheDocument();
});

it('Audio player embed', () => {
  const audioPlayerIframe = document.querySelector('amp-iframe');

  expect(audioPlayerIframe.getAttribute('src')).toMatchInlineSnapshot(
    `"https://polling.test.bbc.co.uk/ws/av-embeds/media/bbc_amharic_radio/liveradio/am/amp"`,
  );
});

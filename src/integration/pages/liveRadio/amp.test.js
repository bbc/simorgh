/**
 * @service korean
 * @pathname /korean/bbc_korean_radio/liveradio
 */

import { runCoreAmpTests, runAmpAnalyticsTests } from '../../common';

runCoreAmpTests();
runAmpAnalyticsTests();

it('Audio player image placeholder', () => {
  const audioPlaceholderImage = document.querySelector(
    'amp-img[src="http://localhost:7080/images/amp_audio_placeholder.png"]',
  );

  expect(audioPlaceholderImage).toBeInTheDocument();
});

it('Audio player embed', () => {
  const audioPlayerIframe = document.querySelector('amp-iframe');

  expect(audioPlayerIframe.getAttribute('src')).toMatchSnapshot();
});

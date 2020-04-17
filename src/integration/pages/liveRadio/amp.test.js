/**
 * @service korean
 * @pathname /korean/bbc_korean_radio/liveradio
 */

import { runCoreAmpTests, runAmpAnalyticsTests } from '../../common';

describe('AMP Live Radio', () => {
  runCoreAmpTests();
  runAmpAnalyticsTests();

  it('I can see the media player image placeholder', () => {
    const audioPlaceholderImage = document.querySelector(
      'amp-img[src="http://localhost:7080/images/amp_audio_placeholder.png"]',
    );

    expect(audioPlaceholderImage).toBeInTheDocument();
  });
});

import runCrossPlatformTests from './crossPlatformTests';
import { runCoreAmpTests, runAmpAnalyticsTests } from '../../common';

export default () => {
  runCrossPlatformTests();
  runCoreAmpTests();
  runAmpAnalyticsTests();

  it('I can see the media player image placeholder', () => {
    const audioPlaceholderImage = document.querySelector(
      'amp-img[src="http://localhost:7080/images/amp_audio_placeholder.png"]',
    );

    expect(audioPlaceholderImage).toBeInTheDocument();
  });
};

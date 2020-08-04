import runCrossPlatformTests from './crossPlatformTests';
import { runCoreAmpTests, runAmpAnalyticsTests } from '../../common';

export default () => {
  runCrossPlatformTests();
  runCoreAmpTests();
  runAmpAnalyticsTests();

  it('Media player image placeholder', () => {
    const audioPlaceholderImage = document.querySelector(
      'amp-img[src="http://localhost:7080/images/amp_audio_placeholder.png"]',
    );

    expect(audioPlaceholderImage).toBeInTheDocument();
  });

  it('Should not have a radio schedule on AMP', () => {
    const scheduleWrapper = document.querySelector(
      '[data-e2e="radio-schedule"]',
    );
    expect(scheduleWrapper).not.toBeInTheDocument();
  });
};

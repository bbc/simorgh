import runCrossPlatformTests from './crossPlatformTests';
import {
  runCoreAmpTests,
  runAmpFooterTests,
  runAmpAnalyticsTests,
  runRadioScheduleTests,
  runSeoAmpTests,
} from '../../common';

export default service => {
  runCrossPlatformTests(service);
  runAmpFooterTests();
  runCoreAmpTests();
  runAmpAnalyticsTests();
  runRadioScheduleTests({ isAmp: true });
  runSeoAmpTests();

  it('Media player image placeholder', () => {
    const audioPlaceholderImage = document.querySelector(
      'div[data-e2e="image-placeholder"][placeholder]',
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
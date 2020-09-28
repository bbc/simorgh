import {
  runCoreCanonicalTests,
  runCanonicalAnalyticsTests,
} from '../../common';
import runCrossPlatformTests from './crossPlatformTests';

export default service => {
  runCrossPlatformTests(service);
  runCoreCanonicalTests();
  runCanonicalAnalyticsTests();

  it('I can see the placeholder loading image', () => {
    const loadingImageWrapper = document.querySelector(
      "div[class^='LoadingImageWrapper']",
    );
    expect(loadingImageWrapper).toBeInTheDocument();
    expect(loadingImageWrapper).toMatchSnapshot();
  });

  it('outer iframe has z-index of 1', () => {
    const iframe = document.querySelector('iframe');
    expect(iframe).toBeInTheDocument();
    expect(window.getComputedStyle(iframe).getPropertyValue('z-index')).toEqual(
      '1',
    );
    expect(iframe).toMatchSnapshot();
  });
};

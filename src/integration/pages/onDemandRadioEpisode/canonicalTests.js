import {
  runCoreCanonicalTests,
  runCanonicalAnalyticsTests,
} from '../../common';

export default () => {
  runCoreCanonicalTests();
  runCanonicalAnalyticsTests();
  it('I can see the hero image on canonical', () => {
    const imageEl = document.querySelector('main img');

    expect(imageEl).toBeInTheDocument();
    expect(imageEl).toBeTruthy();
    expect(imageEl.getAttribute('src')).toMatchSnapshot();
  });
};

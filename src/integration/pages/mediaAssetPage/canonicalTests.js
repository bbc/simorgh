import {
  runCoreCanonicalTests,
  runCanonicalAnalyticsTests,
} from '../../common';

export default () => {
  runCoreCanonicalTests();
  runCanonicalAnalyticsTests();

  it('I can see the placeholder loading image', () => {
    // const headlineEl = document.querySelector('h1[id="content"]');
    // expect(headlineEl).toBeInTheDocument();
    // expect(headlineEl.textContent).toBeTruthy();
    // expect(headlineEl.textContent).toMatchSnapshot();
  });
};

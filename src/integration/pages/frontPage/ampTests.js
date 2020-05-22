import { runCoreAmpTests, runAmpAnalyticsTests } from '../../common';

export default () => {
  runCoreAmpTests();
  runAmpAnalyticsTests();

  it('I can see a Story Promo', () => {
    const section = document.querySelector('section');

    if (section) {
      expect(section).toBeInTheDocument();

      const imageEl = section.getElementsByTagName('amp-img')[0];
      expect(imageEl).toBeInTheDocument();
      expect(imageEl).toMatchSnapshot();

      const h3El = section.querySelector('h3');
      expect(h3El).toBeInTheDocument();
      expect(h3El.textContent).toBeTruthy();
      expect(h3El.textContent).toMatchSnapshot();
    }
  });
};

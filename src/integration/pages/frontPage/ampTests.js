import { runCoreAmpTests, runAmpAnalyticsTests } from '../../common';

export default () => {
  runCoreAmpTests();
  runAmpAnalyticsTests();

  it('I can see a Story Promo', () => {
    const section = document.querySelector('section');

    if (section) {
      expect(section).toBeInTheDocument();

      const img = section.getElementsByTagName('amp-img')[0];

      expect(img).toBeInTheDocument();
      expect(img).toMatchSnapshot();

      const h3 = section.querySelector('h3');

      expect(h3).toBeInTheDocument();
      expect(h3).toMatchSnapshot();
    }
  });
};

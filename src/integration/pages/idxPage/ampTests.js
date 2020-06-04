import { runCoreAmpTests, runAmpAnalyticsTests } from '../../common';

export default () => {
  runCoreAmpTests();
  runAmpAnalyticsTests();

  describe('Story Promo', () => {
    it('I can see an image', () => {
      const section = document.querySelector('section');

      if (section) {
        expect(section).toBeInTheDocument();

        const imageEl = section.getElementsByTagName('amp-img')[0];
        expect(imageEl).toBeInTheDocument();
        expect(imageEl).toMatchSnapshot();
      }
    });

    it('I can see a headline', () => {
      const section = document.querySelector('section');

      if (section) {
        expect(section).toBeInTheDocument();

        const h3El = section.querySelector('h3');
        expect(h3El).toBeInTheDocument();
        expect(h3El.textContent).toBeTruthy();
        expect(h3El.textContent).toMatchSnapshot();
      }
    });
  });
};

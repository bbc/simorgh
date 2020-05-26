import runCrossPlatformTests from './crossPlatformTests';
import {
  runCoreCanonicalTests,
  runCanonicalAnalyticsTests,
} from '../../common';

export default () => {
  runCrossPlatformTests();
  runCoreCanonicalTests();
  runCanonicalAnalyticsTests();

  it('I can see a radio schedule component with an id', () => {
    const hasRadioSchedule = [
      'afrique',
      'arabic',
      'hausa',
      'korean',
      'pashto',
      'somali',
      'swahili',
    ].includes(service);
    const id = document.getElementById('Radio-Schedule');

    if (hasRadioSchedule) {
      expect(id).toBeInTheDocument();
    } else {
      expect(id).not.toBeInTheDocument();
    }
  });

  describe('Story Promo', () => {
    it('I can see an image', () => {
      const section = document.querySelector('section');

      if (section) {
        expect(section).toBeInTheDocument();

        const imageEl = section.getElementsByTagName('img')[0];
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

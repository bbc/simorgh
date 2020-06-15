import {
  runCoreCanonicalTests,
  runCanonicalAnalyticsTests,
} from '../../common';

export default () => {
  runCoreCanonicalTests();
  runCanonicalAnalyticsTests();

  describe('Radio Schedule', () => {
    const hasRadioSchedule = service === 'arabic';
    const id = document.getElementById('Radio-Schedule');

    if (hasRadioSchedule) {
      it('should be in the document', () => {
        expect(id).toBeInTheDocument();
      });
    } else {
      it('should not be in the document', () => {
        expect(id).not.toBeInTheDocument();
      });
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

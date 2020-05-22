import {
  runCoreCanonicalTests,
  runCanonicalAnalyticsTests,
} from '../../common';

export default () => {
  runCoreCanonicalTests();
  runCanonicalAnalyticsTests();

  it('I can see a radio schedule component with an id', () => {
    const hasRadioSchedule = service === 'arabic';
    const id = document.getElementById('Radio-Schedule');

    if (hasRadioSchedule) {
      expect(id).toBeInTheDocument();
    } else {
      expect(id).not.toBeInTheDocument();
    }
  });

  it('I can see a Story Promo', () => {
    const section = document.querySelector('section');

    if (section) {
      expect(section).toBeInTheDocument();

      const img = section.getElementsByTagName('img')[0];

      expect(img).toBeInTheDocument();
      expect(img).toMatchSnapshot();

      const h3 = section.querySelector('h3');

      expect(h3).toBeInTheDocument();
      expect(h3).toMatchSnapshot();
    }
  });
};

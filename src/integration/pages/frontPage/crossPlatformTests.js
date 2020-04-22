import { runCommonCrossPlatformTests } from '../../common';

export default () => {
  runCommonCrossPlatformTests();

  it('I can see at least one section', () => {
    const sect = document.querySelector('section');

    expect(sect).toBeInTheDocument();
  });

  it('I can see a radio schedule component with an id', () => {
    const hasRadioSchedule = service === 'arabic';

    const id = document.getElementById('Radio-Schedule');

    if (hasRadioSchedule) {
      expect(id).toBeInTheDocument();
    } else {
      expect(id).not.toBeInTheDocument();
    }
  });
};

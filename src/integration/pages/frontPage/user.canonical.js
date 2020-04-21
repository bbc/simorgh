export default ({ service }) => {
  it('I can see atleast a section', () => {
    const sect = canonical.document.querySelector('section');
    expect(sect).toBeInTheDocument();
  });

  it('I can see a radio schedule component with an id', () => {
    const hasRadioSchedule = service === 'arabic';

    const id = canonical.document.getElementById('Radio-Schedule');

    if (hasRadioSchedule) {
      expect(id).toBeInTheDocument();
    } else {
      expect(id).not.toBeInTheDocument();
    }
  });
};

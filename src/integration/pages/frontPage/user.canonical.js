export default () => {
  it('I can see atleast a section', () => {
    const sect = canonical.document.querySelector('section');
    expect(sect).toBeInTheDocument();
  });

  // it('I can see an component with a id', () => {
  //   const id = canonical.document.getElementById('Radio-Schedule');
  //   expect(id).toBeInTheDocument();
  // });
};

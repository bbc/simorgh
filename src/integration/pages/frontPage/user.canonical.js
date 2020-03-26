const { canonical } = global;

export default () => {
  it('I can see an component with a id', () => {
    const id = canonical.document.getElementById('Radio-Schedule');
    expect(id).toBeInTheDocument();
  });
};

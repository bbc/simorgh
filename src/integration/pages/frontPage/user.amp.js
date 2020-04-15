export default () => {
  it('I can see an amp image', () => {
    const image = amp.document.querySelector('amp-img');

    expect(image).toBeInTheDocument();
  });
};

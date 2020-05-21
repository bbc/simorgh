export default () => {
  it('I can see the hero image', () => {
    const imageEl = document.querySelector('main div img');

    expect(imageEl).toBeInTheDocument();
    expect(imageEl).toBeTruthy();
    expect(imageEl.getAttribute('src')).toMatchSnapshot();
  });
};

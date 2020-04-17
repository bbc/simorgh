export default () => {
  it('a11y - Skip to content link', () => {
    const skipToContentEl = document.querySelector('[href="#content"]');
    const h1El = document.querySelector('h1');

    expect(h1El.getAttribute('id')).toBe('content');
    expect(h1El.getAttribute('tabindex')).toBe('-1');
    expect(skipToContentEl).toBeInTheDocument();
    expect(skipToContentEl.textContent).toBeTruthy();
    expect(skipToContentEl.textContent).toMatchSnapshot();
  });
};

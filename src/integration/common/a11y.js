export default ({ skipToContentText, headlineText }) => {
  let app;

  it('I can see a skip to content link that links to the main content of the page', () => {
    const skipToContentEl = app.getByText(skipToContentText);
    const mainContentEl = app.getByText(headlineText);

    expect(skipToContentEl.getAttribute('href')).toBe('#content');
    expect(mainContentEl.getAttribute('id')).toBe('content');
    expect(mainContentEl.getAttribute('tabindex')).toBe('-1');
  });
};

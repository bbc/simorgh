import '@testing-library/jest-dom/extend-expect';

export default ({ app, headlineText, summaryText }) => {
  it('I can see the headline', () => {
    const headlineEl = app.getByText(headlineText);

    expect(headlineEl).toBeInTheDocument();
  });

  it('I can see the summary', () => {
    const summaryEl = app.getByText(summaryText);

    expect(summaryEl).toBeInTheDocument();
  });
};

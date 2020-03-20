const { within } = require('@testing-library/dom');

export default (page, headlineText) => {
  const { getByText } = within(page.document.querySelector('h1[id="content"]'));

  return getByText(headlineText);
};

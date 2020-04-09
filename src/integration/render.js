const { JSDOM } = require('jsdom');
const { within } = require('@testing-library/dom');

const enhanceGetByText = (getByText) => (text) =>
  getByText((content, node) => {
    const hasText = ({ textContent }) => textContent === text;
    const nodeHasText = hasText(node);
    const childrenDontHaveText = Array.from(node.children).every(
      (child) => !hasText(child),
    );

    return nodeHasText && childrenDontHaveText;
  });

module.exports = async (path) => {
  try {
    const dom = await JSDOM.fromURL(`http://localhost:7080${path}`);

    const queries = within(dom.window.document.body);

    return {
      window: dom.window,
      document: dom.window.document,
      getByTextMultiElement: enhanceGetByText(queries.getByText),
      ...queries,
    };
  } catch (e) {
    console.error(`Error: Visit to http://localhost:7080${path} failed.`);
  }
};

import '@testing-library/jest-dom/extend-expect';
import renderApp from '../renderApp';

export default ({ pageUrl }) => {
  describe('a11y', () => {
    beforeEach(() => renderApp(pageUrl));

    it('should render an H1 with the correct attributes', () => {
      const headlineEl = document.querySelector(
        '[role="main"] h1[id="content"][tabindex="-1"]',
      );

      expect(headlineEl).toBeInTheDocument();
    });
  });
};

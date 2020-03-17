import '@testing-library/jest-dom/extend-expect';
import { renderAsReact } from '../../render';

export default ({ pageUrl }) => {
  describe('a11y', () => {
    beforeEach(() => renderAsReact(pageUrl));

    it('should render an H1 with the correct attributes', () => {
      const headlineEl = document.querySelector(
        '[role="main"] h1[id="content"][tabindex="-1"]',
      );

      expect(headlineEl).toBeInTheDocument();
    });
  });
};

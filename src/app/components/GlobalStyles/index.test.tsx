import GlobalStyles from '.';
import { render } from '../react-testing-library-with-providers';

describe('GlobalStyles', () => {
  it('renders no markup of its own', () => {
    const { container } = render(<GlobalStyles />);

    expect(container).toBeEmptyDOMElement();
  });

  it('applies the box-sizing and normalize rules to the document', () => {
    render(<GlobalStyles />);

    const globalCss = Array.from(document.querySelectorAll('style'))
      .flatMap(({ sheet }) => Array.from(sheet?.cssRules ?? []))
      .map(({ cssText }) => cssText)
      .join('');

    expect(globalCss).toContain(
      'html {box-sizing: border-box; font-size: 100%;}',
    );
    expect(globalCss).toContain('*,*:before,*:after {box-sizing: inherit;}');
    expect(globalCss).toContain('body {margin: 0;}');
  });
});

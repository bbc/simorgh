import loggerMock from '#testHelpers/loggerMock';
import optimiseCssPrefixes from '.';

describe('optimiseCssPrefixes', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('removes vendor prefixes not needed for the declared target browsers', () => {
    // Old 2009/2012-draft flexbox spec syntax — not needed for any browser in
    // this project's browserslist config.
    const css =
      '.foo{display:-webkit-box;-webkit-box-align:center;align-items:center;}';

    const result = optimiseCssPrefixes(css);

    expect(result).not.toContain('-webkit-box-align');
    expect(result).toContain('align-items:center');
  });

  it('keeps vendor-prefixed properties that Autoprefixer does not track', () => {
    // None of these appear in Autoprefixer's data set, so they're never
    // touched regardless of the target browsers. They're real properties
    // this codebase relies on (momentum scrolling, text truncation), so
    // this guards against a future dependency bump changing that.
    const css =
      '.foo{-webkit-overflow-scrolling:touch;display:-webkit-box;-webkit-line-clamp:4;-webkit-box-orient:vertical;overflow:hidden;}';

    const result = optimiseCssPrefixes(css);

    expect(result).toContain('-webkit-overflow-scrolling:touch');
    expect(result).toContain('-webkit-line-clamp:4');
    expect(result).toContain('-webkit-box-orient:vertical');
  });

  it('adds a vendor prefix that is genuinely required for a declared target browser', () => {
    // and_chr/chrome need -webkit-clip-path in some of the versions this
    // project declares support for.
    const css = '.foo{clip-path:circle(50%);}';

    const result = optimiseCssPrefixes(css);

    expect(result).toContain('-webkit-clip-path:circle(50%)');
    expect(result).toContain('clip-path:circle(50%)');
  });

  it('returns the CSS unchanged when there is nothing to optimise', () => {
    const css = '.foo{color:red;}';

    expect(optimiseCssPrefixes(css)).toBe(css);
  });

  it('returns an empty string for empty input', () => {
    expect(optimiseCssPrefixes('')).toBe('');
  });

  it('logs an error and falls back to the original CSS when PostCSS fails to parse it', () => {
    // Missing closing brace — genuinely invalid CSS that PostCSS's parser
    // will throw a CssSyntaxError on.
    const invalidCss = '.foo{color:red';

    const result = optimiseCssPrefixes(invalidCss);

    expect(result).toBe(invalidCss);
    expect(loggerMock.error).toHaveBeenCalledWith(
      'amp_lite_css_autoprefixer_error',
      expect.objectContaining({ message: expect.any(String) }),
    );
  });
});

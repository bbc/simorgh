const getAmpCustomStyle = () =>
  document.querySelector('head > style[amp-custom]');

export const runAmpCssSizeTest = () => {
  it('should stay below the AMP CSS limit including inline styles', () => {
    const styleElement = getAmpCustomStyle();
    expect(styleElement).toBeInTheDocument();
    const css = styleElement?.textContent ?? '';
    const inlineStyles = Array.from(document.querySelectorAll('[style]'))
      .map(element => element.getAttribute('style') ?? '')
      .join('');

    expect(
      new TextEncoder().encode(css + inlineStyles).byteLength,
    ).toBeLessThanOrEqual(75_000);
  });
};

export default () => {
  describe('SCSS module CSS — AMP inlined styles', () => {
    it('should have a non-empty <style amp-custom> tag', () => {
      const styleEl = getAmpCustomStyle();

      expect(styleEl).toBeInTheDocument();
      expect(styleEl?.textContent?.trim()).not.toBe('');
    });

    it('should tree-shake unused SCSS module palette custom properties (--brand-foreground)', () => {
      const css = getAmpCustomStyle()?.textContent ?? '';

      expect(css).not.toContain('--brand-foreground');
    });

    it('should exclude CSS for components that are not rendered on AMP articles', () => {
      const css = getAmpCustomStyle()?.textContent ?? '';

      expect(
        document.querySelector('[data-testid="latest-post-button"]'),
      ).toBeNull();
      expect(css).not.toContain('.LatestPostButton_');
    });

    runAmpCssSizeTest();

    it('should inline CSS custom properties from the SCSS module font variants (--sans-regular-font-family)', () => {
      const css = getAmpCustomStyle()?.textContent ?? '';

      expect(css).toContain('--sans-regular-font-family');
    });

    it('should inline @font-face declarations from the SCSS module font faces', () => {
      const css = getAmpCustomStyle()?.textContent ?? '';

      expect(css).toContain('@font-face');
      expect(css).toContain('font-family:ReithSans');
    });

    it('should inline CSS module component rules (hashed class names)', () => {
      const css = getAmpCustomStyle()?.textContent ?? '';

      // CSS module class names follow the pattern: ComponentName_localName__hash
      // This confirms CSS module extraction is working, not just global SCSS
      expect(css).toMatch(/\.[A-Za-z]+_[a-zA-Z]+__[A-Za-z0-9]+/);
    });

    it('should strip unnecessary vendor prefixes left in by Emotion', () => {
      const css = getAmpCustomStyle()?.textContent ?? '';

      expect(css).not.toMatch(/-webkit-box-(align|pack)\s*:/);
      expect(css).not.toMatch(/-ms-flex-(align|pack|direction|wrap)\s*:/);
    });
  });
};

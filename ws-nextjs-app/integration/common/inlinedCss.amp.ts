export default () => {
  describe('SCSS module CSS — AMP inlined styles', () => {
    const getAmpCustomStyle = () =>
      document.querySelector('head > style[amp-custom]');

    it('should have a non-empty <style amp-custom> tag', () => {
      const styleEl = getAmpCustomStyle();

      expect(styleEl).toBeInTheDocument();
      expect(styleEl?.textContent?.trim()).not.toBe('');
    });

    it('should inline CSS custom properties from the SCSS module palette (--brand-background)', () => {
      const css = getAmpCustomStyle()?.textContent ?? '';

      expect(css).toContain('--brand-background');
    });

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
  });
};

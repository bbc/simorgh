const getInlinedCss = () =>
  Array.from(document.querySelectorAll('head > style'))
    .map(el => el.textContent)
    .join('');

export default () => {
  describe('SCSS module CSS — Lite inlined styles', () => {
    it('should have at least one non-empty <style> tag in the head', () => {
      const styleEls = Array.from(document.querySelectorAll('head > style'));
      const hasContent = styleEls.some(
        el => el.textContent && el.textContent.trim() !== '',
      );

      expect(hasContent).toBe(true);
    });

    it('should inline CSS custom properties from the SCSS module palette (--brand-background)', () => {
      expect(getInlinedCss()).toContain('--brand-background');
    });

    it('should inline CSS custom properties from the SCSS module font variants (--sans-regular-font-family)', () => {
      expect(getInlinedCss()).toContain('--sans-regular-font-family');
    });

    it('should inline @font-face declarations from the SCSS module font faces', () => {
      const css = getInlinedCss();

      expect(css).toContain('@font-face');
      expect(css).toContain('font-family:ReithSans');
    });
  });
};

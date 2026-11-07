export default () => {
  describe('Lite Site Summary', () => {
    const liteSiteSummary = document.querySelector(
      "section[data-e2e='lite-summary']",
    );

    it('should be in the document', () => {
      expect(liteSiteSummary).toBeInTheDocument();
    });

    it('should match snapshot', () => {
      expect(liteSiteSummary).toMatchSnapshot();
    });

    it('should retain the rendered chevron mask and its forced-colours styles', () => {
      const icon = liteSiteSummary?.querySelector('.external-svg');
      const css = Array.from(document.querySelectorAll('head > style'))
        .map(element => element.textContent)
        .join('');

      expect(icon).toBeInTheDocument();
      expect(icon).toHaveAttribute('aria-hidden', 'true');
      expect(css).toContain('mask:var(--icon-source)');
      expect(css).toContain('background-color:currentColor');
      expect(css).toContain('forced-color-adjust:preserve-parent-color');
    });
  });
};

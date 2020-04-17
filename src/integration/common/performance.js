export default ({ hasScriptFonts = false } = {}) => {
  describe('Performance', () => {
    it('Resource hints', () => {
      const resources = [
        'http://localhost:7080',
        'https://ichef.bbci.co.uk',
        ...(hasScriptFonts
          ? [
              'https://gel.files.bbci.co.uk',
              'https://ws-downloads.files.bbci.co.uk',
            ]
          : []),
      ];

      resources.forEach((resource) => {
        const resourceEls = Array.from(
          document.querySelectorAll(`head link[href="${resource}"]`),
        );

        expect(resourceEls[0].getAttribute('rel')).toBe('preconnect');
        expect(resourceEls[1].getAttribute('rel')).toBe('dns-prefetch');
      });
    });
  });
};

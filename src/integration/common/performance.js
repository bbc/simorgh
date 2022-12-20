export default ({ service = null, hasScriptFonts = false } = {}) => {
  describe('Performance', () => {
    it('Resource hints', () => {
      if (service !== 'pidgin') {
        const resources = [
          'http://localhost:7080',
          'https://ichef.bbci.co.uk',
          'https://ping.chartbeat.net',
          'https://client.rum.us-east-1.amazonaws.com',
          'https://dataplane.rum.eu-west-1.amazonaws.com',
          ...(hasScriptFonts
            ? [
                'https://ws-downloads.files.bbci.co.uk',
              ]
            : []),
        ];

        resources.forEach(resource => {
          const resourceEls = Array.from(
            document.querySelectorAll(`head link[href="${resource}"]`),
          );

          expect(resourceEls[0].getAttribute('rel')).toBe('preconnect');
          expect(resourceEls[1].getAttribute('rel')).toBe('dns-prefetch');
        });
      }
    });
  });
};

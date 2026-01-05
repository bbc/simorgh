export default () => {
  // These headers are set in the Next.js _app.page.tsx file
  // The presence of this header and its value including the word 'SIMORGH' indicates that _app.page.tsx is setting headers correctly
  describe('req-svc-chain is set correctly', () => {
    it('should contain the correct svc chain', async () => {
      const fetchResponse = await fetch(window.location.href);
      const reqSvcChain = fetchResponse.headers.get('req-svc-chain');
      expect(reqSvcChain).toContain('SIMORGH');
    });
  });

  // describe('CSP header is set correctly', () => {
  //   it('should contain the correct Content-Security-Policy header', async () => {
  //     const fetchResponse = await fetch(window.location.href);
  //     const cspHeader = fetchResponse.headers.get('Content-Security-Policy');
  //     expect(cspHeader).toContain("default-src 'self'");
  //   });
  // });

  describe('Onion-Location header is set correctly', () => {
    it('should contain the correct Onion-Location header', async () => {
      const fetchResponse = await fetch(window.location.href);
      const onionHeader = fetchResponse.headers.get('Onion-Location');
      expect(onionHeader).toBe(
        `https://www.bbcweb3hytmzhn5d532owbu6oqadra5z3ar726vq5kgwwn6aucdccrad.onion${new URL(window.location.href).pathname}`,
      );
    });
  });

  describe('Vary header is set correctly', () => {
    it('should contain the correct Vary header', async () => {
      const fetchResponse = await fetch(window.location.href);
      const varyHeader = fetchResponse.headers.get('Vary');
      expect(varyHeader).toContain('X-Country, Accept-Encoding');
    });
  });

  describe('Link header is set correctly', () => {
    it('should contain the correct Link header for AMP pages', async () => {
      const fetchResponse = await fetch(window.location.href);
      const linkHeader = fetchResponse.headers.get('Link');
      expect(linkHeader).toContain(
        '<https://ichef.bbci.co.uk>; rel="dns-prefetch"',
      );
    });
  });
};

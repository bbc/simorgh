export default () => {
  // This header is set in the Next.js _app.page.tsx file
  // The presence of this header and its value including the word 'SIMORGH' indicates that _app setting headers correctly
  describe('req-svc-chain is set correctly', () => {
    it('should contain the correct svc chain', async () => {
      const fetchResponse = await fetch(window.location.href);
      const reqSvcChain = fetchResponse.headers.get('req-svc-chain');
      expect(reqSvcChain).toContain('SIMORGH');
    });
  });
};

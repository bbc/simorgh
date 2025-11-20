export default () => {
  describe('req-svc-chain is set correctly', () => {
    it('should contain the correct svc chain', async () => {
      const fetchResponse = await fetch(window.location.href);
      const reqSvcChain = fetchResponse.headers.get('req-svc-chain');
      expect(reqSvcChain).toContain('SIMORGH');
    });
  });
};

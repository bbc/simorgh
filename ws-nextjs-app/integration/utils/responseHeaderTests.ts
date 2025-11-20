export default () => {
  describe('req-svc-chain is set correctly', () => {
    it('should contain the correct svc chain', async () => {
      const fetchResponse = await fetch(window.location.href);
      const reqSvcChain = fetchResponse.headers.get('req-svc-chain');
      console.log('req-svc-chain:', reqSvcChain);
      expect(reqSvcChain).toContain('SIMORGH');
    });
  });
};

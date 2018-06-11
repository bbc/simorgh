describe('Config', () => {
  const importConfig = async () => {
    const config = await import('./config');
    return config.default;
  };

  describe('publicDirectory', () => {
    process.env.RAZZLE_PUBLIC_DIR = 'test-public';
    process.env.RAZZLE_PUBLIC_DIR_DEV = `test-public-dev`;

    describe('Production build', () => {
      it('should equal the RAZZLE_PUBLIC_DIR environment variable', async () => {
        process.env.NODE_ENV = 'production';
        const config = await importConfig();
        expect(config).toEqual(process.env.RAZZLE_PUBLIC_DIR);
      });
    });

    describe('Development build', () => {
      it('should equal the RAZZLE_PUBLIC_DIR_DEV environment variable', async () => {
        process.env.NODE_ENV = 'development';
        const config = await importConfig();
        expect(config).toEqual(process.env.RAZZLE_PUBLIC_DIR_DEV);
      });
    });
  });
});

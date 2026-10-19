import nextConfig from './next.config';

describe('Next.js configuration', () => {
  it('enables React Compiler through the supported Next.js option', () => {
    expect(nextConfig.reactCompiler).toBe(true);
  });

  it('keeps Emotion compiler support enabled', () => {
    expect(nextConfig.compiler).toEqual({ emotion: true });
  });

  it('keeps React strict mode enabled', () => {
    expect(nextConfig.reactStrictMode).toBe(true);
  });

  it('continues transpiling shared Simorgh source', () => {
    expect(nextConfig.transpilePackages).toEqual(['simorgh']);
  });
});

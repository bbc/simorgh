import { getLinkAttributes, getScriptAttributes } from '.';

const chunk = {
  filename: 'static/js/modern.main-node_modules_a.js',
  integrity: null,
  scriptType: 'script',
  chunk: 'main',
  url: 'http://localhost:1124/static/js/modern.main-node_modules_a.js',
  path: '/Users/bennea27/Documents/workspace/simorgh/build/public/static/js/modern.main-node_modules_a.js',
  type: 'mainAsset',
  linkType: 'preload',
};

describe('getLinkAttributes', () => {
  it('includes crossOrigin attribute', () => {
    const attributes = getLinkAttributes(chunk);

    expect(attributes).toEqual(
      expect.objectContaining({ crossOrigin: 'anonymous' }),
    );
  });

  it('includes chunk url as href attribute', () => {
    const attributes = getLinkAttributes(chunk);

    expect(attributes).toEqual(
      expect.objectContaining({
        href: 'http://localhost:1124/static/js/modern.main-node_modules_a.js',
      }),
    );
  });
});

describe('getScriptAttributes', () => {
  it.each`
    bundleType
    ${'modern'}
    ${'legacy'}
  `('includes crossOrigin attribute - $bundleType bundle', ({ bundleType }) => {
    const attributes = getScriptAttributes(bundleType)(chunk);

    expect(attributes).toEqual(
      expect.objectContaining({ crossOrigin: 'anonymous' }),
    );
  });

  it.each`
    bundleType
    ${'modern'}
    ${'legacy'}
  `('includes defer attribute - $bundleType bundle', ({ bundleType }) => {
    const attributes = getScriptAttributes(bundleType)(chunk);

    expect(attributes).toEqual(expect.objectContaining({ defer: true }));
  });

  it.each`
    bundleType
    ${'modern'}
    ${'legacy'}
  `(
    'includes chunk url as src attribute - $bundleType bundle',
    ({ bundleType }) => {
      const attributes = getScriptAttributes(bundleType)(chunk);

      expect(attributes).toEqual(
        expect.objectContaining({
          src: 'http://localhost:1124/static/js/modern.main-node_modules_a.js',
        }),
      );
    },
  );

  it.each`
    bundleType
    ${'modern'}
    ${'legacy'}
  `(
    'returns no attributes where chunk is null - $bundleType bundle',
    ({ bundleType }) => {
      const attributes = getScriptAttributes(bundleType)(null);
      expect(attributes).toEqual({});
    },
  );

  it("includes type attribute with value 'module' where bundleType is 'modern'", () => {
    const attributes = getScriptAttributes('modern')(chunk);

    expect(attributes).toEqual(
      expect.objectContaining({
        type: 'module',
      }),
    );
  });

  it("includes noModule attribute set to true where bundleType is 'legacy'", () => {
    const attributes = getScriptAttributes('legacy')(chunk);

    expect(attributes).toEqual(
      expect.objectContaining({
        noModule: true,
      }),
    );
  });
});

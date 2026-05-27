// eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires, import/no-commonjs
const loaders = require('./webpackDevLoaderUtils.cjs');

const { injectExtractLoader, isIgnoreLoader, replaceIgnoreLoaderForScss } =
  loaders;

const EXTRACT_LOADER = '/path/to/DevCssExtractLoader.cjs';
const CSS_LOADER = '/path/to/css-loader/index.js';
const SASS_LOADER = '/path/to/sass-loader/index.js';

const replacementUse = [
  EXTRACT_LOADER,
  { loader: CSS_LOADER, options: { modules: false } },
  { loader: SASS_LOADER },
];

// ---------------------------------------------------------------------------
// helpers
// ---------------------------------------------------------------------------

const cssModuleRule = () => ({
  test: /\.module\.scss$/,
  use: [
    { loader: 'style-loader' },
    { loader: CSS_LOADER },
    { loader: SASS_LOADER },
  ],
});

const ignoreLoaderRuleString = (test = /\.scss$/) => ({
  test,
  use: 'ignore-loader',
});

const ignoreLoaderRuleObject = (test = /\.scss$/) => ({
  test,
  loader: '/node_modules/next/dist/compiled/ignore-loader/index.js',
});

const ignoreLoaderRuleArray = (test = /\.scss$/) => ({
  test,
  use: [{ loader: '/node_modules/next/dist/compiled/ignore-loader/index.js' }],
});

// ---------------------------------------------------------------------------
// isIgnoreLoader
// ---------------------------------------------------------------------------

describe('isIgnoreLoader', () => {
  it('returns false for undefined/null', () => {
    expect(isIgnoreLoader(undefined)).toBe(false);
    expect(isIgnoreLoader(null)).toBe(false);
  });

  it('returns true for a string path containing ignore-loader', () => {
    expect(isIgnoreLoader('ignore-loader')).toBe(true);
    expect(
      isIgnoreLoader('/node_modules/next/dist/compiled/ignore-loader/index.js'),
    ).toBe(true);
  });

  it('returns false for a string path that does not contain ignore-loader', () => {
    expect(isIgnoreLoader('css-loader')).toBe(false);
    expect(isIgnoreLoader('sass-loader')).toBe(false);
  });

  it('returns true for an object with a loader property containing ignore-loader', () => {
    expect(isIgnoreLoader({ loader: 'ignore-loader' })).toBe(true);
    expect(
      isIgnoreLoader({
        loader: '/node_modules/next/dist/compiled/ignore-loader/index.js',
      }),
    ).toBe(true);
  });

  it('returns false for an object with a loader property not containing ignore-loader', () => {
    expect(isIgnoreLoader({ loader: 'css-loader' })).toBe(false);
  });

  it('returns true for a single-item array containing an ignore-loader string', () => {
    expect(isIgnoreLoader(['ignore-loader'])).toBe(true);
  });

  it('returns true for a single-item array containing an ignore-loader object', () => {
    expect(isIgnoreLoader([{ loader: 'ignore-loader' }])).toBe(true);
  });

  it('returns false for a multi-item array (ambiguous, treated as not ignore-loader)', () => {
    expect(isIgnoreLoader(['ignore-loader', 'css-loader'])).toBe(false);
  });

  it('returns false for an empty array', () => {
    expect(isIgnoreLoader([])).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// injectExtractLoader
// ---------------------------------------------------------------------------

describe('injectExtractLoader', () => {
  it('inserts the extract loader before css-loader in a matching rule', () => {
    const rule = cssModuleRule();
    injectExtractLoader([rule], EXTRACT_LOADER);

    const cssLoaderIndex = rule.use.findIndex(l => l.loader === CSS_LOADER);
    expect(rule.use[cssLoaderIndex - 1]).toBe(EXTRACT_LOADER);
  });

  it('does not modify rules whose use array does not contain css-loader', () => {
    const rule = { test: /\.js$/, use: [{ loader: 'babel-loader' }] };
    injectExtractLoader([rule], EXTRACT_LOADER);

    expect(rule.use).toEqual([{ loader: 'babel-loader' }]);
  });

  it('does not modify rules with a non-array use value', () => {
    const rule = { test: /\.scss$/, use: 'style-loader' };
    injectExtractLoader([rule], EXTRACT_LOADER);

    expect(rule.use).toBe('style-loader');
  });

  it('does not modify rules with no use property', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const rule = { test: /\.scss$/, loader: 'style-loader' } as any;
    injectExtractLoader([rule], EXTRACT_LOADER);

    expect(rule.loader).toBe('style-loader');
    expect(rule.use).toBeUndefined();
  });

  it('recurses into oneOf blocks', () => {
    const inner = cssModuleRule();
    const outer = { oneOf: [inner] };
    injectExtractLoader([outer], EXTRACT_LOADER);

    const cssIdx = inner.use.findIndex(l => l.loader === CSS_LOADER);
    expect(inner.use[cssIdx - 1]).toBe(EXTRACT_LOADER);
  });

  it('handles multiple rules and only modifies those containing css-loader', () => {
    const withCss = cssModuleRule();
    const withoutCss = { test: /\.js$/, use: [{ loader: 'babel-loader' }] };
    injectExtractLoader([withCss, withoutCss], EXTRACT_LOADER);

    expect(withCss.use).toContain(EXTRACT_LOADER);
    expect(withoutCss.use).not.toContain(EXTRACT_LOADER);
  });

  it('identifies css-loader expressed as a plain string in the use array', () => {
    const rule = {
      test: /\.css$/,
      use: ['style-loader', CSS_LOADER, SASS_LOADER],
    };
    injectExtractLoader([rule], EXTRACT_LOADER);

    const cssIdx = rule.use.indexOf(CSS_LOADER);
    expect(rule.use[cssIdx - 1]).toBe(EXTRACT_LOADER);
  });

  it('does not false-match postcss-loader as css-loader', () => {
    const postCssLoader = '/path/to/postcss-loader/index.js';
    const rule = {
      test: /\.css$/,
      use: [{ loader: 'style-loader' }, { loader: postCssLoader }],
    };
    injectExtractLoader([rule], EXTRACT_LOADER);

    expect(rule.use).not.toContain(EXTRACT_LOADER);
  });
});

// ---------------------------------------------------------------------------
// replaceIgnoreLoaderForScss
// ---------------------------------------------------------------------------

describe('replaceIgnoreLoaderForScss', () => {
  describe('isIgnoreLoader detection via rule.use (string)', () => {
    it('replaces an ignore-loader string rule matching /\\.scss$/', () => {
      const rule = ignoreLoaderRuleString();
      replaceIgnoreLoaderForScss([rule], replacementUse);

      expect(rule.use).toEqual(replacementUse);
    });

    it('replaces an ignore-loader string rule matching /\\.sass$/', () => {
      const rule = ignoreLoaderRuleString(/\.sass$/);
      replaceIgnoreLoaderForScss([rule], replacementUse);

      expect(rule.use).toEqual(replacementUse);
    });
  });

  describe('isIgnoreLoader detection via rule.loader (object path)', () => {
    it('replaces an ignore-loader object rule and removes the loader property', () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const rule = ignoreLoaderRuleObject() as any;
      replaceIgnoreLoaderForScss([rule], replacementUse);

      expect(rule.use).toEqual(replacementUse);
      expect(rule.loader).toBeUndefined();
    });
  });

  describe('isIgnoreLoader detection via rule.use (single-item array)', () => {
    it('replaces an ignore-loader single-item array rule', () => {
      const rule = ignoreLoaderRuleArray();
      replaceIgnoreLoaderForScss([rule], replacementUse);

      expect(rule.use).toEqual(replacementUse);
    });
  });

  describe('test regex matching', () => {
    it('does not replace an ignore-loader rule whose test does not match scss/sass', () => {
      const rule = ignoreLoaderRuleString(/\.css$/);
      replaceIgnoreLoaderForScss([rule], replacementUse);

      expect(rule.use).toBe('ignore-loader');
    });

    it('does not replace an ignore-loader rule with no test', () => {
      const rule = { use: 'ignore-loader' };
      replaceIgnoreLoaderForScss([rule], replacementUse);

      expect(rule.use).toBe('ignore-loader');
    });

    it('does not replace a rule that is not an ignore-loader even if its test matches scss', () => {
      const rule = cssModuleRule();
      const originalUse = [...rule.use];
      replaceIgnoreLoaderForScss([rule], replacementUse);

      expect(rule.use).toEqual(originalUse);
    });
  });

  describe('oneOf recursion', () => {
    // Next.js wraps CSS rules in a oneOf container with no `use` of its own:
    //   { oneOf: [{ test: [/\.css$/, /\.scss$/], use: 'ignore-loader' }, ...] }
    // The recursion ensures we reach the ignore-loader rule inside that wrapper.
    // See the `if (ctx.isServer)` block in:
    // https://github.com/vercel/next.js/blob/v16.2.6/packages/next/src/build/webpack/config/blocks/css/index.ts#L372
    it('recurses into oneOf and replaces matching inner rules', () => {
      const inner = ignoreLoaderRuleString();
      const outer = { test: /\.scss$/, oneOf: [inner] };
      replaceIgnoreLoaderForScss([outer], replacementUse);

      expect(inner.use).toEqual(replacementUse);
    });

    it('does not replace an inner ignore-loader rule that has no test', () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const inner = { use: 'ignore-loader' } as any;
      const outer = { test: /\.scss$/, oneOf: [inner] };
      replaceIgnoreLoaderForScss([outer], replacementUse);

      expect(inner.use).toBe('ignore-loader');
    });

    it('does not replace an inner ignore-loader rule whose test does not match scss', () => {
      const inner = ignoreLoaderRuleString(/\.css$/);
      const outer = { test: /\.scss$/, oneOf: [inner] };
      replaceIgnoreLoaderForScss([outer], replacementUse);

      expect(inner.use).toBe('ignore-loader');
    });

    it('handles deeply nested oneOf blocks', () => {
      const deepInner = ignoreLoaderRuleString();
      const mid = { oneOf: [deepInner] };
      const outer = { test: /\.scss$/, oneOf: [mid] };
      replaceIgnoreLoaderForScss([outer], replacementUse);

      expect(deepInner.use).toEqual(replacementUse);
    });
  });

  describe('mixed rule sets', () => {
    it('only replaces scss ignore-loader rules when mixed with other rules', () => {
      const scssIgnore = ignoreLoaderRuleString();
      const cssIgnore = ignoreLoaderRuleString(/\.css$/);
      const scssModule = cssModuleRule();

      replaceIgnoreLoaderForScss(
        [scssIgnore, cssIgnore, scssModule],
        replacementUse,
      );

      expect(scssIgnore.use).toEqual(replacementUse);
      expect(cssIgnore.use).toBe('ignore-loader');
      expect(scssModule.use).not.toEqual(replacementUse);
    });
  });
});

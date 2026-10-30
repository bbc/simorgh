import path from 'path';
import * as sass from 'sass';
import { getTypographyCustomProperties } from './typography';

const themeProviderPath = path.join(
  process.cwd(),
  'src/app/components/ThemeProviderSCSSModules',
);

const compileSass = (source: string) =>
  sass
    .compileString(
      `@use 'themeTokens' as theme;

${source}`,
      { loadPaths: [themeProviderPath] },
    )
    .css.replace(/\s+/g, ' ');

const compileStaticTypography = () =>
  compileSass(`
.static {
  @include theme.typography-from-scale-and-variant(pica, 'sans-regular');
}`);

const compileRuntimeTypography = () =>
  compileSass(`
.runtime {
  @include theme.typography-from-custom-properties;
}`);

const groupBMediaQuery =
  'min-width: 20rem\\) and \\(max-width: 37\\.4375rem\\)';
const groupDMediaQuery = 'min-width: 37\\.5rem\\)';

const extractRuleDeclarations = (css: string, pattern: RegExp) => {
  const [, body] = css.match(pattern) ?? [];
  if (!body) {
    throw new Error(`Could not find a rule matching ${pattern}`);
  }

  return Object.fromEntries(
    body
      .trim()
      .split(';')
      .filter(Boolean)
      .map(declaration => declaration.trim().split(/:\s*(.+)/)),
  );
};

// font-family, font-style, and font-weight live here too, but they never vary by breakpoint group.
const extractBaseDeclarations = (css: string, selector: string) =>
  extractRuleDeclarations(css, new RegExp(`^${selector} \\{([^}]*)\\}`));

const extractGroupBDeclarations = (css: string, selector: string) =>
  extractRuleDeclarations(
    css,
    new RegExp(`${groupBMediaQuery} \\{ ${selector} \\{([^}]*)\\}`),
  );

const extractGroupDDeclarations = (css: string, selector: string) =>
  extractRuleDeclarations(
    css,
    new RegExp(`${groupDMediaQuery} \\{ ${selector} \\{([^}]*)\\}`),
  );

describe('getTypographyCustomProperties', () => {
  it.each`
    fontVariant            | expectedFamily                                                        | expectedStyle                                                        | expectedWeight
    ${'sansRegularItalic'} | ${'var(--gel-font-variant-sans-regular-italic-font-family, inherit)'} | ${'var(--gel-font-variant-sans-regular-italic-font-style, inherit)'} | ${'var(--gel-font-variant-sans-regular-italic-font-weight, inherit)'}
    ${'sansBold'}          | ${'var(--gel-font-variant-sans-bold-font-family, inherit)'}           | ${'var(--gel-font-variant-sans-bold-font-style, inherit)'}           | ${'var(--gel-font-variant-sans-bold-font-weight, inherit)'}
    ${'serifMediumItalic'} | ${'var(--gel-font-variant-serif-medium-italic-font-family, inherit)'} | ${'var(--gel-font-variant-serif-medium-italic-font-style, inherit)'} | ${'var(--gel-font-variant-serif-medium-italic-font-weight, inherit)'}
    ${'serifLight'}        | ${'var(--gel-font-variant-serif-light-font-family, inherit)'}         | ${'var(--gel-font-variant-serif-light-font-style, inherit)'}         | ${'var(--gel-font-variant-serif-light-font-weight, inherit)'}
    ${'sansLight'}         | ${'var(--gel-font-variant-sans-light-font-family, inherit)'}          | ${'var(--gel-font-variant-sans-light-font-style, inherit)'}          | ${'var(--gel-font-variant-sans-light-font-weight, inherit)'}
  `(
    'maps $fontVariant to family, style, and weight custom properties',
    ({ fontVariant, expectedFamily, expectedStyle, expectedWeight }) => {
      const styles = getTypographyCustomProperties({ fontVariant });

      expect(styles['--gel-font-family']).toBe(expectedFamily);
      expect(styles['--gel-font-style']).toBe(expectedStyle);
      expect(styles['--gel-font-weight']).toBe(expectedWeight);
    },
  );

  it.each`
    size            | expectedScale
    ${'pica'}       | ${'pica'}
    ${'doublePica'} | ${'double-pica'}
  `(
    'maps $size to font-size and line-height custom properties',
    ({ size, expectedScale }) => {
      const styles = getTypographyCustomProperties({ size });

      expect(styles['--gel-font-size-group-a']).toBe(
        `var(--font-size-${expectedScale}-group-a, inherit)`,
      );
      expect(styles['--gel-line-height-group-a']).toBe(
        `var(--line-height-${expectedScale}-group-a, inherit)`,
      );
      expect(styles['--gel-font-size-group-b']).toBe(
        `var(--font-size-${expectedScale}-group-b, inherit)`,
      );
      expect(styles['--gel-line-height-group-b']).toBe(
        `var(--line-height-${expectedScale}-group-b, inherit)`,
      );
      expect(styles['--gel-font-size-group-d']).toBe(
        `var(--font-size-${expectedScale}-group-d, inherit)`,
      );
      expect(styles['--gel-line-height-group-d']).toBe(
        `var(--line-height-${expectedScale}-group-d, inherit)`,
      );
    },
  );

  it('maps size and font variant properties together', () => {
    const styles = getTypographyCustomProperties({
      size: 'doublePica',
      fontVariant: 'serifLight',
    });

    expect(styles).toMatchObject({
      '--gel-font-size-group-a':
        'var(--font-size-double-pica-group-a, inherit)',
      '--gel-line-height-group-a':
        'var(--line-height-double-pica-group-a, inherit)',
      '--gel-font-family':
        'var(--gel-font-variant-serif-light-font-family, inherit)',
      '--gel-font-style':
        'var(--gel-font-variant-serif-light-font-style, inherit)',
      '--gel-font-weight':
        'var(--gel-font-variant-serif-light-font-weight, inherit)',
    });
  });
});

describe('static typography', () => {
  it('references --gel-font-variant-* tokens for font-family, font-style, and font-weight', () => {
    const declarations = extractBaseDeclarations(
      compileStaticTypography(),
      '.static',
    );

    expect(declarations['font-family']).toBe(
      'var(--gel-font-variant-sans-regular-font-family)',
    );
    expect(declarations['font-style']).toBe(
      'var(--gel-font-variant-sans-regular-font-style)',
    );
    expect(declarations['font-weight']).toBe(
      'var(--gel-font-variant-sans-regular-font-weight)',
    );
  });

  it('references --font-size-* and --line-height-* scale tokens for each GEL breakpoint group', () => {
    const css = compileStaticTypography();

    // Group A shares the base rule with the invariant font-family/style/weight declarations above.
    expect(extractBaseDeclarations(css, '.static')).toMatchObject({
      'font-size': 'var(--font-size-pica-group-a)',
      'line-height': 'var(--line-height-pica-group-a)',
    });
    expect(extractGroupBDeclarations(css, '.static')).toEqual({
      'font-size': 'var(--font-size-pica-group-b)',
      'line-height': 'var(--line-height-pica-group-b)',
    });
    expect(extractGroupDDeclarations(css, '.static')).toEqual({
      'font-size': 'var(--font-size-pica-group-d)',
      'line-height': 'var(--line-height-pica-group-d)',
    });
  });
});

describe('runtime typography', () => {
  it('references --gel-font-family, --gel-font-style, and --gel-font-weight with inherit fallbacks', () => {
    const declarations = extractBaseDeclarations(
      compileRuntimeTypography(),
      '.runtime',
    );

    expect(declarations['font-family']).toBe('var(--gel-font-family, inherit)');
    expect(declarations['font-style']).toBe('var(--gel-font-style, inherit)');
    expect(declarations['font-weight']).toBe('var(--gel-font-weight, inherit)');
  });

  it('references --gel-font-size-* and --gel-line-height-* custom properties, with inherit fallbacks, for each GEL breakpoint group', () => {
    const css = compileRuntimeTypography();

    // Group A shares the base rule with the invariant font-family/style/weight declarations above.
    expect(extractBaseDeclarations(css, '.runtime')).toMatchObject({
      'font-size': 'var(--gel-font-size-group-a, inherit)',
      'line-height': 'var(--gel-line-height-group-a, inherit)',
    });
    expect(extractGroupBDeclarations(css, '.runtime')).toEqual({
      'font-size': 'var(--gel-font-size-group-b, inherit)',
      'line-height': 'var(--gel-line-height-group-b, inherit)',
    });
    expect(extractGroupDDeclarations(css, '.runtime')).toEqual({
      'font-size': 'var(--gel-font-size-group-d, inherit)',
      'line-height': 'var(--gel-line-height-group-d, inherit)',
    });
  });
});

import path from 'path';
import * as sass from 'sass';
import { getTypographyStyles } from './typography';

const themeProviderPath = path.join(
  process.cwd(),
  'src/app/components/ThemeProviderSCSSModules',
);

const compileTypography = () =>
  sass
    .compileString(
      `@use 'themeTokens' as theme;

.static {
  @include theme.typography-from-scale-and-variant(pica, 'sans-regular');
}

.dynamic {
  @include theme.typography-from-custom-properties;
}`,
      { loadPaths: [themeProviderPath] },
    )
    .css.replace(/\s+/g, ' ');

describe('getTypographyStyles', () => {
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
      const styles = getTypographyStyles({ fontVariant });

      expect(styles['--gel-typography-font-family']).toBe(expectedFamily);
      expect(styles['--gel-typography-font-style']).toBe(expectedStyle);
      expect(styles['--gel-typography-font-weight']).toBe(expectedWeight);
    },
  );
});

describe('typography mixins', () => {
  it('emits size and variant declarations for compile-known typography', () => {
    const css = compileTypography();

    expect(css).toContain(
      '.static { font-family: var(--gel-font-variant-sans-regular-font-family); font-style: var(--gel-font-variant-sans-regular-font-style); font-weight: var(--gel-font-variant-sans-regular-font-weight); font-size: var(--font-size-pica-group-a); line-height: var(--line-height-pica-group-a); }',
    );
  });

  it('uses the GEL font breakpoints for both typography paths', () => {
    const css = compileTypography();

    expect(
      css.match(/@media \(min-width: 20rem\) and \(max-width: 37\.4375rem\)/g),
    ).toHaveLength(2);
    expect(css.match(/@media \(min-width: 37\.5rem\)/g)).toHaveLength(2);
  });
});

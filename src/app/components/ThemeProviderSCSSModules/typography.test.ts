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

.self {
  @include theme.typography-gel-font-styles;
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
  it('uses the GEL font breakpoints for responsive typography', () => {
    const css = compileTypography();

    expect(css).toContain(
      '@media (min-width: 20rem) and (max-width: 37.4375rem)',
    );
    expect(css).toContain('@media (min-width: 37.5rem)');
  });
});

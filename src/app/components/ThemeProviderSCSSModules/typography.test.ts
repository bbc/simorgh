import path from 'path';
import * as sass from 'sass';

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

describe('typography mixins', () => {
  it('uses the GEL font breakpoints for responsive typography', () => {
    const css = compileTypography();

    expect(css).toContain(
      '@media (min-width: 20rem) and (max-width: 37.4375rem)',
    );
    expect(css).toContain('@media (min-width: 37.5rem)');
  });
});

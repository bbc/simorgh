import path from 'path';
import * as sass from 'sass';

const fontVariantsPath = path.join(
  process.cwd(),
  'src/app/components/ThemeProviderSCSSModules/fontVariants',
);

const compileVariant = (variant: string, fallbacks: string[] = []) => {
  const fallbackArguments = fallbacks
    .map(fallback => `'${fallback}'`)
    .join(', ');

  return sass
    .compileString(
      `@use 'fontVariantAliases' as aliases;

:root {
  @include aliases.define-font-variant('${variant}'${fallbackArguments ? `, ${fallbackArguments}` : ''});
}`,
      { loadPaths: [fontVariantsPath] },
    )
    .css.replace(/\s+/g, ' ');
};

describe('fontVariantAliases', () => {
  it('builds a fallback chain in the declared order', () => {
    const css = compileVariant('serif-light', ['serif-medium', 'sans-regular']);

    expect(css).toContain(
      '--gel-font-variant-serif-light-font-family: var(--serif-light-font-family, var(--serif-medium-font-family, var(--sans-regular-font-family, inherit)));',
    );
    expect(css).toContain(
      '--gel-font-variant-serif-light-font-style: var(--serif-light-font-style, var(--serif-medium-font-style, var(--sans-regular-font-style, inherit)));',
    );
    expect(css).toContain(
      '--gel-font-variant-serif-light-font-weight: var(--serif-light-font-weight, var(--serif-medium-font-weight, var(--sans-regular-font-weight, inherit)));',
    );
  });

  it('uses inherit as the final fallback for a direct variant', () => {
    const css = compileVariant('sans-regular');

    expect(css).toContain(
      '--gel-font-variant-sans-regular-font-family: var(--sans-regular-font-family, inherit);',
    );
    expect(css).toContain(
      '--gel-font-variant-sans-regular-font-style: var(--sans-regular-font-style, inherit);',
    );
    expect(css).toContain(
      '--gel-font-variant-sans-regular-font-weight: var(--sans-regular-font-weight, inherit);',
    );
  });
});

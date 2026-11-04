import path from 'path';
import * as sass from 'sass';

const themeProviderPath = path.join(
  process.cwd(),
  'src/app/components/ThemeProviderSCSSModules',
);

const compileFile = (relativePath: string) =>
  sass.compile(path.join(themeProviderPath, relativePath)).css;

const normalise = (css: string) => css.replace(/\s+/g, ' ').trim();

describe('pwaTypography/reith.scss', () => {
  const css = normalise(compileFile('pwaTypography/reith.scss'));

  it('applies only within PWA display modes', () => {
    expect(css).toContain(
      '@media (display-mode: standalone), (display-mode: minimal-ui), (display-mode: fullscreen), (display-mode: window-controls-overlay) {',
    );

    const beforeMediaQuery = css.slice(0, css.indexOf('@media'));

    expect(beforeMediaQuery).toBe('');
  });

  it('overrides the font variant custom properties with Reith', () => {
    expect(css).toContain(
      "--sans-regular-font-family: 'ReithSans', Helvetica, Arial, sans-serif;",
    );
    expect(css).toContain(
      "--sans-bold-font-family: 'ReithSans', Helvetica, Arial, sans-serif;",
    );
    expect(css).toContain(
      "--serif-medium-font-family: 'ReithSerif', Helvetica, Arial, sans-serif;",
    );
    expect(css).toContain(
      "--serif-light-font-family: 'ReithSerif', Helvetica, Arial, sans-serif;",
    );
  });

  it('declares the same Reith font faces as the shared font face files', () => {
    const sharedFontFaces = [
      'fontFaces/reith-sans-regular.scss',
      'fontFaces/reith-sans-bold.scss',
      'fontFaces/reith-serif-medium.scss',
      'fontFaces/reith-serif-light.scss',
    ];

    sharedFontFaces.forEach(fontFace => {
      const fontUrls = normalise(compileFile(fontFace)).match(
        /url\([^)]+\)/g,
      ) as string[];

      expect(fontUrls).toHaveLength(2);
      fontUrls.forEach(fontUrl => expect(css).toContain(fontUrl));
    });
  });

  it('does not alter the font size scale, which stays service specific', () => {
    expect(css).not.toContain('--font-size-');
    expect(css).not.toContain('--line-height-');
  });
});

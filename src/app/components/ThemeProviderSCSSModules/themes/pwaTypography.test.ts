import fs from 'fs';
import path from 'path';

const componentsPath = path.join(process.cwd(), 'src/app/components');
const emotionThemesPath = path.join(componentsPath, 'ThemeProvider/themes');
const scssThemesPath = path.join(
  componentsPath,
  'ThemeProviderSCSSModules/themes',
);

const PWA_TYPOGRAPHY_IMPORT = "import '../../pwaTypography/reith.scss';";

const themeFiles = (directory: string) =>
  fs
    .readdirSync(directory, { recursive: true, encoding: 'utf8' })
    .filter(file => file.endsWith('.ts') && !file.endsWith('.test.ts'));

const emotionThemesWithPwaTypography = themeFiles(emotionThemesPath)
  .filter(file =>
    fs
      .readFileSync(path.join(emotionThemesPath, file), 'utf8')
      .includes('export const pwaTheme'),
  )
  .map(file => {
    const [service, variant] = file.replace('.ts', '').split(path.sep);

    return variant ? `${service}/${variant}` : `${service}/${service}`;
  })
  .sort();

const scssThemesWithPwaTypography = themeFiles(scssThemesPath)
  .filter(file =>
    fs
      .readFileSync(path.join(scssThemesPath, file), 'utf8')
      .includes(PWA_TYPOGRAPHY_IMPORT),
  )
  .map(file => file.replace('.ts', '').split(path.sep).join('/'))
  .sort();

describe('PWA typography service parity', () => {
  it('is enabled for the same services as the Emotion ThemeProvider', () => {
    expect(emotionThemesWithPwaTypography.length).toBeGreaterThan(0);
    expect(scssThemesWithPwaTypography).toEqual(emotionThemesWithPwaTypography);
  });

  it('is imported after the base font variants so it wins the cascade', () => {
    scssThemesWithPwaTypography.forEach(theme => {
      const contents = fs.readFileSync(
        path.join(scssThemesPath, `${theme}.ts`),
        'utf8',
      );

      expect(contents.indexOf(PWA_TYPOGRAPHY_IMPORT)).toBeGreaterThan(
        contents.indexOf("import '../../fontVariants/"),
      );
    });
  });

  it('is not imported by services without PWA typography', () => {
    const servicesWithoutPwaTypography = themeFiles(scssThemesPath)
      .map(file => file.replace('.ts', '').split(path.sep).join('/'))
      .filter(theme => !scssThemesWithPwaTypography.includes(theme));

    expect(servicesWithoutPwaTypography).toContain('news/news');
    servicesWithoutPwaTypography.forEach(theme => {
      expect(
        fs.readFileSync(path.join(scssThemesPath, `${theme}.ts`), 'utf8'),
      ).not.toContain(PWA_TYPOGRAPHY_IMPORT);
    });
  });
});

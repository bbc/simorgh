import latinWithDiacriticsScript from '../../ThemeProvider/fontScripts/latinWithDiacritics';
import reithVariants from '../../ThemeProvider/fontVariants/reith';
import brandSVG from '../../ThemeProvider/chameleonLogos/mundo';

const mundoTheme = {
  palette: {
    'brand-background': 'var(--postbox)',
    'brand-logo': 'var(--white)',
    'brand-foreground': 'var(--ghost)',
    'brand-highlight': 'var(--white)',
    'brand-border': 'var(--postbox-30)',
  },
  typography: {
    script: latinWithDiacriticsScript,
    fontVariants: reithVariants,
    fontFaces: [
      'reith-sans-bold',
      'reith-sans-regular',
      'reith-serif-medium',
      'reith-serif-light',
    ],
  },
  brandSVG,
};

export default mundoTheme;

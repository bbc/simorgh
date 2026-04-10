/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
import SERVICES from '#app/lib/config/services';
import { Services, ServicesVariantsProps } from '#app/models/types/global';
import * as emotionReact from '@emotion/react';
import defaultServiceVariants from '#app/lib/config/services/defaultServiceVariants';
import serviceConfigs from '#src/server/utilities/serviceConfigs';
import getFontFaces, * as fontFaces from './fontFaces';
import { themes, pwaThemes } from './__mocks__/themes';

const themeSpy = jest.spyOn(emotionReact, 'useTheme');

interface LoadFontFaces extends ServicesVariantsProps {
  isPWA?: boolean;
}

const preload = ({ service, variant, isPWA = false }: LoadFontFaces) => {
  let theme: emotionReact.Theme;

  if (isPWA) {
    if (variant) {
      theme = pwaThemes[service][variant];
    } else {
      theme = pwaThemes[service];
    }
  } else if (variant) {
    theme = themes[service][variant];
  } else {
    theme = themes[service];
  }

  themeSpy.mockImplementationOnce(() => theme);
};

const getFontNames = ({ service, variant, isPWA = false }: LoadFontFaces) => {
  preload({ service, variant, isPWA });
  return getFontFaces().map(({ name }) => name);
};

const getFonts = ({ service, variant, isPWA = false }: LoadFontFaces) => {
  preload({ service, variant, isPWA });
  return getFontFaces();
};

const reithFontsDir = 'REITH_FONTS_DIR';

const servicesWithPWA = Object.keys(pwaThemes) as Services[];

const servicesWithNoFonts = Object.entries(themes)
  .map(([service, theme]) => {
    const variant = defaultServiceVariants[service];
    const baseTheme = variant ? theme[variant] : theme;

    if (baseTheme.fontFaces.length === 0) {
      return service;
    }
  })
  .filter(Boolean) as Services[];

const servicesWithFonts = SERVICES.filter(
  service => !servicesWithNoFonts.includes(service),
);

describe('Font Faces', () => {
  it('exports font faces', () => {
    expect(Object.keys(fontFaces)).toMatchInlineSnapshot(`
     [
       "NOTO_SANS_ETHIOPIC_BOLD",
       "NOTO_SANS_ETHIOPIC_REGULAR",
       "NOTO_SANS_GUJARATI_BOLD",
       "NOTO_SANS_GUJARATI_REGULAR",
       "NOTO_SANS_TAMIL_BOLD",
       "NOTO_SANS_TAMIL_REGULAR",
       "NOTO_SANS_TELUGU_BOLD",
       "NOTO_SANS_TELUGU_REGULAR",
       "NOTO_SERIF_BENGALI_BOLD",
       "NOTO_SERIF_BENGALI_REGULAR",
       "NOTO_SERIF_SINHALA_BOLD",
       "NOTO_SERIF_SINHALA_REGULAR",
       "PADAUK_BOLD",
       "PADAUK_REGULAR",
       "REITH_FONTS_DIR",
       "REITH_QALAM_BOLD",
       "REITH_QALAM_REGULAR",
       "REITH_SANS_BOLD",
       "REITH_SANS_REGULAR",
       "REITH_SERIF_LIGHT",
       "REITH_SERIF_MEDIUM",
       "default",
       "fontInfo",
     ]
    `);
  });

  it(`exports ${reithFontsDir} as a string`, () => {
    expect(typeof fontFaces[reithFontsDir]).toBe('string');
  });

  it.each(
    Object.entries(fontFaces).filter(
      ([fontID]) => ![reithFontsDir, 'default', 'fontInfo'].includes(fontID),
    ),
  )('%s font has expected properties', (fontId, fontDefinition) => {
    expect(fontDefinition).toHaveProperty('@font-face');

    const font = fontDefinition['@font-face'];

    // Mandatory properties for all fonts
    expect(font).toHaveProperty('fontDisplay');
    expect(font).toHaveProperty('fontFamily');
    expect(font).toHaveProperty('fontWeight');
    expect(font).toHaveProperty('name');
    expect(font).toHaveProperty('src');

    if (
      ![
        'REITH_SANS_BOLD',
        'REITH_SANS_REGULAR',
        'REITH_SERIF_LIGHT',
        'REITH_SERIF_MEDIUM',
      ].includes(fontId)
    ) {
      expect(font).toHaveProperty('fontStyle');
    }
  });

  const getVariantsForService = (service: Services) => {
    const defaultVariant = defaultServiceVariants[service];

    if (defaultVariant) {
      const otherVariant =
        serviceConfigs[service][defaultVariant]?.scriptLink?.variant;

      return [defaultVariant, otherVariant].filter(Boolean);
    }

    return [];
  };

  const runFontPropertyAssertions = (fonts: fontFaces.FontInfo[]) => {
    expect(fonts.length).toBeGreaterThan(0);

    fonts.forEach((font: { name: string | string[] }) => {
      expect(font).toHaveProperty('name');
      expect(font).toHaveProperty('src');
      expect(font).toHaveProperty('fontFamily');
      expect(font).toHaveProperty('fontWeight');
      expect(font).toHaveProperty('fontDisplay');
      expect(font).toHaveProperty('downloadSrc');

      if (font.name.includes('Reith')) {
        expect(font).toHaveProperty('version');
      }
    });
  };

  describe('Get Font Faces', () => {
    describe.each(servicesWithFonts)(
      'Service with font has expected properties for',
      service => {
        const variants = getVariantsForService(service);

        if (variants.length > 0) {
          it.each(variants)(`${service} with variant %s`, variant => {
            runFontPropertyAssertions(getFonts({ service, variant }));
          });
        } else {
          it(`${service}`, () => {
            runFontPropertyAssertions(getFonts({ service }));
          });
        }
      },
    );

    it.each([
      'archive',
      'cymrufyw',
      'magyarul',
      'mundo',
      'naidheachdan',
      'news',
      'newsround',
      'mundo',
      'polska',
      'portuguese',
      'romania',
      'russian',
      'scotland',
      'sport',
      'turkce',
      'ws',
    ] as Services[])('returns Reith fonts for %s', service => {
      const loadedFonts = getFontNames({ service });

      expect(loadedFonts).toStrictEqual([
        'BBCReithSans_W_Bd',
        'BBCReithSans_W_Rg',
        'BBCReithSerif_WNumbers_Lt',
        'BBCReithSerif_W_Md',
      ]);
    });

    it.each(['arabic', 'pashto', 'persian', 'urdu'] as Services[])(
      'returns Reith Qalam fonts for %s',
      service => {
        const loadedFonts = getFontNames({ service });

        expect(loadedFonts).toStrictEqual([
          'BBCReithQalam_W_Bd',
          'BBCReithQalam_W_Rg',
        ]);
      },
    );

    it('returns Noto Sinhala fonts for sinhala', () => {
      const loadedFonts = getFontNames({ service: 'sinhala' });

      expect(loadedFonts).toStrictEqual([
        'Noto_Serif_Sinhala',
        'Noto_Serif_Sinhala_Bold',
      ]);
    });

    it('returns Noto Bengali fonts for bengali', () => {
      const loadedFonts = getFontNames({ service: 'bengali' });

      expect(loadedFonts).toStrictEqual([
        'Noto_Serif_Bengali',
        'Noto_Serif_Bengali_Bold',
      ]);
    });

    it('returns Noto Tamil fonts for tamil', () => {
      const loadedFonts = getFontNames({ service: 'tamil' });

      expect(loadedFonts).toStrictEqual([
        'Noto_Sans_Tamil',
        'Noto_Sans_Tamil_Bold',
      ]);
    });

    it('returns Noto Telugu fonts for telugu', () => {
      const loadedFonts = getFontNames({ service: 'telugu' });

      expect(loadedFonts).toStrictEqual([
        'Noto_Sans_Telugu',
        'Noto_Sans_Telugu_Bold',
      ]);
    });

    it('returns Noto Gujarati fonts for gujarati', () => {
      const loadedFonts = getFontNames({ service: 'gujarati' });

      expect(loadedFonts).toStrictEqual([
        'Noto_Sans_Gujarati',
        'Noto_Sans_Gujarati_Bold',
      ]);
    });

    it.each(['amharic', 'tigrinya'] as Services[])(
      'returns Noto Ethiopic fonts for %s',
      service => {
        const loadedFonts = getFontNames({ service });

        expect(loadedFonts).toStrictEqual([
          'Noto_Sans_Ethiopic',
          'Noto_Sans_Ethiopic_Bold',
        ]);
      },
    );

    it('returns Padauk fonts for burmese', () => {
      const loadedFonts = getFontNames({ service: 'burmese' });

      expect(loadedFonts).toStrictEqual(['Padauk', 'Padauk_Bold']);
    });

    const assertReithFonts = (fonts: string[]) => {
      expect(fonts).toStrictEqual([
        'BBCReithSans_W_Bd',
        'BBCReithSans_W_Rg',
        'BBCReithSerif_WNumbers_Lt',
        'BBCReithSerif_W_Md',
      ]);
    };

    describe.each([true, false])('when isPWA is %s', isPWA => {
      if (isPWA) {
        describe('and service has PWA configured returns Reith fonts for', () => {
          describe.each(servicesWithPWA)('', service => {
            const variants = getVariantsForService(service);

            if (variants.length > 0) {
              it.each(variants)(`${service} with variant %s`, variant => {
                assertReithFonts(getFontNames({ service, variant, isPWA }));
              });
            } else {
              it(`${service}`, () => {
                assertReithFonts(getFontNames({ service, isPWA }));
              });
            }
          });
        });
      } else {
        describe('and service has PWA configured returns no fonts for', () => {
          describe.each(servicesWithPWA)('', service => {
            const variants = getVariantsForService(service);

            if (variants.length > 0) {
              it.each(variants)(`${service} with variant %s`, variant => {
                expect(getFontNames({ service, variant, isPWA })).toStrictEqual(
                  [],
                );
              });
            } else {
              it(`${service}`, () => {
                expect(getFontNames({ service, isPWA })).toStrictEqual([]);
              });
            }
          });
        });
      }
    });

    describe.each(
      servicesWithNoFonts.filter(
        service => !servicesWithPWA.includes(service),
      ) as Services[],
    )(
      'returns no fonts for service without fonts and does not have PWA configured for',
      service => {
        const variants = getVariantsForService(service);

        if (variants.length > 0) {
          it.each(variants)(`${service} with variant %s`, variant => {
            expect(getFontNames({ service, variant })).toStrictEqual([]);
          });
        } else {
          it(`${service}`, () => {
            expect(getFontNames({ service })).toStrictEqual([]);
          });
        }
      },
    );
  });
});

import { services } from '#app/lib/config/services/loadableConfig';
import { Services, ServicesVariantsProps } from '#app/models/types/global';
import * as emotionReact from '@emotion/react';
import defaultServiceVariants from '#app/lib/config/services/defaultServiceVariants';
import serviceConfigs from '#src/server/utilities/serviceConfigs';
import FontFaces, * as fontFaces from './fontFaces';
import themes from './__mocks__/themes';

const themeSpy = jest.spyOn(emotionReact, 'useTheme');

const loadFontFaces = ({ service, variant }: ServicesVariantsProps) => {
  let theme: emotionReact.Theme;

  if (variant) {
    theme = themes[service][variant];
  } else {
    theme = themes[service];
  }

  themeSpy.mockImplementationOnce(() => theme);

  // @ts-expect-error Property 'name' does not exist on type 'FontFace | undefined'.ts(2339)
  return FontFaces().map(({ name }) => name);
};

const reithFontsDir = 'REITH_FONTS_DIR';

const reithServices: Services[] = [
  'cymrufyw',
  'naidheachdan',
  'news',
  'newsround',
  'mundo',
  'polska',
  'portuguese',
  'russian',
  'sport',
  'turkce',
  'ws',
];

const reithQalamServices: Services[] = ['arabic', 'pashto', 'persian', 'urdu'];

const notoSinhalaServices: Services[] = ['sinhala'];

const notoBengaliServices: Services[] = ['bengali'];

const notoTamilServices: Services[] = ['tamil'];

const notoTeluguServices: Services[] = ['telugu'];

const notoGujaratiServices: Services[] = ['gujarati'];

const notoEthiopicServices: Services[] = ['amharic', 'tigrinya'];

const padaukServices: Services[] = ['burmese'];

const servicesWithNoFonts: Services[] = services.filter(
  service =>
    ![
      ...reithServices,
      ...reithQalamServices,
      ...notoBengaliServices,
      ...notoEthiopicServices,
      ...notoGujaratiServices,
      ...notoSinhalaServices,
      ...notoTamilServices,
      ...notoTeluguServices,
      ...padaukServices,
    ].includes(service as Services),
) as unknown as Services[];

const servicesWithPWA = Object.keys(
  Object.fromEntries(
    Object.entries(themes).filter(
      ([, { usePWATypography }]) => usePWATypography,
    ),
  ),
) as unknown as Services[];

const fontsWithoutFontStyle = [
  'REITH_SANS_BOLD',
  'REITH_SANS_REGULAR',
  'REITH_SERIF_LIGHT',
  'REITH_SERIF_MEDIUM',
];

const fontsWithVersion = [
  'REITH_QALAM_BOLD',
  'REITH_QALAM_REGULAR',
  'REITH_SANS_BOLD',
  'REITH_SANS_REGULAR',
  'REITH_SERIF_LIGHT',
  'REITH_SERIF_MEDIUM',
];

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
     ]
    `);
  });

  it(`exports ${reithFontsDir} as a string`, () => {
    expect(typeof fontFaces[reithFontsDir]).toBe('string');
  });

  it.each(
    Object.entries(fontFaces).filter(
      ([fontID]) => ![reithFontsDir, 'default'].includes(fontID),
    ),
  )('%s font has expected values', (fontId, fontDefinition) => {
    expect(fontDefinition).toHaveProperty('@font-face');

    const font = fontDefinition['@font-face'];

    // Mandatory properties for all fonts
    expect(font).toHaveProperty('downloadSrc');
    expect(font).toHaveProperty('fontDisplay');
    expect(font).toHaveProperty('fontFamily');
    expect(font).toHaveProperty('fontWeight');
    expect(font).toHaveProperty('name');
    expect(font).toHaveProperty('src');

    if (fontsWithVersion.includes(fontId)) {
      expect(font).toHaveProperty('version');
    }

    if (!fontsWithoutFontStyle.includes(fontId)) {
      expect(font).toHaveProperty('fontStyle');
    }
  });

  describe('Get Font Faces', () => {
    it.each(reithServices)('returns Reith fonts for %s', service => {
      const loadedFonts = loadFontFaces({ service });

      expect(loadedFonts).toStrictEqual(
        expect.arrayContaining([
          'BBCReithSans_W_Bd',
          'BBCReithSans_W_Rg',
          'BBCReithSerif_W_Md',
          'BBCReithSerif_WNumbers_Lt',
        ]),
      );
    });

    it.each(reithQalamServices)('returns Reith Qalam fonts for %s', service => {
      const loadedFonts = loadFontFaces({ service });

      expect(loadedFonts).toStrictEqual(
        expect.arrayContaining(['qalamNormal', 'qalamBold']),
      );
    });

    it.each(notoSinhalaServices)(
      'returns Noto Sinhala fonts for %s',
      service => {
        const loadedFonts = loadFontFaces({ service });

        expect(loadedFonts).toStrictEqual(
          expect.arrayContaining([
            'Noto_Serif_Sinhala',
            'Noto_Serif_Sinhala_B',
          ]),
        );
      },
    );

    it.each(notoBengaliServices)(
      'returns Noto Bengali fonts for %s',
      service => {
        const loadedFonts = loadFontFaces({ service });

        expect(loadedFonts).toStrictEqual(
          expect.arrayContaining([
            'Noto_Serif_Bengali_B',
            'Noto_Serif_Bengali',
          ]),
        );
      },
    );

    it.each(notoTamilServices)('returns Noto Tamil fonts for %s', service => {
      const loadedFonts = loadFontFaces({ service });

      expect(loadedFonts).toStrictEqual(
        expect.arrayContaining(['Noto_Sans_Tamil', 'Noto_Sans_Tamil_B']),
      );
    });

    it.each(notoTeluguServices)('returns Noto Telugu fonts for %s', service => {
      const loadedFonts = loadFontFaces({ service });

      expect(loadedFonts).toStrictEqual(
        expect.arrayContaining(['Noto_Sans_Telugu', 'Noto_Sans_Telugu_B']),
      );
    });

    it.each(notoGujaratiServices)(
      'returns Noto Gujarati fonts for %s',
      service => {
        const loadedFonts = loadFontFaces({ service });

        expect(loadedFonts).toStrictEqual(
          expect.arrayContaining([
            'Noto_Sans_Gujarati',
            'Noto_Sans_Gujarati_B',
          ]),
        );
      },
    );

    it.each(notoEthiopicServices)(
      'returns Noto Ethiopic fonts for %s',
      service => {
        const loadedFonts = loadFontFaces({ service });

        expect(loadedFonts).toStrictEqual(
          expect.arrayContaining([
            'Noto_Sans_Ethiopic',
            'Noto_Sans_Ethiopic_B',
          ]),
        );
      },
    );

    it.each(padaukServices)('returns Padauk fonts for %s', service => {
      const loadedFonts = loadFontFaces({ service });

      expect(loadedFonts).toStrictEqual(
        expect.arrayContaining(['Padauk', 'Padauk_B']),
      );
    });

    describe.each(servicesWithNoFonts)('returns no fonts for', service => {
      const defaultVariant = defaultServiceVariants[service];

      if (defaultVariant) {
        // Get other variant & run tests
        const otherVariant =
          serviceConfigs[service][defaultVariant]?.scriptLink?.variant;

        it.each([defaultVariant, otherVariant].filter(Boolean))(
          `${service} with variant %s`,
          variant => {
            const loadedFonts = loadFontFaces({ service, variant });

            expect(loadedFonts).toStrictEqual(expect.arrayContaining([]));
          },
        );
      } else {
        it(`${service}`, () => {
          const loadedFonts = loadFontFaces({ service });

          expect(loadedFonts).toStrictEqual(expect.arrayContaining([]));
        });
      }
    });

    describe('when service has PWA configured returns Reith fonts for', () => {
      it.each(servicesWithPWA)('%s', service => {
        const loadedFonts = loadFontFaces({ service });

        expect(loadedFonts).toStrictEqual(
          expect.arrayContaining([
            'BBCReithSans_W_Bd',
            'BBCReithSans_W_Rg',
            'BBCReithSerif_W_Md',
            'BBCReithSerif_WNumbers_Lt',
          ]),
        );
      });
    });
  });
});

import * as fontFaces from './fontFaces';

const reithFontsDir = 'REITH_FONTS_DIR';

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
       "REITH_SANS_CONDENSED_BOLD",
       "REITH_SANS_CONDENSED_REGULAR",
       "REITH_SANS_EXTRA_BOLD",
       "REITH_SANS_EXTRA_BOLD_ITALIC",
       "REITH_SANS_LIGHT",
       "REITH_SANS_LIGHT_ITALIC",
       "REITH_SANS_MEDIUM",
       "REITH_SANS_REGULAR",
       "REITH_SERIF_BOLD",
       "REITH_SERIF_EXTRA_BOLD",
       "REITH_SERIF_LIGHT",
       "REITH_SERIF_MEDIUM",
       "REITH_SERIF_REGULAR",
     ]
    `);
  });

  it(`exports ${reithFontsDir} as a string`, () => {
    expect(typeof fontFaces[reithFontsDir]).toBe('string');
  });

  it.each(
    Object.entries(fontFaces).filter(
      ([fontID]) => (fontID as unknown as string) !== reithFontsDir,
    ),
  )('%s font has expected values', (_fontId, fontDefinition) => {
    expect(fontDefinition).toHaveProperty('@font-face');

    const font = fontDefinition['@font-face'];

    // Mandatory properties for all fonts
    expect(font).toHaveProperty('src');
    expect(font).toHaveProperty('fontDisplay');
    expect(font).toHaveProperty('fontFamily');

    if (
      ![
        'REITH_SANS_BOLD',
        'REITH_SANS_CONDENSED_BOLD',
        'REITH_SANS_CONDENSED_REGULAR',
        'REITH_SANS_EXTRA_BOLD',
        'REITH_SANS_LIGHT',
        'REITH_SANS_MEDIUM',
        'REITH_SANS_REGULAR',
        'REITH_SERIF_BOLD',
        'REITH_SERIF_EXTRA_BOLD',
        'REITH_SERIF_LIGHT',
        'REITH_SERIF_MEDIUM',
        'REITH_SERIF_REGULAR',
      ].includes(_fontId)
    ) {
      expect(font).toHaveProperty('fontWeight');
      expect(font).toHaveProperty('fontStyle');
    }
  });
});

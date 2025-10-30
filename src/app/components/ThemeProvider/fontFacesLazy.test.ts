import services from '#lib/config/services/serviceList';
import { Services } from '#app/models/types/global';
import fontFacesLazy from './fontFacesLazy';

const getFontFaces = (service: Services, isPWA: boolean) =>
  fontFacesLazy(service, isPWA).map(({ name }) => name);

const reithServices: Services[] = [
  'news',
  'newsround',
  'magyarul',
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

const servicesWithPWA: Services[] = [
  'afaanoromoo',
  'afrique',
  'azeri',
  'gahuza',
  'hausa',
  'igbo',
  'indonesia',
  'kyrgyz',
  'pidgin',
  'serbian',
  'somali',
  'swahili',
  'ukrainian',
  'uzbek',
  'yoruba',
];

const servicesWithoutPWAOrFontOverride = services.filter(
  service =>
    ![
      ...servicesWithPWA,
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

describe('Font Faces Lazy', () => {
  describe('when isPWA is false', () => {
    it.each(reithServices)('returns Reith fonts for %s', service => {
      const fontFaces = getFontFaces(service as Services, false);
      expect(fontFaces).toStrictEqual([
        'BBCReithSans_W_Bd',
        'BBCReithSans_W_Rg',
        'BBCReithSerif_W_Md',
        'BBCReithSerif_WNumbers_Lt',
      ]);
    });

    it.each(reithQalamServices)('returns Reith Qalam fonts for %s', service => {
      const fontFaces = getFontFaces(service as Services, false);
      expect(fontFaces).toStrictEqual(['qalamNormal', 'qalamBold']);
    });

    it.each(notoSinhalaServices)(
      'returns Noto Sinhala fonts for %s',
      service => {
        const fontFaces = getFontFaces(service as Services, false);
        expect(fontFaces).toStrictEqual([
          'Noto_Serif_Sinhala',
          'Noto_Serif_Sinhala_B',
        ]);
      },
    );

    it.each(notoBengaliServices)(
      'returns Noto Bengali fonts for %s',
      service => {
        const fontFaces = getFontFaces(service as Services, false);
        expect(fontFaces).toStrictEqual(['notoserifregular', 'notoserifbold']);
      },
    );

    it.each(notoTamilServices)('returns Noto Tamil fonts for %s', service => {
      const fontFaces = getFontFaces(service as Services, false);
      expect(fontFaces).toStrictEqual(['Noto_Sans_Tamil', 'Noto_Sans_Tamil_B']);
    });

    it.each(notoTeluguServices)('returns Noto Telugu fonts for %s', service => {
      const fontFaces = getFontFaces(service as Services, false);
      expect(fontFaces).toStrictEqual([
        'Noto_Sans_Telugu',
        'Noto_Sans_Telugu_B',
      ]);
    });

    it.each(notoGujaratiServices)(
      'returns Noto Gujarati fonts for %s',
      service => {
        const fontFaces = getFontFaces(service as Services, false);
        expect(fontFaces).toStrictEqual([
          'Noto_Sans_Gujarati',
          'Noto_Sans_Gujarati_B',
        ]);
      },
    );

    it.each(notoEthiopicServices)(
      'returns Noto Ethiopic fonts for %s',
      service => {
        const fontFaces = getFontFaces(service as Services, false);
        expect(fontFaces).toStrictEqual([
          'Noto_Sans_Ethiopic',
          'Noto_Sans_Ethiopic_B',
        ]);
      },
    );

    it.each(padaukServices)('returns Padauk fonts for %s', service => {
      const fontFaces = getFontFaces(service as Services, false);
      expect(fontFaces).toStrictEqual(['Padauk', 'Padauk_B']);
    });

    it.each(servicesWithNoFonts)('returns no fonts for %s', service => {
      const fontFaces = getFontFaces(service as Services, false);
      expect(fontFaces).toStrictEqual([]);
    });
  });

  describe('when isPWA is true', () => {
    it.each(servicesWithPWA)(
      'when service has PWA configured returns Reith fonts for %s',
      service => {
        const fontFaces = getFontFaces(service as Services, true);
        expect(fontFaces).toStrictEqual([
          'BBCReithSans_W_Bd',
          'BBCReithSans_W_Rg',
          'BBCReithSerif_W_Md',
          'BBCReithSerif_WNumbers_Lt',
        ]);
      },
    );

    it.each(servicesWithoutPWAOrFontOverride)(
      'when service does not have PWA configured returns no fonts for %s',
      service => {
        const fontFaces = getFontFaces(service as Services, true);
        expect(fontFaces).toStrictEqual([]);
      },
    );
  });
});

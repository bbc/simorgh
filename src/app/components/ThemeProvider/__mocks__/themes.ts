/* eslint-disable no-param-reassign */
import {
  ServicesWithNoVariants,
  ServicesWithVariants,
  Variants,
} from '#app/models/types/global';

import {
  ServicesWithNoVariantsWithPWATypography,
  ServicesWithVariantsWithPWATypography,
  ServiceTheme,
} from '#app/models/types/theming';
import { Theme } from '@emotion/react';
import {
  theme as afaanoromoo,
  pwaTheme as afaanoromooPWA,
} from '../themes/afaanoromoo';
import { theme as afrique, pwaTheme as afriquePWA } from '../themes/afrique';
import { theme as amharic } from '../themes/amharic';
import { theme as arabic } from '../themes/arabic';
import { theme as archive } from '../themes/archive';
import { theme as azeri, pwaTheme as azeriPWA } from '../themes/azeri';
import { theme as bengali } from '../themes/bengali';
import { theme as burmese } from '../themes/burmese';
import { theme as cymrufyw } from '../themes/cymrufyw';
import { theme as dari } from '../themes/dari';
import { theme as gahuza, pwaTheme as gahuzaPWA } from '../themes/gahuza';
import { theme as gujarati } from '../themes/gujarati';
import { theme as hausa, pwaTheme as hausaPWA } from '../themes/hausa';
import { theme as hindi } from '../themes/hindi';
import { theme as igbo, pwaTheme as igboPWA } from '../themes/igbo';
import {
  theme as indonesia,
  pwaTheme as indonesiaPWA,
} from '../themes/indonesia';
import { theme as japanese } from '../themes/japanese';
import { theme as korean } from '../themes/korean';
import { theme as kyrgyz, pwaTheme as kyrgyzPWA } from '../themes/kyrgyz';
import { theme as magyarul } from '../themes/magyarul';
import { theme as marathi } from '../themes/marathi';
import { theme as mundo } from '../themes/mundo';
import { theme as naidheachdan } from '../themes/naidheachdan';
import { theme as nepali } from '../themes/nepali';
import { theme as news } from '../themes/news';
import { theme as newsround } from '../themes/newsround';
import { theme as pashto } from '../themes/pashto';
import { theme as persian } from '../themes/persian';
import { theme as pidgin, pwaTheme as pidginPWA } from '../themes/pidgin';
import { theme as polska } from '../themes/polska';
import { theme as portuguese } from '../themes/portuguese';
import { theme as punjabi } from '../themes/punjabi';
import { theme as romania } from '../themes/romania';
import { theme as russian } from '../themes/russian';
import { theme as scotland } from '../themes/scotland';
import {
  theme as serbianCyr,
  pwaTheme as serbianCyrPWA,
} from '../themes/serbian/cyr';
import {
  theme as serbianLat,
  pwaTheme as serbianLatPWA,
} from '../themes/serbian/lat';
import { theme as sinhala } from '../themes/sinhala';
import { theme as somali, pwaTheme as somaliPWA } from '../themes/somali';
import { theme as sport } from '../themes/sport';
import { theme as swahili, pwaTheme as swahiliPWA } from '../themes/swahili';
import { theme as tamil } from '../themes/tamil';
import { theme as telugu } from '../themes/telugu';
import { theme as thai } from '../themes/thai';
import { theme as tigrinya } from '../themes/tigrinya';
import { theme as turkce } from '../themes/turkce';
import { theme as ukchinaSimp } from '../themes/ukchina/simp';
import { theme as ukchinaTrad } from '../themes/ukchina/trad';
import {
  theme as ukrainian,
  pwaTheme as ukrainianPWA,
} from '../themes/ukrainian';
import { theme as urdu } from '../themes/urdu';
import {
  theme as uzbekCyr,
  pwaTheme as uzbekCyrPWA,
} from '../themes/uzbek/cyr';
import {
  theme as uzbekLat,
  pwaTheme as uzbekLatPWA,
} from '../themes/uzbek/lat';
import { theme as vietnamese } from '../themes/vietnamese';
import { theme as yoruba, pwaTheme as yorubaPWA } from '../themes/yoruba';
import { theme as zhongwenSimp } from '../themes/zhongwen/simp';
import { theme as zhongwenTrad } from '../themes/zhongwen/trad';
import { theme as ws } from '../themes/ws';

import getThemeConfig from '../getThemeConfig';
import mergeThemeWithPWATypography from '../themes/mergeThemeWithPWATypography';

type ServiceThemeWithNoVariant = {
  [_service in ServicesWithNoVariants['service']]: ServiceTheme;
};

type ServiceThemeWithVariant = {
  [_service in ServicesWithVariants['service']]: {
    [_variant in Variants]?: ServiceTheme;
  };
};

const themesNoVariants: ServiceThemeWithNoVariant = {
  afaanoromoo,
  afrique,
  amharic,
  arabic,
  archive,
  azeri,
  bengali,
  burmese,
  cymrufyw,
  dari,
  gahuza,
  gujarati,
  hausa,
  hindi,
  igbo,
  indonesia,
  japanese,
  korean,
  kyrgyz,
  magyarul,
  marathi,
  mundo,
  naidheachdan,
  nepali,
  news,
  newsround,
  pashto,
  persian,
  pidgin,
  polska,
  portuguese,
  punjabi,
  romania,
  russian,
  scotland,
  sinhala,
  somali,
  sport,
  swahili,
  tamil,
  telugu,
  thai,
  tigrinya,
  turkce,
  urdu,
  vietnamese,
  ws,
  yoruba,
};

const themesWithVariants: ServiceThemeWithVariant = {
  serbian: {
    cyr: serbianCyr,
    lat: serbianLat,
  },
  ukchina: {
    simp: ukchinaSimp,
    trad: ukchinaTrad,
  },
  ukrainian: {
    default: ukrainian,
  },
  uzbek: {
    cyr: uzbekCyr,
    lat: uzbekLat,
  },
  zhongwen: {
    simp: zhongwenSimp,
    trad: zhongwenTrad,
  },
};

type ThemeWithNoVariant = {
  [_service in ServicesWithNoVariants['service']]: Theme;
};

type ThemeWithVariant = {
  [_service in ServicesWithVariants['service']]: {
    [_variant in Variants]?: Theme;
  };
};

const defaultThemeProps = { isLite: false, isDarkUi: false };

export const themes = [
  ...Object.entries(themesNoVariants),
  ...Object.entries(themesWithVariants),
].reduce((themeConfig, [service, serviceTheme]) => {
  themeConfig[service] = {};

  if (Object.keys(themesNoVariants).includes(service)) {
    // @ts-expect-error service theme
    themeConfig[service] = getThemeConfig({
      ...defaultThemeProps,
      ...serviceTheme,
    });
  } else {
    Object.entries(serviceTheme).forEach(([variant, variantTheme]) => {
      themeConfig[service][variant] = getThemeConfig({
        ...defaultThemeProps,
        ...variantTheme,
      });
    });
  }

  return themeConfig;
}, {}) as ThemeWithVariant | ThemeWithNoVariant;

type ServiceThemeWithNoVariantWithPWATypography = {
  [_service in ServicesWithNoVariantsWithPWATypography['service']]: Partial<ServiceTheme>;
};

type ServiceThemeWithVariantWithPWATypography = {
  [_service in ServicesWithVariantsWithPWATypography['service']]: {
    [_variant in Variants]?: Partial<ServiceTheme>;
  };
};

const pwaThemesNoVariants: ServiceThemeWithNoVariantWithPWATypography = {
  afaanoromoo: afaanoromooPWA,
  afrique: afriquePWA,
  azeri: azeriPWA,
  gahuza: gahuzaPWA,
  hausa: hausaPWA,
  igbo: igboPWA,
  indonesia: indonesiaPWA,
  kyrgyz: kyrgyzPWA,
  pidgin: pidginPWA,
  somali: somaliPWA,
  swahili: swahiliPWA,
  yoruba: yorubaPWA,
};

const pwaThemesWithVariants: ServiceThemeWithVariantWithPWATypography = {
  serbian: {
    cyr: serbianCyrPWA,
    lat: serbianLatPWA,
  },
  ukrainian: { default: ukrainianPWA },
  uzbek: {
    cyr: uzbekCyrPWA,
    lat: uzbekLatPWA,
  },
};

type PWAThemeWithNoVariant = {
  [_service in ServicesWithNoVariantsWithPWATypography['service']]: Theme;
};

type PWAThemeWithVariant = {
  [_service in ServicesWithVariantsWithPWATypography['service']]: {
    [_variant in Variants]?: Theme;
  };
};

export const pwaThemes = [
  ...Object.entries(pwaThemesNoVariants),
  ...Object.entries(pwaThemesWithVariants),
].reduce(
  (pwaThemeConfig, [service, pwaTheme]) => {
    pwaThemeConfig[service] = {};

    if (Object.keys(pwaThemesNoVariants).includes(service)) {
      const [, baseTheme] = Object.entries(themesNoVariants).find(
        ([serviceWithNoVariant]) => service === serviceWithNoVariant,
      ) || ['', { ...ws }];

      const themeWithPWA = mergeThemeWithPWATypography({
        baseTheme,
        pwaTheme: pwaTheme as ServiceTheme,
      });

      pwaThemeConfig[service] = getThemeConfig({
        ...defaultThemeProps,
        ...themeWithPWA,
      });
    } else {
      Object.entries(pwaTheme).forEach(([variant, variantPWATheme]) => {
        const [, baseThemeWithVariant] = Object.entries(
          themesWithVariants,
        ).find(([serviceWithVariant]) => service === serviceWithVariant) || [
          '',
          { default: { ...ws } },
        ];

        const baseTheme = baseThemeWithVariant[
          variant as Variants
        ] as ServiceTheme;

        const themeWithPWA = mergeThemeWithPWATypography({
          baseTheme,
          pwaTheme: variantPWATheme,
        });

        pwaThemeConfig[service][variant] = getThemeConfig({
          ...defaultThemeProps,
          ...themeWithPWA,
        });
      });
    }

    return pwaThemeConfig;
  },
  {} as PWAThemeWithVariant | PWAThemeWithNoVariant,
) as PWAThemeWithVariant | PWAThemeWithNoVariant;

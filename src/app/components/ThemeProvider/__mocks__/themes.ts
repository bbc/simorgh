/* eslint-disable no-param-reassign */
import {
  ServicesWithNoVariants,
  ServicesWithVariants,
  Variants,
} from '#app/models/types/global';

import { ServiceTheme } from '#app/models/types/theming';
import { Theme } from '@emotion/react';
import { theme as afaanoromoo } from '../themes/afaanoromoo';
import { theme as afrique } from '../themes/afrique';
import { theme as amharic } from '../themes/amharic';
import { theme as arabic } from '../themes/arabic';
import { theme as archive } from '../themes/archive';
import { theme as azeri } from '../themes/azeri';
import { theme as bengali } from '../themes/bengali';
import { theme as burmese } from '../themes/burmese';
import { theme as cymrufyw } from '../themes/cymrufyw';
import { theme as dari } from '../themes/dari';
import { theme as gahuza } from '../themes/gahuza';
import { theme as gujarati } from '../themes/gujarati';
import { theme as hausa } from '../themes/hausa';
import { theme as hindi } from '../themes/hindi';
import { theme as igbo } from '../themes/igbo';
import { theme as indonesia } from '../themes/indonesia';
import { theme as japanese } from '../themes/japanese';
import { theme as korean } from '../themes/korean';
import { theme as kyrgyz } from '../themes/kyrgyz';
import { theme as magyarul } from '../themes/magyarul';
import { theme as marathi } from '../themes/marathi';
import { theme as mundo } from '../themes/mundo';
import { theme as naidheachdan } from '../themes/naidheachdan';
import { theme as nepali } from '../themes/nepali';
import { theme as news } from '../themes/news';
import { theme as newsround } from '../themes/newsround';
import { theme as pashto } from '../themes/pashto';
import { theme as persian } from '../themes/persian';
import { theme as pidgin } from '../themes/pidgin';
import { theme as polska } from '../themes/polska';
import { theme as portuguese } from '../themes/portuguese';
import { theme as punjabi } from '../themes/punjabi';
import { theme as romania } from '../themes/romania';
import { theme as russian } from '../themes/russian';
import { theme as scotland } from '../themes/scotland';
import { theme as serbianCyr } from '../themes/serbian/cyr';
import { theme as serbianLat } from '../themes/serbian/lat';
import { theme as sinhala } from '../themes/sinhala';
import { theme as somali } from '../themes/somali';
import { theme as sport } from '../themes/sport';
import { theme as swahili } from '../themes/swahili';
import { theme as tamil } from '../themes/tamil';
import { theme as telugu } from '../themes/telugu';
import { theme as thai } from '../themes/thai';
import { theme as tigrinya } from '../themes/tigrinya';
import { theme as turkce } from '../themes/turkce';
import { theme as ukchinaSimp } from '../themes/ukchina/simp';
import { theme as ukchinaTrad } from '../themes/ukchina/trad';
import { theme as ukrainian } from '../themes/ukrainian';
import { theme as urdu } from '../themes/urdu';
import { theme as uzbekCyr } from '../themes/uzbek/cyr';
import { theme as uzbekLat } from '../themes/uzbek/lat';
import { theme as vietnamese } from '../themes/vietnamese';
import { theme as yoruba } from '../themes/yoruba';
import { theme as zhongwenSimp } from '../themes/zhongwen/simp';
import { theme as zhongwenTrad } from '../themes/zhongwen/trad';
import { theme as ws } from '../themes/ws';
import { theme as klingon } from '../themes/klingon';

import getThemeConfig from '../getThemeConfig';

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
  klingon,
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

const themes = [
  ...Object.entries(themesNoVariants),
  ...Object.entries(themesWithVariants),
].reduce((config, [service, serviceTheme]) => {
  const defaultThemeProps = { isLite: false, isDarkUi: false };
  config[service] = {};

  if (Object.keys(themesNoVariants).includes(service)) {
    // @ts-expect-error service theme
    config[service] = getThemeConfig({
      ...serviceTheme,
      ...defaultThemeProps,
    });
  } else {
    Object.entries(serviceTheme).forEach(([variant, variantTheme]) => {
      config[service][variant] = getThemeConfig({
        ...variantTheme,
        ...defaultThemeProps,
      });
    });
  }

  return config;
}, {}) as unknown as ThemeWithVariant | ThemeWithNoVariant;

export default { ...themes };

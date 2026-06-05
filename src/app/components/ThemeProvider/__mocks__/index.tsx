import type { ReactNode, FC } from 'react';
import defaultServiceVariants from '#app/lib/config/services/defaultServiceVariants';
import {
  Variants,
  ServicesWithVariants,
  ServicesWithNoVariants,
  Services,
} from '#app/models/types/global';

import afaanoromoo from '../themes/afaanoromoo';
import afrique from '../themes/afrique';
import amharic from '../themes/amharic';
import arabic from '../themes/arabic';
import azeri from '../themes/azeri';
import bengali from '../themes/bengali';
import burmese from '../themes/burmese';
import dari from '../themes/dari';
import gahuza from '../themes/gahuza';
import gujarati from '../themes/gujarati';
import hausa from '../themes/hausa';
import hindi from '../themes/hindi';
import igbo from '../themes/igbo';
import indonesia from '../themes/indonesia';
import japanese from '../themes/japanese';
import korean from '../themes/korean';
import kyrgyz from '../themes/kyrgyz';
import magyarul from '../themes/magyarul';
import marathi from '../themes/marathi';
import mundo from '../themes/mundo';
import nepali from '../themes/nepali';
import news from '../themes/news';
import pashto from '../themes/pashto';
import persian from '../themes/persian';
import pidgin from '../themes/pidgin';
import polska from '../themes/polska';
import portuguese from '../themes/portuguese';
import punjabi from '../themes/punjabi';
import romania from '../themes/romania';
import russian from '../themes/russian';
import serbianCyr from '../themes/serbian/cyr';
import serbianLat from '../themes/serbian/lat';
import sinhala from '../themes/sinhala';
import somali from '../themes/somali';
import swahili from '../themes/swahili';
import tamil from '../themes/tamil';
import telugu from '../themes/telugu';
import thai from '../themes/thai';
import tigrinya from '../themes/tigrinya';
import turkce from '../themes/turkce';
import ukchinaSimp from '../themes/ukchina/simp';
import ukchinaTrad from '../themes/ukchina/trad';
import ukrainian from '../themes/ukrainian';
import urdu from '../themes/urdu';
import uzbekCyr from '../themes/uzbek/cyr';
import uzbekLat from '../themes/uzbek/lat';
import vietnamese from '../themes/vietnamese';
import yoruba from '../themes/yoruba';
import zhongwenSimp from '../themes/zhongwen/simp';
import zhongwenTrad from '../themes/zhongwen/trad';
import ws from '../themes/ws';

type ThemeComponent = FC<{ children: ReactNode }>;

type ThemeProviders = {
  [_service in ServicesWithNoVariants['service']]: ThemeComponent;
};

type ThemeProvidersWithVariants = {
  [_service in ServicesWithVariants['service']]: {
    [_variant in Variants]?: ThemeComponent;
  };
};

const themeProvidersNoVariants: ThemeProviders = {
  afaanoromoo,
  afrique,
  amharic,
  arabic,
  azeri,
  bengali,
  burmese,
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
  nepali,
  news,
  pashto,
  persian,
  pidgin,
  polska,
  portuguese,
  punjabi,
  romania,
  russian,
  sinhala,
  somali,
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

const themeProvidersVariants: ThemeProvidersWithVariants = {
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

interface Props {
  service: Services;
  variant?: Variants;
  children: ReactNode;
}

const ThemeProvider = ({ children, service, ...rest }: Props) => {
  const variant = rest.variant || defaultServiceVariants[service];

  let ThemeService: ThemeComponent;

  if (variant && service in themeProvidersVariants) {
    const serviceVariants =
      themeProvidersVariants[service as ServicesWithVariants['service']];

    ThemeService = serviceVariants[variant] as ThemeComponent;
  } else {
    ThemeService =
      themeProvidersNoVariants[service as ServicesWithNoVariants['service']];
  }

  return <ThemeService>{children}</ThemeService>;
};

export default ThemeProvider;

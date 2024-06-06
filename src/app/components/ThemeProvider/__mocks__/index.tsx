import React from 'react';
import { StoryProps } from '../../../models/types/storybook';
import defaultServiceVariants from '../defaultServiceVariants';

import afaanoromoo from '../themes/afaanoromoo';
import afrique from '../themes/afrique';
import amharic from '../themes/amharic';
import arabic from '../themes/arabic';
import archive from '../themes/archive';
import azeri from '../themes/azeri';
import bengali from '../themes/bengali';
import burmese from '../themes/burmese';
import cymrufyw from '../themes/cymrufyw';
import gahuza from '../themes/gahuza';
import gujarati from '../themes/gujarati';
import hausa from '../themes/hausa';
import hindi from '../themes/hindi';
import igbo from '../themes/igbo';
import indonesia from '../themes/indonesia';
import japanese from '../themes/japanese';
import korean from '../themes/korean';
import kyrgyz from '../themes/kyrgyz';
import marathi from '../themes/marathi';
import mundo from '../themes/mundo';
import naidheachdan from '../themes/naidheachdan';
import nepali from '../themes/nepali';
import news from '../themes/news';
import newsround from '../themes/newsround';
import pashto from '../themes/pashto';
import persian from '../themes/persian';
import pidgin from '../themes/pidgin';
import portuguese from '../themes/portuguese';
import punjabi from '../themes/punjabi';
import russian from '../themes/russian';
import scotland from '../themes/scotland';
import serbianCyr from '../themes/serbian/cyr';
import serbianLat from '../themes/serbian/lat';
import sinhala from '../themes/sinhala';
import somali from '../themes/somali';
import sport from '../themes/sport';
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

type ThemeProvider = {
  [index: string]: React.FC<Props> | { [index: string]: React.FC<Props> };
};

const themeProviders: ThemeProvider = {
  afaanoromoo,
  afrique,
  amharic,
  arabic,
  archive,
  azeri,
  bengali,
  burmese,
  cymrufyw,
  gahuza,
  gujarati,
  hausa,
  hindi,
  igbo,
  indonesia,
  japanese,
  korean,
  kyrgyz,
  marathi,
  mundo,
  naidheachdan,
  nepali,
  news,
  newsround,
  pashto,
  persian,
  pidgin,
  portuguese,
  punjabi,
  russian,
  scotland,
  serbian: {
    cyr: serbianCyr,
    lat: serbianLat,
  },
  sinhala,
  somali,
  sport,
  swahili,
  tamil,
  telugu,
  thai,
  tigrinya,
  turkce,
  ukchina: {
    simp: ukchinaSimp,
    trad: ukchinaTrad,
  },
  ukrainian,
  urdu,
  uzbek: {
    cyr: uzbekCyr,
    lat: uzbekLat,
  },
  vietnamese,
  yoruba,
  zhongwen: {
    simp: zhongwenSimp,
    trad: zhongwenTrad,
  },
};

interface Props extends StoryProps {
  children: React.ReactNode;
}

const ThemeProvider = ({ children, service, ...rest }: Props) => {
  let variant = rest.variant || defaultServiceVariants[service];

  // replaces 'default' with the primary variant if no variant is supplied
  if (defaultServiceVariants[service] && variant === 'default') {
    variant = defaultServiceVariants[service];
  }
  const ThemeProviderSynchronous =
    variant === 'default' || !variant
      ? themeProviders[service]
      : // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore - TODO: come back to this
        themeProviders[service][variant];

  return <ThemeProviderSynchronous>{children}</ThemeProviderSynchronous>;
};

export default ThemeProvider;

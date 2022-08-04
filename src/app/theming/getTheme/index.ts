import { Theme } from '@emotion/react';

import * as colours from '../colours';
import * as spacings from '../spacings';
import * as mq from '../mediaQueries';
import * as themes from '../services';

type Service =
  | 'afaanoromoo'
  | 'afrique'
  | 'amharic'
  | 'arabic'
  | 'archive'
  | 'azeri'
  | 'bengali'
  | 'burmese'
  | 'cymrufyw'
  | 'gahuza'
  | 'gujarati'
  | 'hausa'
  | 'hindi'
  | 'igbo'
  | 'indonesia'
  | 'japanese'
  | 'korean'
  | 'kyrgyz'
  | 'marathi'
  | 'mundo'
  | 'naidheachdan'
  | 'nepali'
  | 'news'
  | 'newsround'
  | 'pashto'
  | 'persian'
  | 'pidgin'
  | 'portuguese'
  | 'punjabi'
  | 'russian'
  | 'scotland'
  | 'serbian'
  | 'sinhala'
  | 'somali'
  | 'sport'
  | 'swahili'
  | 'tamil'
  | 'telugu'
  | 'thai'
  | 'tigrinya'
  | 'turkce'
  | 'ukchina'
  | 'ukrainian'
  | 'urdu'
  | 'uzbek'
  | 'vietnamese'
  | 'yoruba'
  | 'zhongwen';

const getTheme = (service: Service): Theme => ({
  colours: {
    ...colours,
    ...themes[service].colours,
  },
  typography: themes[service].typography,
  spacings,
  mq,
});

export default getTheme;

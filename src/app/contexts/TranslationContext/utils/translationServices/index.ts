/*
  Do not import this file into the primary application.
  This file is intended for use by tests only where needed.
  Including this file in the application will cause the
  bundle splitting to stop working.
*/

import { afaanoromoo } from '../../services/afaanoromoo';
import { afrique } from '../../services/afrique';
import { amharic } from '../../services/amharic';
import { arabic } from '../../services/arabic';
import { archive } from '../../services/archive';
import { azeri } from '../../services/azeri';
import { bengali } from '../../services/bengali';
import { burmese } from '../../services/burmese';
import { cymrufyw } from '../../services/cymrufyw';
import { gahuza } from '../../services/gahuza';
import { gujarati } from '../../services/gujarati';
import { hausa } from '../../services/hausa';
import { hindi } from '../../services/hindi';
import { igbo } from '../../services/igbo';
import { indonesia } from '../../services/indonesia';
import { japanese } from '../../services/japanese';
import { korean } from '../../services/korean';
import { kyrgyz } from '../../services/kyrgyz';
import { marathi } from '../../services/marathi';
import { mundo } from '../../services/mundo';
import { naidheachdan } from '../../services/naidheachdan';
import { nepali } from '../../services/nepali';
import { news } from '../../services/news';
import { pashto } from '../../services/pashto';
import { persian } from '../../services/persian';
import { pidgin } from '../../services/pidgin';
import { portuguese } from '../../services/portuguese';
import { punjabi } from '../../services/punjabi';
import { russian } from '../../services/russian';
import { scotland } from '../../services/scotland';
import { sport } from '../../services/sport';
import { serbian } from '../../services/serbian';
import { sinhala } from '../../services/sinhala';
import { somali } from '../../services/somali';
import { swahili } from '../../services/swahili';
import { tamil } from '../../services/tamil';
import { telugu } from '../../services/telugu';
import { thai } from '../../services/thai';
import { tigrinya } from '../../services/tigrinya';
import { turkce } from '../../services/turkce';
import { ukchina } from '../../services/ukchina';
import { ukrainian } from '../../services/ukrainian';
import { urdu } from '../../services/urdu';
import { uzbek } from '../../services/uzbek';
import { vietnamese } from '../../services/vietnamese';
import { yoruba } from '../../services/yoruba';
import { zhongwen } from '../../services/zhongwen';

import { Services, Variants } from '../../../../models/types/global';
import { Translations } from '../../../../models/types/translations';

type AllTranslations = {
  [s in Services]: {
    [v in Variants]: Translations;
  };
};

export default {
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
  pashto,
  persian,
  pidgin,
  portuguese,
  punjabi,
  russian,
  sport,
  scotland,
  serbian,
  sinhala,
  somali,
  swahili,
  tamil,
  telugu,
  thai,
  tigrinya,
  turkce,
  ukchina,
  ukrainian,
  urdu,
  uzbek,
  vietnamese,
  yoruba,
  zhongwen,
} as AllTranslations;

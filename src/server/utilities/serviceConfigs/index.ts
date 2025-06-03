/*
  Do not import this file into the primary application.
  This file is intended for use by tests only where needed.
  Including this file in the application will cause the
  bundle splitting to stop working.
*/

import { service as afaanoromoo } from '../../../app/lib/config/services/afaanoromoo';
import { service as afrique } from '../../../app/lib/config/services/afrique';
import { service as amharic } from '../../../app/lib/config/services/amharic';
import { service as arabic } from '../../../app/lib/config/services/arabic';
import { service as archive } from '../../../app/lib/config/services/archive';
import { service as azeri } from '../../../app/lib/config/services/azeri';
import { service as bengali } from '../../../app/lib/config/services/bengali';
import { service as burmese } from '../../../app/lib/config/services/burmese';
import { service as cymrufyw } from '../../../app/lib/config/services/cymrufyw';
import { service as gahuza } from '../../../app/lib/config/services/gahuza';
import { service as gujarati } from '../../../app/lib/config/services/gujarati';
import { service as hausa } from '../../../app/lib/config/services/hausa';
import { service as hindi } from '../../../app/lib/config/services/hindi';
import { service as igbo } from '../../../app/lib/config/services/igbo';
import { service as indonesia } from '../../../app/lib/config/services/indonesia';
import { service as japanese } from '../../../app/lib/config/services/japanese';
import { service as korean } from '../../../app/lib/config/services/korean';
import { service as kyrgyz } from '../../../app/lib/config/services/kyrgyz';
import { service as marathi } from '../../../app/lib/config/services/marathi';
import { service as mundo } from '../../../app/lib/config/services/mundo';
import { service as naidheachdan } from '../../../app/lib/config/services/naidheachdan';
import { service as nepali } from '../../../app/lib/config/services/nepali';
import { service as news } from '../../../app/lib/config/services/news';
import { service as pashto } from '../../../app/lib/config/services/pashto';
import { service as persian } from '../../../app/lib/config/services/persian';
import { service as pidgin } from '../../../app/lib/config/services/pidgin';
import { service as polska } from '../../../app/lib/config/services/polska';
import { service as portuguese } from '../../../app/lib/config/services/portuguese';
import { service as punjabi } from '../../../app/lib/config/services/punjabi';
import { service as russian } from '../../../app/lib/config/services/russian';
import { service as scotland } from '../../../app/lib/config/services/scotland';
import { service as sport } from '../../../app/lib/config/services/sport';
import { service as serbian } from '../../../app/lib/config/services/serbian';
import { service as sinhala } from '../../../app/lib/config/services/sinhala';
import { service as somali } from '../../../app/lib/config/services/somali';
import { service as swahili } from '../../../app/lib/config/services/swahili';
import { service as tamil } from '../../../app/lib/config/services/tamil';
import { service as telugu } from '../../../app/lib/config/services/telugu';
import { service as thai } from '../../../app/lib/config/services/thai';
import { service as tigrinya } from '../../../app/lib/config/services/tigrinya';
import { service as turkce } from '../../../app/lib/config/services/turkce';
import { service as ukchina } from '../../../app/lib/config/services/ukchina';
import { service as ukrainian } from '../../../app/lib/config/services/ukrainian';
import { service as urdu } from '../../../app/lib/config/services/urdu';
import { service as uzbek } from '../../../app/lib/config/services/uzbek';
import { service as vietnamese } from '../../../app/lib/config/services/vietnamese';
import { service as ws } from '../../../app/lib/config/services/ws';
import { service as yoruba } from '../../../app/lib/config/services/yoruba';
import { service as zhongwen } from '../../../app/lib/config/services/zhongwen';

import { Services, Variants } from '../../../app/models/types/global';
import { ServiceConfig } from '../../../app/models/types/serviceConfig';

type AllServices = {
  [_service in Services]: {
    [_variant in Variants]: ServiceConfig;
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
  polska,
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
  ws,
  yoruba,
  zhongwen,
} as AllServices;

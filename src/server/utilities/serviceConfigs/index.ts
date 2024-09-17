/*
  Do not import this file into the primary application.
  This file is intended for use by tests only where needed.
  Including this file in the application will cause the
  bundle splitting to stop working.
*/

import { service as afaanoromoo } from '#lib/config/services/afaanoromoo';
import { service as afrique } from '#lib/config/services/afrique';
import { service as amharic } from '#lib/config/services/amharic';
import { service as arabic } from '#lib/config/services/arabic';
import { service as archive } from '#lib/config/services/archive';
import { service as azeri } from '#lib/config/services/azeri';
import { service as bengali } from '#lib/config/services/bengali';
import { service as burmese } from '#lib/config/services/burmese';
import { service as cymrufyw } from '#lib/config/services/cymrufyw';
import { service as gahuza } from '#lib/config/services/gahuza';
import { service as gujarati } from '#lib/config/services/gujarati';
import { service as hausa } from '#lib/config/services/hausa';
import { service as hindi } from '#lib/config/services/hindi';
import { service as igbo } from '#lib/config/services/igbo';
import { service as indonesia } from '#lib/config/services/indonesia';
import { service as japanese } from '#lib/config/services/japanese';
import { service as korean } from '#lib/config/services/korean';
import { service as kyrgyz } from '#lib/config/services/kyrgyz';
import { service as marathi } from '#lib/config/services/marathi';
import { service as mundo } from '#lib/config/services/mundo';
import { service as naidheachdan } from '#lib/config/services/naidheachdan';
import { service as nepali } from '#lib/config/services/nepali';
import { service as news } from '#lib/config/services/news';
import { service as pashto } from '#lib/config/services/pashto';
import { service as persian } from '#lib/config/services/persian';
import { service as pidgin } from '#lib/config/services/pidgin';
import { service as portuguese } from '#lib/config/services/portuguese';
import { service as punjabi } from '#lib/config/services/punjabi';
import { service as russian } from '#lib/config/services/russian';
import { service as scotland } from '#lib/config/services/scotland';
import { service as sport } from '#lib/config/services/sport';
import { service as serbian } from '#lib/config/services/serbian';
import { service as sinhala } from '#lib/config/services/sinhala';
import { service as somali } from '#lib/config/services/somali';
import { service as swahili } from '#lib/config/services/swahili';
import { service as tamil } from '#lib/config/services/tamil';
import { service as telugu } from '#lib/config/services/telugu';
import { service as thai } from '#lib/config/services/thai';
import { service as tigrinya } from '#lib/config/services/tigrinya';
import { service as turkce } from '#lib/config/services/turkce';
import { service as ukchina } from '#lib/config/services/ukchina';
import { service as ukrainian } from '#lib/config/services/ukrainian';
import { service as urdu } from '#lib/config/services/urdu';
import { service as uzbek } from '#lib/config/services/uzbek';
import { service as vietnamese } from '#lib/config/services/vietnamese';
import { service as ws } from '#lib/config/services/ws';
import { service as yoruba } from '#lib/config/services/yoruba';
import { service as zhongwen } from '#lib/config/services/zhongwen';

import { Services, Variants } from '#models/types/global';
import { ServiceConfig } from '#models/types/serviceConfig';

type AllServices = {
  [s in Services]: {
    [v in Variants]: ServiceConfig;
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
  ws,
  yoruba,
  zhongwen,
} as AllServices;

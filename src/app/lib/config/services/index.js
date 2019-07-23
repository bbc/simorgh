/* eslint camelcase: [2, {properties: "never"}] */

/*
  Do not import this file into the primary application.
  This file is intended for use by tests only where needed. 
  Including this file in the application will cause the 
  bundle splitting to stop working.
*/
import defaultConfig from './default';

import afaanoromoo from './afaanoromoo';
import afrique from './afrique';
import amharic from './amharic';
import arabic from './arabic';
import azeri from './azeri';
import bengali from './bengali';
import burmese from './burmese';
import cymrufyw from './cymrufyw';
import gahuza from './gahuza';
import gujarati from './gujarati';
import hausa from './hausa';
import hindi from './hindi';
import igbo from './igbo';
import indonesia from './indonesia';
import japanese from './japanese';
import korean from './korean';
import kyrgyz from './kyrgyz';
import marathi from './marathi';
import mundo from './mundo';
import naidheachdan from './naidheachdan';
import nepali from './nepali';
import news from './news';
import pashto from './pashto';
import persian from './persian';
import pidgin from './pidgin';
import portuguese from './portuguese';
import punjabi from './punjabi';
import russian from './russian';
import serbian_lat from './serbian_lat';
import serbian_cyr from './serbian_cyr';
import sinhala from './sinhala';
import somali from './somali';
import swahili from './swahili';
import tamil from './tamil';
import telugu from './telugu';
import thai from './thai';
import tigrinya from './tigrinya';
import turkce from './turkce';
import ukchina_simp from './ukchina_simp';
import ukchina_trad from './ukchina_trad';
import ukrainian from './ukrainian';
import urdu from './urdu';
import uzbek from './uzbek';
import vietnamese from './vietnamese';
import yoruba from './yoruba';
import zhongwen_simp from './zhongwen_simp';
import zhongwen_trad from './zhongwen_trad';

export default {
  default: defaultConfig,

  afaanoromoo,
  afrique,
  amharic,
  arabic,
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
  serbian_lat,
  serbian_cyr,
  sinhala,
  somali,
  swahili,
  tamil,
  telugu,
  thai,
  tigrinya,
  turkce,
  ukchina_simp,
  ukchina_trad,
  ukrainian,
  urdu,
  uzbek,
  vietnamese,
  yoruba,
  zhongwen_simp,
  zhongwen_trad,
};

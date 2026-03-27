import { Services, ServicesWithVariants } from '#app/models/types/global';
import { LoadableTheme } from '#app/models/types/theming';
import loadable from 'next/dynamic';

export const themes: Record<
  Services,
  | LoadableTheme
  | Partial<Record<ServicesWithVariants['variant'], LoadableTheme>>
> = {
  afaanoromoo: loadable(() => import(/* webpackChunkName: "themes-afaanoromoo" */ './afaanoromoo/afaanoromoo')),
  afrique: loadable(() => import(/* webpackChunkName: "themes-afrique" */ './afrique/afrique')),
  amharic: loadable(() => import(/* webpackChunkName: "themes-amharic" */ './amharic/amharic')),
  arabic: loadable(() => import(/* webpackChunkName: "themes-arabic" */ './arabic/arabic')),
  archive: loadable(() => import(/* webpackChunkName: "themes-archive" */ './archive/archive')),
  azeri: loadable(() => import(/* webpackChunkName: "themes-azeri" */ './azeri/azeri')),
  bengali: loadable(() => import(/* webpackChunkName: "themes-bengali" */ './bengali/bengali')),
  burmese: loadable(() => import(/* webpackChunkName: "themes-burmese" */ './burmese/burmese')),
  cymrufyw: loadable(() => import(/* webpackChunkName: "themes-cymrufyw" */ './cymrufyw/cymrufyw')),
  dari: loadable(() => import(/* webpackChunkName: "themes-dari" */ './dari/dari')),
  gahuza: loadable(() => import(/* webpackChunkName: "themes-gahuza" */ './gahuza/gahuza')),
  gujarati: loadable(() => import(/* webpackChunkName: "themes-gujarati" */ './gujarati/gujarati')),
  hausa: loadable(() => import(/* webpackChunkName: "themes-hausa" */ './hausa/hausa')),
  hindi: loadable(() => import(/* webpackChunkName: "themes-hindi" */ './hindi/hindi')),
  igbo: loadable(() => import(/* webpackChunkName: "themes-igbo" */ './igbo/igbo')),
  indonesia: loadable(() => import(/* webpackChunkName: "themes-indonesia" */ './indonesia/indonesia')),
  japanese: loadable(() => import(/* webpackChunkName: "themes-japanese" */ './japanese/japanese')),
  korean: loadable(() => import(/* webpackChunkName: "themes-korean" */ './korean/korean')),
  kyrgyz: loadable(() => import(/* webpackChunkName: "themes-kyrgyz" */ './kyrgyz/kyrgyz')),
  magyarul: loadable(() => import(/* webpackChunkName: "themes-magyarul" */ './magyarul/magyarul')),
  marathi: loadable(() => import(/* webpackChunkName: "themes-marathi" */ './marathi/marathi')),
  mundo: loadable(() => import(/* webpackChunkName: "themes-mundo" */ './mundo/mundo')),
  naidheachdan: loadable(() => import(/* webpackChunkName: "themes-naidheachdan" */ './naidheachdan/naidheachdan')),
  nepali: loadable(() => import(/* webpackChunkName: "themes-nepali" */ './nepali/nepali')),
  news: loadable(() => import(/* webpackChunkName: "themes-news" */ './news/news')),
  newsround: loadable(() => import(/* webpackChunkName: "themes-newsround" */ './newsround/newsround')),
  pashto: loadable(() => import(/* webpackChunkName: "themes-pashto" */ './pashto/pashto')),
  persian: loadable(() => import(/* webpackChunkName: "themes-persian" */ './persian/persian')),
  pidgin: loadable(() => import(/* webpackChunkName: "themes-pidgin" */ './pidgin/pidgin')),
  polska: loadable(() => import(/* webpackChunkName: "themes-polska" */ './polska/polska')),
  portuguese: loadable(() => import(/* webpackChunkName: "themes-portuguese" */ './portuguese/portuguese')),
  punjabi: loadable(() => import(/* webpackChunkName: "themes-punjabi" */ './punjabi/punjabi')),
  romania: loadable(() => import(/* webpackChunkName: "themes-romania" */ './romania/romania')),
  russian: loadable(() => import(/* webpackChunkName: "themes-russian" */ './russian/russian')),
  scotland: loadable(() => import(/* webpackChunkName: "themes-scotland" */ './scotland/scotland')),
  serbian: {
    cyr: loadable(() => import(/* webpackChunkName: "themes-serbian-cyr" */ './serbian/cyr')),
    lat: loadable(() => import(/* webpackChunkName: "themes-serbian-lat" */ './serbian/lat')),
  },
  sinhala: loadable(() => import(/* webpackChunkName: "themes-sinhala" */ './sinhala/sinhala')),
  somali: loadable(() => import(/* webpackChunkName: "themes-somali" */ './somali/somali')),
  sport: loadable(() => import(/* webpackChunkName: "themes-sport" */ './sport/sport')),
  swahili: loadable(() => import(/* webpackChunkName: "themes-swahili" */ './swahili/swahili')),
  tamil: loadable(() => import(/* webpackChunkName: "themes-tamil" */ './tamil/tamil')),
  telugu: loadable(() => import(/* webpackChunkName: "themes-telugu" */ './telugu/telugu')),
  thai: loadable(() => import(/* webpackChunkName: "themes-thai" */ './thai/thai')),
  tigrinya: loadable(() => import(/* webpackChunkName: "themes-tigrinya" */ './tigrinya/tigrinya')),
  turkce: loadable(() => import(/* webpackChunkName: "themes-turkce" */ './turkce/turkce')),
  ukchina: {
    simp: loadable(() => import(/* webpackChunkName: "themes-ukchina-simp" */ './ukchina/simp')),
    trad: loadable(() => import(/* webpackChunkName: "themes-ukchina-trad" */ './ukchina/trad')),
  },
  ukrainian: loadable(() => import(/* webpackChunkName: "themes-ukrainian" */ './ukrainian/ukrainian')),
  urdu: loadable(() => import(/* webpackChunkName: "themes-urdu" */ './urdu/urdu')),
  uzbek: {
    cyr: loadable(() => import(/* webpackChunkName: "themes-uzbek-cyr" */ './uzbek/cyr')),
    lat: loadable(() => import(/* webpackChunkName: "themes-uzbek-lat" */ './uzbek/lat')),
  },
  vietnamese: loadable(() => import(/* webpackChunkName: "themes-vietnamese" */ './vietnamese/vietnamese')),
  ws: loadable(() => import(/* webpackChunkName: "themes-ws" */ './ws/ws')),
  yoruba: loadable(() => import(/* webpackChunkName: "themes-yoruba" */ './yoruba/yoruba')),
  zhongwen: {
    simp: loadable(() => import(/* webpackChunkName: "themes-zhongwen-simp" */ './zhongwen/simp')),
    trad: loadable(() => import(/* webpackChunkName: "themes-zhongwen-trad" */ './zhongwen/trad')),
  },
};

export default themes;

import { Services } from '../../../models/types/global';

type Envs = 'test' | 'live';

const HOME_PAGE_CONFIG: { [service in Services]: { [env in Envs]: string } } = {
  kyrgyz: {
    test: 'cm7682qz7v1t',
    live: 'crg7kj2e52nt',
  },
  afaanoromoo: {
    test: 'c93v2kkzl24t',
    live: 'c44dyn08mejt',
  },
  afrique: {
    test: 'cjln1ww62p1t',
    live: 'cg58k91z9e3t',
  },
  amharic: {
    test: '',
    live: '',
  },
  arabic: {
    test: '',
    live: '',
  },
  archive: {
    test: '',
    live: '',
  },
  azeri: {
    test: '',
    live: '',
  },
  bengali: {
    test: '',
    live: '',
  },
  burmese: {
    test: '',
    live: '',
  },
  cymrufyw: {
    test: '',
    live: '',
  },
  gahuza: {
    test: '',
    live: '',
  },
  gujarati: {
    test: '',
    live: '',
  },
  hausa: {
    test: '',
    live: '',
  },
  hindi: {
    test: '',
    live: '',
  },
  igbo: {
    test: '',
    live: '',
  },
  indonesia: {
    test: '',
    live: '',
  },
  japanese: {
    test: '',
    live: '',
  },
  korean: {
    test: '',
    live: '',
  },
  marathi: {
    test: '',
    live: '',
  },
  mundo: {
    test: '',
    live: '',
  },
  naidheachdan: {
    test: '',
    live: '',
  },
  nepali: {
    test: '',
    live: '',
  },
  news: {
    test: '',
    live: '',
  },
  newsround: {
    test: '',
    live: '',
  },
  pashto: {
    test: '',
    live: '',
  },
  persian: {
    test: '',
    live: '',
  },
  pidgin: {
    test: '',
    live: '',
  },
  portuguese: {
    test: '',
    live: '',
  },
  punjabi: {
    test: '',
    live: '',
  },
  russian: {
    test: '',
    live: '',
  },
  scotland: {
    test: '',
    live: '',
  },
  sport: {
    test: '',
    live: '',
  },
  sinhala: {
    test: '',
    live: '',
  },
  somali: {
    test: '',
    live: '',
  },
  swahili: {
    test: '',
    live: '',
  },
  tamil: {
    test: '',
    live: '',
  },
  telugu: {
    test: '',
    live: '',
  },
  thai: {
    test: '',
    live: '',
  },
  tigrinya: {
    test: '',
    live: '',
  },
  turkce: {
    test: '',
    live: '',
  },
  urdu: {
    test: '',
    live: '',
  },
  uzbek: {
    test: '',
    live: '',
  },
  vietnamese: {
    test: '',
    live: '',
  },
  yoruba: {
    test: '',
    live: '',
  },
  serbian: {
    test: '',
    live: '',
  },
  ukchina: {
    test: '',
    live: '',
  },
  zhongwen: {
    test: '',
    live: '',
  },
  ukrainian: {
    test: '',
    live: '',
  },
};

export default HOME_PAGE_CONFIG;

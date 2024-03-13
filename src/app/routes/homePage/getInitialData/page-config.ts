import { Services } from '../../../models/types/global';

type Envs = 'test' | 'live';

export const HOME_PAGE_CONFIG: {
  [service in Services]: { [env in Envs]: string };
} = {
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
    test: 'cx35pee6zw8t',
    live: 'cg58k91re1gt',
  },
  arabic: {
    test: 'cx35pee6zvpt',
    live: 'cq01ke64p2et',
  },
  archive: {
    test: '',
    live: '',
  },
  azeri: {
    test: 'cx35pee66wwt',
    live: 'c1295dq496yt',
  },
  bengali: {
    test: 'c2eq2ggzz8kt',
    live: 'cg81xp242zxt',
  },
  burmese: {
    test: 'c897lqqzk1zt',
    live: 'cn6rql5k0z5t',
  },
  cymrufyw: {
    test: '',
    live: '',
  },
  gahuza: {
    test: 'c897lqqzkgkt',
    live: 'cz4vn9gy9pyt',
  },
  gujarati: {
    test: 'cnnmzrr14w9t',
    live: 'cx0edn859g0t',
  },
  hausa: {
    test: 'cvp5j11g223t',
    live: 'cy1v5ngp4d9t',
  },
  hindi: {
    test: 'cg8nwjjm7vet',
    live: 'c6z8lgd39q7t',
  },
  igbo: {
    test: 'c44evppzkj4t',
    live: 'cp2dkn6rzj5t',
  },
  indonesia: {
    test: 'ck2nelljke2t',
    live: 'c89lm51033zt',
  },
  japanese: {
    test: 'c44evppzl99t',
    live: 'cn6rql5n51nt',
  },
  korean: {
    test: 'c44evppzrvjt',
    live: 'cm2rq13ed9wt',
  },
  marathi: {
    test: 'ck2nellj5ppt',
    live: 'crezq2dg90mt',
  },
  mundo: {
    test: 'c93v2kkze2rt',
    live: 'c1x6gk9rqmdt',
  },
  naidheachdan: {
    test: '',
    live: '',
  },
  nepali: {
    test: 'c897lqqz91gt',
    live: 'c44d8kpmzlgt',
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
    test: 'c15er11z5g9t',
    live: 'c44d8kpmz42t',
  },
  persian: {
    test: 'c3rpqvvzem3t',
    live: 'c0rp0kp534xt',
  },
  pidgin: {
    test: 'c93v2kkz841t',
    live: 'ck3yk9nz25qt',
  },
  portuguese: {
    test: 'c7pe2jj9l7mt',
    live: 'c0rp0kp57p1t',
  },
  punjabi: {
    test: 'ck2nell96g6t',
    live: 'c0rp0kp5ezmt',
  },
  russian: {
    test: 'c7pe2jj9q7zt',
    live: 'c0rp0kp5l7kt',
  },
  scotland: {
    test: '',
    live: '',
  },
  serbian: {
    test: 'c6zr6pp47w7t',
    live: 'c1x6gk68d8qt',
  },
  sport: {
    test: '',
    live: '',
  },
  sinhala: {
    test: 'c3rpqvv9v6xt',
    live: 'c1x6gk68neqt',
  },
  somali: {
    test: 'cqe6npp928lt',
    live: 'c89m6yjv965t',
  },
  swahili: {
    test: 'cw95pllwe11t',
    live: 'c5q13805z69t',
  },
  tamil: {
    test: 'cvp5j113jjwt',
    live: 'c1x6gk68w9zt',
  },
  telugu: {
    test: 'cp54eww9emgt',
    live: 'c2w0dk010q2t',
  },
  thai: {
    test: 'cjln1ww9v13t',
    live: 'c2w0dk01g2kt',
  },
  tigrinya: {
    test: 'c6zr6pp4e4xt',
    live: 'cq01ke649v0t',
  },
  turkce: {
    test: 'cmvw7884exet',
    live: 'c3eg5kgl56zt',
  },
  ukchina: {
    test: '',
    live: '',
  },
  ukrainian: {
    test: 'cl13j7792ljt',
    live: 'c3eg5kglplrt',
  },
  urdu: {
    test: 'c44evpp9wp1t',
    live: 'c44d8kd7lgzt',
  },
  uzbek: {
    test: 'cvp5j113ngqt',
    live: 'c44d8kd7q4gt',
  },
  vietnamese: {
    test: 'c93v2kk9r7lt',
    live: 'c5q5105m81dt',
  },
  ws: {
    test: '',
    live: '',
  },
  yoruba: {
    test: 'cw95pllwv8rt',
    live: 'cvpk14mq48kt',
  },
  zhongwen: {
    test: 'cw95pll8714t',
    live: 'c5q5105m8qkt',
  },
};

export default HOME_PAGE_CONFIG;

const urls = [
  {
    service: 'afaanoromoo',
    local: '/afaanoromoo/tipohome',
    test: '/afaanoromoo/tipohome',
    live: null,
  },
  {
    service: 'afrique',
    local: '/afrique/tipohome',
    test: '/afrique/tipohome',
    live: null,
  },
  {
    service: 'amharic',
    local: '/amharic/tipohome',
    test: '/amharic/tipohome',
    live: null,
  },
  {
    service: 'arabic',
    local: '/arabic/tipohome',
    test: '/arabic/tipohome',
    live: null,
  },
  {
    service: 'azeri',
    local: '/azeri/tipohome',
    test: '/azeri/tipohome',
    live: null,
  },
  {
    service: 'bengali',
    local: '/bengali/tipohome',
    test: '/bengali/tipohome',
    live: null,
  },
  {
    service: 'burmese',
    local: '/burmese/tipohome',
    test: '/burmese/tipohome',
    live: null,
  },
  {
    service: 'gahuza',
    local: '/gahuza/tipohome',
    test: '/gahuza/tipohome',
    live: null,
  },
  {
    service: 'gujarati',
    local: '/gujarati/tipohome',
    test: '/gujarati/tipohome',
    live: null,
  },
  {
    service: 'hausa',
    local: '/hausa/tipohome',
    test: '/hausa/tipohome',
    live: null,
  },
  {
    service: 'hindi',
    local: '/hindi/tipohome',
    test: '/hindi/tipohome',
    live: null,
  },
  {
    service: 'igbo',
    local: '/igbo/tipohome',
    test: '/igbo/tipohome',
    live: null,
  },
  {
    service: 'indonesia',
    local: '/indonesia/tipohome',
    test: '/indonesia/tipohome',
    live: null,
  },
  {
    service: 'japanese',
    local: '/japanese/tipohome',
    test: '/japanese/tipohome',
    live: null,
  },
  {
    service: 'korean',
    local: '/korean/tipohome',
    test: '/korean/tipohome',
    live: null,
  },
  {
    service: 'kyrgyz',
    local: '/kyrgyz/tipohome',
    test: '/kyrgyz/tipohome',
    live: null,
  },
  {
    service: 'marathi',
    local: '/marathi/tipohome',
    test: '/marathi/tipohome',
    live: null,
  },
  {
    service: 'mundo',
    local: '/mundo/tipohome',
    test: '/mundo/tipohome',
    live: null,
  },
  {
    service: 'nepali',
    local: '/nepali/tipohome',
    test: '/nepali/tipohome',
    live: null,
  },
  {
    service: 'pashto',
    local: '/pashto/tipohome',
    test: '/pashto/tipohome',
    live: null,
  },
  {
    service: 'persian',
    local: '/persian/tipohome',
    test: '/persian/tipohome',
    live: null,
  },
  {
    service: 'pidgin',
    local: '/pidgin/tipohome',
    test: '/pidgin/tipohome',
    live: null,
  },
  {
    service: 'portuguese',
    local: '/portuguese/tipohome',
    test: '/portuguese/tipohome',
    live: null,
  },
  {
    service: 'punjabi',
    local: '/punjabi/tipohome',
    test: '/punjabi/tipohome',
    live: null,
  },
  {
    service: 'russian',
    local: '/russian/tipohome',
    test: '/russian/tipohome',
    live: null,
  },
  {
    service: 'portuguese',
    local: '/portuguese/tipohome',
    test: '/portuguese/tipohome',
    live: null,
  },
  {
    service: 'punjabi',
    local: '/punjabi/tipohome',
    test: '/punjabi/tipohome',
    live: null,
  },
  {
    service: 'russian',
    local: '/russian/tipohome',
    test: '/russian/tipohome',
    live: null,
  },
  // {
  //   service: 'serbian',
  //   local: '/serbian/cyr/tipohome',
  //   test: '/serbian/cyr/tipohome',
  //   live: null,
  // },
  {
    service: 'serbian',
    local: '/serbian/lat/tipohome',
    test: '/serbian/lat/tipohome',
    live: null,
  },
  {
    service: 'sinhala',
    local: '/sinhala/tipohome',
    test: '/sinhala/tipohome',
    live: null,
  },
  {
    service: 'somali',
    local: '/somali/tipohome',
    test: '/somali/tipohome',
    live: null,
  },
  {
    service: 'swahili',
    local: '/swahili/tipohome',
    test: '/swahili/tipohome',
    live: null,
  },
  {
    service: 'tamil',
    local: '/tamil/tipohome',
    test: '/tamil/tipohome',
    live: null,
  },
  {
    service: 'telugu',
    local: '/telugu/tipohome',
    test: '/telugu/tipohome',
    live: null,
  },
  {
    service: 'thai',
    local: '/thai/tipohome',
    test: '/thai/tipohome',
    live: null,
  },
  {
    service: 'tigrinya',
    local: '/tigrinya/tipohome',
    test: '/tigrinya/tipohome',
    live: null,
  },
  {
    service: 'turkce',
    local: '/turkce/tipohome',
    test: '/turkce/tipohome',
    live: null,
  },
  {
    service: 'ukrainian',
    local: '/ukrainian/tipohome',
    test: '/ukrainian/tipohome',
    live: null,
  },
  {
    service: 'urdu',
    local: '/urdu/tipohome',
    test: '/urdu/tipohome',
    live: null,
  },
  {
    service: 'uzbek',
    local: 'uzbek/cyr/tipohome',
    test: 'uzbek/cyr/tipohome',
    live: null,
  },
  // {
  //   service: 'uzbek',
  //   local: 'uzbek/lat/tipohome',
  //   test: 'uzbek/lat/tipohome',
  //   live: null,
  // },
  {
    service: 'vietnamese',
    local: '/vietnamese/tipohome',
    test: '/vietnamese/tipohome',
    live: null,
  },
  {
    service: 'yoruba',
    local: '/yoruba/tipohome',
    test: '/yoruba/tipohome',
    live: null,
  },
  {
    service: 'zhongwen',
    local: 'zhongwen/trad/tipohome',
    test: 'zhongwen/trad/tipohome',
    live: null,
  },
];

export default () => {
  const serviceToRun = Cypress.env('ONLY_SERVICE');

  if (serviceToRun) {
    return urls.filter(({ service }) => service === serviceToRun);
  }

  return urls;
};

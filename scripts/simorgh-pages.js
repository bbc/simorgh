const fs = require('fs');
const allServices = require('../cypress/support/config/allServices');

const launchDates = {
  afaanoromoo: {
    articles: '',
    frontPage: '',
    liveRadio: '30th Sept 2019',
    mediaAssetPage: '',
  },
  afrique: {
    articles: '',
    frontPage: '',
    liveRadio: '10th Jan 2020',
    mediaAssetPage: '',
  },
  amharic: {
    articles: '',
    frontPage: '',
    liveRadio: '30th Sept 2019',
    mediaAssetPage: '',
  },
  arabic: {
    articles: '',
    frontPage: '',
    liveRadio: '',
    mediaAssetPage: '',
  },
  archive: {},
  azeri: {
    articles: '',
    frontPage: '26th Sept 2019',
    mediaAssetPage: '',
  },
  bengali: {
    articles: '',
    frontPage: '',
    liveRadio: '10th Jan 2020',
    mediaAssetPage: '',
  },
  burmese: {
    articles: '',
    frontPage: '',
    liveRadio: '10th Jan 2020',
    mediaAssetPage: '',
  },
  cymrufyw: {
    articles: '',
    frontPage: '',
  },
  gahuza: {
    articles: '',
    frontPage: '',
    liveRadio: '10th Jan 2020',
    mediaAssetPage: '',
  },
  gujarati: {
    articles: '',
    frontPage: '13th Jan 2020',
    mediaAssetPage: '',
  },
  hausa: {
    articles: '',
    frontPage: '',
    liveRadio: '',
    mediaAssetPage: '',
  },
  hindi: {
    articles: '',
    frontPage: '',
    liveRadio: '',
    mediaAssetPage: '',
  },
  igbo: {
    articles: '',
    frontPage: '15th July 2019',
    mediaAssetPage: '16th Jan 2019',
  },
  indonesia: {
    articles: '',
    frontPage: '',
    liveRadio: '30th Sept 2019',
    mediaAssetPage: '',
  },
  japanese: {
    articles: '',
    frontPage: '26th Sept 2019',
    mediaAssetPage: '',
  },
  korean: {
    articles: '',
    frontPage: '',
    liveRadio: '30th Sept 2019',
    mediaAssetPage: '',
  },
  kyrgyz: {
    articles: '',
    frontPage: '26th Sept 2019',
    liveRadio: '10th Jan 2020',
    mediaAssetPage: '',
  },
  marathi: {
    articles: '',
    frontPage: '13th Jan 2020',
    mediaAssetPage: '',
  },
  mundo: {
    articles: '',
    frontPage: '',
    mediaAssetPage: '',
  },
  naidheachdan: {
    articles: '',
    frontPage: '',
  },
  nepali: {
    articles: '',
    frontPage: '',
    liveRadio: '14th Jan 2020',
    mediaAssetPage: '',
  },
  news: {
    articles: '1st April 2019',
    frontPage: '',
  },
  pashto: {
    articles: '',
    frontPage: '',
    liveRadio: '14th Jan 2020',
    mediaAssetPage: '',
  },
  persian: {
    articles: '',
    frontPage: '',
    liveRadio: '',
    mediaAssetPage: '',
  },
  pidgin: {
    articles: '',
    frontPage: '15th July 2019',
    mediaAssetPage: '',
  },
  portuguese: {
    articles: '',
    frontPage: '',
    mediaAssetPage: '',
  },
  punjabi: {
    articles: '',
    frontPage: '10th Sept 2019',
    mediaAssetPage: '',
  },
  russian: {
    articles: '',
    frontPage: '',
    mediaAssetPage: '',
  },
  scotland: {
    articles: '',
    frontPage: '',
  },
  serbianCyr: {
    articles: '',
    frontPage: '',
    mediaAssetPage: '',
  },
  serbianLat: {
    articles: '',
    frontPage: '',
    mediaAssetPage: '',
  },
  sinhala: {
    articles: '',
    frontPage: '',
    liveRadio: '14th Jan 2020',
    mediaAssetPage: '',
  },
  somali: {
    articles: '',
    frontPage: '',
    liveRadio: '',
    mediaAssetPage: '',
  },
  sport: {
    articles: '',
    frontPage: '',
  },
  swahili: {
    articles: '',
    frontPage: '',
    liveRadio: '10th Jan 2020',
    mediaAssetPage: '',
  },
  tamil: {
    articles: '',
    frontPage: '14th Jan 2020',
    liveRadio: '14th Jan 2020',
    mediaAssetPage: '',
  },
  telugu: {
    articles: '',
    frontPage: '13th Jan 2020',
    mediaAssetPage: '',
  },
  thai: {
    articles: '',
    frontPage: '19th Aug 2019',
    mediaAssetPage: '',
  },
  tigrinya: {
    articles: '',
    frontPage: '',
    liveRadio: '30th Sept 2019',
    mediaAssetPage: '',
  },
  turkce: {
    articles: '',
    frontPage: '',
    mediaAssetPage: '',
  },
  ukchinaSimp: {
    articles: '',
    frontPage: '',
    mediaAssetPage: '',
  },
  ukchinaTrad: {
    articles: '',
    frontPage: '',
    mediaAssetPage: '',
  },
  ukrainian: {
    articles: '',
    frontPage: '',
    mediaAssetPage: '',
  },
  urdu: {
    articles: '',
    frontPage: '',
    liveRadio: '',
    mediaAssetPage: '',
  },
  uzbek: {
    articles: '',
    frontPage: '13th Jan 2020',
    mediaAssetPage: '',
  },
  vietnamese: {
    articles: '',
    frontPage: '',
    mediaAssetPage: '',
  },
  yoruba: {
    articles: '',
    frontPage: 'July 15th 2019',
    mediaAssetPage: '16th Jan 2020',
  },
  zhongwenSimp: {
    articles: '',
    frontPage: '',
  },
  zhongwenTrad: {
    articles: '',
    frontPage: '',
  },
};

const capitalizeFirstLetter = string =>
  string.charAt(0).toUpperCase() + string.slice(1);

const generateLinks = (service, env, domain) => {
  const output = [];

  const { frontPage, liveRadio, articles, mediaAssetPage } = allServices(env)[
    service
  ].pageTypes;

  if (frontPage && frontPage.path) {
    output.push(`[home](${domain}${frontPage.path})`);
  }

  if (articles && articles.path) {
    output.push(`[articles](${domain}${articles.path})`);
  }

  if (liveRadio && liveRadio.path) {
    output.push(`[liveRadio](${domain}${liveRadio.path})`);
  }

  if (mediaAssetPage && mediaAssetPage.path) {
    output.push(`[MAP](${domain}${mediaAssetPage.path})`);
  }

  return output.join(' - ');
};

const generateLaunchDates = service => {
  const output = [];
  const serviceLaunch = launchDates[service];

  if (serviceLaunch.frontPage && serviceLaunch.frontPage !== '') {
    output.push(`__Home__: ${serviceLaunch.frontPage}`);
  }

  if (serviceLaunch.articles && serviceLaunch.articles !== '') {
    output.push(`__Articles__: ${serviceLaunch.articles}`);
  }

  if (serviceLaunch.liveRadio && serviceLaunch.liveRadio !== '') {
    output.push(`__Live Radio__: ${serviceLaunch.liveRadio}`);
  }

  if (serviceLaunch.mediaAssetPage && serviceLaunch.mediaAssetPage !== '') {
    output.push(`__MAPs__: ${serviceLaunch.mediaAssetPage}`);
  }

  return output.join(' - ');
};

const stream = fs.createWriteStream('../docs/Simorgh-Pages.md');
stream.once('open', () => {
  stream.write(
    '<!--Please update the launchDates config in scripts/simorgh-pages.js -->\n',
  );
  stream.write(
    '<!--This table can then be generated using the following command: `cd scripts && node simorgh-pages.js` -->\n',
  );
  stream.write(
    '<!--Remember to commit and push the changes to both simorgh-pages.js and Simorgh-Pages.md -->\n',
  );

  stream.write(`| Service | Local | Test | Stage | Live | Launch Dates |\n`);
  stream.write(`|---------|-------|------|-------|------|--------------|\n`);

  const localServices = allServices('local');

  Object.keys(localServices).forEach(service => {
    const items = [
      capitalizeFirstLetter(service),
      generateLinks(service, 'local', 'http://localhost:7080'),
      generateLinks(service, 'test', 'https://www.test.bbc.com'),
      generateLinks(service, 'stage', 'https://www.stage.bbc.com'),
      generateLinks(service, 'live', 'https://www.bbc.com'),
      generateLaunchDates(service),
    ];

    stream.write(`| ${items.join(' | ')} |\n`);
  });
});
